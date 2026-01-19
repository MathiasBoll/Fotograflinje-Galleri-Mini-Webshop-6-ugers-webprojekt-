import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Hvad er kvaliteten af jeres fotoprints?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alle vores fotoprints fremstilles på museumskvalitetspapir med en levetid på 100+ år. Vi anvender professionelt printudstyr og farvekalibrering for at sikre, at farverne i dit print matcher fotografens originale vision. Hvert print er håndplukket og kvalitetstjekket inden levering."
        }
      },
      {
        "@type": "Question",
        "name": "Kan jeg få printet signeret af fotografen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, alle vores prints kan leveres med fotografens personlige signatur. Dette er inkluderet i prisen og gør dit print til et unikt kunstværk. Signaturen påføres med arkiveret blæk i hjørnet af printet."
        }
      },
      {
        "@type": "Question",
        "name": "Hvilke størrelser tilbyder I?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vi tilbyder tre standardstørrelser: Digital download (højopløselig fil), A4 (21 × 29,7 cm) perfekt til mindre rammer, og A2 (42 × 59,4 cm) ideelt til statement pieces. Alle prints leveres på 310g/m² museumskvalitetspapir med mat finish."
        }
      },
      {
        "@type": "Question",
        "name": "Hvor lang er leveringstiden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fysiske prints produceres og sendes inden for 5-7 hverdage. Vi pakker omhyggeligt i beskyttende emballage for at sikre, at dit print ankommer i perfekt stand. Digitale downloads er tilgængelige øjeblikkeligt efter køb."
        }
      },
      {
        "@type": "Question",
        "name": "Støtter jeg fotografstuderendes udvikling ved at købe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolut! Alle indtægter går direkte til at støtte vores fotografstuderende på Media College Denmark. Dit køb hjælper dem med at udvikle deres færdigheder, købe udstyr og deltage i konkurrencer og udstillinger."
        }
      },
      {
        "@type": "Question",
        "name": "Får jeg ophavsret til billedet, når jeg køber et print?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nej, ophavsretten forbliver hos fotografen. Du får ret til at hænge og nyde printet privat, men ikke til kommerciel brug eller reproduktion. For kommercielle licenser, kontakt os venligst direkte."
        }
      },
      {
        "@type": "Question",
        "name": "Kan jeg returnere eller bytte et print?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da vores prints er produceret on-demand specifikt til dig, kan de ikke returneres med mindre der er produktionsfejl eller skader under transport. Vi tilbyder fuld refusion ved dokumenterede fejl eller skader."
        }
      },
      {
        "@type": "Question",
        "name": "Sender I også til erhvervskunder og gallerier?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, vi samarbejder gerne med erhvervskunder, gallerier og interiørdesignere. Vi kan tilbyde specialstørrelser og bulkordrer. Kontakt os på info@mediacollege.dk for at høre mere om vores erhvervsmuligheder."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fotoprints fra Fotografuddannelsen – Media College Denmark",
    "description": "Køb kunstneriske fotoprints fra talentfulde fotografstuderende i Viborg. Museumskvalitet, signerede prints, og støt næste generation af fotografer.",
    "url": "https://photography.mediacollege.dk/fotograf-print-viborg",
    "inLanguage": "da-DK",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Media College Denmark",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Viborg",
        "addressCountry": "DK"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Fotoprints Viborg – Køb Kunst fra Fotografstuderende | Media College Denmark</title>
        <meta name="description" content="Køb unikke kunstfotoprints fra talentfulde fotografstuderende i Viborg. Museumskvalitetspapir, signerede prints. Støt fremtidens fotografer hos Media College Denmark." />
        <link rel="canonical" href="https://photography.mediacollege.dk/fotograf-print-viborg" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fotoprints Viborg – Køb Kunst fra Fotografstuderende" />
        <meta property="og:description" content="Køb unikke kunstfotoprints fra talentfulde fotografstuderende i Viborg. Museumskvalitet, signerede prints. Støt fremtidens fotografer." />
        <meta property="og:url" content="https://photography.mediacollege.dk/fotograf-print-viborg" />
        <meta property="og:site_name" content="Media College Denmark – Fotografuddannelsen" />
        <meta property="og:locale" content="da_DK" />
        <meta property="og:image" content="https://mediacollege.dk/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fotoprints Viborg – Køb Kunst fra Fotografstuderende" />
        <meta name="twitter:description" content="Køb unikke kunstfotoprints fra talentfulde fotografstuderende i Viborg. Museumskvalitet, signerede prints." />
        <meta name="twitter:image" content="https://mediacollege.dk/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="keywords" content="fotoprints viborg, kunstfotografi, fotografstuderende, media college denmark, signerede prints, museumskvalitet, fotogalleri viborg" />
        <meta name="author" content="Media College Denmark" />
        <meta name="geo.region" content="DK-82" />
        <meta name="geo.placename" content="Viborg" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="landing-page">
        <header className="landing-hero">
          <div className="container">
            <nav className="landing-breadcrumbs" aria-label="Brødkrummesti">
              <Link to="/">Forside</Link>
              <span className="breadcrumb-separator">/</span>
              <span>Fotoprints Viborg</span>
            </nav>
            
            <h1 className="landing-title">
              Fotoprints fra Fotografuddannelsen – Media College Denmark
            </h1>
            <p className="landing-lead">
              Oplev kunstnerisk fotografi i verdensklasse fra Danmarks mest talentfulde fotografstuderende i Viborg. 
              Hver print er et originalt kunstværk produceret på museumskvalitetspapir med en levetid på 100+ år.
            </p>
            <div className="landing-cta">
              <Link to="/" className="btn btn-primary btn-large">
                Se galleriet
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <a href="#hvorfor-kobe" className="btn btn-outlined btn-large">
                Læs mere
              </a>
            </div>
          </div>
        </header>

        <main className="landing-content">
          <article className="container">
            <section className="landing-section">
              <h2 id="hvorfor-kobe">Hvorfor købe fotoprints hos Media College Denmark?</h2>
              <p>
                På Media College Denmark uddanner vi Danmarks næste generation af professionelle fotografer. Vores studerende 
                arbejder med alt fra portrætter og landskaber til koncept-kunst og dokumentarfotografi. Når du køber et print 
                fra vores galleri, får du ikke bare et smukt kunstværk – du investerer i fremtidens kreative talenter og støtter 
                deres udvikling gennem uddannelsesforløbet.
              </p>
              <p>
                Viborg har en rig tradition for kunst og kultur, og vores fotografuddannelse er en integreret del af dette 
                kreative miljø. Vores studerende deltager aktivt i lokale udstillinger, kulturarrangementer og samarbejder 
                med virksomheder i hele Midtjylland. Deres arbejde spejler både lokale motiver og internationale trends inden 
                for moderne fotografi.
              </p>
            </section>

            <section className="landing-section">
              <h2>Museumskvalitet der holder i generationer</h2>
              <p>
                Vi går aldrig på kompromis med kvalitet. Alle vores fotoprints produceres på 310 g/m² arkiveret 
                museumskvalitetspapir med neutral pH-værdi. Dette sikrer, at farverne forbliver levende og papireret ikke 
                gulner selv efter mange årtier. Vi anvender pigmentbaseret blæk fra førende producenter som Epson og Canon, 
                hvilket garanterer en farveholdbarhed på minimum 100 år under normale displayforhold.
              </p>
              
              <h3>Professionel produktion og kvalitetskontrol</h3>
              <p>
                Hvert print går gennem en grundig kvalitetskontrolproces. Vi kalibrerer vores printere ugentligt for at sikre 
                nøjagtig farvegengivelse, og hver print inspiceres manuelt inden forsendelse. Vores studerende er involveret i 
                hele produktionsprocessen og lærer om farvestyring, papirvalg og print-finishing – færdigheder der er 
                essentielle i professionel fotografi.
              </p>
            </section>

            <section className="landing-section">
              <h2>Størrelser og priser der passer til dit behov</h2>
              <p>
                Vi tilbyder tre flexible muligheder for at gøre kunstfotografi tilgængeligt for alle:
              </p>
              
              <div className="landing-features">
                <div className="feature-card">
                  <h3>Digital Download</h3>
                  <p className="feature-price">Fra 299 kr.</p>
                  <p>
                    Perfekt til digitale projekter eller hvis du vil printe selv. Du modtager en højopløselig fil (minimum 
                    300 DPI) i både JPEG og TIFF format, klar til professionelt print. Ideel til screensavers, præsentationer 
                    eller social media.
                  </p>
                </div>
                
                <div className="feature-card">
                  <h3>A4 Print (21 × 29,7 cm)</h3>
                  <p className="feature-price">Fra 449 kr.</p>
                  <p>
                    Vores mest populære størrelse, perfekt til mindre rammer og hjemmegalleri-vægge. A4 er ideel til 
                    portrætter og detaljerige motiver hvor du vil have nærbilledet fokus. Leveres pakket i beskyttende 
                    emballage med støvark.
                  </p>
                </div>
                
                <div className="feature-card">
                  <h3>A2 Print (42 × 59,4 cm)</h3>
                  <p className="feature-price">Fra 799 kr.</p>
                  <p>
                    Imponerende statement piece til stuen eller kontoret. A2-formatet viser alle detaljer i motivet og skaber 
                    maksimal impact på væggen. Populært blandt erhvervskunder og interiørdesignere. Rulles omhyggeligt i 
                    kraftig tube.
                  </p>
                </div>
              </div>
            </section>

            <section className="landing-section">
              <h2>Signerede originaler fra talentfulde kunstnere</h2>
              <p>
                Hvert fysisk print signeres personligt af den studerende fotograf med arkiveret blæk. Dette gør dit print til 
                et autentisk kunstværk med sporbar proveniens. Mange af vores studerende fortsætter senere som professionelle 
                fotografer, kunstnere eller fotojournalister – dit signerede print kan blive en værdifuld del af dit private 
                kunstsamling.
              </p>
              <p>
                Vores nuværende og tidligere studerende har vundet priser i konkurrencer som Danish Photo Awards, udstillet på 
                gallerier i København og Aarhus, og arbejdet for kunder som DR, Politiken og internationale magasiner. Ved at 
                købe nu støtter du deres rejse og får måske fingrene i arbejde fra morgendagens stjernefotografer.
              </p>
            </section>

            <section className="landing-section">
              <h2>Simpel bestilling og hurtig levering</h2>
              <p>
                At bestille er nemt: Gennemse vores <Link to="/">galleri med over 100 billeder</Link>, vælg dit yndlingsmotiv, 
                vælg størrelse og læg i kurven. Vi accepterer betaling via Dankort, MobilePay og kreditkort. Efter bestilling 
                produceres dit print inden for 5-7 hverdage og sendes med sporbar forsendelse via PostNord eller GLS.
              </p>
              <p>
                Digitale downloads er tilgængelige øjeblikkeligt efter betalingsbekræftelse. Du modtager en sikker 
                downloadlink via email med ubegrænset adgang til at downloade dine filer. Vi gemmer dine køb i dit kundepanel, 
                så du altid kan hente dine filer igen.
              </p>
            </section>

            <section className="landing-section">
              <h2>Bæredygtighed og miljøansvar</h2>
              <p>
                Som uddannelsesinstitution tager vi vores miljøansvar seriøst. Vores papir kommer fra FSC-certificerede skove, 
                og vi anvender miljøvenligt pigmentblæk uden skadelige kemikalier. Emballage produceres af genbrugspapir og 
                kan komposteres eller genbruges. Ved at vælge digital download reducerer du yderligere dit CO2-fodaftryk.
              </p>
              <p>
                Vi opfordrer til lokal afhentning på vores campus i Viborg, hvor du også får mulighed for at møde de studerende 
                og se deres arbejdsproces i vores studios og mørkerum. Kontakt os på info@mediacollege.dk for at arrangere en 
                afhentning eller besøg.
              </p>
            </section>

            <section className="landing-faq" id="faq">
              <h2>Ofte stillede spørgsmål om vores fotoprints</h2>
              
              <div className="faq-list">
                <article className="faq-item">
                  <h3>Hvad er kvaliteten af jeres fotoprints?</h3>
                  <p>
                    Alle vores fotoprints fremstilles på museumskvalitetspapir med en levetid på 100+ år. Vi anvender 
                    professionelt printudstyr og farvekalibrering for at sikre, at farverne i dit print matcher fotografens 
                    originale vision. Hvert print er håndplukket og kvalitetstjekket inden levering.
                  </p>
                </article>

                <article className="faq-item">
                  <h3>Kan jeg få printet signeret af fotografen?</h3>
                  <p>
                    Ja, alle vores prints kan leveres med fotografens personlige signatur. Dette er inkluderet i prisen og 
                    gør dit print til et unikt kunstværk. Signaturen påføres med arkiveret blæk i hjørnet af printet.
                  </p>
                </article>

                <article className="faq-item">
                  <h3>Hvilke størrelser tilbyder I?</h3>
                  <p>
                    Vi tilbyder tre standardstørrelser: Digital download (højopløselig fil), A4 (21 × 29,7 cm) perfekt til 
                    mindre rammer, og A2 (42 × 59,4 cm) ideelt til statement pieces. Alle prints leveres på 310g/m² 
                    museumskvalitetspapir med mat finish.
                  </p>
                </article>

                <article className="faq-item">
                  <h3>Hvor lang er leveringstiden?</h3>
                  <p>
                    Fysiske prints produceres og sendes inden for 5-7 hverdage. Vi pakker omhyggeligt i beskyttende emballage 
                    for at sikre, at dit print ankommer i perfekt stand. Digitale downloads er tilgængelige øjeblikkeligt 
                    efter køb.
                  </p>
                </article>

                <article className="faq-item">
                  <h3>Støtter jeg fotografstuderendes udvikling ved at købe?</h3>
                  <p>
                    Absolut! Alle indtægter går direkte til at støtte vores fotografstuderende på Media College Denmark. Dit 
                    køb hjælper dem med at udvikle deres færdigheder, købe udstyr og deltage i konkurrencer og udstillinger.
                  </p>
                </article>

                <article className="faq-item">
                  <h3>Får jeg ophavsret til billedet, når jeg køber et print?</h3>
                  <p>
                    Nej, ophavsretten forbliver hos fotografen. Du får ret til at hænge og nyde printet privat, men ikke til 
                    kommerciel brug eller reproduktion. For kommercielle licenser, kontakt os venligst direkte.
                  </p>
                </article>

                <article className="faq-item">
                  <h3>Kan jeg returnere eller bytte et print?</h3>
                  <p>
                    Da vores prints er produceret on-demand specifikt til dig, kan de ikke returneres med mindre der er 
                    produktionsfejl eller skader under transport. Vi tilbyder fuld refusion ved dokumenterede fejl eller skader.
                  </p>
                </article>

                <article className="faq-item">
                  <h3>Sender I også til erhvervskunder og gallerier?</h3>
                  <p>
                    Ja, vi samarbejder gerne med erhvervskunder, gallerier og interiørdesignere. Vi kan tilbyde 
                    specialstørrelser og bulkordrer. Kontakt os på info@mediacollege.dk for at høre mere om vores 
                    erhvervsmuligheder.
                  </p>
                </article>
              </div>
            </section>

            {/* Social Media Feed Section */}
            <section className="landing-section">
              <h2>Følg os på sociale medier</h2>
              <p>Hold dig opdateret med de nyeste billeder, studentprojekter og events fra Media College Denmark.</p>
              
              <div className="social-feed-grid">
                {/* Facebook Feed */}
                <div className="social-feed-card">
                  <h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle', marginRight: '8px'}}>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </h3>
                  <div className="fb-page" 
                       data-href="https://www.facebook.com/media.college.denmark" 
                       data-tabs="timeline" 
                       data-width="500" 
                       data-height="500"
                       data-small-header="false" 
                       data-adapt-container-width="true" 
                       data-hide-cover="false" 
                       data-show-facepile="true">
                    <blockquote cite="https://www.facebook.com/media.college.denmark" className="fb-xfbml-parse-ignore">
                      <a href="https://www.facebook.com/media.college.denmark">Media College Denmark</a>
                    </blockquote>
                  </div>
                </div>

                {/* Instagram Feed */}
                <div className="social-feed-card">
                  <h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle', marginRight: '8px'}}>
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                    Instagram
                  </h3>
                  <div style={{display: 'flex', justifyContent: 'center', padding: '20px 0'}}>
                    <iframe 
                      src="https://www.instagram.com/mediacollegedk/embed" 
                      width="400" 
                      height="480" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowTransparency="true"
                      style={{border: 'none', overflow: 'hidden', maxWidth: '100%'}}
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>

            <section className="landing-section landing-cta-section">
              <h2>Klar til at finde dit næste kunstværk?</h2>
              <p>
                Udforsk vores kurerede samling af over 100 billeder fra talentfulde fotografstuderende. Nye motiver tilføjes 
                løbende baseret på de studerendes aktuelle projekter og udstillinger. Fra atmosfæriske landskaber til 
                følelsesladede portrætter – find det perfekte print til dit hjem eller kontor.
              </p>
              <div className="landing-cta">
                <Link to="/" className="btn btn-primary btn-large">
                  Udforsk galleriet nu
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}

export default LandingPage;
