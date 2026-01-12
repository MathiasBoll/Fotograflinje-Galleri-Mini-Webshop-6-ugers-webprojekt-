# Refleksion

## Projektarbejde

I dette projekt har jeg arbejdet **selvstændigt** med planlægning, udvikling og dokumentation. 

Projektet har givet mig praktisk erfaring med at:
- Strukturere et større webprojekt fra bund
- Arbejde med eksterne API'er
- Implementere state management i React (Context API)
- Planlægge og følge en 6-ugers tidsplan
- Dokumentere kode og processer løbende

## Læring og udvikling

### Nye koncepter jeg har lært

**React state management:**
- Context API til global state (CartContext, AuthContext)
- useState og useEffect hooks
- Props og component composition

**API integration:**
- Fetch API til datahåndtering
- Asynkron programmering med async/await
- Mock data struktur til udvikling

**Projektstruktur:**
- Organisering af komponenter, pages, services og utils
- Separation of concerns
- Genanvendelige komponenter

**localStorage:**
- Persistering af indkøbskurv data
- Session management

## Udfordringer og løsninger

### De største udfordringer

**1. API-integration med MongoDB struktur**
- **Udfordring**: API'et returnerede data med `_id` (MongoDB ObjectId) i stedet for `id`, og med forskellige felter end forventet
  - Fotos brugte `thumbUrl` og `originalFilename` i stedet for `thumbnail` og `title`
  - Events brugte `title` i stedet for `name`
  - Måtte håndtere både API data og lokalt oprettede items
- **Løsning**: 
  - Opdaterede alle komponenter til at håndtere begge felter: `photo._id || photo.id`
  - Tilføjede default værdier hvor data manglede: `photo.price || 299`
  - Logget API responses til konsollen for at forstå strukturen

**2. NaN priser i indkøbskurv**
- **Udfordring**: Når billeder blev tilføjet til kurven, viste prisen "NaN kr." fordi API'et ikke inkluderede et `price` felt
- **Løsning**: 
  - Tilføjede default pris (299 DKK) når items tilføjes til kurv
  - Implementerede Number() konvertering i getTotalPrice() for at undgå NaN
  - Sikrede at alle pris-beregninger havde fallback værdier

**3. Photos.map is not a function fejl**
- **Udfordring**: PhotoGrid crashed med "photos.map is not a function" fordi `photos` var undefined under initial render
- **Løsning**: 
  - Tilføjede null checks: `if (!photos || !Array.isArray(photos))`
  - Sikrede at components venter på data før rendering
  - Brugte optional chaining: `cart?.reduce()`

**4. Wrapped API response struktur**
- **Udfordring**: API returnerede `{status: 'ok', data: [...]}` i stedet for bare array
- **Løsning**: 
  - Opdaterede apiService.js til at ekstrahere data: `return response.data || response`
  - Tilføjede console logging for at debugge response struktur
  - Dokumenterede API struktur i api-dokumentation.md

**5. Event dropdown viste ingenting**
- **Udfordring**: Admin form viste ikke events i dropdown selvom der var 4 events loadet
- **Løsning**: 
  - Opdaterede event mapping til at bruge `event._id` og `event.title`
  - Tilføjede console.log for at verificere events var loaded
  - Implementerede event creation functionality

### Strategier der fungerede

- **Opdeling i mindre dele**: Store problemer blev lettere at løse når de blev delt op
- **Iterativ udvikling**: Byggede features gradvist og testede løbende
- **Dokumentation**: Kommentarer i koden hjalp med at holde overblik
- **Console logging**: Debuggede med console.log for at forstå data flow

## Proces

### Hvad gik godt?

- Planlagt projektstruktur fra starten gav god organisation
- React Component-baseret arkitektur gjorde koden genanvendelig
- Context API fungerede godt til state management
- localStorage integration var nemmere end forventet
- Git version control holdt styr på ændringer

### Hvad var udfordrende?

- Tidsstyring: Nogle features tog længere tid end estimeret
- API-integration med mock data vs. real API forskelle
- CSS responsive design til alle skærmstørrelser
- Admin CRUD UI/UX design

### Hvad ville jeg gøre anderledes?

- Starte med bedre tidsestimater for komplekse features
- Implementere TypeScript for bedre type safety
- Tilføje unit tests fra starten
- Bruge CSS framework (som Tailwind) for hurtigere styling
- Implementere rigtig backend API i stedet for mock data

## Personlig udvikling

### Mine styrker i dette projekt

- Selvstændig problemløsning
- Struktureret tilgang til udvikling
- God dokumentation
- Vedholdenhed ved udfordringer

### Områder for forbedring

- Tidsstyring og estimation
- Testing practices
- Performance optimering
- Accessibility (a11y) considerations
- Git commit hygiene (flere små commits)

## Fremtidige forbedringer

### Features jeg ville tilføje med mere tid

- Søgefunktionalitet på tværs af billeder
- Favorit/wishlist funktionalitet
- Filtrering efter pris, dato, kategori
- Billede preview/lightbox
- Brugerregistrering og profiler
- Ordre historik
- Email notifikationer ved køb
- Payment gateway integration

### Tekniske optimeringer

- Lazy loading af billeder
- Image optimization
- Caching strategier
- Performance monitoring
- Error tracking (fx Sentry)
- SEO optimering
- Progressive Web App (PWA) features

## Konklusion

Dette projekt har været en værdifuld læringsoplevelse, hvor jeg har arbejdet selvstændigt med alle aspekter af webudvikling - fra planlægning til deployment. 

De største takeaways er vigtigheden af god projektstruktur, at dele komplekse problemer op i mindre dele, og værdien af løbende dokumentation.

Jeg føler mig nu mere sikker på at arbejde med React, API integration, og større projekter generelt.
