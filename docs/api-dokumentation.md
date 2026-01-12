# API Dokumentation

## API Base URL

```
https://photobooth-lx7n9.ondigitalocean.app
```

API'et bruges til at hente events og fotos, som vises i galleriet.

---

## Events API

### GET /events
Hent alle events

**Endpoint:**
```
GET https://photobooth-lx7n9.ondigitalocean.app/events
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Bryllup - Hansen",
    "slug": "bryllup-hansen",
    "date": "2026-01-01",
    "photoCount": 150
  }
]
```

**Response felter:**
- `id` - Unikt event ID
- `name` - Event navn
- `slug` - URL-venlig identifier til at hente fotos
- `date` - Event dato
- `photoCount` - Antal fotos i eventet

---

## Photos API

### GET /photos?eventSlug=...
Hent alle fotos for et specifikt event

**Endpoint:**
```
GET https://photobooth-lx7n9.ondigitalocean.app/photos?eventSlug={eventSlug}
```

**Query Parameters:**
- `eventSlug` - Event slug fra events API (påkrævet)

**Eksempel:**
```
GET https://photobooth-lx7n9.ondigitalocean.app/photos?eventSlug=bryllup-hansen
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Solnedgang ved stranden",
    "description": "Smukt bryllupsfoto med solnedgang i baggrunden",
    "eventId": 1,
    "eventName": "Bryllup - Hansen",
    "url": "https://example.com/photo1.jpg",
    "thumbnail": "https://example.com/thumb1.jpg",
    "price": 299,
    "date": "2026-01-01"
  }
]
```

**Response felter:**
- `id` - Unikt foto ID
- `title` - Foto titel
- `description` - Foto beskrivelse
- `eventId` - Event ID
- `eventName` - Event navn
- `url` - Fuld størrelse billede URL
- `thumbnail` - Thumbnail billede URL
- `price` - Pris i DKK
- `date` - Foto dato

---

## Lokal Data (ikke fra API)

Følgende funktionalitet håndteres lokalt med mock data:

### Authentication
Bruger login/logout håndteres lokalt med mock users:
- Username: `admin`, Password: `password123` (admin rolle)
- Username: `user`, Password: `user123` (bruger rolle)

### Shopping Cart
Indkøbskurv data gemmes i localStorage og håndteres client-side.

### CRUD Operations
Admin CRUD operationer (create, update, delete) håndteres lokalt.
I en produktionsversion ville disse kalde backend API endpoints.

---

## Brug af API i projektet

### Eksempel: Hent alle events
```javascript
const response = await fetch('https://photobooth-lx7n9.ondigitalocean.app/events')
const events = await response.json()
```

### Eksempel: Hent fotos for et event
```javascript
const eventSlug = 'bryllup-hansen'
const response = await fetch(`https://photobooth-lx7n9.ondigitalocean.app/photos?eventSlug=${eventSlug}`)
const photos = await response.json()
```

---

## Fejlhåndtering

API endpoints kan returnere følgende HTTP statuskoder:

- **200**: OK - Succesfuld request
- **400**: Bad Request - Ugyldig query parameter
- **404**: Not Found - Event ikke fundet
- **500**: Internal Server Error - Serverfejl

**Eksempel på error handling:**
```javascript
try {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
} catch (error) {
  console.error('Fejl ved API kald:', error)
}
```
