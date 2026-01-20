/**
 * Image Upload Script
 * Uploads images from public/images/2025-2/ to the API
 * and associates them with a specific event
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const API_BASE_URL = 'https://photobooth-lx7n9.ondigitalocean.app';
const IMAGES_DIR = path.join(__dirname, '../public/images/2025-2');

// Event configuration for 2025-2
const EVENT_DATA = {
  name: 'Fotograflinje 2025-2',
  slug: 'fotograflinje-2025-2',
  description: 'Studentarbejder fra fotograflinjen, årgang 2025-2. En samling af portrætter, arkitekturfotografi, mode og dokumentarfotografi fra talentfulde fotografstuderende.',
  startDate: '2025-01-15',
  endDate: '2025-06-30',
  active: true
};

// Price ranges based on category prefix
const PRICE_MAP = {
  'P': 299,  // Portrait
  'A': 349,  // Architecture
  'F': 399,  // Fashion/Mode
  'S': 279   // Street/Documentary
};

/**
 * Create or get event
 */
async function ensureEventExists() {
  try {
    // First, try to get existing events
    const response = await fetch(`${API_BASE_URL}/events`);
    const eventsData = await response.json();
    const events = eventsData.data || eventsData;
    
    // Check if event already exists
    const existingEvent = events.find(e => e.slug === EVENT_DATA.slug);
    if (existingEvent) {
      console.log('✓ Event already exists:', existingEvent.name);
      return existingEvent;
    }
    
    // Create new event
    console.log('Creating new event:', EVENT_DATA.name);
    const createResponse = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(EVENT_DATA)
    });
    
    if (!createResponse.ok) {
      throw new Error(`Failed to create event: ${createResponse.status}`);
    }
    
    const newEvent = await createResponse.json();
    console.log('✓ Event created successfully');
    return newEvent.data || newEvent;
  } catch (error) {
    console.error('Error with event:', error.message);
    throw error;
  }
}

/**
 * Get price based on filename prefix
 */
function getPrice(filename) {
  const prefix = filename.charAt(0).toUpperCase();
  return PRICE_MAP[prefix] || 299; // Default price
}

/**
 * Get category based on filename prefix
 */
function getCategory(filename) {
  const prefix = filename.charAt(0).toUpperCase();
  const categories = {
    'P': 'Portræt',
    'A': 'Arkitektur',
    'F': 'Mode',
    'S': 'Dokumentar'
  };
  return categories[prefix] || 'Diverse';
}

/**
 * Upload a single image
 */
async function uploadImage(imagePath, photographer, event) {
  try {
    const filename = path.basename(imagePath);
    const fileBuffer = fs.readFileSync(imagePath);
    
    const formData = new FormData();
    formData.append('file', fileBuffer, filename);
    formData.append('photographer', photographer);
    formData.append('eventSlug', event.slug);
    formData.append('eventId', event._id || event.id);
    formData.append('eventName', event.name);
    formData.append('price', getPrice(filename).toString());
    formData.append('category', getCategory(filename));
    formData.append('title', `${photographer} - ${filename.replace('.jpg', '')}`);
    formData.append('uploadedAt', new Date().toISOString());
    
    const response = await fetch(`${API_BASE_URL}/photos/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed (${response.status}): ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`  ✓ Uploaded: ${filename}`);
    return result;
  } catch (error) {
    console.error(`  ✗ Failed to upload ${path.basename(imagePath)}:`, error.message);
    return null;
  }
}

/**
 * Process all images in a photographer's folder
 */
async function processPhotographerFolder(photographerPath, photographer, event) {
  const files = fs.readdirSync(photographerPath);
  const imageFiles = files.filter(file => 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.jpeg') ||
    file.toLowerCase().endsWith('.png')
  );
  
  console.log(`\nProcessing ${photographer} (${imageFiles.length} images)...`);
  
  const results = [];
  for (const file of imageFiles) {
    const imagePath = path.join(photographerPath, file);
    const result = await uploadImage(imagePath, photographer, event);
    results.push(result);
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const successful = results.filter(r => r !== null).length;
  console.log(`Completed: ${successful}/${imageFiles.length} images uploaded`);
  
  return results;
}

/**
 * Main upload function
 */
async function main() {
  console.log('=== Image Upload Script ===\n');
  console.log('API:', API_BASE_URL);
  console.log('Source:', IMAGES_DIR);
  console.log('\n');
  
  // Check if images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Error: Images directory not found:', IMAGES_DIR);
    process.exit(1);
  }
  
  try {
    // Step 1: Ensure event exists
    console.log('Step 1: Checking event...');
    const event = await ensureEventExists();
    console.log('Event ID:', event._id || event.id);
    console.log('Event Slug:', event.slug);
    
    // Step 2: Get all photographer folders
    const photographers = fs.readdirSync(IMAGES_DIR).filter(item => {
      const itemPath = path.join(IMAGES_DIR, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    });
    
    console.log(`\nFound ${photographers.length} photographer folders:`);
    photographers.forEach(p => console.log(`  - ${p}`));
    
    // Step 3: Process each photographer's images
    console.log('\n' + '='.repeat(50));
    console.log('Starting upload process...');
    console.log('='.repeat(50));
    
    const allResults = [];
    for (const photographer of photographers) {
      const photographerPath = path.join(IMAGES_DIR, photographer);
      const results = await processPhotographerFolder(photographerPath, photographer, event);
      allResults.push(...results);
    }
    
    // Summary
    const successful = allResults.filter(r => r !== null).length;
    const failed = allResults.length - successful;
    
    console.log('\n' + '='.repeat(50));
    console.log('UPLOAD COMPLETE');
    console.log('='.repeat(50));
    console.log(`Total images: ${allResults.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    console.log('\nAll images have been uploaded and associated with event:');
    console.log(`"${event.name}" (${event.slug})`);
    console.log('\nThe images should now appear in:');
    console.log('- The main gallery with event filter');
    console.log('- The Events page');
    console.log('- Admin Images panel');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
