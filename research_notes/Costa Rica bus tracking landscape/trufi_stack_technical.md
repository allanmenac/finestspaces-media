# Trufi Association open-source transit stack: technical and licensing assessment for a Costa Rica fork

Research date: 2026-10-10. Method: blobless git clones of the Trufi repos (commit history, tags, READMEs, LICENSE files, source inspection), the GitHub org listing, OpenTripPlanner's own docs (sparse clone of `opentripplanner/OpenTripPlanner` `doc/user`), and web search. **Limitation:** from this research environment, trufi-association.org, wiki.openstreetmap.org and docs.opentripplanner.org would not resolve (DNS ENOTFOUND). This was a sandbox problem, not evidence the sites are down. Everything about Trufi's services and website comes from search-result snippets, not from reading the full pages. Facts from the code (licenses, versions, features) are first-hand.

## 1. What repositories make up the stack today, and what does each do?

### Takeaway
The 2026 stack is a Flutter monorepo of modular packages (trufi-core v5.x) plus per-city app repos that consume it (trufi-app = Cochabamba). The backend is a set of small Docker repos: an OTP server (versions 1.5 to 2.8.1), Photon geocoding, a TileServer-GL repo, a Dart "Trufi Planner" GTFS router, and a .NET YARP reverse proxy with analytics. A TypeScript tool, trufi-gtfs-builder, turns OSM route relations into GTFS. The older JS toolchain that the trufi-core README still links (osm-public-transport-export, geojson-to-gtfs) could not be cloned and looks deprecated or removed.

### Cited Findings
- The org has 40 repositories. The most recently updated include gtfs-aemus-lima, trufi-server-otp, trufi-sanaa, trufi-app, trufi-server-planner, osm-search-data-export, trufi-core and trufi-gtfs-builder, all pushed between Sept 14 and Sept 28, 2026 — [GitHub org repo list](https://github.com/orgs/trufi-association/repositories?type=all&sort=updated)
- **trufi-core** (Dart, GPL-3.0, 113 stars, 54 forks, 2 open issues): "A cross-platform multi-modal public transport app built in Flutter... the foundation that powers public transport apps in cities around the world, using open data (GTFS, OSM) and open source routing engines like OpenTripPlanner" — [trufi-core README](https://github.com/trufi-association/trufi-core); stars, forks and issues from [GitHub repo page](https://github.com/trufi-association/trufi-core)
- trufi-core is a Melos/Dart workspace monorepo in three layers: core packages, screen packages, and apps (`apps/example` is the reference implementation). The core packages are `trufi_core_interfaces`, `_utils`, `_base_widgets`, `_custom_material`, `_ui`, `_maps` (pluggable engine, ships with MapLibre GL), `_planner` (GTFS parsing and routing in pure Dart), `_routing` (OTP 1.5/2.4/2.8 integration), `_routing_ui`, `_search_locations`, `_poi_layers`, `_notifications` and `_navigation` (turn-by-turn). The screen packages are home, saved places, transport list, fares, feedback, settings and about — [trufi-core README](https://github.com/trufi-association/trufi-core)
- Packages are consumed as **git dependencies** (`git: url: ...trufi-core.git, path: packages/..., ref: main`), not from pub.dev. The `pub.dev/packages/trufi_core` URL returned 404 — [trufi-core README](https://github.com/trufi-association/trufi-core); [pub.dev](https://pub.dev/packages/trufi_core)
- **trufi-app** (GPL-3.0) is "Trufi-Core adaptation for Cochabamba, Bolivia", rebuilt on trufi-core v5. It bundles the GTFS (`assets/routing/cochabamba.gtfs.zip`), offline `.mbtiles` and map styles, and POI GeoJSON. `tools/` contains per-city data pipelines (`gtfs-bolivia-cochabamba`, `mbtiles-bolivia-cochabamba`, `pbf-bolivia-cochabamba`, `search-bolivia-cochabamba`) — [trufi-app README](https://github.com/trufi-association/trufi-app)
- Other city app repos: trufi-sanaa (GPL-3.0, updated Sept 2026), trufi-arequipa (Jul 2026), Trujillo-OMUS (GPL-3.0, May 2026), busboy-app (Duitama, Colombia, Aug 2025), trotro-app (Accra, Nov 2024), quirqui-rutas (Oruro, Sept 2023) and HackathonKigali (Sept 2025) — [GitHub org repo list](https://github.com/orgs/trufi-association/repositories?type=all&sort=updated)
- **trufi-server-otp**: Docker-based OpenTripPlanner. `./init.sh --gtfs <zip> --pbf <osm.pbf>` then `docker-compose up`. It ships Dockerfiles for OTP 1.5.0, 2.0.0, 2.2.0, 2.4.0, 2.7.0 and 2.8.1 (the default, "Latest stable (recommended)"). It enables the GTFS GraphQL API and sets router defaults (12 itineraries, max 4 transfers, 20-minute access/egress) — [trufi-server-otp README](https://github.com/trufi-association/trufi-server-otp)
- **trufi-server-photon**: Docker wrapper for Komoot's Photon geocoder (search and reverse geocoding). An init script downloads per-country Photon data from GraphHopper by ISO code — [trufi-server-photon README](https://github.com/trufi-association/trufi-server-photon)
- **trufi-server-planner**: Dart HTTP server that exposes the same `trufi_core_planner` GTFS routing algorithm used on-device (KD-tree stop index). It also serves the Flutter web build, "permitiendo que la versión web de trufi-app pueda usar routing sin necesidad de assets locales" — [trufi-server-planner README](https://github.com/trufi-association/trufi-server-planner)
- **trufi-server** (C#): "Production backend for the Trufi App with built-in analytics and automatic SSL". It has a YARP reverse proxy, Let's Encrypt via LettuceEncrypt, and request logging to PostgreSQL. `setup.sh` reads each service's `trufi-proxy.json` (Photon, OTP, etc.) and wires a subdomain to it — [trufi-server README](https://github.com/trufi-association/trufi-server)
- **trufi-server-tileserver-gl** (Apache-2.0), **trufi-mbtiles-generator** (GPL-2.0, Dec 2025), **trufi-pbf-extractor** (Dec 2025) and **trufi-server-poi_extractor** (GPL-3.0, Feb 2026) provide map tiles and data extraction. **trufi-server-modules** (MIT, May 2025) and **trufi-server-resources** (MIT, archived Dec 2024) are older backend packaging. The org also holds a fork of OpenTripPlanner (last updated Jun 2023) — [GitHub org repo list](https://github.com/orgs/trufi-association/repositories?type=all&sort=updated)
- **trufi-gtfs-builder** (TypeScript, v2.16.0, Sept 2026): "Trufi's General Transit Feed Specification (GTFS) tool allows you to create a map for your city." `osmToGtfs()` pulls OSM route relations via Overpass or a PBF file and emits GTFS, with options for `defaultCalendar` (e.g. `'Mo-Su 06:00-23:00'`), `frequencyHeadway`, `vehicleSpeed`, stops mode (`fakeStops` / `osmStops` / `customStops`), fares from `charge=*`, and travel times from `duration=*` tags. Examples are included for Cochabamba and Jilotepec (Mexico) — [trufi-gtfs-builder README](https://github.com/trufi-association/trufi-gtfs-builder)
- **osm-search-data-export** (MIT, © 2019 Trufi Association e.V., updated Sept 2026): Node library that builds offline search data (POIs, streets, junctions). Its README states the purpose: "countries where public transport works on demand and neither bus stops nor timetables exist" — [osm-search-data-export](https://github.com/trufi-association/osm-search-data-export)
- **osm-pt-routebuilder** (Jul 2025, README in Spanish): Jython scripts for JOSM that build or update OSM `route=bus` relations from GPS traces, using Valhalla map-matching — [osm-pt-routebuilder](https://github.com/trufi-association/osm-pt-routebuilder)
- **trufi-gtfs-simulator** (package name `trufi-gtfs-viewer`, Vite/TypeScript, Jan–May 2026): a web viewer that animates simulated vehicle positions from GTFS schedules, with no real feed — [trufi-gtfs-simulator](https://github.com/trufi-association/trufi-gtfs-simulator) (from inspecting the commit log: "trajectory precomputation", "active service filtering")
- The trufi-core README still lists `osm-public-transport-export`, `geojson-to-gtfs` and `gtfs-bolivia-cochabamba` as "complementary projects". `git clone` of `osm-public-transport-export` and `geojson-to-gtfs` failed with an authentication prompt, which GitHub returns when a repo is missing or private — [trufi-core README](https://github.com/trufi-association/trufi-core)

### Inferences
- A Costa Rica team would fork **trufi-app** as the template (the README recommends this) and pin a trufi-core tag rather than `ref: main`, because trufi-core ships breaking changes often (see §3).
- The minimum backend is trufi-server-otp (OTP 2.8.1) plus trufi-server-photon. A tile server is optional if you use a hosted MapLibre style or offline mbtiles. trufi-server (the proxy) is a convenience: any reverse proxy works.
- The trufi-core README links to tools that no longer resolve. Docs lag behind the code, so expect to read source.

### Gaps
- Could not list the 10 repos on page 2 of the org listing.
- Could not confirm whether osm-public-transport-export and geojson-to-gtfs were deleted, renamed or made private.

## 2. Licenses and obligations for a commercial or branded fork; trademark on "Trufi"

### Takeaway
The app layer (trufi-core, trufi-app and the city apps) is **GPL-3.0**. A distributed fork, including Play Store and App Store binaries, must publish its full corresponding source under GPL-3.0. Proprietary Flutter UI cannot be closed if it links these packages. Several backend repos (trufi-server, -otp, -photon, -planner, -simulator) have **no LICENSE file**. trufi-gtfs-builder declares ISC only in package.json and the README. OTP itself is LGPL-3.0. No trademark policy for "Trufi" was found.

### Cited Findings
- trufi-core LICENSE is the GNU GPL v3 (29 June 2007). README: "Copyright 2020-present — Trufi Association... free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" — [trufi-core](https://github.com/trufi-association/trufi-core)
- trufi-app LICENSE is GPL v3 — [trufi-app](https://github.com/trufi-association/trufi-app)
- Org listing licenses: trufi-sanaa, Trujillo-OMUS, HackathonKigali and trufi-server-poi_extractor are GPL-3.0. osm-search-data-export, trufi-server-modules, trufi-server-resources and chat-bot-report are MIT. trufi-server-tileserver-gl is Apache-2.0. trufi-mbtiles-generator and route-pages-wordpress are GPL-2.0. These show no license: trufi-server-otp, trufi-server-planner, trufi-gtfs-builder, trufi-server, trufi-gtfs-simulator, trufi-server-photon, trufi-pbf-extractor, trufi-arequipa, busboy-app, trotro-app and osm-pt-routebuilder — [GitHub org repo list](https://github.com/orgs/trufi-association/repositories?type=all&sort=updated)
- A check of the cloned repos confirmed **no LICENSE file** in trufi-server, trufi-server-otp, trufi-server-photon, trufi-server-planner, trufi-gtfs-builder or trufi-gtfs-simulator. trufi-gtfs-builder's `package.json` says `"license": "ISC"` and its README ends "## License ISC" — [trufi-gtfs-builder](https://github.com/trufi-association/trufi-gtfs-builder)
- OpenTripPlanner is under "the LGPL license" — [OTP docs index (repo copy)](https://github.com/opentripplanner/OpenTripPlanner/blob/dev-2.x/doc/user/index.md)
- **Conflicting license claim (historical):** search snippets of Trufi's own pages and older press coverage say the app is "AGPL-licensed" — [Trufi in Your City](https://www.trufi-association.org/projects/trufi-in-your-city/); [Trufi App goes Open Source (cross-post)](https://archive.digitalprinciples.org/?p=1966). The current LICENSE files in trufi-core and trufi-app are **GPL-3.0, not AGPL** — [trufi-core](https://github.com/trufi-association/trufi-core)
- A grep for "trademark" or "marca" across the trufi-core and trufi-app markdown found nothing. The shipped Cochabamba app uses bundle ID `app.trufi.navigator` and the name "Trufi Cochabamba" — [trufi-app README](https://github.com/trufi-association/trufi-app)

### Inferences
- **GPL-3.0 obligations for a branded fork:**
  - Ship or offer complete source of the app, including your modifications and your own Flutter code linked with trufi-core, under GPL-3.0.
  - Keep copyright notices.
  - Include the license text.
  - Give no further restrictions.
  - You can charge money and run a commercial business, but you cannot keep the app closed-source.
- Because the license is GPL and not AGPL, server-side modifications to anything you only *host* would not need publishing. In any case, the backend pieces are mostly OTP (LGPL) and Photon (Apache-2.0).
- **iOS caveat (general knowledge, not verified here):** the FSF and others have long argued that App Store terms conflict with GPL distribution, as in the VLC removal from the App Store in 2011. Trufi can ship on iOS as copyright holder. A fork carrying many contributors' GPL code carries a legal grey-zone risk on iOS that a lawyer should review.
- The unlicensed backend repos are "all rights reserved" by default. In practice they are thin Docker and shell wrappers, so a team can rewrite them or ask Trufi to add a license.
- trufi-gtfs-builder's ISC declaration in package.json and the README is probably enough to rely on, but ask Trufi to add a LICENSE file.
- With no trademark policy found, the safe course is to rebrand fully: new name, logo, bundle ID, and remove "Trufi" from the store listing. Keep the GPL attribution and copyright notice in the About screen.
- OSM-derived data (routes, tiles, search index) carries ODbL attribution and share-alike duties. This is general OSM knowledge and was not separately sourced here.

### Gaps
- No trademark registration or brand-use policy found for "Trufi". The website could not be read directly.
- No CLA or contributor terms found that would show whether Trufi could dual-license the code commercially.

## 3. Maintenance health 2025–2026: commits, releases, issues, contributors, Flutter and OTP versions

### Takeaway
After a near-dormant 2022–2024, trufi-core was revived in late 2025: v5.0.0 on 2025-12-23, then about 38 tagged releases through v5.27.0 on 2026-09-16. Activity is healthy but has a **bus factor of about 1–2**: one developer (Samuel Rioja) writes most commits across the stack, and is the only committer on most backend repos. The current stack targets Flutter/Dart ^3.10 and supports OTP 1.5, 2.4 and 2.8. OTP 2.8.1 is the default backend.

### Cited Findings
- trufi-core commits per year from git log: 2018: 537, 2019: 353, 2020: 71, 2021: 309, 2022: 19, 2023: 5, 2024: 1, 2025: 65, 2026 to date: 96. There are 1,456 commits in total and 31 distinct authors all-time, 6 of them in 2026 — [trufi-core commit history](https://github.com/trufi-association/trufi-core/commits/main)
- Authors of trufi-core commits since 2025-01-01: Samuel Rioja 81, Max Weber 44, Gustavo Guillen 18, Gustavo T. 12, and others 1–2 each — [trufi-core commit history](https://github.com/trufi-association/trufi-core/commits/main)
- Backend and tooling repos since 2025 are almost entirely one author (Samuel Rioja): trufi-server 58/58, trufi-gtfs-builder 55/55, trufi-server-planner 22/23, trufi-server-otp 11/11, trufi-gtfs-simulator 16/16, trufi-server-photon 5/5 — [trufi-server](https://github.com/trufi-association/trufi-server), [trufi-gtfs-builder](https://github.com/trufi-association/trufi-gtfs-builder), [trufi-server-planner](https://github.com/trufi-association/trufi-server-planner), [trufi-server-otp](https://github.com/trufi-association/trufi-server-otp)
- Release cadence (tags): v5.0.0 2025-12-23 → v5.1.0 2026-02-04 → v5.8.0 2026-04-17 → v5.14.0 2026-05-08 → v5.18.0 2026-06-30 → v5.22.0 2026-08-11 → v5.27.0 2026-09-16. There is also an `arequipa-lts` branch line (1.0.0 2025-05-06, 1.0.1 2026-07-31) — [trufi-core tags](https://github.com/trufi-association/trufi-core/tags)
- Pre-revival history: "Feat/Trufi Core version 4.0.0" (Feb 2024), "migrate truficore v4.0.0 to flutter v3.24.3" (May 2025), Android Gradle fixes (Nov 2025) — [trufi-core commit history](https://github.com/trufi-association/trufi-core/commits/main)
- The CHANGELOG records frequent **breaking changes** in minor versions. Examples: in 5.14.0, `HomeScreenConfig.showDepartureTimeChip` was removed; in 5.12.0, the fares data model was rebuilt; in 5.11.0, planner behavior changed — [trufi-core CHANGELOG](https://github.com/trufi-association/trufi-core/blob/main/CHANGELOG.md)
- Recent commits (Sept 2026) cover planner `maxTransfers`, two-transfer search, persisted planner index snapshots, walkable transfers and offline-search municipality labels. CI tests were made to "actually run" in Aug 2026 (#966) — [trufi-core commit history](https://github.com/trufi-association/trufi-core/commits/main)
- Open issues on trufi-core: 2 — [GitHub repo page](https://github.com/trufi-association/trufi-core)
- Requirements: Flutter SDK `^3.10.0` (Dart ^3.10.0), iOS 13.0+ — [trufi-core README](https://github.com/trufi-association/trufi-core). trufi-app pubspec specifies Dart `sdk: ^3.12.2`, app version 5.4.0+84 — [trufi-app](https://github.com/trufi-association/trufi-app)
- OTP support: providers `Otp15RoutingProvider`, `Otp24RoutingProvider` and `Otp28RoutingProvider`. trufi-server-otp defaults to 2.8.1 — [trufi-core README](https://github.com/trufi-association/trufi-core); [trufi-server-otp README](https://github.com/trufi-association/trufi-server-otp)
- Upstream OTP has moved on: 2.8.1 (2025-09-22), 2.9.0 (2026-03-18), 2.10.0 (2026-09-09) — [OTP Changelog](https://github.com/opentripplanner/OpenTripPlanner/blob/dev-2.x/doc/user/Changelog.md)
- trufi-app (Cochabamba) has 72 commits in total, 61 of them in 2026. It upgrades to each new trufi-core within days (e.g. "trufi-core v5.22.2 -> v5.27.0", 2026-09-16) — [trufi-app commits](https://github.com/trufi-association/trufi-app/commits/main)

### Inferences
- The project is actively maintained as of Sept 2026, but it is a small team with heavy reliance on one maintainer. The 2022–2024 near-dormancy shows activity depends on funded projects, such as the new city apps in 2025–26 (Arequipa, Trujillo, Sana'a, Lima).
- Supported OTP lags upstream by about two minor versions (2.8.1 vs 2.10.0). This is acceptable, but a fork may need to adapt the GraphQL provider for newer OTP.
- Pin to tags. Upgrading across 5.x minors means absorbing breaking changes roughly monthly.

### Gaps
- Open PR count and issue counts for other repos were not obtained (GitHub API access was blocked for this org in the research session).
- No public roadmap was found.

## 4. Real-time vehicle positions (GTFS-RT), crowdsourcing and driver apps

### Takeaway
Since v5.8.0 (April 2026), trufi-core has **optional live GTFS-RT vehicle display**, but only via OTP 2.x. The app polls OTP's GraphQL `vehiclePositions` every 10 seconds, and OTP must itself be configured with a `vehicle-positions` updater pointing at an external GTFS-RT feed. The Trufi stack contains **no** component that *produces* GTFS-RT: no driver app, no AVL ingestion, no crowdsourced tracking. trufi-server-otp's default config enables no real-time updaters.

### Cited Findings
- README feature: "Live GTFS-RT vehicle positions — optional real-time bus markers tinted by route color, with live indicators on itinerary cards" — [trufi-core README](https://github.com/trufi-association/trufi-core)
- Commit "Add live GTFS-RT vehicle positions support (#879)" is dated 2026-04-17. Follow-ups: "live-vehicle info panel on tap + configurable initial toggle state (#981)" (2026-08-11) and "Fix: live vehicles vanished during search in hybrid deploys (#982)" (2026-08-12) — [trufi-core commits](https://github.com/trufi-association/trufi-core/commits/main)
- Implementation: `OtpVehiclePositionsProvider` "Polls the OTP GraphQL endpoint periodically for GTFS-Realtime vehicle positions". It queries `routes { patterns { vehiclePositions { vehicleId label lat lon heading speed lastUpdated trip { gtfsId } } } }` with a default `pollInterval` of 10 seconds. It is enabled via `Otp28RoutingProvider(liveVehiclesEnabled: true)` (default `false`) — [vehicle_positions_service.dart](https://github.com/trufi-association/trufi-core/blob/main/packages/trufi_core_routing/lib/src/services/vehicle_positions_service.dart); [otp_28_routing_provider.dart](https://github.com/trufi-association/trufi-core/blob/main/packages/trufi_core_routing/lib/src/providers/otp_2_8/otp_28_routing_provider.dart)
- A generic `RealtimeVehiclesProvider` interface exists in `trufi_core_interfaces`, so other sources can plug in — [trufi_core_interfaces](https://github.com/trufi-association/trufi-core/tree/main/packages/trufi_core_interfaces)
- trufi-server-otp 2.8.1 `router-config.json` contains `routingDefaults` and `transit` only, with no `updaters` block. `otp-config.json` enables only `GtfsGraphQlApi` — [trufi-server-otp](https://github.com/trufi-association/trufi-server-otp)
- OTP's `vehicle-positions` updater requires `feedId` and `url` (a GTFS-RT protobuf over HTTP) and polls with a default `frequency` of `PT1M`. `fuzzyTripMatching` exists since 2.5. `features` covers `position`, `stop-position` and `occupancy`. Updater support for vehicle positions dates from OTP 2.2. OTP also supports `stop-time-updater` (TripUpdates over HTTP), `mqtt-gtfs-rt-updater` (streaming TripUpdates) and `real-time-alerts` — [OTP GTFS-RT-Config](https://github.com/opentripplanner/OpenTripPlanner/blob/dev-2.x/doc/user/GTFS-RT-Config.md)
- trufi-gtfs-simulator animates *schedule-derived* vehicle positions in a browser and is not real-time — [trufi-gtfs-simulator](https://github.com/trufi-association/trufi-gtfs-simulator)
- A grep across the cloned Trufi repos for "crowdsourc", "driver app" and "gps tracker" found no crowdsourced-tracking or driver-app component. osm-pt-routebuilder uses GPS traces only to *map routes* into OSM, not for live tracking — [osm-pt-routebuilder](https://github.com/trufi-association/osm-pt-routebuilder)

### Inferences
- For Costa Rica live tracking, the team must build or buy the **producer side**:
  - a driver or onboard GPS app, or an integration with operators' AVL;
  - an ingestion service that matches positions to GTFS trips and emits a GTFS-RT VehiclePositions protobuf;
  - OTP `vehicle-positions` updater configuration.
- The end-to-end latency floor is OTP's poll interval plus the app's 10-second poll. OTP's default is 1 minute and can be shortened.
- Trip matching is the hard part for frequency-based or informal services. Trufi-style GTFS uses frequencies (`frequencyHeadway`) and synthetic calendars, so `trip_id` matching may need `fuzzyTripMatching` or a custom provider. Using the `RealtimeVehiclesProvider` interface to bypass OTP entirely (app polls your own positions API) is likely simpler.
- Live tracking is only available with OTP 2.x routing, not with the offline Trufi Planner or OTP 1.5. Hybrid deploys exist, per fix #982.

### Gaps
- No public Trufi deployment with live vehicles was identified, so maturity in production is unknown.
- No TripUpdates or ETA prediction features exist in the app (none seen in README or changelog), but this was not exhaustively verified in code.

## 5. Process to launch a new city: data, hosting, steps

### Takeaway
The documented DIY path has six steps:
1. Map every bus route as an OSM `route=bus` relation (optionally from GPS traces with osm-pt-routebuilder).
2. Generate GTFS with trufi-gtfs-builder, using synthetic calendars, headways and speeds.
3. Download an OSM PBF.
4. Run trufi-server-otp (OTP 2.8.1, 2 GB default heap) and trufi-server-photon (1–2 GB for a small country).
5. Optionally add tiles, or bundle offline mbtiles and search data.
6. Fork trufi-app, set endpoints, branding and locales, and publish.

Hardware needs for a GAM-sized network are modest: on the order of 4–8 GB RAM total, which is an inference.

### Cited Findings
- Build-it-yourself steps: "Bootstrap from the example... fork trufi-app or copy apps/example". Then "Configure your city": set the OTP endpoint, configure search (Photon or Nominatim online, and/or offline `search.json` from osm-search-data-export), configure POI layers, map style, theme, locales and feature flags ("live vehicles, wheelchair toggle"), and replace brand assets — [trufi-core README](https://github.com/trufi-association/trufi-core)
- GTFS from OSM: `osmToGtfs` with `OSMOverpassDownloader(bounds)` or `OSMPBFReader`. `gtfsOptions` include `agencyTimezone`, `defaultCalendar: () => 'Mo-Su 06:00-23:00'`, `frequencyHeadway: () => 300`, `vehicleSpeed` and `stopsConfig` (`fakeStops` / `osmStops` / `customStops`). Fares come from OSM `charge=*` or `defaultFares`. Running time comes from `duration=*` on the route relation, spread proportionally across stops — [trufi-gtfs-builder README](https://github.com/trufi-association/trufi-gtfs-builder)
- OTP server: prerequisites are Docker, a GTFS zip and an OSM PBF (from Geofabrik). The first run builds the graph ("takes a few minutes"). The default memory is 2 GB (`mem_limit: 2g`, `-Xmx2G`), and `JAVA_MAX_MEMORY=-Xmx8G` is suggested "for larger datasets". To rebuild after a GTFS update, delete `graph.obj` and restart — [trufi-server-otp README](https://github.com/trufi-association/trufi-server-otp)
- Photon memory: "Small countries: 1-2 GB. Medium countries: 2-4 GB" — [trufi-server-photon README](https://github.com/trufi-association/trufi-server-photon)
- OTP general sizing: memory "can vary from less than one GB to more than 100 GB. For example, including all available data for Finland takes a bit over 10 GB but for Germany it requires 95 GB." Single-thread CPU performance matters, and multiple cores help because real-time updaters run in a separate thread — [OTP System Requirements](https://github.com/opentripplanner/OpenTripPlanner/blob/dev-2.x/doc/user/System-Requirements.md)
- Trufi's guidance (snippet): "You will need to buy or rent a server (e.g. from DigitalOcean) which you will then use as the production server" — [Trufi in Your City](https://www.trufi-association.org/projects/trufi-in-your-city/)
- A 2020 conference talk lists what a city must organize: "getting a team together, finance the server and map costs, do marketing, convince governments to collaborate" — [SotM 2020 talk: How to publish a multi-modal journey app based on OSM with Trufi App](https://pretalx.com/sotm2020/talk/373NDC/) (historical, 2020)
- Example per-city pipeline folders in trufi-app: `tools/gtfs-…`, `tools/mbtiles-…`, `tools/pbf-…` and `tools/search-…` — [trufi-app](https://github.com/trufi-association/trufi-app)

### Inferences
- **Costa Rica data reality:** if no authoritative GTFS exists for GAM buses, the dominant cost is mapping hundreds of routes as OSM relations: field GPS traces plus JOSM editing. Trufi's tooling is built exactly for this informal, no-timetable case.
- GTFS schedules produced this way are **synthetic** (frequencies and assumed speeds), so planned times are approximate. This also complicates GTFS-RT trip matching (§4).
- Rough hosting for the GAM metro (Costa Rica is small, comparable to Trufi's "small country" tier): one VM with about 4–8 GB RAM and 2–4 vCPU should cover OTP (2–4 GB heap for a metro GTFS plus a Costa Rica PBF) and Photon (1–2 GB). This is an inference from the defaults above and has not been benchmarked.
- If the route set is small, the on-device Trufi Planner (offline GTFS) can avoid needing OTP at all for routing. OTP 2.x is still required for the built-in live-vehicle path.

### Gaps
- No Trufi-published step-by-step "new city" guide was readable directly. Website access failed, and the OSM wiki pages were unreachable.
- No measured RAM or CPU figures for a Trufi deployment exist beyond the Docker defaults.

## 6. Paid services, partnerships and pricing

### Takeaway
Trufi Association (a German e.V., Hamburg) sells services: building and running a city app (adapting it to local identity, mapping informal routes, building a "virtual schedule", hosting, store publishing) and OTP consulting and hosting. **No published pricing was found.** The funding model is hosting plus city-custom extensions.

### Cited Findings
- osm-search-data-export LICENSE: "Copyright (c) 2019 Trufi Association e.V." — [osm-search-data-export](https://github.com/trufi-association/osm-search-data-export). Idealist lists "Trufi Association e.V., Hamburg" — [Idealist](https://www.idealist.org/pt/ong/b6f6a9fef45241f8b0bc1410e5230bd4-trufi-association-ev-hamburg)
- Services to cities (snippet): adapting the app to local identity, mapping informal routes, building a virtual schedule, running the schedule server, POIs for search, support through launch and publishing to app stores. Trufi runs a multi-instance backend and "provides paid services for several communes and some unpaid to communities" — [Trufi in Your City](https://www.trufi-association.org/projects/trufi-in-your-city/)
- OTP consulting page (snippet, about 2 years old): integration, customization, data integration, optimization, training and support, and hosting on Trufi servers. It states OTP was implemented "for cities in Africa, Europe, and Latin America" — [OpenTripPlanner Consulting – Trufi Association](https://www.trufi-association.org/services/opentripplanner/)
- Funding model (historical, about 2020): "finances its costs through server hostings and city-custom extensions" — [OSM wiki: Trufi Association](https://wiki.openstreetmap.org/wiki/Trufi_Association)
- The trufi-core README says: "Please contact the Trufi Association to get an app for your city, too" — [trufi-core README](https://github.com/trufi-association/trufi-core)
- Deployments and pilots: Cochabamba, Duitama, Accra, Addis Ababa, plus pilots in Manila and La Paz (2020 webinar) — [UITP/SSATP webinar](https://www.ssatp.org/node/1003). There are newer repos for Arequipa, Trujillo, Sana'a, Lima and Kigali (§1). "Arequipa Bus" was described as Trufi's first official city app (search snippet) — [Trufi Association projects](https://www.trufi-association.org/projects/)

### Inferences
- For a Costa Rica team, Trufi is a credible contractor for route mapping, GTFS and OTP hosting, even if the team builds its own branded app. Request a quote.
- Its Latin American experience (Bolivia, Peru, Colombia, Mexico) is directly relevant to informal-ish Spanish-language bus systems.

### Gaps
- No price list, day rates or typical project budgets found.
- No public contract terms found, such as data ownership or hosting SLA.

## 7. Spanish-language support and offline capabilities

### Takeaway
Spanish is first-class: the packages ship en/es/de `.arb` files, the Cochabamba app defaults to Spanish, and much developer documentation is in Spanish. Offline support is strong:
- offline vector maps (bundled mbtiles);
- offline routing on the device from a bundled GTFS (Trufi Planner);
- offline search (bundled search index).

This suits users with limited data plans. Live vehicles naturally require connectivity.

### Cited Findings
- "Localization-ready with per-package Flutter `.arb` translations (English, Spanish and German included)". New locales are added by copying an `.arb` file — [trufi-core README](https://github.com/trufi-association/trufi-core)
- trufi-app sets `defaultLocale: const Locale('es')`, and its README is written in Spanish — [trufi-app](https://github.com/trufi-association/trufi-app)
- Aug 2026 l10n work: "locale-aware time, distance and duration formats (#945)", "forward the app language to routing and geocoding" — [trufi-core commits](https://github.com/trufi-association/trufi-core/commits/main)
- trufi-app features: "Mapas Offline: 4 estilos", "Routing Offline: Planificación de rutas offline usando GTFS", "Routing Online: ... OTP 2.8.1 y OTP 1.5.0". The GTFS and `.mbtiles` are bundled as assets — [trufi-app README](https://github.com/trufi-association/trufi-app)
- `OfflineMapLibreEngine` is "fully offline... Requires bundled `.mbtiles`, style JSON, sprites, and fonts as Flutter assets" — [trufi_core_maps README](https://github.com/trufi-association/trufi-core/tree/main/packages/trufi_core_maps)
- Offline search: asset-based search via osm-search-data-export (`json-compact` format) — [trufi-core README](https://github.com/trufi-association/trufi-core)
- Offline planner improvements in 2026: "persist the built index so cold starts load a snapshot (#993)", "Content-aware offline extraction + shared tile sets (#979)" — [trufi-core commits](https://github.com/trufi-association/trufi-core/commits/main)

### Inferences
- Costa Rican Spanish needs only light string tweaks: local terms such as "parada" and "bus" versus Bolivian "trufi" or "micro". This can be done by overriding `.arb` strings from the host app (the wiki "Custom Translations" guide is linked in the README).
- Bundling GAM offline mbtiles, GTFS and the search index will raise app size. Size was not measured; Cochabamba's asset sizes were not checked.

### Gaps
- No data on app binary size with offline assets.
- No evaluation of offline planner quality on a network the size of GAM's.

---

### Overall feasibility notes for Costa Rica (inferences only)
- **Technically forkable:** the stack is modern (Flutter 3.x, OTP 2.8), modular, actively released in 2026, and designed for informal bus networks without official GTFS.
- **License constraint:** the app must be open-sourced under GPL-3.0. A closed proprietary app is not possible without a separate license from Trufi Association, which was not found to be offered.
- **Live tracking is not included:** Trufi only *consumes* GTFS-RT through OTP 2.x. The vehicle-side tracking (driver or AVL apps and a GTFS-RT producer) is greenfield work.
- **Maintenance risk:** frequent breaking 5.x releases and heavy dependence on one maintainer. Pin versions and budget for upgrades.
