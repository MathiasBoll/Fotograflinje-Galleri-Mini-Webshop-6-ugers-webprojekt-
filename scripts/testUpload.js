/**
 * Test Upload Script
 * Uploads a single test image to verify the API is working
 * Use this to test before running the full upload
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE_URL = 'https://photobooth-lx7n9.ondigitalocean.app';

// Test with first image from Ida Dragvik
const TEST_IMAGE = path.join(__dirname, '../public/images/2025-2/Ida Dragvik/P01.jpg');
const EVENT_SLUG = 'fotograflinje-2025-2';

async function testUpload() {
  console.log('=== Test Image Upload ===\n');
  
  // Check if test image exists
  if (!fs.existsSync(TEST_IMAGE)) {
    console.error('✗ Test image not found:', TEST_IMAGE);
    console.log('\nPlease make sure the images are in:');
    console.log('public/images/2025-2/Ida Dragvik/P01.jpg');
    return;
  }
  
  console.log('✓ Test image found');
  console.log('File:', path.basename(TEST_IMAGE));
  console.log('Size:', Math.round(fs.statSync(TEST_IMAGE).size / 1024) + ' KB');
  
  try {
    // First check if we can reach the API
    console.log('\nChecking API connection...');
    const healthCheck = await fetch(`${API_BASE_URL}/events`);
    
    if (!healthCheck.ok) {
      console.error('✗ API returned status:', healthCheck.status);
      console.log('\nThe API might be offline or the URL is incorrect.');
      console.log('API URL:', API_BASE_URL);
      return;
    }
    
    console.log('✓ API is reachable');
    
    // Prepare form data
    console.log('\nPreparing upload...');
    const formData = new FormData();
    const fileBuffer = fs.readFileSync(TEST_IMAGE);
    const filename = path.basename(TEST_IMAGE);
    
    formData.append('file', fileBuffer, filename);
    formData.append('photographer', 'Ida Dragvik');
    formData.append('eventSlug', EVENT_SLUG);
    formData.append('eventName', 'Fotograflinje 2025-2');
    formData.append('price', '299');
    formData.append('category', 'Portræt');
    formData.append('title', `Ida Dragvik - ${filename.replace('.jpg', '')}`);
    formData.append('uploadedAt', new Date().toISOString());
    
    console.log('Upload data:');
    console.log('  - File:', filename);
    console.log('  - Photographer: Ida Dragvik');
    console.log('  - Event:', EVENT_SLUG);
    console.log('  - Price: 299 kr');
    console.log('  - Category: Portræt');
    
    // Attempt upload
    console.log('\nUploading to:', `${API_BASE_URL}/photos/upload`);
    const uploadResponse = await fetch(`${API_BASE_URL}/photos/upload`, {
      method: 'POST',
      body: formData
    });
    
    console.log('Response status:', uploadResponse.status);
    
    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('\n✗ Upload failed');
      console.error('Status:', uploadResponse.status);
      console.error('Response:', errorText);
      
      if (uploadResponse.status === 404) {
        console.log('\n⚠️  The /photos/upload endpoint might not exist.');
        console.log('You may need to:');
        console.log('1. Check the API documentation for the correct upload endpoint');
        console.log('2. Use the admin panel to upload images instead');
        console.log('3. Contact the API administrator');
      }
      return;
    }
    
    const result = await uploadResponse.json();
    console.log('\n✓ Upload successful!');
    console.log('\nResponse:', JSON.stringify(result, null, 2));
    
    console.log('\n=== Test Complete ===');
    console.log('The upload endpoint is working correctly.');
    console.log('You can now run the full upload script:');
    console.log('  npm run upload-images');
    
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Connection refused. The API server might be offline.');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n⚠️  Could not resolve API hostname. Check the URL.');
    }
    
    console.log('\nTroubleshooting:');
    console.log('1. Verify API URL:', API_BASE_URL);
    console.log('2. Check if the API server is running');
    console.log('3. Test the API in a browser or Postman');
    console.log('4. Check your network connection');
  }
}

testUpload().catch(console.error);
