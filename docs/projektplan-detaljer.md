# Detaljeret Projektplan og Proceslogbog

## Projektovervågning

**Planlagt varighed:** 6 uger  
**Arbejdsmetode:** Agil/Kanban  
**Værktøj:** Trello (eller lignende task board)  
**Status opdateringer:** Dagligt

---

## Uge 1: Projektopstart og Planlægning

### Mål
- Projektopsætning
- Grundlæggende struktur
- Design og arkitektur

### Opgaver udført
- [x] Oprettet React + Vite projekt
- [x] Struktureret mappestruktur (pages, components, services, utils)
- [x] Skrevet projektbeskrivelse og kravspecifikation
- [x] Udarbejdet wireframes/design skitser
- [x] Opsat Git repository
- [x] Planlagt komponentarkitektur
- [x] Valgt teknologier (React Router, Context API)

### Daglig log
**Dag 1 (Mandag):**
- Oprettede projekt med Vite
- Dokumenterede opgavebeskrivelse
- Skitserede grundlæggende UI design

**Dag 2 (Tirsdag):**
- Oprettede mappestruktur
- Installerede dependencies (react-router-dom)
- Skrev README.md med projektbeskrivelse

**Dag 3 (Onsdag):**
- Designede komponenthierarki
- Planlagde data flow
- Dokumenterede API struktur

**Dag 4 (Torsdag):**
- Oprettede grundlæggende komponenter (Navbar, Footer)
- Implementerede routing struktur
- Opsat global CSS variabler

**Dag 5 (Fredag):**
- Review og justering af projektplan
- Forberedt sprint for uge 2

### Udfordringer
- Valg mellem forskellige state management løsninger
- Beslutning om component structure

### Løsninger
- Valgte Context API for simplicity
- Dokumenterede beslutninger i kodekommentarer

---

## Uge 2: API Integration og Galleri

### Mål
- Implementere API integration
- Bygge photo gallery komponenter
- Håndtere asynkron data

### Opgaver udført
- [x] Oprettet API service layer (apiService.js)
- [x] Implementeret fetchPhotos() og fetchEvents()
- [x] Bygget PhotoGrid komponent
- [x] Bygget PhotoCard komponent
- [x] Implementeret EventSelector dropdown
- [x] Tilføjet loading states
- [x] Tilføjet error handling

### Daglig log
**Dag 6 (Mandag):**
- Analyserede DigitalOcean API struktur
- Oprettede mock data til udvikling
- Skrev API service functions

**Dag 7 (Tirsdag):**
- Implementerede PhotoGrid og PhotoCard
- Testede med mock data
- Tilføjede CSS styling for gallery

**Dag 8 (Onsdag):**
- Integrerede rigtig API
- Opdagede forskelle i data struktur (_id vs id)
- Løste compatibility problemer

**Dag 9 (Torsdag):**
- Tilføjede EventSelector dropdown
- Implementerede event filtering
- Testede edge cases

**Dag 10 (Fredag):**
- Bug fixing (photos.map is not a function)
- Performance optimering
- Dokumenterede API i api-dokumentation.md

### Udfordringer
- API returnerede data med MongoDB _id struktur
- Forskellige felter end forventet (thumbUrl vs thumbnail)
- Håndtering af null/undefined data

### Løsninger
- Tilføjede fallback værdier: `photo._id || photo.id`
- Implementerede null checks i komponenter
- Loggede API responses for debugging

---

## Uge 3: Indkøbskurv (JavaScript Interaktivitet)

### Mål
- Implementere komplet shopping cart funktionalitet
- LocalStorage persistence
- Dynamisk prisberegning

### Opgaver udført
- [x] Oprettet CartContext med Context API
- [x] Implementeret addToCart, removeFromCart, updateQuantity
- [x] Bygget Cart page med item liste
- [x] Bygget CartItem komponent
- [x] Implementeret localStorage sync
- [x] Tilføjet quantity controls (+/-)
- [x] Implementeret totalPrice beregning
- [x] Tilføjet cart badge i navbar

### Daglig log
**Dag 11 (Mandag):**
- Designede cart state struktur
- Oprettede CartContext
- Implementerede basic add/remove

**Dag 12 (Tirsdag):**
- Byggede Cart page UI
- Implementerede CartItem komponent
- Tilføjede quantity controls

**Dag 13 (Onsdag):**
- Integrerede localStorage
- Testede data persistence
- Opdagede NaN problem med priser

**Dag 14 (Torsdag):**
- Løste NaN problem (manglende price field fra API)
- Tilføjede default pris (299 kr)
- Implementerede Number() konvertering

**Dag 15 (Fredag):**
- Tilføjede cart badge i navbar
- CSS styling af cart page
- Testede edge cases (tom kurv, fjern sidste item)

### Udfordringer
- NaN priser når API ikke inkluderede price field
- Cart items forsvandt efter page reload
- Quantity update re-rendered hele cart

### Løsninger
- Tilføjede default pris i addToCart: `price: photo.price || 299`
- Implementerede localStorage i useEffect
- Optimerede med proper state updates

---

## Uge 4: Bruger Authentificering og Admin

### Mål
- Implementere login system
- Bygge protected routes
- Oprette admin panel

### Opgaver udført
- [x] Oprettet AuthContext
- [x] Bygget Login page
- [x] Implementeret authService med mock login
- [x] Oprettet ProtectedRoute komponent
- [x] Bygget Admin page struktur
- [x] Tilføjet tab navigation (Photos, Events, Orders)
- [x] Implementeret "Glemt adgangskode" flow
- [x] Tilføjet user menu i navbar

### Daglig log
**Dag 16 (Mandag):**
- Designede auth state struktur
- Oprettede AuthContext og Login page
- Implementerede mock login (admin/password123)

**Dag 17 (Tirsdag):**
- Byggede ProtectedRoute wrapper
- Testede route protection
- Tilføjede redirect efter login

**Dag 18 (Onsdag):**
- Oprettede Admin page med tabs
- Implementerede basic layout
- Tilføjede user menu i navbar

**Dag 19 (Torsdag):**
- Implementerede "Glemt adgangskode" page
- Tilføjede email input form
- Oprettede success message flow

**Dag 20 (Fredag):**
- CSS styling af auth pages
- Testede auth flow
- Dokumenterede login credentials

### Udfordringer
- Beskyttelse af admin routes
- Session persistence
- Mock authentication uden backend

### Løsninger
- Brugte ProtectedRoute wrapper komponent
- Gemte user data i localStorage
- Dokumenterede at det er mock implementation

---

## Uge 5: CRUD Funktionalitet

### Mål
- Implementere Create og Delete for photos
- Implementere Create og Delete for events
- Bygge admin formularer

### Opgaver udført
- [x] Bygget create photo form
- [x] Implementeret handleCreatePhoto()
- [x] Implementeret handleDeletePhoto() med confirmation
- [x] Bygget photo table med action buttons
- [x] Bygget create event form
- [x] Implementeret handleCreateEvent()
- [x] Implementeret handleDeleteEvent()
- [x] Bygget event table
- [x] Tilføjet event dropdown i photo form

### Daglig log
**Dag 21 (Mandag):**
- Designede CRUD form layout
- Oprettede controlled form inputs
- Implementerede photo creation

**Dag 22 (Tirsdag):**
- Tilføjede delete funktionalitet
- Implementerede confirmation dialog
- Opdaterede state efter CRUD operationer

**Dag 23 (Onsdag):**
- Byggede event management tab
- Implementerede event CRUD
- Tilføjede auto-slug generation

**Dag 24 (Torsdag):**
- Opdagede problem: events ikke synlige i dropdown
- Løste ved at bruge event._id og event.title
- Testede event creation og deletion

**Dag 25 (Fredag):**
- CSS styling af admin forms og tables
- Responsivt design til admin panel
- Testede alle CRUD operationer

### Udfordringer
- Event dropdown viste ingenting
- Admin tabel viste forkerte felter
- Local vs API data structure konflikt

### Løsninger
- Opdaterede event mapping: `event._id` og `event.title`
- Tilføjede fallback rendering: `photo.originalFilename || photo.title`
- Tilføjede local- prefix til lokalt oprettede items

---

## Uge 6: Finpudsning og Dokumentation

### Mål
- Bug fixing
- Performance optimering
- Komplet dokumentation
- Screenshots
- Præsentation forberedelse

### Opgaver udført
- [x] Gennemgik alle features og testede
- [x] Rettede key prop warnings
- [x] Opdaterede refleksion.md med konkrete eksempler
- [x] Tog screenshots af alle features
- [x] Skrev detaljeret API dokumentation
- [x] Opdaterede README med komplet info
- [x] Tilføjede inline kodekommentarer
- [x] Testede responsive design
- [x] Verificerede at alle krav var opfyldt

### Daglig log
**Dag 26 (Mandag):**
- Systematisk gennemgang af alle features
- Oprettede test checklist
- Bug fixing session

**Dag 27 (Tirsdag):**
- Tog screenshots af alle sider
- Organiserede i screenshots mappe
- Dokumenterede funktionalitet

**Dag 28 (Onsdag):**
- Skrev detaljeret refleksion med konkrete eksempler
- Dokumenterede alle udfordringer og løsninger
- Opdaterede projektplan

**Dag 29 (Torsdag):**
- Finale CSS justeringer
- Performance check
- Cross-browser testing

**Dag 30 (Fredag):**
- Forberedte demo præsentation
- Final review af dokumentation
- Aflevering

### Udfordringer
- Strukturering af dokumentation
- Huske alle detaljer fra proces
- Prioritering af sidste fejl

### Løsninger
- Brugte git history til at huske timing
- Dokumenterede undervejs næste gang
- Fokuserede på kritiske fejl først

---

## Kanban Board Struktur

### Kolonner
1. **Backlog** - Alle planlagte opgaver
2. **To Do** - Opgaver for nuværende uge
3. **In Progress** - Aktivt arbejde (max 3 ad gangen)
4. **Review** - Klar til test/review
5. **Done** - Færdige opgaver

### Labels/Tags brugt
- 🔴 Kritisk (blocking issues)
- 🟡 Vigtigt (høj prioritet)
- 🟢 Nice-to-have (lav prioritet)
- 🔵 Bug (fejl der skal fixes)
- 🟣 Feature (ny funktionalitet)
- ⚪ Dokumentation

### Sprint struktur
- Sprint længde: 1 uge
- Sprint planning: Mandag morgen
- Daily standup: Hver dag (selv-check)
- Sprint review: Fredag eftermiddag

---

## Metrik og Statistik

### Tidsfordeling (estimat)
- API Integration: 8 timer
- Shopping Cart: 10 timer
- Authentication: 6 timer
- CRUD Admin: 12 timer
- Styling/CSS: 15 timer
- Bug fixing: 10 timer
- Dokumentation: 8 timer
- Testing: 5 timer

**Total:** ~74 timer over 6 uger

### Komponenter oprettet
- 10 React komponenter
- 5 pages
- 3 services
- 2 contexts
- 1 utility function

### Dokumentation
- 5 markdown filer
- 100+ inline kommentarer
- API dokumentation
- README med setup instruktioner

---

## Læring og Takeaways

### Hvad fungerede godt
- Struktureret tilgang med ugentlige mål
- Iterativ udvikling (build, test, refactor)
- Løbende dokumentation
- Git version control

### Hvad kunne forbedres
- Bedre tidsestimering i starten
- Mere systematisk testing undervejs
- Tidligere fokus på edge cases
- Bedre kode reviews

### Vigtigste læringer
1. **API integration er komplekst** - Brug tid på at forstå data struktur
2. **State management kræver planlægning** - Design før implementation
3. **Edge cases er vigtige** - Test med null/undefined/empty data
4. **Dokumentation sparer tid** - God dokumentation hjælper ved bug fixing
5. **Iterativ udvikling virker** - Build i små steps og test løbende

---

## Fremtidige forbedringer

Hvis projektet skulle fortsætte:
- [ ] Implementere rigtig backend API
- [ ] Tilføje unit tests (Jest)
- [ ] Implementere TypeScript for type safety
- [ ] Tilføje image upload funktionalitet
- [ ] Implementere payment gateway
- [ ] Tilføje user reviews/ratings
- [ ] Implementere search funktionalitet
- [ ] Tilføje email notifications
- [ ] Performance optimering (lazy loading, image optimization)
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
