# Quick Guide: Adding 2025-2 Images to Event Filters

## 📸 The Problem
You have images in `public/images/2025-2/` from 7 photographers, but they're not showing up in the event and photographer filter dropdowns on the home page.

## ✅ The Solution
The images need to be uploaded to the API database with proper event associations. I've created automated scripts to do this for you.

---

## 🎯 Step-by-Step Instructions

### Option 1: Automated Upload (Recommended)

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Check Everything is Ready (Windows)
```powershell
.\scripts\checkAndPrepare.ps1
```

This will:
- ✓ Test API connection
- ✓ Check/create the event
- ✓ Show you what images will be uploaded

#### 3. Test with One Image First
```bash
npm run test-upload
```

If this succeeds, you know the API is working correctly.

#### 4. Upload All Images
```bash
npm run upload-images
```

This will upload all 175+ images (estimated) from the 7 photographers.

---

### Option 2: Manual Upload (If Scripts Don't Work)

#### 1. Create the Event
Go to the Admin Panel → Events → Add Event

Fill in:
- **Name:** Fotograflinje 2025-2
- **Slug:** fotograflinje-2025-2
- **Description:** Studentarbejder fra fotograflinjen, årgang 2025-2
- **Start Date:** 2025-01-15
- **End Date:** 2025-06-30
- **Active:** ✓ Yes

#### 2. Upload Images Through Admin Panel
Go to Admin Panel → Images → Add Image

For each photographer folder:
1. Select image file
2. Choose "Fotograflinje 2025-2" event
3. Enter photographer name
4. Set price based on prefix (P=299, A=349, F=399, S=279)
5. Upload

**Note:** This will be time-consuming for 175+ images!

---

## 🎨 What Happens After Upload

### Home Page Filters Will Show:

**Event Dropdown:**
```
┌─────────────────────────┐
│ Event                   │
├─────────────────────────┤
│ Fotograflinje 2025-2    │ ← New option!
│ Portrætudstilling 2025  │
│ Arkitekturudstilling    │
└─────────────────────────┘
```

**Photographer Dropdown:**
```
┌─────────────────────────────────────┐
│ Fotograf                            │
├─────────────────────────────────────┤
│ Ida Dragvik                         │ ← New!
│ Isak Uyar Orestad                   │ ← New!
│ Julie Kongsted Bech                 │ ← New!
│ Kristina Christiansen               │ ← New!
│ Mads Dandanell Bennet Gregersen     │ ← New!
│ Nina Riis Blæsbjerg                 │ ← New!
│ Villads Busk Illemann               │ ← New!
└─────────────────────────────────────┘
```

**Year Dropdown:**
```
┌─────────────────────────┐
│ Årgang                  │
├─────────────────────────┤
│ 2025                    │ ← Will show based on upload date
└─────────────────────────┘
```

---

## 📊 Expected Results

After successful upload:

✓ **175+ images** uploaded and visible
✓ **1 new event** in the event filter
✓ **7 new photographers** in the photographer filter
✓ **Images searchable** by photographer name and filename
✓ **Images filterable** by event, photographer, year
✓ **All images** manageable in Admin panel

---

## 🔧 Troubleshooting

### "Cannot connect to API"
The API might be offline or URL is wrong.
- Check: https://photobooth-lx7n9.ondigitalocean.app/events in browser
- Should return JSON data

### "Upload endpoint not found (404)"
The API might not have an upload endpoint configured.
- **Solution:** Use Manual Upload method via Admin Panel
- Or contact the backend developer

### "Images uploaded but not showing in filters"
- Clear browser cache
- Hard refresh: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
- Check browser console for errors
- Verify event slug is exactly: `fotograflinje-2025-2`

### "Script won't run on Windows"
PowerShell execution policy issue.
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📁 Current Image Structure

```
public/images/2025-2/
├── Ida Dragvik/
│   ├── P01.jpg to P05.jpg (Portraits - 299 kr)
│   ├── A01.jpg to A05.jpg (Architecture - 349 kr)
│   ├── F01.jpg to F10.jpg (Fashion - 399 kr)
│   └── S01.jpg to S05.jpg (Street - 279 kr)
├── Isak Uyar Orestad/
│   └── (similar structure)
├── Julie Kongsted Bech/
│   └── (similar structure)
├── Kristina Christiansen/
│   └── (similar structure)
├── Mads Dandanell Bennet Gregersen/
│   └── (similar structure)
├── Nina Riis Blæsbjerg/
│   └── (similar structure)
└── Villads Busk Illemann/
    └── (similar structure)
```

---

## 💡 Pro Tips

1. **Run test upload first** - Don't upload 175 images if the API isn't working
2. **Check the API in browser** - Visit the events endpoint to verify it's accessible
3. **Use the PowerShell helper** - It will check everything before you start
4. **Have patience** - Uploading 175+ images takes time (1-2 minutes)
5. **Check progress** - The script shows real-time progress for each photographer

---

## 📞 Need Help?

If the scripts don't work:
1. Check [scripts/README.md](./README.md) for detailed troubleshooting
2. Try the manual upload method via Admin Panel
3. Check that the API is actually running and accessible
4. Verify the API has an upload endpoint configured

---

## ✨ Summary

**Current State:**
- ❌ Images exist locally but not in database
- ❌ Not showing in event filter
- ❌ Not showing in photographer filter

**After Running Scripts:**
- ✅ All images in API database
- ✅ Associated with "Fotograflinje 2025-2" event
- ✅ Visible in all filter dropdowns
- ✅ Searchable and purchasable

**Commands to Run:**
```bash
npm install
npm run test-upload
npm run upload-images
```

That's it! 🎉
