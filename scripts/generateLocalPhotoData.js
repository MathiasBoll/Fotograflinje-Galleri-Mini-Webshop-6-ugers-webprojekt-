/**
 * Generate Local Photo Data
 * Scans the public/images/2025-2/ folder and generates photo data
 * that can be used directly in the application
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images/2025-2');
const OUTPUT_FILE = path.join(__dirname, '../src/data/photos2025-2.json');

// Price based on category prefix
const PRICE_MAP = {
  'P': 299,  // Portrait
  'A': 349,  // Architecture
  'F': 399,  // Fashion/Mode
  'S': 279   // Street/Documentary
};

// Category names
const CATEGORY_MAP = {
  'P': 'Portræt',
  'A': 'Arkitektur',
  'F': 'Mode',
  'S': 'Dokumentar'
};

function getPrice(filename) {
  const prefix = filename.charAt(0).toUpperCase();
  return PRICE_MAP[prefix] || 299;
}

function getCategory(filename) {
  const prefix = filename.charAt(0).toUpperCase();
  return CATEGORY_MAP[prefix] || 'Diverse';
}

function generatePhotoData() {
  console.log('=== Generating Local Photo Data ===\n');
  console.log('Source:', IMAGES_DIR);
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('❌ Images directory not found:', IMAGES_DIR);
    process.exit(1);
  }

  // Get all photographer folders
  const photographers = fs.readdirSync(IMAGES_DIR).filter(item => {
    const itemPath = path.join(IMAGES_DIR, item);
    return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
  });

  console.log(`Found ${photographers.length} photographers:\n`);

  let photoId = 1000; // Start from 1000 to avoid conflicts
  const allPhotos = [];

  photographers.forEach(photographer => {
    const photographerPath = path.join(IMAGES_DIR, photographer);
    const files = fs.readdirSync(photographerPath);
    
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') ||
      file.toLowerCase().endsWith('.png')
    );

    console.log(`  ${photographer}: ${imageFiles.length} images`);

    imageFiles.forEach(filename => {
      const price = getPrice(filename);
      const category = getCategory(filename);
      const baseName = filename.replace(/\.(jpg|jpeg|png)$/i, '');
      
      // Create photo object
      const photo = {
        _id: `photo-2025-2-${photoId}`,
        id: photoId,
        title: `${photographer} - ${baseName}`,
        originalFilename: filename,
        photographer: photographer,
        event: 'event-2025-2',
        eventName: 'Fotograflinje 2025-2',
        eventSlug: 'fotograflinje-2025-2',
        category: category,
        price: price,
        url: `/images/2025-2/${photographer}/${filename}`,
        thumbUrl: `/images/2025-2/${photographer}/${filename}`,
        uploadedAt: '2025-01-20T12:00:00.000Z',
        description: `${category}fotografi af ${photographer}`
      };

      allPhotos.push(photo);
      photoId++;
    });
  });

  console.log(`\n✓ Generated data for ${allPhotos.length} photos`);

  // Create event data
  const event = {
    _id: 'event-2025-2',
    id: 'event-2025-2',
    name: 'Fotograflinje 2025-2',
    slug: 'fotograflinje-2025-2',
    title: 'Fotograflinje 2025-2',
    description: 'Studentarbejder fra fotograflinjen, årgang 2025-2. En samling af portrætter, arkitekturfotografi, mode og dokumentarfotografi fra talentfulde fotografstuderende.',
    startDate: '2025-01-15',
    endDate: '2025-06-30',
    active: true
  };

  const output = {
    event: event,
    photos: allPhotos,
    metadata: {
      generatedAt: new Date().toISOString(),
      totalPhotos: allPhotos.length,
      photographers: photographers,
      photographerCount: photographers.length
    }
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log('\n✓ Photo data written to:', OUTPUT_FILE);

  // Generate summary
  console.log('\n=== Summary ===');
  console.log(`Total photos: ${allPhotos.length}`);
  console.log(`Photographers: ${photographers.length}`);
  console.log(`Event: Fotograflinje 2025-2`);
  
  console.log('\nPrice distribution:');
  const priceGroups = {};
  allPhotos.forEach(p => {
    priceGroups[p.price] = (priceGroups[p.price] || 0) + 1;
  });
  Object.keys(priceGroups).sort().forEach(price => {
    console.log(`  ${price} kr: ${priceGroups[price]} photos`);
  });

  console.log('\n✅ Done! Next steps:');
  console.log('1. Import this data in your apiService.js');
  console.log('2. Merge with existing photos');
  console.log('3. The event and photos will appear in filters');

  return output;
}

try {
  generatePhotoData();
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
