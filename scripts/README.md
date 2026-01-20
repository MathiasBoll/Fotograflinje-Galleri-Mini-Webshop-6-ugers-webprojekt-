# Scripts Guide

## Image Upload Scripts

This folder contains scripts to help manage and upload images to the API.

---

## 🚀 Quick Start

### Step 1: Check Dependencies
```bash
npm install
```

### Step 2: Check API and Event Status (Windows)
```powershell
.\scripts\checkAndPrepare.ps1
```

### Step 3: Test Upload (Single Image)
```bash
npm run test-upload
```

### Step 4: Upload All Images
```bash
npm run upload-images
```

---

## 📝 Script Details

### checkAndPrepare.ps1 (PowerShell - Windows)

Interactive script that:
- Tests API connectivity
- Checks if event "Fotograflinje 2025-2" exists
- Creates the event if needed (with confirmation)
- Scans local images and shows statistics
- Provides next steps

**Usage:**
```powershell
.\scripts\checkAndPrepare.ps1
```

### testUpload.js (Node.js)

Tests the upload functionality with a single image before running the full batch.

**What it does:**
- Checks API connectivity
- Uploads one test image (Ida Dragvik/P01.jpg)
- Verifies the upload endpoint works
- Shows detailed error messages if something fails

**Usage:**
```bash
npm run test-upload
```

### uploadImages.js (Node.js)

Automated batch upload for all images in `public/images/2025-2/`.

**What it does:**
1. Creates/verifies event "Fotograflinje 2025-2"
2. Scans all photographer folders
3. Uploads each image with metadata:
   - Photographer name (from folder name)
   - Event association
   - Price (based on image prefix)
   - Category (based on image prefix)
4. Shows progress and summary

**Usage:**
```bash
npm run upload-images
```

**Image pricing by prefix:**
- `P01.jpg` - Portrait (299 kr)
- `A01.jpg` - Architecture (349 kr)
- `F01.jpg` - Fashion/Mode (399 kr)
- `S01.jpg` - Street/Documentary (279 kr)

---

## 📋 Manual Event Creation

If automated scripts don't work, create the event manually through the admin panel:

**Event Details:**
```
Name: Fotograflinje 2025-2
Slug: fotograflinje-2025-2
Description: Studentarbejder fra fotograflinjen, årgang 2025-2. En samling af portrætter, arkitekturfotografi, mode og dokumentarfotografi fra talentfulde fotografstuderende.
Start Date: 2025-01-15
End Date: 2025-06-30
Active: true
```

---

## 👥 Photographers in 2025-2

The following photographers have their work in this collection:
- Ida Dragvik
- Isak Uyar Orestad
- Julie Kongsted Bech
- Kristina Christiansen
- Mads Dandanell Bennet Gregersen
- Nina Riis Blæsbjerg
- Villads Busk Illemann

---

## 🔍 After Upload

Once images are uploaded successfully, they will appear in:

1. **Main Gallery (Home Page)**
   - All images visible in the photo grid
   - Searchable by photographer name and filename

2. **Event Filter Dropdown**
   - "Fotograflinje 2025-2" will appear as an option
   - Filtering shows only images from this event

3. **Photographer Filter Dropdown**
   - All 7 photographers will appear as options
   - Each can be selected to filter their work

4. **Year Filter Dropdown**
   - "2025" will appear as an option
   - Based on upload date

5. **Admin Images Panel**
   - All images manageable through admin interface
   - Edit, delete, reassign to different events

---

## ❗ Troubleshooting

### Script fails to connect to API
**Symptoms:** Connection errors, timeout, ECONNREFUSED

**Solutions:**
- Check API URL: `https://photobooth-lx7n9.ondigitalocean.app`
- Verify API is running and accessible
- Test in browser: visit `https://photobooth-lx7n9.ondigitalocean.app/events`
- Check network connection and firewall

### Upload endpoint returns 404
**Symptoms:** "Not Found" error on `/photos/upload`

**Solutions:**
- The API might not have an upload endpoint
- Use the admin panel to upload images manually instead
- Check API documentation for correct endpoint
- Contact API administrator

### Images not appearing in filters
**Symptoms:** Uploaded successfully but not visible in dropdowns

**Solutions:**
- Verify the event was created with slug `fotograflinje-2025-2`
- Check that images have correct `eventId` and `eventSlug` fields
- Clear browser cache and refresh
- Check browser console for JavaScript errors
- Verify API returns images with `fetchPhotos()` call

### Upload errors for specific files
**Symptoms:** Some files upload, others fail

**Solutions:**
- Check file permissions (should be readable)
- Verify file formats (JPG, JPEG, PNG only)
- Check file size limits (API might have restrictions)
- Ensure filenames don't have special characters

### PowerShell script won't run
**Symptoms:** "Execution policy" error

**Solutions:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🔧 Technical Details

**API Endpoint:**
```
POST https://photobooth-lx7n9.ondigitalocean.app/photos/upload
```

**Request Format:** `multipart/form-data`

**Form Fields:**
- `file` - Image file (binary)
- `photographer` - Photographer name (string)
- `eventSlug` - Event slug identifier (string)
- `eventId` - Event database ID (string)
- `eventName` - Event display name (string)
- `price` - Price in DKK (number)
- `category` - Image category (string)
- `title` - Display title (string)
- `uploadedAt` - ISO timestamp (string)

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "url": "...",
    "thumbUrl": "...",
    ...
  }
}
```
