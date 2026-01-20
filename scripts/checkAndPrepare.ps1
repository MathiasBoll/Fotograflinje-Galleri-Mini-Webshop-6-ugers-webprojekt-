# PowerShell Image Upload Helper Script
# This script helps you create the event and prepare image data for the 2025-2 collection

$API_BASE_URL = "https://photobooth-lx7n9.ondigitalocean.app"
$IMAGES_DIR = Join-Path $PSScriptRoot "..\public\images\2025-2"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Image Upload Helper Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Function to check API connectivity
function Test-APIConnection {
    Write-Host "Testing API connection..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$API_BASE_URL/events" -Method Get -TimeoutSec 10
        Write-Host "✓ API is accessible" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "✗ Cannot connect to API: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to check if event exists
function Get-EventBySlug {
    param([string]$slug)
    
    try {
        $response = Invoke-RestMethod -Uri "$API_BASE_URL/events" -Method Get
        $events = if ($response.data) { $response.data } else { $response }
        
        foreach ($event in $events) {
            if ($event.slug -eq $slug) {
                return $event
            }
        }
        return $null
    } catch {
        Write-Host "Error fetching events: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Function to create event
function New-Event {
    $eventData = @{
        name = "Fotograflinje 2025-2"
        slug = "fotograflinje-2025-2"
        description = "Studentarbejder fra fotograflinjen, årgang 2025-2. En samling af portrætter, arkitekturfotografi, mode og dokumentarfotografi fra talentfulde fotografstuderende."
        startDate = "2025-01-15"
        endDate = "2025-06-30"
        active = $true
    } | ConvertTo-Json
    
    Write-Host "Creating new event..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$API_BASE_URL/events" `
            -Method Post `
            -ContentType "application/json" `
            -Body $eventData
        
        Write-Host "✓ Event created successfully!" -ForegroundColor Green
        return $response
    } catch {
        Write-Host "✗ Failed to create event: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "You may need to create it manually through the admin panel." -ForegroundColor Yellow
        return $null
    }
}

# Function to scan local images
function Get-LocalImages {
    if (-not (Test-Path $IMAGES_DIR)) {
        Write-Host "✗ Images directory not found: $IMAGES_DIR" -ForegroundColor Red
        return @()
    }
    
    $photographers = Get-ChildItem -Path $IMAGES_DIR -Directory | Where-Object { $_.Name -notlike ".*" }
    
    $imageData = @()
    foreach ($photographer in $photographers) {
        $images = Get-ChildItem -Path $photographer.FullName -File -Include "*.jpg","*.jpeg","*.png"
        foreach ($image in $images) {
            $imageData += @{
                Photographer = $photographer.Name
                Filename = $image.Name
                Path = $image.FullName
                Size = [math]::Round($image.Length / 1KB, 2)
            }
        }
    }
    
    return $imageData
}

# Main execution
Write-Host "Step 1: Checking API connection" -ForegroundColor Cyan
if (-not (Test-APIConnection)) {
    Write-Host ""
    Write-Host "Cannot proceed without API connection." -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "  1. API URL is correct" -ForegroundColor Yellow
    Write-Host "  2. API server is running" -ForegroundColor Yellow
    Write-Host "  3. Internet connection is active" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Step 2: Checking for event 'fotograflinje-2025-2'" -ForegroundColor Cyan
$event = Get-EventBySlug -slug "fotograflinje-2025-2"

if ($event) {
    Write-Host "✓ Event already exists:" -ForegroundColor Green
    Write-Host "  Name: $($event.name)" -ForegroundColor White
    Write-Host "  ID: $($event._id ?? $event.id)" -ForegroundColor White
    Write-Host "  Slug: $($event.slug)" -ForegroundColor White
} else {
    Write-Host "Event not found. Would you like to create it? (Y/N)" -ForegroundColor Yellow
    $createEvent = Read-Host
    
    if ($createEvent -eq "Y" -or $createEvent -eq "y") {
        $event = New-Event
    } else {
        Write-Host "Skipping event creation." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Manual event creation details:" -ForegroundColor Cyan
        Write-Host "  Name: Fotograflinje 2025-2"
        Write-Host "  Slug: fotograflinje-2025-2"
        Write-Host "  Description: Studentarbejder fra fotograflinjen, årgang 2025-2"
        Write-Host "  Start Date: 2025-01-15"
        Write-Host "  End Date: 2025-06-30"
        Write-Host "  Active: true"
        exit
    }
}

Write-Host ""
Write-Host "Step 3: Scanning local images" -ForegroundColor Cyan
$images = Get-LocalImages

if ($images.Count -eq 0) {
    Write-Host "✗ No images found in $IMAGES_DIR" -ForegroundColor Red
    exit
}

Write-Host "✓ Found $($images.Count) images" -ForegroundColor Green
Write-Host ""

# Group by photographer
$groupedImages = $images | Group-Object -Property Photographer
Write-Host "Images by photographer:" -ForegroundColor Cyan
foreach ($group in $groupedImages) {
    Write-Host "  $($group.Name): $($group.Count) images" -ForegroundColor White
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

if ($event) {
    Write-Host "Event Status: " -NoNewline
    Write-Host "READY ✓" -ForegroundColor Green
    Write-Host "Event ID: $($event._id ?? $event.id)" -ForegroundColor White
} else {
    Write-Host "Event Status: " -NoNewline
    Write-Host "NOT CREATED ✗" -ForegroundColor Red
}

Write-Host "Images Found: $($images.Count)" -ForegroundColor White
Write-Host "Photographers: $($groupedImages.Count)" -ForegroundColor White

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install dependencies: npm install" -ForegroundColor White
Write-Host "2. Run upload script: npm run upload-images" -ForegroundColor White
Write-Host "   OR use: node scripts/uploadImages.js" -ForegroundColor White
Write-Host ""
Write-Host "After upload, the images will appear in:" -ForegroundColor Yellow
Write-Host "  • Main gallery (Home page)" -ForegroundColor White
Write-Host "  • Event filter dropdown" -ForegroundColor White
Write-Host "  • Photographer filter dropdown" -ForegroundColor White
Write-Host "  • Admin Images panel" -ForegroundColor White
Write-Host ""
