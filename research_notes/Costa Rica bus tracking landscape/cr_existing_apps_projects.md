# Existing apps, websites, startups and academic projects for bus route info / live bus tracking in Costa Rica (GAM focus)

> Method note (read first): research date 2026-10-10. The sandbox egress proxy blocked direct page fetches for essentially every host tried (observador.cr, ruticas.com, puraruta.app, wiki.openstreetmap.org, elfinancierocr.com, delfino.cr; aresep.go.cr and trufi-association.org also showed 403s). All findings below therefore come from web-search result extracts/snippets of the cited pages, not full-page reads. Dates marked "approx." were inferred by the search tool from page age, not read from the page. Treat specifics (numbers, dates) as needing a quick manual check before publication.

## 1. Global apps: Moovit, Google Maps, Transit, Citymapper

### Takeaway
Moovit is the only global app with a substantial, visible Costa Rica/San José bus catalogue (line pages for GAM and intercity operators) and is the app travel guides most often recommend, but its "real-time" for CR appears to be schedule/estimate-based and users report arrival times can be off. Google Maps has had some San José transit data since at least 2016, but coverage was described as "far from complete"; no source found confirming a full, current bus feed. No evidence that Transit app or Citymapper cover Costa Rica.

### Cited Findings
**Moovit**
- Moovit hosts a "Public transit in San José" index (Moovit metro/region id 2967) listing bus lines such as "ALAJUELA - HEREDIA - SAN JOSÉ POR RADIAL" and "SAN JOSÉ - BARRIO MÉXICO" plus INCOFER train lines (Belén–Pavas–Curridabat, Cartago–San José) — [Moovit San José index](https://moovitapp.com/index/en/public_transit-San_Jos%C3%A9-San_Jose-city_100399-2967)
- Moovit runs a Costa Rica service-alerts feed (e.g., INCOFER Semana Santa schedules) — [Moovit updates: Costa Rica](https://updates.moovit.com/metro/costa-rica/)
- Moovit has operator line pages for intercity companies such as TRACOPA, marketing itself as a "TRACOPA LTDA bus tracker, providing real-time locations, arrival times, and live status"; those pages were last updated roughly 425 days before the search (approx. mid-2025) — [Moovit TRACOPA lines](https://moovitapp.com/index/en/public_transit-lines-San_Jose-2967-2310132); [Moovit TRACOPA (2)](https://moovitapp.com/index/en/public_transit-lines-San_Jose-2967-888017)
- El Financiero ran "Moovit, la app que es el Waze para buses, está disponible en Costa Rica" (available on iOS, Android and Windows Phone; the Windows Phone mention suggests ~2015–2016; the search tool described it as "about five years old" — date unverified) — [El Financiero](https://www.elfinancierocr.com/tecnologia/moovit-la-app-que-es-el-waze-para-buses-esta-disponible-en-costa-rica/RP5XUOAVVRD2ZGGSVC3TTXEOLA/story/)
- A 2023 Drexel study-abroad blog: Moovit maps next arrivals, stops and connecting routes in San José, but arrival times for local routes "can occasionally be off" — [Drexel Education Abroad blog, Mar 2023](https://studyabroadblog.drexel.edu/2023/03/13/transportation-and-traveling-from-san-jose/)
- Travel guides list Moovit as one of the two good bus apps for Costa Rica (alongside La Terminal) and note Waze is the most-used navigation app among Costa Ricans — [My Tan Feet: apps for Costa Rica](https://mytanfeet.com/costa-rica-travel-tips/apps-for-traveling-in-costa-rica/)
- Moovit is broadly known as the "Waze for public transportation" since 2012 and grew fastest in Latin America (context; no CR-specific launch date) — [Wikipedia: Moovit](https://en.wikipedia.org/wiki/Moovit); [TechCrunch 2020](https://techcrunch.com/2020/08/11/how-moovit-went-from-opportunity-to-a-900m-exit-in-8-years/)

**Google Maps**
- Google's Latin America blog (Nov 2016) stated Google Maps Transit included information for San José, Costa Rica (and Panama City) — [Google LatAm blog, Nov 2016](https://latam.googleblog.com/2016/11/ok-google-como-llegar-casa.html)
- Tico Times (Apr 2015): there is no central service for schedules and stops; "Google Maps shows some stops but its information is far from complete" — [Tico Times, 2015-04-15](https://ticotimes.net/2015/04/15/startup-wants-to-make-navigating-costa-ricas-public-transportation-an-easy-ride)
- Travel guides warn Google Maps transit data "may lag behind company changes or temporary halts" — [TicoTravel bus guide](https://ticotravel.com/costa-rica-public-bus-guide-routes-terminals-and-tips-for-budget-travel/)
- The 2025 Canatrans–Ubirider plan explicitly includes publishing data to Google Maps, implying operators are not currently feeding Google real-time data — [Observador](https://observador.cr/autobuseros-desarrollaran-app-con-ubicacion-de-paradas-y-buses-en-tiempo-real/)

### Inferences
- Moovit's CR data likely originates from its community-editor model plus INCOFER/agency schedules; no source confirmed GPS-fed real-time for CR buses, so "real-time" in Moovit CR is probably schedule-derived or crowd-reported estimates.
- Google's San José data in 2016 was likely partial (possibly rail + some lines); the absence of any Costa Rican press about "Google Maps adds buses" suggests there was never a comprehensive official bus GTFS feed.

### Gaps
- Could not confirm Moovit's CR launch year, number of CR lines, whether CR uses Mooviter editors, or user counts.
- Could not confirm current (2026) Google Maps transit coverage in CR or its data source (no official GTFS found).
- No source found on Transit app or Citymapper in Costa Rica (from general knowledge neither lists Costa Rica as a covered region, but this is unverified here).

## 2. Local apps and websites (commercial, startup, independent)

### Takeaway
The local landscape is a long tail of small or pre-launch products: a few live real-time attempts (MontonCR in Quepos/Puntarenas, Ruticas and Pura Ruta both in "coming soon"/onboarding status), static schedule/fare apps (Yo Viajo, kölbi+, ARESEP TransporteCR), ticketing platforms (La Terminal, Passer, mibus.cr), and earlier startups (BusMaps ~2015) that did not reach scale. None found covers GAM urban routes with real GPS data at scale as of late 2026.

### Cited Findings
**Real-time startups (active/pre-launch)**
- **Ruticas** (ruticas.com): self-described "Transporte Público en Tiempo Real" for riders plus an operator platform; vehicle location, ETA, delay notifications; site says operator enrollment is still in progress (i.e., no live operators confirmed) — [Ruticas](https://www.ruticas.com/en)
- **Pura Ruta** (puraruta.app): "Tu bus en tiempo real · Muy Pronto Costa Rica"; promises real-time tracking, alert 5 minutes before arrival, updated fares (incl. adulto mayor), interurban routes — status: not launched — [Pura Ruta](https://puraruta.app/). Note: a different "Pura Ruta" (puraruta.com) is a carpooling app already in stores; relationship unconfirmed — [Pura Ruta carpooling](https://puraruta.com/)
- **MontonCR**: local bus routes plus live GPS tracking of buses; founded 2021, based in Puntarenas — [CB Insights: MontonCR](https://www.cbinsights.com/company/montoncr/). An Airbnb place guide for the Quepos bus terminal recommends MontonCR to see live buses moving around town — [Airbnb things-to-do](https://www.airbnb.se/things-to-do/places/1019224)

**Schedule / fare / route info apps and sites**
- **Yo Viajo** (yoviajocr.com): lists bus routes (e.g., Naranjo–Grecia–Alajuela, San José–Liberia) with schedules, fares, terminals, boarding point, operator; users can report missing schedules — [Yo Viajo buses](https://yoviajocr.com/buses); [developer LinkedIn](https://cr.linkedin.com/in/fabricio-rodriguez/es); also has a tourist section — [Yo Viajo tourist](https://yoviajocr.com/tourist)
- Tico Times (Feb 2023) lists online ticket platforms: mibus.cr, Passer, La Terminal, Yo Viajo — [Tico Times 2023](https://ticotimes.net/2023/02/11/costa-rica-travel-guide-to-taking-public-transportation)
- **kölbi+** (ICE, state telecom): App Store listing claims schedules for more than 4,000 bus routes nationwide, plus train/ferry schedules and info on ~200 government entities — [App Store kölbi+](https://apps.apple.com/us/app/id610059339)
- **TransporteCR** (ARESEP regulator; successor of "MiRuta"): check approved fare for any bus route, report overcharging; free on iOS/Android — [ARESEP: MiRuta se transforma en TransporteCR](https://aresep.go.cr/noticias/aplicacion-movil-miruta-se-transforma-en-transportecr/); 2020 pilot added taxi-fare module — [Observador](https://observador.cr/aresep-echa-a-andar-plan-piloto-de-aplicacion-para-calcular-tarifas-de-taxi/)
- **buscobus.co.cr**: "Pasajes de Bus, Rutas, Terminales y Horarios 2026" (active in 2026) — [BuscoBus](https://buscobus.co.cr/)
- **Q'ruta** (Android) appears on Google Play in searches for CR route apps; details not retrieved — [Google Play Q'ruta](https://play.google.com/store/apps/details?id=com.lui2mi.queruta&hl=en_US)
- **SINPE-TP: Pasajero** (BCCR) — app for the national electronic bus-fare payment system, not trip planning — [Google Play SINPE-TP](https://play.google.com/store/apps/details?id=com.sinpetp.appMovilCliente&hl=en_US)
- **GoBus Costa Rica** — school-bus GPS tracking for parents (not public transit) — [Google Play GoBus](https://play.google.com/store/apps/details?id=cr.gobus.go_bus&hl=es)
- **Passer** — intercity ticket booking — [Google Play Passer](https://play.google.com/store/apps/details?id=passer.app)

**Past/defunct startups**
- **BusMaps Costa Rica** (~2015): Tico Times profiled a startup aiming to map routes because there was no central schedule/stop service — [Tico Times 2015](https://ticotimes.net/2015/04/15/startup-wants-to-make-navigating-costa-ricas-public-transportation-an-easy-ride); a vendor case study describes a "busmaps navigation app" showing routes, stops and transit times for people in Costa Rica (credits Raizlabs) — [Peerbits case study](https://www.peerbits.com/case-studies/busmaps-navigation-app.html). No evidence it is active in 2025–2026.

### Inferences
- The recurring pattern is: static schedule apps survive (low data cost), while real-time apps stall at "coming soon" or operator onboarding — because real-time requires either operator GPS feeds or a large active user base for crowdsourcing.
- MontonCR (Quepos) suggests small, single-town operator partnerships are the feasible entry point for real-time.

### Gaps
- No ratings/download counts retrieved for any local app (store pages could not be fetched).
- Searched names from the brief ("Bus CR", "Rutas CR", "Busca Bus", "Autobuses CR", "Bus Tracker CR", "Smart Bus CR", "Tico Bus", "RutaTEC") returned no identifiable CR products in search results; existence unconfirmed. ("Ticabus" is an international coach company, not an info app.)
- Ownership/team behind Ruticas and Pura Ruta (.app) unknown.
- "MEZA BusTracker" surfaced in searches but is a Mexico City company app — not Costa Rican; excluded.

## 3. Operator-run and government tracking

### Takeaway
No major GAM operator (Lumaca, AMSA, Desamparados, TUASA, Tracopa, etc.) was found offering public real-time bus location. Government attempts exist on paper: CTP installed ~1,700 GPS units in GAM buses with a planned Racsa "Optimiza" rider app (announced roughly 2018, no evidence it reached the public), and the operators' chamber Canatrans signed (June 2025) a letter of intent with Portugal's Ubirider for a free real-time app starting with ~300 buses — no launch confirmed by Oct 2026. The 2026 CTP online route/stop viewer is static (no times).

### Cited Findings
- **Canatrans + Ubirider (June 17, 2025):** letter of intent signed at the UITP World Public Transport Summit (Hamburg) for a free app showing real-time bus location, nearby stops, ETAs, exact route and schedules, fleet-management tools for operators, and data sharing to Google Maps; ~300 units in first stage; launch "in coming months", no date — [Teletica](https://www.teletica.com/nacional/desarrollan-aplicacion-para-monitorear-llegada-de-buses-en-tiempo-real_388973); [Observador](https://observador.cr/autobuseros-desarrollaran-app-con-ubicacion-de-paradas-y-buses-en-tiempo-real/); [Delfino, Jun 2025](https://delfino.cr/2025/06/canatrans-se-incorpora-a-red-global-de-transporte-y-anuncia-nueva-herramienta-tecnologica)
- **CTP + Racsa "Optimiza":** CTP installed 1,700 GPS devices on regular-route GAM buses feeding a platform to check concession compliance; riders were to use Racsa's "Optimiza" app for bus location and approximate arrival; rollout slated for "September" (year not stated; page age ~3,078 days ≈ 2018) — [Primera Plana](https://primeraplana.or.cr/es/Gobierno_al_D%C3%ADa/Arranca_el_transporte_inteligente_en_servicio_de_autobuses_en_Costa_Rica/); [Panorama Digital](https://www.panoramadigital.co.cr/transporte-inteligente/)
- **CTP online route & stop viewer (approx. mid-2026):** free interactive viewer of all authorized routes (ramales) and stops by direction, filter by province/canton/district, query which services use a stop, export results — but no arrival times — [Semanario Universidad](https://semanariouniversidad.com/pais/ctp-habilita-herramienta-para-que-ciudadania-consulte-rutas-y-paradas-de-autobus-en-todo-el-pais/); [La Nación](https://www.nacion.com/el-pais/ahora-puede-consultar-en-linea-todas-las-rutas-y/HQFXAMB3YVAX3E3ZBU2PSR4VKY/story/); [Repretel](https://www.repretel.com/noticia/lanzan-plataforma-digital-para-consultar-rutas-y-paradas-de-autobus-en-todo-el-pais/)
- **Electronic payment (SINPE-TP) rollout** — validators on buses are a potential future data source: Law 10638 requires electronic fare collection on regular routes (2 years GAM, 4 years outside) — [Bufete de Costa Rica](https://bufetedecostarica.com/sistema-electronico-para-cobrar-la-tarifa-transporte-remunerado-de-personas-en-costa-rica-10638/); 1,127 buses had e-payment by end-2024 — [El Financiero](https://www.elfinancierocr.com/tecnologia/19-empresas-autobuseras-en-costa-rica-cuentan-con/LWZ5PWMTBNAPHGPZHKCXRDDK7A/story/); MOPT target 3,000 buses by end-2025 — [MOPT 2024](https://www.mopt.go.cr/noticias/2024/costa-rica-inicia-masificacion-de-pago-electronico-en-autobuses-del-gran-area); ARESEP FAQ still described it as a non-mandatory pilot (sources conflict on current status) — [ARESEP FAQ](https://aresep.go.cr/participacion/preguntas-frecuentes-transporte/)
- **MOPT technical document** on GPS positioning systems applied to transport (background, not an app) — [MOPT repository](https://repositorio.mopt.go.cr/server/api/core/bitstreams/1a000d43-7010-4ac1-a304-f469df24dddf/content)
- **Operators:** searches for Lumaca, AMSA, Desamparados, Tracopa tracking found only static info (websites/phones, Tracopa timetable page ~2,100 days old ≈ 2020) and no public tracking — [Tracopa Rutas/Horarios](https://www.tracopacr.com/Rutas_Horarios); [Apple Maps Lumaca](https://maps.apple.com/place?place-id=I63B8C0A8ABCA40B6). Buses Caribeños publishes stops and refers customers to phone contact — [Buses Caribeños paradas](https://busescaribenos.com/paradas/)
- **Tourist shuttles:** Daytrip Shuttle publishes a GTFS feed in Mobility Database with 16 CR routes (e.g., Jacó–San José) — [Mobility Database mdb-2151](https://mobilitydatabase.org/feeds/gtfs/mdb-2151)

### Inferences
- GPS hardware has existed on a significant share of GAM buses since ~2018 (CTP compliance), so the bottleneck is data access/sharing and rider-facing product, not hardware.
- The Canatrans–Ubirider deal is the most credible industry-backed real-time initiative and a potential competitor or partner; its 15+ month silence suggests stalling.

### Gaps
- Whether the Racsa "Optimiza" rider app ever launched publicly, and whether CTP GPS data is still collected/accessible.
- No info found for Grupo AMSA, Autotransportes Desamparados, TUASA, Coopetrans, La Cuarenta, Periféricos, MEPE, Pulmitan, Interbus/Gray Line app-level tracking.
- Whether Ubirider app launched (no store listing or 2026 news found).

## 4. Academic projects (UCR, TEC, UNA, others)

### Takeaway
Academic work clusters around UCR: campus-bus tools (Cazadora, a real-time internal-bus map, the official Campus UCR app, the student BusUCR site using crowd reports) and the 2026 CPSU/UCR Intelligent Systems Lab GTFS pilot for San José routes with MobilityData. No thesis specifically building a city-wide real-time bus app was found in TEC/UNA/UCR repositories via search.

### Cited Findings
- **CPSU GTFS pilot (presented Mar 2026):** "Transporte público e información a personas usuarias y políticas públicas a través de GTFS" by Fundación Centro para la Sostenibilidad Urbana (CPSU), funded by the UK Embassy, supported by UCR's Laboratorio de Sistemas Inteligentes and MobilityData; converted existing service info to GTFS for pilot routes in metro San José; produced a methodological guide for converting to GTFS and an emissions analysis; MobilityData's Sergio Delgado presented — [Delfino, Mar 2026](https://delfino.cr/2026/03/proyecto-busca-mejorar-la-informacion-del-transporte-publico-para-personas-usuarias-y-tomadores-de-decisiones)
- **Cazadora** (UCR students): app showing stops, schedules and estimated arrivals of buses to campus Rodrigo Facio; Android first, later iOS; a creator was a UCR Electrical Engineering master's student — [La Nación](https://www.nacion.com/tecnologia/informatica/aplicacion-cazadora-cuenta-a-los-estudiantes-de-la-ucr-donde-tomar-el-bus/HIEPUZI45BFOXDM6JSBTE7WR24/story/); [EKA](https://ekaenlinea.com/app-le-permite-conocer-paradas-y-horarios-de-buses-hacia-la-ucr/) (date not retrieved; status likely defunct)
- **UCR internal-bus real-time map:** built at UCR's Centro de Informática; updated location every second; ETA per stop promised for a later version — [Semanario Universidad (histórico)](https://historico.semanariouniversidad.com/universitarias/siga-en-tiempo-real-el-recorrido-de-autobuses-de-la-ucr/)
- **Campus UCR** (official app): internal and external bus schedules and stops; last update recorded 3 Jul 2021; very few ratings — [App Store](https://apps.apple.com/us/app/id1455407337); [AppFollow](https://apps.appfollow.io/ios/campus-ucr/1455407337?country=us); [Google Play](https://play.google.com/store/apps/details?id=cr.ac.ucr.movilidadactiva&hl=en_US)
- UCR Centro de Informática minutes (2019): working toward getting external bus operators to fit GPS so external routes could be tracked in real time (no confirmation it happened) — [CI-UCR Sesión ordinaria 15-2019](https://ci.ucr.ac.cr/sites/default/files/2022-04/Sesion_ordinaria-15-2019.pdf)
- **BusUCR** (unofficial student project, active): external routes near each campus; estimates bus location from user reports (no GPS on buses), community-compiled schedules "may not be 100% up to date"; real-time for the internal bus — [BusUCR](https://bus-ucr-externo.netlify.app/)
- **TEC** thesis proposing a public transport system for the Área Metropolitana de Cartago (planning, not an app) — [Repositorio TEC](https://repositoriotec.tec.ac.cr/bitstream/handle/2238/10496/propuesta_sistema_transporte_publico_amc.pdf?isAllowed=y&sequence=1)
- **LANAMME-UCR** report comparing CR public transport with other cities — [LANAMME repository](https://www.lanamme.ucr.ac.cr/repositorio/handle/50625112500/2829)
- CLEI 2018 paper (SLIS track) related to Costa Rican transport/fare info surfaced in searches (content not retrieved) — [CLEI 2018](https://clei.org/clei2018/docs/SLIS/182990.pdf)

### Inferences
- UCR's Laboratorio de Sistemas Inteligentes + CPSU is the natural academic partner for any GTFS/route-data effort in the GAM.
- Campus-scale projects repeatedly hit the same wall as commercial ones: external operators don't share GPS, so tools fall back to schedules or crowd reports.

### Gaps
- Could not search Kerwá, TEC, UNA repositories directly (fetch blocked); no theses found from UNA, UCENFOTEC, Fidélitas, or PRODUS on bus tracking/GTFS.
- Whether CPSU pilot GTFS files are published (no feed link found).

## 5. Community / open-data projects (OSM, GTFS catalogs, hackathons)

### Takeaway
OSM Costa Rica has a structured but incomplete bus-route mapping effort (PTv2, per-route relations, completeness scale) and contributed to osm2gtfs, but the San José route table appears largely empty. No GAM bus GTFS feed exists in Mobility Database/Transitland; only INCOFER rail and a tourist shuttle feed. ARESEP open data on routes covers 2015–2018. Open Knowledge's 2014 index rated CR transport timetables 0% open.

### Cited Findings
- OSM wiki "Bus routes in Costa Rica" is marked work-in-progress, has a San José table with a 0–4 completeness scale for routing and stops, with entries largely empty/incomplete — [OSM wiki: Bus routes in Costa Rica](https://wiki.openstreetmap.org/wiki/Bus_routes_in_Costa_Rica)
- OSM "Costa Rica/Public transport" page: PTv2 tagging of stops/terminals/stations; INCOFER schedules plus OSM data used to generate GTFS with osm2gtfs, software built by community members from Brazil, Nicaragua, Costa Rica and France — [OSM wiki: Costa Rica/Public transport](https://wiki.OpenStreetMap.org/wiki/Costa_Rica/Public_transport); Spanish page links an ARESEP transport-service map with raw route/stop data — [OSM wiki ES](https://wiki.openstreetmap.org/wiki/ES:Costa_Rica/Transporte_p%C3%BAblico)
- Alajuela OSM page: per-route relations; full CTP-authorized network grouped in one large relation; mapping in progress — [OSM wiki ES:Alajuela](https://wiki.openstreetmap.org/wiki/ES:Alajuela); Grupo TUASA route 200 stops mapped with node IDs — [OSM wiki Grupo Tuasa](https://wiki.openstreetmap.org/wiki/Grupo_Tuasa)
- Related regional precedent: MapaNica (Nicaragua) used osm2gtfs to publish Managua's bus network (2015–2017) — [OSM talk-latam 2015](https://lists.openstreetmap.org/pipermail/talk-latam/2015-December/000411.html); [HOT list 2017](https://lists.openstreetmap.org/pipermail/hot/2017-January/012866.html)
- Mobility Database: Costa Rica entries include INCOFER rail (3 routes) and Daytrip Shuttle (16 routes); no GAM bus feed found — [Mobility Database mdb-3480](https://mobilitydatabase.org/feeds/gtfs/mdb-3480); [mdb-2151](https://mobilitydatabase.org/feeds/gtfs/mdb-2151)
- ARESEP open-data "Rutas de autobuses" dataset (covers 2015–2018 per search extract) — [ARESEP datos abiertos](https://aresep.go.cr/datos-abiertos/rutas-autobuses/); costa-rica-guide.com built a full route list from ARESEP data (length, fare, operator) — [Costa Rica Guide](https://costa-rica-guide.com/travel/transportation/costa-rica-bus-routes/)
- Open Knowledge Global Open Data Index 2014: Costa Rica transport timetables "0% open" — [OKFN index 2014](https://2014.index.okfn.org/place/costa-rica/timetables/)

### Inferences
- An open GTFS for GAM buses is a real gap; combining CTP viewer exports (routes/stops, 2026), ARESEP fare data, OSM relations and the CPSU methodology is the most plausible path to one.

### Gaps
- No evidence found of CR hackathons (NASA Space Apps CR, mobility hackathons) producing bus-tracking projects, nor of civic-tech groups (e.g., Abriendo Datos CR) working on GTFS. Not confirmed either way.
- Transitland listing for CR not checked directly (fetch blocked).

## 6. Tourist-focused static schedule sources

### Takeaway
Tourists are served by static PDFs and guide sites (ICT itinerary PDF, Costa Rica Guide, Tico Times guides, Yo Viajo tourist pages, operator timetable pages), plus ticketing sites (La Terminal, Passer, mibus.cr). All static; frequently stale.

### Cited Findings
- ICT/Visit Costa Rica free bus itinerary PDF (Aug 2024 version) with schedules/frequencies by province — [Visit Costa Rica PDF](https://www.visitcostarica.com/sites/default/files/2024-08/Itinerario%20de%20buses.pdf); [ICT](https://www.ict.go.cr/es/root-documentos-no-apagar/brochures-1/brochures-para-el-turista/2158-01-itinerario-de-buses/file.html)
- Costa Rica Guide: bus schedules, route list (ARESEP-derived), San José airport & metropolitan lines — [schedule](https://costa-rica-guide.com/travel/transportation/bus-schedule/); [metro lines](https://costa-rica-guide.com/travel/transportation/san-jose-airport-and-metropolitan-buses/)
- Tico Times public transport guide (Feb 2023) — [Tico Times](https://ticotimes.net/2023/02/11/costa-rica-travel-guide-to-taking-public-transportation)
- sanjosecostarica.org route & schedule page — [San José Costa Rica](https://www.sanjosecostarica.org/sobre-san-jose-costa-rica/servicios/transporte-publico/rutas-y-horarios-de-autobuses/)
- La Terminal ticket sales (e.g., Tracopa) — [La Terminal](https://www.laterminalcostarica.com/en/proveedor/tracopa)
- UCR publishes per-semester PDFs of external bus schedules/fares to campuses — [UCR 2024 PDF](https://www.ucr.ac.cr/medios/documentos/2024/horarios-y-tarifas-buses-externos-i-ciclo-2024-b-65fde4113d760.pdf)

### Inferences
- These sources reinforce that schedule data exists in fragments (PDFs, operator pages) and must be aggregated manually.

### Gaps
- thebusschedule.com/CR not found in search results; not confirmed.

## 7. Why past attempts failed or stayed small

### Takeaway
Consistent reasons across sources: fragmented private operators with no central schedule/stop authority output; no open GTFS; operator GPS (where installed) used for regulator compliance, not shared; real-time products stuck at operator onboarding; and schedule-based apps going stale. No direct post-mortem interviews were found.

### Cited Findings
- No central service for schedules and stops; Google Maps "far from complete" (2015) — [Tico Times 2015](https://ticotimes.net/2015/04/15/startup-wants-to-make-navigating-costa-ricas-public-transportation-an-easy-ride)
- Routes owned/operated by different private companies, no coherent central map or schedule — [Costa Rica Guide](https://costa-rica-guide.com/travel/transportation/san-jose-airport-and-metropolitan-buses/); no national network, private companies control their own lines — [TicoTravel](https://ticotravel.com/costa-rica-public-bus-guide-routes-terminals-and-tips-for-budget-travel/)
- Timetables rated 0% open (2014) — [OKFN](https://2014.index.okfn.org/place/costa-rica/timetables/)
- GPS on 1,700 GAM buses deployed for CTP compliance; rider app promised but not evidenced — [Primera Plana](https://primeraplana.or.cr/es/Gobierno_al_D%C3%ADa/Arranca_el_transporte_inteligente_en_servicio_de_autobuses_en_Costa_Rica/)
- Real-time startups gated on operator enrollment ("in progress") or "coming soon" — [Ruticas](https://www.ruticas.com/en); [Pura Ruta](https://puraruta.app/)
- Crowd-based workaround: BusUCR estimates location from user reports because buses lack GPS, with caveat that data may be outdated — [BusUCR](https://bus-ucr-externo.netlify.app/)
- Even with an official app, UCR's campus app went un-updated since 2021 with few ratings — [AppFollow](https://apps.appfollow.io/ios/campus-ucr/1455407337?country=us)
- Users still told to confirm schedules at the station even when using apps — [TicoTravel](https://ticotravel.com/costa-rica-public-bus-guide-routes-terminals-and-tips-for-budget-travel/)

### Inferences
- The market gap ("nunca se sabe cuándo pasa el bus") remains open in late 2026: the only industry-scale effort (Canatrans–Ubirider) is unlaunched, the government viewer is static, and Moovit's CR data is not GPS-backed.
- Winning approaches likely need (a) an operator data partnership (GPS or SINPE-TP validator taps) or (b) a critical mass of crowdsourced riders on a few high-volume GAM corridors; static-only products have repeatedly gone stale.

### Gaps
- No interviews/articles found with founders of failed CR bus apps or explicit user-survey data on information needs ("no saben cuándo pasa el bus"). Searches in Spanish returned only tool/news items.
