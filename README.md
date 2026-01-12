# Fotograflinje Galleri & Mini-Webshop

Webapplikation udviklet som skoleprojekt til fotograflinjen.

Et 6-ugers webprojekt der kombinerer JavaScript interaktivitet, indkøbskurv, CRUD operationer, brugerauthentificering og integration af ekstern API.

---

## 🎯 Funktioner

- **Galleri via ekstern API** - Henter fotos og events fra DigitalOcean API
- **Indkøbskurv** - Fuld webshop funktionalitet med localStorage
- **Login og admin CRUD** - Brugerauthentificering og produktadministration
- **Dokumenteret proces og design** - Komplet projektdokumentation

---

## 🔗 Links

- **GitHub:** https://github.com/MathiasBoll/Fotograflinje-Galleri-Mini-Webshop-6-ugers-webprojekt-
- **API:** https://photobooth-lx7n9.ondigitalocean.app

---
---

## 🛠️ Teknologier

- **Frontend**: React 18, Vite
- **Routing**: React Router v6
- **State Management**: Context API (CartContext, AuthContext)
- **API**: Fetch API med DigitalOcean backend
- **Styling**: CSS (custom styling system)
- **Persistence**: localStorage

---

## 👤 Demo Login

- **Admin:** `admin` / `password123`
- **Bruger:** `user` / `user123`

---

## 📁 Projektstruktur

```
├── docs/                  # Dokumentation
│   ├── opgavebeskrivelse.md
│   ├── projektplan.md
│   ├── refleksion.md
│   └── api-dokumentation.md
├── design/                # Design filer
├── src/
│   ├── pages/            # Sider (Home, Cart, Login, Admin)
│   ├── components/       # Genanvendelige komponenter
│   ├── context/          # Context providers (Cart, Auth)
│   ├── services/         # API integration
│   ├── utils/            # Hjælpefunktioner
│   └── styles/           # CSS styling
```

---

## 📝 Kernefunktionalitet

✅ **JavaScript interaktivitet** - React hooks og dynamisk UI  
✅ **Indkøbskurv** - Fuld webshop kurv funktionalitet  
✅ **CRUD operationer** - Admin kan oprette, redigere og slette produkter  
✅ **Brugerauthentificering** - Login/logout system  
✅ **Ekstern API integration** - Henter data fra DigitalOcean API  

---
## 💬 Kode Kommentarer

Alle komponenter og funktioner er grundigt kommenteret for at gøre koden let at forstå:

- **JSDoc kommentarer** på alle funktioner med parametre og return værdier
- **Inline kommentarer** der forklarer kompleks logik
- **Component beskrivelser** øverst i hver fil
- **Props dokumentation** for alle komponenter

Eksempel fra CartContext:
```javascript
/**
 * Add item to cart or increase quantity if item already exists
 * @param {Object} photo - Photo object from API
 */
const addToCart = (photo) => {
  // Handle both MongoDB (_id) and mock data (id) field names
  const photoId = photo._id || photo.id
  ...
}
```

---
## � Screenshots

### Homepage & Galleri
![Homepage med fotogalleri](docs/screenshots/01-homepage-gallery.png)
*Gallerisiden viser fotos fra DigitalOcean API med event filtering*

### Indkøbskurv
![Shopping cart](docs/screenshots/02-shopping-cart.png)
*Kurven viser valgte fotos med quantity controls og total pris*

### Login Side
![Login page](docs/screenshots/03-login-page.png)
*Login med demo credentials og "Glemt adgangskode" link*

### Admin - Photo Management
![Admin photos](docs/screenshots/04-admin-photos.png)
*Admin panel til at oprette og slette fotos*

### Admin - Event Management
![Admin events](docs/screenshots/05-admin-events.png)
*Admin panel til at administrere events*

### Glemt Adgangskode
![Forgot password](docs/screenshots/06-forgot-password.png)
*Password reset flow med email input og success besked*

---

## 🧪 Hvordan man tester

### 1. Installation
```bash
npm install
npm run dev
```

### 2. Test hovedfunktioner

**Galleri:**
- Åbn homepage
- Vælg forskellige events fra dropdown
- Klik på "Køb" knappen på et foto

**Indkøbskurv:**
- Tilføj flere fotos
- Juster quantity med +/- knapper
- Fjern items med "Fjern" knap
- Se total pris opdateres dynamisk

**Authentication:**
- Klik "Login" i navigation
- Brug credentials: `admin` / `password123`
- Test "Glemt adgangskode?" link
- Indtast en email (f.eks. admin@example.com)
- Se success besked og auto-redirect efter 5 sekunder
- Efter redirect, log ind normalt

**Admin CRUD:**
- Log ind som admin
- **Photos tab:**
  - Opret nyt foto med titel, URL og event
  - Slet et foto (bekræft dialog)
- **Events tab:**
  - Opret ny event med titel, slug, beskrivelse og datoer
  - Slet en event
  - Se events opdateres i photo dropdown

**Persistence:**
- Tilføj items til kurv
- Refresh browseren
- Verificer at kurven stadig indeholder items (localStorage)

---

## 📚 Dokumentation

Se detaljeret dokumentation i `docs/` mappen:

- [Opgavebeskrivelse](docs/opgavebeskrivelse.md) - Komplet projektbeskrivelse og krav
- [Projektplan](docs/projektplan.md) - Planlægning og tidsestimering
- [Projektplan Detaljer](docs/projektplan-detaljer.md) - Uge-for-uge proceslogbog og Kanban workflow
- [Refleksion](docs/refleksion.md) - Proces, udfordringer og læring
- [API Dokumentation](docs/api-dokumentation.md) - API endpoints og data struktur

---

## 👨‍💻 Udviklet af

Mathias Boll

**Projekt periode:** 6 uger (2026)
