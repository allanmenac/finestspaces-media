# Win Costa Rica's bus race with live data

You can fork the Trufi Association stack for Costa Rica, technically and legally, as long as you accept that **your app must be open source under GPL-3.0**. The catch is that Trufi solves the half of the problem Costa Rica is already solving for itself, and almost none of the half riders care about. trufi-core is a modern Flutter app that is actively released (**v5.27.0, September 2026**). It plans trips over OpenTripPlanner, works offline and in Spanish, and since April 2026 can *display* GTFS-Realtime bus positions. It contains **no component that produces live positions**. Its core data workflow, mapping every route by hand in OpenStreetMap, also duplicates official route geometry that the CTP started publishing in June 2026. Meanwhile, the state is building a **national GTFS-based passenger-information system run by UCR's SIMOVI lab**. Its first phase put INCOFER trains into Google Maps in real time in August 2026, using the Portuguese vendor **UbiRider**. The bus operators' chamber Canatrans signed a 300-bus real-time deal with the same UbiRider in June 2025, but no launch has been confirmed. No GAM bus line offers public live tracking today, and no law requires GPS on buses. However, Ley 10638 requires an electronic-payment validator, which needs internet connectivity, on every GAM bus by about **March 2027**. Static trip planning is about to become a free feature inside Google Maps. The opening that remains is reliable "when is my bus coming" information, corridor by corridor. For a small team, that means: use the SIMOVI, CTP and ARESEP data rather than mapping from scratch; reuse OpenTripPlanner, optionally with trufi-core as the app shell; build a lightweight pipeline that turns GPS positions into GTFS-Realtime; and sign one or two operators outside UbiRider's orbit before trying to scale.

*Evidence note:* the research environment blocked direct access to most Costa Rican government and news sites, trufi-association.org, the OSM wiki, Overpass and app-store pages. Code-level facts about Trufi and SIMOVI come from GitHub and were checked first-hand. Most Costa Rican facts come from search-engine summaries of the cited pages. Dates marked "approx." were inferred from how old the indexed page was, not read from the page. Figures for routes, operators, fleet and validators conflict between sources (reconciled in the table further below). Confirm any URL or number in a browser before using it publicly.

## Trufi forks cleanly but stops where live tracking starts

### A modular Flutter app on top of a thin Docker backend

In 2026 the Trufi stack has three layers. **The app layer** is trufi-core, a Melos/Dart monorepo of packages covering MapLibre maps, a pure-Dart GTFS planner, OTP 1.5/2.4/2.8 routing providers, search, POI layers and turn-by-turn navigation. City apps such as trufi-app (Cochabamba, the recommended template) pull these packages in as git dependencies rather than from pub.dev ([trufi-core](https://github.com/trufi-association/trufi-core); [trufi-app](https://github.com/trufi-association/trufi-app)). **The backend** is a set of small Docker repos: trufi-server-otp (OTP 2.8.1 by default), a Photon geocoder, a tile server, a Dart "planner" server that also serves a web build, and a .NET reverse proxy with analytics ([trufi-server-otp](https://github.com/trufi-association/trufi-server-otp); [trufi-server-planner](https://github.com/trufi-association/trufi-server-planner); [trufi-server](https://github.com/trufi-association/trufi-server)). **The data tool**, trufi-gtfs-builder, turns OSM bus-route relations into GTFS, filling in synthetic calendars, headways and speeds where real timetables are missing ([trufi-gtfs-builder](https://github.com/trufi-association/trufi-gtfs-builder)).

The documentation lags behind the code. The trufi-core README still links to tools (osm-public-transport-export, geojson-to-gtfs) that can no longer be cloned. Expect to read source code rather than guides.

| Component | License found | What a Costa Rica fork would use it for |
|---|---|---|
| trufi-core, trufi-app and the city apps | **GPL-3.0** | Rider app shell (maps, planner, search, live markers) |
| trufi-server-otp, -photon, -planner, trufi-server, trufi-gtfs-simulator | **No LICENSE file** | Docker wrappers; easy to rewrite |
| trufi-gtfs-builder | ISC (package.json and README only) | Converting OSM relations to GTFS |
| trufi-server-tileserver-gl | Apache-2.0 | Map tiles |
| OpenTripPlanner (upstream) | LGPL-3.0 | Routing engine |

Sources: [GitHub org listing](https://github.com/orgs/trufi-association/repositories?type=all&sort=updated); [OTP docs](https://github.com/opentripplanner/OpenTripPlanner/blob/dev-2.x/doc/user/index.md).

### GPL-3.0 makes your rider app open source by default

Any fork you distribute, including Play Store and App Store builds, must ship its complete source under GPL-3.0, and that includes your own Flutter code linked against trufi-core. You can still charge money and build a business, but **a closed proprietary app is not an option** unless Trufi grants a separate license, and no such offer was found.

Trufi's older pages and press coverage describe the app as "AGPL-licensed", but the current LICENSE files are plain GPL-3.0 ([Trufi in Your City](https://www.trufi-association.org/projects/trufi-in-your-city/); [trufi-core](https://github.com/trufi-association/trufi-core)). Under GPL, changes to code you only run on your own servers do not have to be published. No "Trufi" trademark policy was found, so the safe course is a full rebrand (name, logo, bundle ID) that keeps the GPL attribution in the About screen.

Three further caveats were not verified in this research. App Store terms have long been considered to conflict with GPL distribution, so have a lawyer review an iOS release. The backend repos without a LICENSE file are technically "all rights reserved"; they are thin wrappers that are easy to rewrite, or you can ask Trufi to add licenses. Anything derived from OpenStreetMap carries ODbL attribution and share-alike duties.

### A revived codebase that depends on one or two people

trufi-core nearly went dormant: **19 commits in 2022, 5 in 2023 and 1 in 2024**. It came back with v5.0.0 on 23 December 2025, followed by about 38 tagged releases up to v5.27.0 on 16 September 2026 ([trufi-core commits](https://github.com/trufi-association/trufi-core/commits/main); [tags](https://github.com/trufi-association/trufi-core/tags)).

The revival rests on very few people. Since 2025, one developer, Samuel Rioja, has written 81 trufi-core commits. He is also the only or almost-only author of every backend repo: all 58 commits on trufi-server, 55 of 55 on trufi-gtfs-builder, and 11 of 11 on trufi-server-otp ([trufi-server](https://github.com/trufi-association/trufi-server); [trufi-gtfs-builder](https://github.com/trufi-association/trufi-gtfs-builder)).

Minor versions routinely break things. For example, 5.12.0 rebuilt the fares data model and 5.14.0 removed a config field ([CHANGELOG](https://github.com/trufi-association/trufi-core/blob/main/CHANGELOG.md)). OTP support also trails upstream, at 2.8.1 against 2.10.0 ([OTP Changelog](https://github.com/opentripplanner/OpenTripPlanner/blob/dev-2.x/doc/user/Changelog.md)).

The pattern is clear. The project is healthy when donors are funding new city apps (Arequipa, Trujillo, Lima, Sana'a) and quiet when they are not. If you fork it, **pin a release tag** and budget for roughly monthly upgrade work.

### Live buses are displayed, never produced

**Live GTFS-RT vehicle positions** arrived in v5.8.0 (April 2026) as an optional flag. When it is on, the app polls OTP's GraphQL `vehiclePositions` query **every 10 seconds** ([vehicle_positions_service.dart](https://github.com/trufi-association/trufi-core/blob/main/packages/trufi_core_routing/lib/src/services/vehicle_positions_service.dart)). OTP in turn needs a `vehicle-positions` updater that polls an external GTFS-RT feed, by default once a minute ([OTP GTFS-RT config](https://github.com/opentripplanner/OpenTripPlanner/blob/dev-2.x/doc/user/GTFS-RT-Config.md)). Trufi's own OTP container ships with no updaters configured.

A search of the Trufi repositories found no driver app, no AVL ingestion and no crowdsourced tracking. The app has no arrival predictions (TripUpdates), although the code was not checked exhaustively. A generic `RealtimeVehiclesProvider` interface does let a team plug in its own positions API and skip OTP entirely ([trufi_core_interfaces](https://github.com/trufi-association/trufi-core/tree/main/packages/trufi_core_interfaces)).

No Trufi city runs live vehicles in production. The one documented pilot, in Kigali, used GPS devices from partner Enrouteq on more than 60 buses. A field tester watched the icon of a *different* bus move on screen ([Trufi – Kigali beta](https://www.trufi-association.org/beta-testing-our-kigali-app/)). That is the core difficulty of live tracking: deciding which vehicle is running which route. It is especially hard against Trufi-style GTFS, whose frequency-based schedules are synthetic.

## Costa Rica lets you skip the mapping, not the maintenance

### Trufi's playbook was built for networks with no official data

Trufi's standard launch process maps every route as an OSM relation (often from GPS traces), generates GTFS from those relations, stands up OTP and Photon, and rebrands trufi-app ([trufi-core README](https://github.com/trufi-association/trufi-core); [Trufi – mapping informal transport](https://www.trufi-association.org/digital-solutions-for-mapping-informal-transport/)). The mapping step dominates the effort, as comparable projects show.

| Project | Scale | Effort |
|---|---|---|
| Nouakchott | 59 routes | 6 mappers, about 2.5 weeks ([Trufi – Nouakchott](https://www.trufi-association.org/nouakchotts-first-interactive-public-transport-map/)) |
| Toluca | More than 600 routes | A multi-month programme funded by GIZ ([Changing Transport](https://changing-transport.org/how-data-moves-cities-in-mexico/)) |
| Digital Matatus (Nairobi) | About 130 routes | About six months, with repeated surveys ([CUPUM chapter](https://www.digitalmatatus.com/pdf/CUPUM_book_chapter.pdf)) |
| Gauteng (WhereIsMyTransport) | 2,813 minibus routes | 40 collectors, under six weeks ([ITWeb](https://www.itweb.co.za/article/whereismytransport-digitises-sas-informal-transport-networks/JOlx4z7kE4Gq56km)) |

The GAM sits at Toluca or Cochabamba scale: an estimated **300–400 route codes, each with several ramales (branches), run by roughly 35–50 operators**. That range is an estimate derived from the figures in the counts table below, not a sourced number.

Costa Rica differs in one important way. Its routes are formal concessions, and their official geometry (the CTP Visor) and fares (the ARESEP pliego tarifario, or fare schedule) already exist. A team should therefore treat OSM as the street network and map-matching layer, not as the primary source of route definitions. Trufi's GTFS work in Lima for the operator AEMUS, built from the operator's own KML, stops and timetables, is the closer template ([GitHub org listing](https://github.com/orgs/trufi-association/repositories?type=all&sort=updated)). Official data is not automatically clean, though. In Tétouan, an unmaintained government GTFS cost a Trufi mapper more time than surveying would have ([Trufi – Morocco](https://www.trufi-association.org/21-year-old-developer-makes-a-public-transport-app-for-his-hometown-in-morocco-with-trufi/)).

### Hosting is cheap; keeping the data fresh is the real cost

The default resource needs are small. OTP runs with a 2 GB Java heap, with 8 GB suggested for larger datasets ([trufi-server-otp](https://github.com/trufi-association/trufi-server-otp)), and the Photon geocoder needs 1–2 GB for a small country ([trufi-server-photon](https://github.com/trufi-association/trufi-server-photon)). A single VM with 4–8 GB of RAM should therefore serve the GAM, though that is an inference that has not been benchmarked.

Trufi sells app building, route mapping, hosting and OTP consulting, but **publishes no prices** ([Trufi services](https://www.trufi-association.org/services/custom-applications-for-inclusive-sustainable-transport/); [OTP consulting](https://www.trufi-association.org/services/opentripplanner/)).

The best local cost benchmark comes from the government itself. MOPT's 2026–2030 sector plan budgets **at least ₡15 million a year** (very roughly US$30,000) for the CTP to maintain the national GTFS ([Delfino, Aug 2026](https://delfino.cr/2026/08/ctp-anuncia-creacion-de-sistema-nacional-con-informacion-de-rutas-horarios-y-tarifas-de-transporte-publico)). That figure is a floor for data maintenance alone. Costa Rican bus data changes constantly: fares move at least twice a year, schedules on 27 routes were cut under a fast-track decree in November 2025, and more than 100 routes have been abandoned ([Semanario Universidad](https://semanariouniversidad.com/pais/ctp-usa-via-rapida-para-aprobar-estudios-de-las-autobuseras-para-reducir-horarios-y-flota-en-27-rutas/); [Semanario Universidad](https://semanariouniversidad.com/?p=375000)).

### Funded, open data survives; volunteer forks and closed startups do not

Trufi's flagship, Cochabamba, shows what slow organic growth looks like. It reached **5,000 users in its first two weeks (2019)** and more than 100,000 Android installs over roughly six years, with 625+ routes maintained by volunteers ([ITDP presentation](https://itdp.org/wp-content/uploads/2022/03/Denis-Paz-Jimenez__Trufi-Association-e.V_OSM_3.22.22.pdf); [Google Play snippet](https://play.google.com/store/apps/details?id=app.trufi.navigator&hl=en_US)).

Forks that relied only on community effort decayed. Transitland flags Accra's Trotro feed as about **2,658 days old**, its repository was last touched in 2024, and Oruro's repository went quiet in 2023 ([Transitland](https://transit.land/feed-registry/operators/o-ebzz-accratrotro)).

Commercial ventures fared no better. WhereIsMyTransport raised about **US$27M and still shut down in October 2023** ([TechCabal](https://techcabal.com/2023/10/26/whereismytransport-shutting-down/)). The Nairobi crowdsourcing app Ma3Route had about three staff in 2024 ([Tracxn](https://tracxn.com/d/companies/ma3route/__GP4CIk4tAMLseVzW2zjQ_i2-1-JY5cBlyk3dp2mgvNM)).

What outlived individual apps was open data. Digital Matatus' GTFS was reused by others ([Engineering for Change](https://www.engineeringforchange.org/solutions/product/digital-matatus/)), and Trufi treats acceptance into the Mobility Database as its test that a feed can be sustained ([Trufi – MobilityDatabase](https://www.trufi-association.org/how-good-is-trufi-transport-data-good-enough-for-mobilitydatabase/)).

### SIMOVI's own open stack is the most relevant alternative to Trufi

| Option | What it gives you | Main drawback |
|---|---|---|
| Publish GTFS / GTFS-RT to Google Maps and Moovit | Immediate reach, no app to build | No brand or product of your own; the SIMOVI national system is already doing this |
| Fork trufi-core | Polished offline Spanish mobile app; live-marker support | GPL-3.0; Flutter skills; one key maintainer; no live data producer |
| OTP plus your own web/PWA app | Full control, can be proprietary, fastest to validate | You build the UX that Trufi gives you for free |
| **SIMOVI lab stack** (UCR) | `databus` (GTFS Schedule and Realtime server, Django/PostgreSQL/Redis), `databus-app` (driver/fleet GPS telemetry app), `databus-stop-times` (arrival prediction), `infobus` (passenger-information distribution), `infobus-otp` | Academic codebase; license not checked; you depend on the lab's roadmap |
| Traccar plus TheTransitClock | Mature tracker ingestion (200+ device protocols) and open-source arrival prediction | TheTransitClock looks aging (86 open issues) and is heavy to run |

Sources: [SIMOVI lab GitHub](https://github.com/simovilab); [Traccar](https://www.traccar.org/); [TheTransitClock](https://github.com/TheTransitClock/transitime).

The SIMOVI repositories are active (`infobus` was updated 6 October 2026) and the lab is an academic member of MobilityData. Its stack already includes the producer side that Trufi lacks: driver telemetry, a GTFS-RT server and arrival prediction. It is also the stack behind the official national system.

## The state is building the canonical bus GTFS through UCR's SIMOVI

### Static route data went public in 2026; real time so far covers only trains

As recently as about 2024, a UCR study concluded that "en Costa Rica no existe un medio oficial de información del transporte público en modalidad autobús" ([UCR Kerwá](https://www.kerwa.ucr.ac.cr/server/api/core/bitstreams/bcdd48d6-3332-465a-92f9-1f67fc0a6bfc/content)).

That changed in two steps. Around **June 2026 (approx.) the CTP opened its Visor de Transporte Público**, which shows authorized routes, ramales by direction and stops for the whole country, filterable by province, canton and district, with exportable results. It shows no times or live positions, and the CTP calls it reference-only, not certified ([Semanario Universidad](https://semanariouniversidad.com/pais/ctp-habilita-herramienta-para-que-ciudadania-consulte-rutas-y-paradas-de-autobus-en-todo-el-pais/); [La Nación](https://www.nacion.com/el-pais/ahora-puede-consultar-en-linea-todas-las-rutas-y/HQFXAMB3YVAX3E3ZBU2PSR4VKY/story/)). Then in **August 2026 the CTP announced a national passenger-information system based on GTFS**, covering routes, stops, schedules, frequencies and fares, with real-time alerts added gradually and integration with Google Maps. UCR's SIMOVI lab (led by Fabián Abarca) builds it through Fundación UCR, together with MOPT, ARESEP and INCOFER. No bus launch date has been published ([Delfino, Aug 2026](https://delfino.cr/2026/08/ctp-anuncia-creacion-de-sistema-nacional-con-informacion-de-rutas-horarios-y-tarifas-de-transporte-publico)).

Phase one has already shipped. INCOFER trains on all three passenger lines appear in Google Maps with real-time location, credited to the Government of Portugal, UbiRider and SIMOVI ([INCOFER](https://www.incofer.go.cr/pasajeros-de-tren-podran-conocer-el-estado-del-servicio-en-tiempo-real/); [Monumental, 26 Aug 2026](https://www.monumental.co.cr/2026/08/26/trenes-de-incofer-apareceran-en-google-maps-con-ubicacion-y-recorrido-en-tiempo-real/)). The INCOFER feed is hosted at `feeds.simovi.org` and passes the Mobility Database validator with zero errors ([Mobility Database mdb-3480](https://mobilitydatabase.org/feeds/gtfs/mdb-3480)). A March 2026 pilot by Fundación CPSU, funded by the UK Embassy with SIMOVI and MobilityData, has already converted some San José metro bus routes to GTFS and written a conversion methodology ([Delfino, Mar 2026](https://delfino.cr/2026/03/proyecto-busca-mejorar-la-informacion-del-transporte-publico-para-personas-usuarias-y-tomadores-de-decisiones)). Expect an official GAM bus GTFS to appear on `feeds.simovi.org` and in Google Maps. Plan to consume it, not compete with it.

### ARESEP holds the most machine-readable bus data

ARESEP's open-data section has four useful datasets: GPS-surveyed route geometries as a WFS layer (2015–2018, marked with a licence restriction), passengers and revenue by route, historical fares and, most valuable of all, **the pliego tarifario as a web service** ([ARESEP datos abiertos](https://aresep.go.cr/datos-abiertos/); [Rutas de autobuses](https://aresep.go.cr/datos-abiertos/rutas-autobuses/)). The pliego lists every fare by route, ramal, fraction (a fare segment within a ramal) and operator for any given date. Its endpoint, decoded from an ARESEP CSV export link and not yet tested live, is `datos.aresep.go.cr/ws.datosabiertos/Services/IT/PliegoTarifario.svc/ObtenerPliegoTarifarioAutobus/{YYYY-MM-DD}` ([ARESEP CSV export](https://aresep.go.cr/exportar/csv.php?url=aHR0cHM6Ly9kYXRvcy5hcmVzZXAuZ28uY3Ivd3MuZGF0b3NhYmllcnRvcy9TZXJ2aWNlcy9JVC9QbGllZ29UYXJpZmFyaW8uc3ZjL09idGVuZXJQbGllZ29UYXJpZmFyaW9BdXRvYnVzLzIwMjQtMDYtMTA%3D&n=X1RhcmlmYXNfZGVfQXV0b2Jfcw%3D%3D)).

ARESEP has run GPS pilots: 225 devices for three months (approx. 2021), and a quality study of **280,000 trips from 254 GPS-equipped buses** ([La Nación](https://www.nacion.com/el-pais/servicios/aresep-seguira-rastro-a-225-buses-mediante-gps/PGHMSINT5JAU3E3HNFYRR66UAY/story/); [ARESEP](https://aresep.go.cr/noticias/aresep-analizo-calidad-en-viajes-de-autobus/)). It does not require continuous GPS from operators.

Fares change often. In 2026 alone, ARESEP approved a **5.43% increase in May**, rounded all fares to multiples of ₡10 from 1 July, and in August proposed cutting 842 of 4,793 fares, with the cut varying by operator size and by use of SINPE-TP, the national electronic-payment system. A new tariff model with SINPE-TP incentives is expected in the second half of the year ([ARESEP](https://aresep.go.cr/noticias/aresep-aprueba-ajuste-tarifario-en-buses-y-taxis-por-alza-en-combustibles/); [Delfino, Aug 2026](https://delfino.cr/2026/08/aresep-propone-ajustes-en-tarifas-de-taxis-y-buses)). A fare calculator therefore has to re-pull the pliego after every resolution.

### No GPS mandate exists, but payment validators will cover every GAM bus by 2027

**GPS on buses.** In 2021 the CTP renewed concessions for **227 companies (35 in metro San José) for seven years, to 2028**. The terms require fleet renewal, electronic payment and sectorización. No source mentions GPS, AVL or open-data clauses ([Delfino, Sep 2021](https://delfino.cr/2021/09/ctp-renueva-concesiones-a-227-empresas-autobuseras-exigira-cambio-de-flotilla-cobro-electrico-y-sectorizacion)). A CTP project (approx. 2018) put about **1,700 GPS units** on GAM buses for compliance checks and promised a Racsa rider app called "Optimiza". No evidence was found that the app ever reached the public ([Primera Plana](https://primeraplana.or.cr/es/Gobierno_al_D%C3%ADa/Arranca_el_transporte_inteligente_en_servicio_de_autobuses_en_Costa_Rica/)). A Frente Amplio bill (approx. 2024) would make GPS mandatory and have the CTP share the data with apps. Its supporters noted that 46% of complaints concern delays. The bill's progress is unknown ([La República](https://www.larepublica.net/noticia/usuarios-podran-ver-en-tiempo-real-el-recorrido-de-los-buses)).

**Payment validators.** The binding mandate is **Ley 10638**, in force since 17 March 2025. It requires card and phone payment on every bus within two years in the GAM (so about March 2027) and four years elsewhere, and it requires operators to send payment data to ARESEP ([Bufete de Costa Rica](https://bufetedecostarica.com/sistema-electronico-para-cobrar-la-tarifa-transporte-remunerado-de-personas-en-costa-rica-10638/)). A BCCR official said the system needs connected validators ([El Observador](https://observador.cr/pago-electronico-obligatorio-en-todas-las-rutas-de-autobuses-entre-las-tareas-pendientes-de-la-asamblea-legislativa/)).

Rollout figures conflict. One count had 1,127 buses equipped by the end of 2024 ([El Financiero](https://www.elfinancierocr.com/tecnologia/19-empresas-autobuseras-en-costa-rica-cuentan-con/LWZ5PWMTBNAPHGPZHKCXRDDK7A/story/)). By 2026 the system was handling more than 200,000 payments a day and BAC and Visa had funded equipment on more than 700 of about 2,500 buses, while one August report put active validators at about 2,000 buses ([Delfino, Jun 2026](https://delfino.cr/2026/06/bac-y-visa-lanzan-tarjeta-de-monedero-sinpe-tp-para-el-pago-electronico-en-transporte-publico)).

No source confirms whether SINPE-TP validators record GPS, or whether BCCR or ARESEP would share tap data. Both questions belong at the top of any data-partnership conversation.

### Sectorización keeps slipping, but route versioning will matter

Sectorización, the plan to reorganize GAM buses into trunk and feeder sectors, has been promised for years. A first Tibás–Santo Domingo pilot was set for December 2024, with all 12 subsectors to follow in 2026. **Nothing had started operating by April 2026**, and MOPT and ARESEP publicly blamed each other ([La Nación](https://www.nacion.com/el-pais/aresep-contradice-al-mopt-y-rechaza-culpa-por/N5WAEQU7QVBTNAP52562I53VSI/story/)). MOPT has since dropped the earlier plan and is redoing the studies around the electric train, aiming for a pilot in 2027 ([El Observador](https://observador.cr/mopt-desecha-anterior-plan-de-sectorizacion-del-transporte-publico-y-actualizara-estudios-para-incluir-el-tren-electrico/)).

More change is coming. The "Tibi" electric train, 51 km at about US$800M, won approval for a US$550M CABEI loan in May 2026, with construction expected from 2027 ([El Observador](https://observador.cr/gobierno-presenta-tibi-el-proyecto-de-tren-electrico-por-800-millones-con-un-recorrido-de-51-km/); [Delfino, May 2026](https://delfino.cr/2026/05/asamblea-aprueba-en-segundo-debate-credito-para-tren-electrico-de-pasajeros)). An €8M EU grant will add about 75 electric buses in 2027 ([Infobae, 10 Oct 2026](https://www.infobae.com/costa-rica/2026/10/10/costa-rica-incorporaria-75-autobuses-electricos-en-2027-gracias-a-una-inversion-de-8-millones-de-euros-de-la-union-europea/)).

The practical lesson is to build against today's route-by-route network, but with a data model that can version routes.

## Private real-time apps keep stalling at operator onboarding

| Player | Type | Live GPS buses? | Status (Oct 2026) |
|---|---|---|---|
| **Moovit** | Global app; San José line catalogue | Markets "real-time"; likely schedule-derived; users report times "can occasionally be off" | Incumbent, most recommended by travel guides ([Moovit San José](https://moovitapp.com/index/en/public_transit-San_Jos%C3%A9-San_Jose-city_100399-2967); [Drexel blog](https://studyabroadblog.drexel.edu/2023/03/13/transportation-and-traveling-from-san-jose/)) |
| **Google Maps** | Global app | No (bus); yes for INCOFER trains since Aug 2026 | Partial San José data since 2016; will receive the SIMOVI national feed ([Google LatAm blog](https://latam.googleblog.com/2016/11/ok-google-como-llegar-casa.html)) |
| **UbiRider and Canatrans** | Operators' chamber with a Portuguese vendor | Planned: free app, ETAs, Google Maps sharing, 300 buses first | Letter of intent 17 June 2025; **no launch found** ([Teletica](https://www.teletica.com/nacional/desarrollan-aplicacion-para-monitorear-llegada-de-buses-en-tiempo-real_388973); [El Observador](https://observador.cr/autobuseros-desarrollaran-app-con-ubicacion-de-paradas-y-buses-en-tiempo-real/)) |
| **Ruticas** | Startup: rider app plus operator platform | Promised | Operator enrollment "in progress" ([Ruticas](https://www.ruticas.com/en)) |
| **Pura Ruta** (puraruta.app) | Startup | Promised, with alerts 5 minutes before arrival | "Muy pronto"; link to the puraruta.com carpool app unconfirmed ([Pura Ruta](https://puraruta.app/)) |
| **MontonCR** | Puntarenas startup, founded 2021 | **Yes, in Quepos** | The only live local example found ([CB Insights](https://www.cbinsights.com/company/montoncr/)) |
| **Yo Viajo** | Schedules, fares, terminals; users report gaps | No | Active ([Yo Viajo](https://yoviajocr.com/buses)) |
| **kölbi+** (ICE) | Telecom super-app | No | Claims schedules for more than 4,000 routes, probably counting ramales ([App Store](https://apps.apple.com/us/app/id610059339)) |
| **TransporteCR** (ARESEP) | Fare lookup and overcharge reports | No | Active ([ARESEP](https://aresep.go.cr/noticias/aplicacion-movil-miruta-se-transforma-en-transportecr/)) |
| **BusUCR** | Student project | Crowd reports only; GPS only on the internal campus bus | Active ([BusUCR](https://bus-ucr-externo.netlify.app/)) |
| BusMaps (2015), Cazadora, Campus UCR app | Earlier startup and campus apps | No | Defunct or stale; Campus UCR last updated 2021 ([Tico Times 2015](https://ticotimes.net/2015/04/15/startup-wants-to-make-navigating-costa-ricas-public-transportation-an-easy-ride); [AppFollow](https://apps.appfollow.io/ios/campus-ucr/1455407337?country=us)) |

Ticketing platforms (La Terminal, Passer, mibus.cr) serve intercity travel, not GAM urban tracking ([Tico Times 2023](https://ticotimes.net/2023/02/11/costa-rica-travel-guide-to-taking-public-transportation)).

Every attempt runs into the same obstacles: fragmented private operators, no open timetables (the Open Data Index rated Costa Rican timetables **0% open in 2014**) ([OKFN](https://2014.index.okfn.org/place/costa-rica/timetables/)), GPS installed for regulator compliance and never shared, and real-time products stuck waiting for operators to enroll. Static apps survive because they are cheap to run, but their data goes stale. Real-time apps stall because they need either an operator's feed or enough riders reporting positions. MontonCR's small-town success and Transportes San Gabriel, a small operator that publishes its own GTFS ([TSG](https://transportessangabriel.com/gtfs/)), show where entry actually works: with small, motivated operators rather than the big GAM groups.

Two caveats apply. UbiRider's 15 months of public silence may mean the project has stalled, or only that it has not been covered in the press. And whether its Canatrans deal is exclusive is unknown.

## Where to see every GAM route and operator today

No single source lists every route, operator, schedule and stop. Together, the sources below come close.

| Source | What you get | Caveats |
|---|---|---|
| [CTP Visor de Transporte Público](https://www.ctp.go.cr/servicios/plataforma-digital/visor-de-transporte-publico) | Official route paths, ramales by direction, stops; exportable | Reference only; export formats and bulk API unconfirmed |
| [ARESEP pliego tarifario](https://aresep.go.cr/autobus/tarifas/) and web service (above) | Every fare by route, ramal and fraction, **with operator names**: the best way to build a full operator list | Endpoint untested live; re-pull after every resolution |
| [ARESEP route WFS](https://aresep.go.cr/datos-abiertos/rutas-autobuses/) | GPS-surveyed ramal geometries | 2015–2018 vintage; licence restriction |
| [ARESEP passengers and revenue](https://aresep.go.cr/transparencia/datos-abiertos/pasajeros-movilizados-autobuses) | Demand by route | Operator-reported basis |
| [CTP homepage, "Datos Abiertos"](https://www.ctp.go.cr/) and [Constancia de concesionario](https://www.ctp.go.cr/servicios/plataforma-digital/constancia-de-concesionario) | Concession data; per-operator lookup | Portal contents unconfirmed; lookup is one ID at a time |
| [Moovit San José index](https://moovitapp.com/index/en/public_transit-San_Jos%C3%A9-San_Jose-city_100399-2967) | Browsable lines, stops, PDFs | Proprietary; some pages about a year old |
| [Yo Viajo](https://yoviajocr.com/buses), [kölbi+](https://apps.apple.com/us/app/id610059339) | Schedules and fares | Proprietary; use only to validate |
| [ICT bus itinerary PDF (Aug 2024)](https://www.visitcostarica.com/sites/default/files/2024-08/Itinerario%20de%20buses.pdf), [costa-rica-guide.com](https://costa-rica-guide.com/travel/transportation/costa-rica-bus-routes/) | Intercity terminals, operators, an ARESEP-derived route list | Tourist focus; static |
| [OSM wiki: Bus routes in Costa Rica](https://wiki.openstreetmap.org/wiki/Bus_routes_in_Costa_Rica) | Community route relations | Mostly 0/4 complete; San José table largely empty |
| [DanixHerrera/transit-data-cr](https://github.com/DanixHerrera/transit-data-cr) | Compilation of official sources (created July 2026) | README is a stub; contents unverified |
| [INCOFER GTFS](https://mobilitydatabase.org/feeds/gtfs/mdb-3480), [TSG GTFS](https://transportessangabriel.com/gtfs/) | The only open feeds | Rail only, or a single small operator |

Counts disagree because each source defines a "route" differently and dates differ:

| Metric | Figure | Source and note |
|---|---|---|
| Routes registered with the CTP | 848 (640 under permit) | CGR audit, 2020–2023 ([El Observador](https://observador.cr/servicio-de-buses-con-problemas-desde-las-paradas-hasta-los-permisos-contraloria-da-4-meses-al-mopt-para-presentar-solucion-integral/)) |
| Operating routes | about 428 | 2023 ([CRHoy](https://crhoy.com/nacionales/aresep-avala-rebaja-en-tarifas-de-buses/)) |
| Fare lines | more than 4,000 (2023); 4,793 (Aug 2026 proposal) | These count ramales and fractions, not routes |
| Operators | 355 providers (2021); 182 with valid tariff records (2025) | Different definitions and periods ([Semanario Universidad](https://semanariouniversidad.com/especiales/quienes-son-los-duenos-de-los-autobuses-en-costa-rica/); [Semanario Universidad](https://semanariouniversidad.com/?p=375000)) |
| Metro San José companies and buses | 35–36 companies; about 1,650 buses | 2021 renewal; CTP 2022 data via [CRUSA](https://crusa.cr/wp-content/uploads/2025/05/Hoja-de-ruta-autobuses-electricos-AMSJ.pdf) |
| GAM buses (wider scope) | about 3,000 | SINPE-TP rollout target ([Revista Summa](https://revistasumma.com/?p=227855)) |
| National riders | about 1.6M a day (2023); down 42% from 2018 to 2025 | [CRHoy](https://crhoy.com/nacionales/aresep-avala-rebaja-en-tarifas-de-buses/); Estado de la Nación via [Semanario Universidad](https://semanariouniversidad.com/?p=375000) |

The most reliable operator roster will come from grouping the ARESEP pliego by operator. Sources confirm several GAM operators by name: Grupo TUASA, BIUSA/Grupo Tracopa, Autotransportes Desamparados, Transplusa, Coopetrans and the SINPE-TP joiners ([Semanario Universidad](https://semanariouniversidad.com/pais/usuarios-de-140-buses-de-san-jose-alajuela-y-heredia-podran-utilizar-el-sistema-de-pago-electronico/)). Others commonly cited from memory, such as Lumaca, were not confirmed by this research.

## A small team should use the national feed and own the last mile

**Build three things.** First, the rider product: a Spanish-first, low-data experience built around "my stop, my bus, how many minutes", with alerts and with fares that include the SINPE-TP discounts. Second, a lightweight live-data pipeline: GPS from a driver phone app (Traccar Client or SIMOVI's `databus-app`) or cheap 4G trackers goes in, and a GTFS-RT VehiclePositions feed, later TripUpdates, comes out. The only genuinely new component is assigning each vehicle to its route and trip, so have drivers select their route at shift start or fix each device to one route. Third, a BusUCR-style crowd mode in which riders tap "I'm on this bus", filling gaps on routes without trackers.

**Reuse everything else.** Use OpenTripPlanner for routing, and SIMOVI's GTFS once published; until then, work from CTP Visor exports, the ARESEP pliego and the CPSU methodology. Fork trufi-core as the app shell only if you want a native, offline-capable mobile app and accept GPL-3.0 and Flutter. It is the cheapest route to a polished app with live bus markers, so pin a tag. If you would rather keep the app proprietary or validate on the web first, a PWA on top of OTP is faster. In either case, **do not adopt** Trufi's map-everything-in-OSM pipeline as your primary data source.

| Phase | Timing | Focus |
|---|---|---|
| 1. Data and validation | Now to Q1 2027 | Approach SIMOVI (Fabián Abarca) to get early access to the GAM feed and offer field validation; test the ARESEP pliego endpoint and CTP exports; ship a web planner for a handful of corridors |
| 2. Live pilot | 2027 | One or two cooperative operators outside the Canatrans–UbiRider deal (Transportes San Gabriel is the obvious candidate); trackers or driver app; GTFS-RT published openly and offered back to SIMOVI and Google |
| 3. Scale via mandates | From about March 2027 to 2028 | Seek ARESEP/BCCR access to SINPE-TP validator events; argue for GPS and GTFS-RT clauses in the 2028 concession renewals |

**Partners, in order of leverage.** SIMOVI/UCR is the technical owner of the national system and the first call. The CTP has had an interim executive director since August 2026, José Fabio Ureña Gómez, so its leadership is new and open to proposals but also in flux ([El Observador](https://observador.cr/ctp-designa-de-manera-interina-a-arquitecto-como-director-ejecutivo/)). ARESEP's Intendencia de Transportes owns the fare and payment data. CPSU and MobilityData can help with data quality. Trufi itself is worth hiring as a contractor: it has Latin American experience with donors and formal operators, and this would be its first deployment in Central America. GIZ (already in the EU e-bus programme) and the IDB are the natural donors.

**Competitive threats.** **UbiRider** is the biggest. It is simultaneously the government's real-time vendor for trains and the operators' chamber's chosen bus partner. If its Canatrans rollout lands, bus real time will appear inside Google Maps, and a standalone app would be competing with Google on Google's own data, so ask early whether that deal is exclusive. **SIMOVI** turns static trip planning into a free commodity, but it is better treated as an ally: a budget floor of about ₡15M a year is thin for running a national feed plus real-time ingestion, which leaves room for a team that contributes data and field validation. **Moovit** has brand recognition, but its local data is weak.

## Conclusion

"Should we fork Trufi?" is the wrong first decision. In Costa Rica, route geometry and fares are becoming public goods, delivered by the CTP, ARESEP and SIMOVI, and static planning will arrive in Google Maps for free. What remains scarce is a trusted live signal from the bus. Whoever has the relationships with operators, the GPS devices and the trip-matching logic controls the product that riders actually miss. Trufi's real value here is probably as a contractor and a ready-made app shell, not as a data pipeline. The SIMOVI stack, which already contains the driver-telemetry and arrival-prediction pieces that Trufi lacks, deserves a hard look before any fork.

The window has a clear shape. Validators must be on every GAM bus by about March 2027, sectorización and the train-feeder studies point to 2027, and concessions come up for renewal in 2028. A team that can show working, open GTFS-RT on even two corridors before those dates would be positioned to become a partner of the national system rather than its casualty. The international record (Accra's stale feed, WhereIsMyTransport's shutdown) says the most resilient thing such a team can produce is an open feed that outlives any one app, not the app itself.
