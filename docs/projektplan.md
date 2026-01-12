# Projektplan (6 uger)

## Overordnet tidsplan

### Uge 1: Setup, projektstruktur, Figma design, Trello plan
- [x] Projektopstart og kravspecifikation
- [x] React + Vite projekt setup
- [x] Git repository oprettelse
- [ ] Wireframes og mockups i Figma
- [ ] Trello board til opgavestyring
- [ ] Grundlæggende mappestruktur
- [ ] Initial CSS styling system

**Leverancer:** Figma design, Trello board, projektstruktur

---

### Uge 2: API-integration og galleri
- [ ] Fetch API implementation
- [ ] Mock data struktur
- [ ] Fotogalleri visning (PhotoGrid, PhotoCard)
- [ ] Event filtrering (EventSelector)
- [ ] Responsivt grid layout
- [ ] Produktvisning (titel, beskrivelse, pris)
- [ ] Routing mellem sider

**Leverancer:** Fungerende galleri med API integration

---

### Uge 3: Indkøbskurv (add/remove/total)
- [ ] CartContext implementation
- [ ] Add to cart funktionalitet
- [ ] Remove from cart
- [ ] Update quantity
- [ ] Beregn total pris
- [ ] localStorage persistence
- [ ] Cart badge i navigation
- [ ] Cart side med oversigt

**Leverancer:** Fuld funktionel indkøbskurv

---

### Uge 4: Login og admin CRUD
- [ ] AuthContext implementation
- [ ] Login/logout funktionalitet
- [ ] Protected routes (ProtectedRoute)
- [ ] Admin panel opbygning
- [ ] **Create** - Opret nye produkter
- [ ] **Read** - Vis produktliste i admin
- [ ] **Update** - Rediger eksisterende produkter
- [ ] **Delete** - Slet produkter
- [ ] Brugerroller (admin vs. user)

**Leverancer:** Authentication system og CRUD funktionalitet

---

### Uge 5: Produktdata og UI polish
- [ ] Flere mock produkter/events
- [ ] Forbedret produktvisning med beskrivelser
- [ ] UI/UX forbedringer
- [ ] Responsive design for mobil
- [ ] Accessibility (a11y) check
- [ ] Performance optimering
- [ ] CSS polish og animationer
- [ ] Error handling

**Leverancer:** Poleret brugeroplevelse

---

### Uge 6: Test, dokumentation, refleksion og demo
- [ ] Funktionstesting (alle features)
- [ ] Cross-browser testing
- [ ] Brugertest med feedback
- [ ] Færdiggør README.md
- [ ] API dokumentation
- [ ] Skriv refleksion (refleksion.md)
- [ ] Screenshots til dokumentation
- [ ] Demo præsentation forberedelse
- [ ] Deployment (fx Netlify/Vercel)
- [ ] Final bug fixes

**Leverancer:** Færdigt projekt klar til aflevering og demo

---

## Ressourcer

- **Frontend**: React 18, Vite, React Router
- **Design**: Figma
- **Projektledelse**: Trello
- **Version control**: Git/GitHub
- **Dokumentation**: Markdown
- **Deployment**: Netlify/Vercel

## Risikostyring

### Identificerede risici
1. **Tidsstyring**: Risiko for at komme bagud med tidplanen
   - *Løsning*: Ugentlige sprint reviews hver fredag
   
2. **Tekniske udfordringer**: Nye koncepter kan tage længere tid
   - *Løsning*: Code reviews, peer support, online dokumentation

3. **Scope creep**: For mange ekstra features
   - *Løsning*: Streng prioritering af must-have features først

4. **Integration problemer**: API/CRUD integration
   - *Løsning*: Start med mock data, gradvis integration

## Success kriterier

- ✅ Alle 5 kernekrav implementeret (JS, kurv, CRUD, auth, API)
- ✅ Fungerende demo klar til præsentation
- ✅ Komplet dokumentation
- ✅ Kode deployed og tilgængelig online
- ✅ Refleksion skrevet
