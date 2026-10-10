# Trufi deployments, lessons, and alternative stacks for a Costa Rica (GAM) transit app

Research date: 2026-10-10. Method note: WebFetch could not reach trufi-association.org, play.google.com or most news sites from this environment (DNS failures). GitHub pages could be fetched directly. Everything else comes from search-engine summaries of the pages cited, so figures pulled from snippets (especially store download counts) should be checked in a browser before publication.

## 1. Where Trufi apps exist, and which are still alive (2025-2026)

### Takeaway
Trufi's flagship is still Cochabamba (Bolivia). It is the only deployment with clearly documented scale: 100K+ Android installs, about 625 volunteer-maintained routes. The trufi-core codebase is under active development in Sept 2026. The other city apps are a mix of maintained forks (Accra, Arequipa, Trujillo, Duitama, Oruro, Sana'a, Zitácuaro) and one-off projects whose store status is unclear. There is no Trufi deployment in Central America or Costa Rica.

### Cited Findings
**trufi-core README, live apps (fetched Oct 2026).** Three cities are listed:
- Cochabamba, Bolivia: "Trufi" app on Google Play `app.trufi.navigator` and the App Store, plus trufi.app.
- Accra, Ghana: "Trotro" app on Google Play `com.trotro.trotro` and the App Store, plus trotro.app.
- Addis Ababa, Ethiopia: addismaptransit.com, website only.

Other cities are told to contact Trufi. Source: [trufi-core GitHub](https://github.com/trufi-association/trufi-core)

**Cochabamba adoption:**
- Google Play listing shows 100K+ downloads, rated 4.7 from about 3.81K reviews, as reported in a search snippet. [Google Play – Trufi](https://play.google.com/store/apps/details?id=app.trufi.navigator&hl=en_US)
- Trufi posted a "100,000+ Installs for the Trufi App in Cochabamba" milestone. Only the title surfaced, not the date. [Trufi blog](https://www.trufi-association.org/100000-installs-for-the-trufi-app-in-cochabamba/)
- Earlier milestones: 20,000+ Android installs, and nearly 30,000 including iOS. [Trufi blog – 20,000+ installs](https://www.trufi-association.org/20000-installs-of-our-app-for-cochabamba/)
- The app was released in February 2019 and had 5,000 users within the first two weeks after launch. [ITDP 2022 Trufi presentation (PDF)](https://itdp.org/wp-content/uploads/2022/03/Denis-Paz-Jimenez__Trufi-Association-e.V_OSM_3.22.22.pdf)
- Trufi App V5 for Cochabamba has "more than 625 routes… all maintained by volunteers who map in OpenStreetMap". Users can report errors without being OSM editors. [Trufi – App V5](https://www.trufi-association.org/trufi-app-v5-for-cochabamba/)

**Accra "Trotro" app:**
- Launched as a beta in June 2019. Volunteers customized it from trufi-core.
- Trufi says it is "mapped, developed and updated by the Accra OpenStreetMap community". [Trufi – Trotro App page](https://www.trufi-association.org/portfolio/trotro-app-accra-ghana/); [Trufi – 2019 & 2020 review](https://www.trufi-association.org/2019-2020-at-trufi-looking-back-and-forward/)
- No download count was found.
- The GitHub repo `trotro-app` was last updated Nov 6, 2024. [GitHub org listing](https://github.com/orgs/trufi-association/repositories?sort=updated)
- Transitland flags the Accra Trotro GTFS feed as fetched about 2,658 days ago, roughly 7 years. This suggests the public feed is stale. [Transitland – Accra Trotro](https://transit.land/feed-registry/operators/o-ebzz-accratrotro)

**Other projects on Trufi's projects page.** [Trufi Projects](https://www.trufi-association.org/projects/); [Trufi services page](https://www.trufi-association.org/services/custom-applications-for-inclusive-sustainable-transport/)
- **BusBoy, Duitama, Colombia:** a Trufi-core adaptation built by a local teacher and students. [Trufi services page](https://www.trufi-association.org/services/custom-applications-for-inclusive-sustainable-transport/)
- **Rutómetro, Zitácuaro, Mexico.** [Trufi – Rutometro video](https://www.trufi-association.org/rutometro-redefining-public-transport-in-mexico/)
- **Corsa, Tétouan, Morocco:** built by a 21-year-old developer with Trufi guidance. [Trufi – Morocco developer](https://www.trufi-association.org/21-year-old-developer-makes-a-public-transport-app-for-his-hometown-in-morocco-with-trufi/); [Corsa](https://www.trufi-association.org/projects/corsa-app/)
- **stadtnavi, Herrenberg, Germany.**
- **Not Without My Bike, Hamburg, Germany.**
- **Nouakchott, Mauritania:** a mapping project, not a store app. [Trufi – Nouakchott](https://www.trufi-association.org/nouakchotts-first-interactive-public-transport-map/)
- **Kigali, Rwanda:** a beta app plus a hackathon. [Trufi – Beta testing Kigali app](https://www.trufi-association.org/beta-testing-our-kigali-app/); [Trufi – Kigali hackathon](https://www.trufi-association.org/kigalis-smart-mobility-hackaton-highlights/)

**GitHub activity, trufi-association org, Oct 2026.** [GitHub org repos](https://github.com/orgs/trufi-association/repositories?sort=updated)

| Repo | Last updated | Notes |
|---|---|---|
| `gtfs-aemus-lima` | Sep 28, 2026 | GTFS for 6 routes of one Lima operator, built from operator KML, stops and timetables |
| `trufi-sanaa` | Sep 16, 2026 | Sana'a, Yemen. Also referenced in trufi-core commits |
| `trufi-app` | Sep 16, 2026 | Cochabamba |
| `trufi-server-planner` | Sep 16, 2026 | |
| `trufi-gtfs-builder` | Sep 14, 2026 | |
| `trufi-arequipa` | Jul 31, 2026 | Arequipa, Peru |
| `Trujillo-OMUS` | May 4, 2026 | Trujillo, Peru |
| `trufi-gtfs-simulator` | May 4, 2026 | |
| `rutometro` / `rutometro-app` | Nov 2025 | |
| `HackathonKigali` | Sep 2025 | |
| `busboy-app` | Aug 30, 2025 | |
| `osm-pt-routebuilder` | Jul 17, 2025 | "creating and updating OSM public transport relations from GPS traces" |
| `quirqui-rutas` | Sep 2023 | Oruro, Bolivia |

**trufi-core commit activity.** The latest commits on `main` are dated Sep 9–16, 2026. Examples: an offline street/corner search, planner transfer rules, and "persist the built index so cold starts load a snapshot". [trufi-core commits](https://github.com/trufi-association/trufi-core/commits/main)

**Peru data quality.** Trufi's Trujillo GTFS was accepted into MobilityData's Mobility Database, which validates feeds. [Trufi – Good enough for MobilityDatabase](https://www.trufi-association.org/how-good-is-trufi-transport-data-good-enough-for-mobilitydatabase/)

**Distribution model.** Trufi deliberately does not publish one multi-city app. Each city or region publishes its own app. [Trufi – App goes open source](https://www.trufi-association.org/trufi-app-goes-open-source/)

### Inferences
- "Alive" in 2026 seems to mean Cochabamba, plus whichever forks Trufi itself is actively paid to maintain: Peru (Arequipa, Trujillo, Lima AEMUS), Sana'a, and Mexico.
- Community-only forks look stale: Accra's feed is about 7 years old and its repo was last touched in 2024. Oruro's repo was last touched in 2023. This is a warning sign for a volunteer-only Costa Rica fork.
- La Paz, Phnom Penh, Manila, Nairobi and Kigali do not appear as live Trufi store apps in any source found. Kigali reached beta only.

### Gaps
- Current (2025–2026) Play/App Store download counts and ratings for Trotro (Accra), BusBoy, Corsa, Rutómetro, Quirqui Rutas, Arequipa, Trujillo and Sana'a. The store pages could not be fetched and the snippets gave none.
- Whether Corsa and Rutómetro are still listed on the stores.
- No evidence found of any Trufi app in La Paz, Phnom Penh, Manila or Nairobi.

## 2. How route data was collected, and the effort and budgets involved

### Takeaway
Every Trufi deployment follows the same pipeline: map routes as OSM public-transport relations (volunteers, students or paid local mappers, often with GPS traces), convert OSM to GTFS, then serve the GTFS through OpenTripPlanner or Trufi's own planner.

A small city can be mapped in weeks: Nouakchott took 6 mappers about 2.5 weeks for 59 routes. Large cities, with 600+ routes, take months of funded, coordinated work. Funding has come from GIZ (Mexico, TranSIT), the World Bank (Nouakchott), AFD (Accra) and the Rockefeller Foundation (Nairobi, Digital Matatus). Dollar budgets are almost never published.

### Cited Findings
**Trufi's standard pipeline.** Map public transport routes in OSM, then convert to GTFS for journey planners. [Trufi – Digital solutions for mapping informal transport](https://www.trufi-association.org/digital-solutions-for-mapping-informal-transport/)

Tooling referenced in the README [trufi-core GitHub](https://github.com/trufi-association/trufi-core):
- `osm-public-transport-export`
- `geojson-to-gtfs`
- the `gtfs-bolivia-cochabamba` template
- `osm-search-data-export`
- `osm-pt-routebuilder`, which builds OSM relations from GPS traces. [GitHub org repos](https://github.com/orgs/trufi-association/repositories?sort=updated)

Trufi also documented remote mapping of a city during the pandemic. [Trufi SOTM 2021 slides (PDF)](https://www.trufi-association.org/wp-content/uploads/2021/07/Trufi-Association-for-SOTM2021.pdf)

**Cochabamba.** Routes were collected by the OSM community and are maintained by volunteers (625+ routes). [ITDP 2022 presentation](https://itdp.org/wp-content/uploads/2022/03/Denis-Paz-Jimenez__Trufi-Association-e.V_OSM_3.22.22.pdf); [Trufi – App V5](https://www.trufi-association.org/trufi-app-v5-for-cochabamba/)

**Nouakchott (World Bank funded):**
- Six members of the OSM Mauritania community mapped the transit routes from March 23 to April 8. The year was not shown.
- Output was 59 bus and taxi routes covering about 400 km.
- A Cochabamba volunteer had mapped test routes first, which local mappers then replaced.

Source: [Trufi – Nouakchott](https://www.trufi-association.org/nouakchotts-first-interactive-public-transport-map/)

**Mexico, the TranSIT program (GIZ funded):**
- Trufi, HOT and Codeando México worked with university students, civil society and local officials in Oaxaca, Salina Cruz and Toluca.
- Earlier rounds, from 2022, covered Zitácuaro, Zamora and Puerto Escondido.
- Results: 43 routes in Zamora/Jacona, 25,000 POIs added and 8,500 road errors corrected in Toluca and Oaxaca.

Sources: [HOT – Data that moves cities](https://www.hotosm.org/en/news/data-that-moves-cities-participatory-mapping-to-plan-transportation-in-latin-america-and-the-caribbean/); [Trufi – TranSIT Mexico](https://www.trufi-association.org/building-better-urban-mobility-in-mexico-a-look-at-the-transit-mapping-initiative/)

For Toluca, Trufi says it processed "more than 600 routes". Another report cites 622 Toluca routes plus 65 in Jilotepec in the first public GTFS for the State of Mexico. [Changing Transport – How data moves cities in Mexico](https://changing-transport.org/how-data-moves-cities-in-mexico/); [Trufi – TranSIT](https://www.trufi-association.org/building-better-urban-mobility-in-mexico-a-look-at-the-transit-mapping-initiative/)

Trufi and Mobility Hub also launched a public transport mapping course. [Trufi – Mapping course](https://www.trufi-association.org/public-transport-mapping-course-launched-by-trufi-association-and-mobility-hub/)

**Duitama, Colombia.** Local students ("Mapping Stars") also mapped transport in Toluca, Oaxaca, Zamora and Uruapan. [Trufi – Send our young mapping stars to SOTM LATAM](https://www.trufi-association.org/send-our-young-mapping-stars-to-state-of-the-map-latam/)

**Tétouan, Morocco.** The mapper said he could have finished in about a month with accurate GTFS. Because the government data was unmaintained, the work took longer. An incompatibility between the GTFS editor and OSM put weeks of work at risk. [Trufi – Morocco developer](https://www.trufi-association.org/21-year-old-developer-makes-a-public-transport-app-for-his-hometown-in-morocco-with-trufi/)

**Accra, before the Trufi app:**
- AccraMobile (2015) was run by the Accra Metropolitan Assembly, Concordia University's TRIP Lab and AFD. It used a smartphone survey app to record trotro routes, converted them to GTFS, and launched a map plus a hackathon in December 2015.
- AccraMobile3 (from July 2017) remapped all lines into OSM. It involved Jungle Bus, AFD, Transitec and the local OSM community, and generated GTFS using OSM2GTFS.

Sources: [Fabrique des Mobilités – Accra Mobility](https://wiki.lafabriquedesmobilites.fr/wiki/Accra_Mobility); [OSM wiki – AccraMobile3](https://wiki.openstreetmap.org/wiki/AccraMobile3); [AFDLab4Dev/AccraMobility GitHub](https://github.com/AFDLab4Dev/AccraMobility)

**Addis Ababa.** AddisMapTransit collected GTFS with DT4A Innovation Challenge funding:

| Network | Routes | Stops |
|---|---|---|
| Minibuses | 249 | 905 |
| Anbessa buses | 122 | 910 |
| Sheger buses | 72 | 501 |

Source: [DT4A – Addis Ababa GTFS](https://digitaltransport4africa.org/dt4a-repository-received-gtfs-datasets-from-addis-ababa/)

**Nairobi, Digital Matatus (comparator, not Trufi):**
- Ran Sep 2012 to Sep 2013, with pauses to retool the software. Final collection took about 6 months.
- Students rode the routes with smartphone GPS apps. Where riding was unsafe, they followed matatus by car.
- Result: about 130–136 routes and more than 3,000 stops. Routes often had to be surveyed multiple times.
- Funded by the Rockefeller Foundation. The map was released in Jan 2014 and downloaded more than 5,000 times in its first 6 months.

Sources: [Digital Matatus – CUPUM chapter (PDF)](https://www.digitalmatatus.com/pdf/CUPUM_book_chapter.pdf); [Columbia State of the Planet](https://news.climate.columbia.edu/2015/08/26/map-app-helps-people-track-transit-in-nairobi/); [ScienceDirect – Digital matatu project](https://www.sciencedirect.com/science/article/pii/S0966692315001878)

**Gauteng, WhereIsMyTransport (comparator).** In 2017, 40 data collectors spent under 6 weeks collecting 2,813 unique minibus-taxi routes. [ITWeb](https://www.itweb.co.za/article/whereismytransport-digitises-sas-informal-transport-networks/JOlx4z7kE4Gq56km)

**Alexandria, Egypt (WRI/AFD "Beyond Mapping").** 104 of 126 identified routes were successfully mapped. [Transport for Cairo – Alexandria final report (PDF)](https://transportforcairo.com/wp-content/uploads/2023/09/WRI-TfC-DT4A_Alex_FinalReport_V2-1.pdf)

**Managua, Nicaragua (MapaNica, the closest Central American analog):**
- Started in 2013 with volunteers recording bus routes by GPS. More than 150 citizens helped.
- About 45 routes covering Managua and Ciudad Sandino. MapaNica calls it the first crowdsourced bus map in Central America.
- Machine-readable since 2018. A GTFS feed is cited in a 2020 OSM wiki analysis.

Sources: [OSM wiki – Managua bus routes](https://wiki.openstreetmap.org/wiki/Bus_routes_in_Managua); [MapaNica support page](https://support.mapanica.net/index.es.html); [Nico Dorfbrunnen 2018 talk](https://nico.dorfbrunnen.eu/posts/2018/osm-buses-nicaragua/)

**Costs per Trufi's own guide.** The project "will not work entirely without money": you need server space (DigitalOcean is suggested) and marketing such as newspaper ads. The guide suggests asking the municipality to sponsor a server. A single-city backend can run fully in Docker. The page is about 4+ years old. [Trufi in Your City](https://www.trufi-association.org/projects/trufi-in-your-city/)

### Inferences
- Rough effort benchmarks: about 10 mapped routes per mapper-week in a small, simple network (Nouakchott: 59 routes, 6 people, about 2.5 weeks). Large networks with 600+ routes needed funded programs running across months.
- The GAM has several hundred concessioned routes (other researchers should confirm the count), so it is closer to the Toluca and Cochabamba scale than to Nouakchott.
- Costa Rica's routes are formal concessions with defined itineraries and published fares, unlike informal trufis or matatus. Some route data may therefore be obtainable from ARESEP or CTP rather than surveyed from scratch. Tétouan shows that stale government data can cost as much time as surveying, though.
- Lima AEMUS is a relevant template for formal operators: GTFS built from the operator's own KML, stops and timetables.

### Gaps
- No published dollar budgets were found for any Trufi deployment, including GIZ TranSIT, the World Bank Nouakchott project and Trufi commercial contracts.
- No Trufi price list was found. "Trufi in Your City" gives no figures.
- Digital Matatus' grant amount was not found.

## 3. Trufi or similar in Central America, Latin America beyond Bolivia, and Costa Rica

### Takeaway
Trufi is active in Latin America outside Bolivia: Mexico, Peru (Arequipa, Trujillo, Lima) and Colombia (Duitama). No Trufi work was found anywhere in Central America, including Costa Rica. The only Central American OSM bus-mapping precedent found is MapaNica in Managua. Moovit already carries San José bus lines and operators.

### Cited Findings
**Trufi in Latin America:**
- Mexico: Toluca, Oaxaca, Salina Cruz, Zitácuaro, Zamora, Uruapan, Puerto Escondido.
- Peru: Arequipa, Trujillo, Lima.
- Colombia: Duitama.

Sources: [Trufi – TranSIT Mexico](https://www.trufi-association.org/building-better-urban-mobility-in-mexico-a-look-at-the-transit-mapping-initiative/); [HOT](https://www.hotosm.org/en/news/data-that-moves-cities-participatory-mapping-to-plan-transportation-in-latin-america-and-the-caribbean/); [GitHub org repos](https://github.com/orgs/trufi-association/repositories?sort=updated)

**No Central America results.** A search for Trufi plus Costa Rica, Guatemala, Honduras or "Central America" returned only Mexico, Bolivia, Peru, Colombia, Kenya and Ethiopia material. [Trufi Mexico tag](https://www.trufi-association.org/tag/mexico/) (search result set)

**Managua (MapaNica).** Volunteer GPS mapping of about 45 routes, published as maps plus a GTFS feed. [OSM wiki](https://wiki.openstreetmap.org/wiki/Bus_routes_in_Managua); [MapaNica blog](https://blog.mapanica.net/)

**Moovit in San José.** Moovit has a city page for San José listing GAM lines and operators: Transmasoma, Autotransportes Raro, Transcesa, Autotransportes Desamparados, MUSOC (3 routes, 105 stops) and TRACOPA. Its stop pages give departure times that looked 1–1.5 years old. [Moovit – San José public transit](https://moovitapp.com/index/en/public_transit-San_Jos%C3%A9-San_Jose-city_100399-2967); [Moovit – MUSOC](https://moovitapp.com/index/en/public_transit-lines-San_Jose-2967-1584534)

### Inferences
- A Costa Rica team would be the first Trufi-style deployment in Central America. That could help when approaching Trufi, GIZ or IDB for partnership or funding, but there is no local playbook to copy.
- Moovit's existing San José coverage is the incumbent a new app must beat on accuracy. Moovit's data provenance in CR (official versus community edits) was not confirmed.

### Gaps
- Whether the Transit app covers San José, and how Moovit sources its CR data. The searches returned nothing.
- Whether any Costa Rican OSM community has already mapped GAM bus relations. This is likely covered by another researcher.

## 4. Lessons learned: maintenance, route changes, sustainability, adoption

### Takeaway
The biggest risks are funding and keeping data fresh, not the technology. Trufi survives as a nonprofit that sells services and wins donor projects, and its well-maintained apps are the funded ones. Volunteer-only forks go stale: Accra's feed is about 7 years old.

The most heavily funded commercial player, WhereIsMyTransport (about $27M raised), shut down in Oct 2023. Crowdsourcing startups such as Ma3Route remained tiny. Open data (OSM plus published GTFS) is what has outlived individual projects.

### Cited Findings
**Trufi on fragility.** Closed data "becomes fragile and ultimately irrelevant". Even where informal fleets are GPS-tracked, the data stays with fleet managers or tech firms. [Trufi – Transport data is like your mom's AOL account](https://www.trufi-association.org/how-transport-data-is-like-your-moms-1990-aol-account/)

**Trufi's maintenance model.** Volunteers maintain the OSM data, and in-app error reports let ordinary users contribute. [Trufi – App V5](https://www.trufi-association.org/trufi-app-v5-for-cochabamba/)

**Validation as a quality bar.** Mobility Database acceptance requires valid structure and stable URLs. Trufi treats acceptance as evidence the feed is sustainable. [Trufi – MobilityDatabase](https://www.trufi-association.org/how-good-is-trufi-transport-data-good-enough-for-mobilitydatabase/)

**Accra's stale feed.** Transitland flags the Accra Trotro GTFS as about 2,658 days old. [Transitland](https://transit.land/feed-registry/operators/o-ebzz-accratrotro)

**WhereIsMyTransport:**
- Shut down in Oct 2023 after failing to raise a new round ("Having failed to raise our round, we've stopped operations"). It had raised about $27M, and World Bank was among its clients.
- A post-mortem notes routes "change daily based on road closures, traffic, protests", which made data hard to keep current.

Sources: [TechCabal](https://techcabal.com/2023/10/26/whereismytransport-shutting-down/); [Startup Graveyard Africa case study](https://startupgraveyard.africa/blog/case-study-what-really-happened-to-whereismytransport); [PitchBook](https://pitchbook.com/profiles/company/113713-57)

**Ma3Route:**
- Founded in 2012 in Nairobi as a crowdsourced traffic and matatu information app (web, mobile and SMS).
- Tracxn lists 3 employees as of July 2024 and only about $25K in funding (2016).
- Activity in 2025–2026 is unconfirmed.

Sources: [Tracxn – Ma3Route](https://tracxn.com/d/companies/ma3route/__GP4CIk4tAMLseVzW2zjQ_i2-1-JY5cBlyk3dp2mgvNM); [Engineering for Change – Digital Matatus](https://www.engineeringforchange.org/solutions/product/digital-matatus/)

**Digital Matatus:**
- Routes had to be surveyed repeatedly to get a consistent route, and the software needed retooling mid-project.
- The open GTFS was then reused by other apps, including Ma3Route.

Sources: [CUPUM chapter](https://www.digitalmatatus.com/pdf/CUPUM_book_chapter.pdf); [Engineering for Change](https://www.engineeringforchange.org/solutions/product/digital-matatus/)

**Tétouan.** Unmaintained government GTFS cost extra time, and incompatibility between tools (GTFS editor versus OSM) risked weeks of work. [Trufi – Morocco](https://www.trufi-association.org/21-year-old-developer-makes-a-public-transport-app-for-his-hometown-in-morocco-with-trufi/)

**Adoption.** Cochabamba reached 5,000 users in two weeks and 100K+ installs over about 6 years. [ITDP presentation](https://itdp.org/wp-content/uploads/2022/03/Denis-Paz-Jimenez__Trufi-Association-e.V_OSM_3.22.22.pdf); [Google Play snippet](https://play.google.com/store/apps/details?id=app.trufi.navigator&hl=en_US)

**Marketing.** Trufi's own guide budgets for local-press advertising. [Trufi in Your City](https://www.trufi-association.org/projects/trufi-in-your-city/)

### Inferences
- For the GAM, plan a funded data-maintenance role (or an MoU with operators, ARESEP or CTP) from day one. Every case where the data was "done once" decayed.
- Keep the data open (OSM plus GTFS published to Mobility Database or Transitland). It makes the project resilient if the app or company fails, and makes it fundable by GIZ, IDB or World Bank-type donors.
- Adoption in Cochabamba was organic, but it ran over years. Expect slow growth without marketing or an official endorsement.

### Gaps
- No formal Trufi post-mortem of failed or abandoned city apps was found, for example on Kigali's status after beta or whether Corsa and Rutómetro are still published.

## 5. Real-time and live bus tracking in these deployments

### Takeaway
Trufi-core now supports live GTFS-Realtime vehicle positions as an optional feature flag. The only documented Trufi real-time pilot is Kigali, using hardware GPS devices installed by a partner, Enrouteq, on 60+ buses. No Trufi deployment was found to use a driver-phone app or crowdsourced positions.

The open-source building blocks for cheap real-time are mature: Traccar for tracker ingestion, TheTransitClock for predictions, and GPS-to-GTFS tools. Integrating them is the team's job.

### Cited Findings
**trufi-core.** Features include "Live GTFS-RT vehicle positions" (route-colored bus markers, live indicators on itinerary cards) behind an optional flag. It routes through OTP 1.5, 2.4 or 2.8, and also has a pure-Dart `trufi_core_planner` package for GTFS parsing and routing. [trufi-core GitHub](https://github.com/trufi-association/trufi-core)

Recent commits ("persist the built index so cold starts load a snapshot", "take ride durations from stop_times") suggest the in-app planner is becoming capable of running without OTP. Not confirmed. [trufi-core commits](https://github.com/trufi-association/trufi-core/commits/main)

**Kigali beta:**
- The beta app showed buses tracked by GPS devices installed by partner Enrouteq, with 60+ buses tracked in the pilot.
- The team said good ETA calculation needs GPS tracking.
- Field test: the moving icon on screen was a different Kigali Bus Services bus from the one the tester was on. This illustrates vehicle-to-trip matching errors.

Source: [Trufi – Beta testing Kigali app](https://www.trufi-association.org/beta-testing-our-kigali-app/)

A Kigali hackathon runner-up proposed real-time wait times. It is unclear whether it was adopted. [Trufi – Kigali hackathon](https://www.trufi-association.org/kigalis-smart-mobility-hackaton-highlights/)

**Abidjan (Ewarren, DT4A challenge).** A ticketing app intended to turn static GTFS into dynamic GTFS for informal transport, piloted on a gbaka line and a ferry line. [DT4A blog](https://digitaltransport4africa.org/blog/)

**Stellenbosch (GoMetro).** Logged about 10 minibus taxis over 30 days of operations for EV-transition analysis. [DT4A – Stellenbosch](https://digitaltransport4africa.org/gtfs-dataset-from-stellenbosch/)

**TheTransitClock:**
- Open-source Java system that uses "any type of real-time GPS data" to produce real-time transit information and arrival predictions.
- Has Traccar and Barefoot client modules. Topics include AVL, GTFS and gtfs-realtime.
- Repo status: 87 stars, 86 open issues, 14 open PRs, not archived. It still has a Travis CI badge, which suggests aging CI.

Source: [TheTransitClock GitHub](https://github.com/TheTransitClock/transitime)

**Traccar.** Apache-licensed, self-hostable GPS tracking server. Supports 200+ protocols and 2,000+ device models (e.g., TK103, GT06-class) and has phone client apps. You still need hardware, SIMs and server maintenance. [Traccar](https://www.traccar.org/); [iTechGuides Traccar guide](https://www.itechguides.com/traccar-open-source-gps-tracking-platform-setup-costs-hardware-and-alternatives/)

**GPS-2-GTFS.** A 2024 Python package that turns raw transit GPS data into GTFS. [arXiv 2412.15221](https://arxiv.org/pdf/2412.15221)

**osm-pt-routebuilder.** Trufi's tool that builds and updates OSM route relations from GPS traces. It can reuse the same tracker or phone traces for route-geometry maintenance. [GitHub org repos](https://github.com/orgs/trufi-association/repositories?sort=updated)

### Inferences
A plausible low-cost GAM real-time stack:

1. Cheap 4G trackers or a driver phone app (e.g., Traccar Client) send positions to Traccar.
2. TheTransitClock, or a lighter custom matcher, maps positions to GTFS trips and produces GTFS-RT VehiclePositions and TripUpdates.
3. The feed is consumed by a trufi-core app with the live flag on, and can also be offered to Google Maps, Moovit and Transit.

Kigali shows that vehicle-to-route assignment is the hard part. GAM operators running several routes from shared terminals will need drivers to log route or trip, or devices fixed to one route.

### Gaps
- No public details on Enrouteq's Kigali feed format, cost per bus, or whether it continued.
- TheTransitClock's last commit date was not visible, so its maintenance status in 2026 is unconfirmed.
- No sources on Flocktracker, a crowdsourced tracking app, in this pass.

## 6. Alternatives to forking Trufi: brief characterization

### Takeaway
Viable options for a small Costa Rica team, from least to most custom:

1. Publish open GTFS (and later GTFS-RT) and let Google Maps, Moovit and Transit consume it.
2. Fork trufi-core (Flutter, GPLv3, actively maintained, GTFS-RT ready).
3. Use OpenTripPlanner plus a custom app.
4. Use OneBusAway or TheTransitClock if real-time arrival prediction is the core product.

Data-commons models such as DT4A, MobilityData and Transitland exist mainly to host and validate the data. Several commercial informal-transit data players have died or stayed tiny (WhereIsMyTransport, Ma3Route).

### Cited Findings
**Trufi-core:**
- Flutter/Dart, iOS 13+. Licensed GPLv3, so a fork's source must stay open.
- Configurable OTP endpoint, offline or online search (Photon/Nominatim), map style, locales and feature flags.
- Backend: OTP plus GTFS, with optional GTFS-RT.
- Trufi has public repos for the server stack (`trufi-server-otp`, `trufi-server-photon`, `trufi-server-tileserver-gl`, `trufi-gtfs-builder`).

Sources: [trufi-core GitHub](https://github.com/trufi-association/trufi-core); [GitHub org repos](https://github.com/orgs/trufi-association/repositories?sort=updated)

Trufi also sells custom app services. [Trufi services](https://www.trufi-association.org/services/custom-applications-for-inclusive-sustainable-transport/)

**OpenTripPlanner.** GTFS.org lists Trufi as a cross-platform Flutter app built on OTP, which confirms OTP as the standard routing engine for this class of app. [GTFS.org – apps](https://old.gtfs.org/resources/apps/)

**Moovit.** Already covers San José buses and operators. It is the incumbent and a possible distribution partner for any GTFS a team produces. [Moovit – San José](https://moovitapp.com/index/en/public_transit-San_Jos%C3%A9-San_Jose-city_100399-2967)

**WhereIsMyTransport.** Defunct since Oct 2023. Not an option. [TechCabal](https://techcabal.com/2023/10/26/whereismytransport-shutting-down/)

**TheTransitClock.** Open-source real-time prediction from raw AVL. Java, Tomcat and a database; operationally heavy for a small team. [GitHub](https://github.com/TheTransitClock/transitime)

**Traccar.** Self-hosted tracker ingestion server. [Traccar](https://www.traccar.org/)

**Ma3Route.** Crowdsourced traffic and matatu info from Nairobi. A model of user-reported data, but tiny: 3 staff, about $25K raised. [Tracxn](https://tracxn.com/d/companies/ma3route/__GP4CIk4tAMLseVzW2zjQ_i2-1-JY5cBlyk3dp2mgvNM)

**Digital Matatus.** Academic project (Columbia, MIT, University of Nairobi) that produced open GTFS used by third-party apps. A data-first model rather than an app-first one. [MIT Civic Data Design Lab](https://civicdatadesignlab.mit.edu/Digital-Matatus); [Engineering for Change](https://www.engineeringforchange.org/solutions/product/digital-matatus/)

**DigitalTransport4Africa (DT4A):**
- A WRI-led digital commons for open GTFS, open-source software and knowledge sharing, with a GitLab repository of feeds from Addis Ababa, Kigali, Kinshasa, Stellenbosch and Alexandria.
- Ran innovation challenges that funded data collection.
- Africa-only, but it is a model for governance and funding.

Sources: [WRI – DT4A](https://www.wri.org/initiatives/digital-transport-africa); [DT4A GitLab](https://git.digitaltransport4africa.org/explore/projects); [WRI – Innovation challenge winners](https://africa.wri.org/update/wri-and-partners-select-4-winners-digital-transport-africa-innovation-challenge)

**MobilityData / Mobility Database.** Validates and catalogs GTFS feeds. Trufi used acceptance as a quality bar. [Trufi – MobilityDatabase](https://www.trufi-association.org/how-good-is-trufi-transport-data-good-enough-for-mobilitydatabase/)

**TUMI Datahub.** Hosts Trufi GTFS (e.g., Accra). [TUMI Datahub – GTFS Accra](https://hub.tumidata.org/dataset/trufi_gtfs_accra_accra)

**MapaNica (Managua).** Volunteer OSM bus mapping, published as web maps plus GTFS. The closest Central American precedent. [MapaNica](https://www.mapanica.net/comunidad.html)

### Inferences
- **Recommended path for a small GAM team:**
  1. Build the GTFS (from OSM relations and/or official ARESEP/CTP route data) and validate it against Mobility Database standards.
  2. Get it into Google Maps, Moovit and Transit, which gives immediate reach.
  3. Then either fork trufi-core or build a thin custom app on OTP for features the big apps lack: fares, SINPE payments, Spanish-first UX, offline use.
  4. Add real-time last, via Traccar and a GTFS-RT generator, starting with one cooperative operator.
- Forking Trufi is attractive because the codebase is active in 2026, Spanish-speaking (the core team is in Bolivia), offline-capable and GTFS-RT ready. The GPLv3 obligation and a dependence on Flutter skills are the main constraints.
- Trufi itself could be hired or partnered with. It has Latin American donor-project experience with GIZ and has done formal-operator GTFS work (Lima AEMUS).

### Gaps
No sources were retrieved in this pass for the following. The report writer should not characterize them from these notes:
- Transit app (Transit Inc.) partnership terms or its Costa Rica coverage.
- Moovit's "Transit Data" or partner programs, and their terms.
- Flocktracker.
- Tranzer.
- OneBusAway's current status.
- MobilityData's specific tools (GTFS validator, GBFS, etc.) beyond the Mobility Database.

Also not found: Trufi pricing for a custom city app, and typical hosting cost figures for OTP plus Trufi servers.
