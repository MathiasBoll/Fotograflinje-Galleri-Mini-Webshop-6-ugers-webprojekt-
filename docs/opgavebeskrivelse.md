# Opgavebeskrivelse – Fotograflinje Galleri & Mini-Webshop

## Projektbeskrivelse

Projektet er et **6-ugers webprojekt** udviklet til skolens fotograflinje.

Formålet er at kombinere:
- JavaScript interaktivitet
- Indkøbskurv funktionalitet
- CRUD operationer (Create, Read, Update, Delete)
- Brugerauthentificering
- Integration af ekstern API

## Løsningsbeskrivelse

Løsningen fungerer som et **galleri og en mini-webshop**, hvor billeder vises som produkter med:
- **Titel**
- **Beskrivelse**
- **Pris**

### Brugerroller

**Administratorer kan:**
- [x] Oprette nye produkter (billeder)
- [x] Slette produkter
- [x] Redigere produkter
- [x] Se alle produkter i admin panel

**Almindelige brugere kan:**
- [x] Browse billeder fra forskellige events
- [x] Filtrere billeder efter event
- [x] Se produktdetaljer (titel, beskrivelse, pris)
- [x] Lægge varer i indkøbskurv
- [x] Se indkøbskurv og total pris
- [x] Justere antal i kurven

## Tekniske krav

### Must-have funktionalitet
- [x] **JavaScript interaktivitet** - React hooks og state management
- [x] **Indkøbskurv** - Full funktionel kurv med localStorage
- [x] **CRUD operationer** - Admin kan oprette, læse, opdatere og slette produkter
- [x] **Brugerauthentificering** - Login/logout system
- [x] **Ekstern API** - Fetch API til datahåndtering

### Teknologi stack
- React 18 med Vite
- React Router v6 for navigation
- Context API til state management
- localStorage til data persistence
- Fetch API til eksterne kald
- CSS (ingen frameworks)

## Målgruppe

Kunder der ønsker at købe event-fotografier (bryllupper, fødselsdage, firmaarrangementer, portrætter).

## Success kriterier

- [x] Funktionel webshop med indkøbskurv
- [x] CRUD funktionalitet for administratorer
- [x] Brugerauthentificering implementeret
- [x] Responsivt og intuitivt brugerinterface
- [x] Veldokumenteret kode
- [ ] Projektet deployable til produktion
