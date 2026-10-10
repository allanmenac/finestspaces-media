# Costa Rican Government Initiatives, Regulation and Public Data on Bus Route Info and Live Tracking (GAM focus)

Research date: 2026-10-10. Method note: direct page fetches to .go.cr and most Costa Rican news domains were blocked by this environment's egress proxy, so findings come from search-engine summaries of the cited pages (not full-text reads). Dates marked "approx." were inferred from search-index age, not read off the page; verify before quoting.

## 1. CTP / MOPT: official apps, route lookup, real-time info, GPS/AVL requirements

### Takeaway
As of Oct 2026 there is no official government real-time bus tracking for buses, and nothing found shows a legal or contractual GPS/AVL requirement on bus concessionaires. The state's main deliverables are a static route-and-stop viewer from the CTP (public since about June 2026) and a "Sistema Nacional de Información" for transit users (MOPT, CTP, ARESEP, INCOFER, built by UCR). That system's first phase put INCOFER trains, not buses, into Google Maps in real time in Aug 2026, using the UbiRider platform.

### Cited Findings
**CTP route and stop viewer (implemented, static only)**
- The CTP opened a free interactive viewer on its website. It shows authorized routes, branches (ramales), direction of travel and stops nationwide. Users can filter by province, canton and district, see which routes use a given stop, and download results in several formats. Semanario Universidad dated the launch about 4 June 2026. — [Semanario Universidad](https://semanariouniversidad.com/pais/ctp-habilita-herramienta-para-que-ciudadania-consulte-rutas-y-paradas-de-autobus-en-todo-el-pais/); [La Nación](https://www.nacion.com/el-pais/ahora-puede-consultar-en-linea-todas-las-rutas-y/HQFXAMB3YVAX3E3ZBU2PSR4VKY/story/); [Repretel](https://www.repretel.com/noticia/lanzan-plataforma-digital-para-consultar-rutas-y-paradas-de-autobus-en-todo-el-pais/)
- Development of the viewer began in 2021. Until recently only CTP technical staff used it, and its interface and accessibility were improved in 2025–2026. The CTP warns that the data can change after technical reports or Junta Directiva decisions, and that official, certified information must be requested through institutional channels. — [Semanario Universidad](https://semanariouniversidad.com/pais/ctp-habilita-herramienta-para-que-ciudadania-consulte-rutas-y-paradas-de-autobus-en-todo-el-pais/); [La Nación](https://www.nacion.com/el-pais/ahora-puede-consultar-en-linea-todas-las-rutas-y/HQFXAMB3YVAX3E3ZBU2PSR4VKY/story/)
- The viewer shows no live bus positions. — [La República summary via search](https://www.larepublica.net/noticia/usuarios-podran-ver-en-tiempo-real-el-recorrido-de-los-buses)

**National Transit Information System (announced Aug 2026; trains only so far)**
- The UCR is leading a platform to centralize official data on routes, stops, schedules, frequencies and fares, to be integrated later with Google Maps and other services. It is coordinated with the CTP, MOPT, ARESEP and INCOFER. Technical work is done by UCR's Laboratorio de Sistemas Inteligentes de Movilidad (SIMOVI). No launch date or URL had been published. — [Delfino, Aug 2026](https://delfino.cr/2026/08/ctp-anuncia-creacion-de-sistema-nacional-con-informacion-de-rutas-horarios-y-tarifas-de-transporte-publico)
- Phase 1 (late Aug 2026) put INCOFER trains in Google Maps with real-time location and schedules on all three passenger lines: Alajuela–Heredia–SJ, Cartago–SJ and Belén–SJ. INCOFER credits the Government of Portugal, UbiRider and SIMOVI-UCR, and says this is the first phase of the national system run jointly by MOPT, CTP, ARESEP and INCOFER. — [INCOFER](https://www.incofer.go.cr/pasajeros-de-tren-podran-conocer-el-estado-del-servicio-en-tiempo-real/); [Monumental, 26 Aug 2026](https://www.monumental.co.cr/2026/08/26/trenes-de-incofer-apareceran-en-google-maps-con-ubicacion-y-recorrido-en-tiempo-real/); [Telediario](https://www.telediario.cr/nacional/pasajeros-podran-consultar-trenes-de-incofer-en-tiempo-real); [La República](https://www.larepublica.net/horarios-y-llegada-de-trenes-a-cada-estacion-se-podran-revisar-por-google-maps-en-tiempo-real/)
- A UCR study (approx. 2024) concluded that "en Costa Rica no existe un medio oficial de información del transporte público en modalidad autobús". It found that the CTP and ARESEP publish lists that lack complete user information. — [UCR Kerwa repository](https://www.kerwa.ucr.ac.cr/server/api/core/bitstreams/bcdd48d6-3332-465a-92f9-1f67fc0a6bfc/content); see also [UCR: Sistema de información para las personas usuarias](https://www.kerwa.ucr.ac.cr/server/api/core/bitstreams/c065f1f1-fbee-4bfe-ad02-81d50f049068/content)

**Earlier MOPT and CTP efforts (dated, status unknown)**
- 2015: the MOPT launched an open-data platform for public transport with UNDP support, promising national bus routes, schedules and authorized stops. Whether it is still maintained could not be confirmed. — [El Mundo CR](https://elmundo.cr/costa-rica/mopt-crea-plataforma-de-datos-abiertos-para-conocer-transporte-publico/); [La República](https://www.larepublica.net/noticia/ciudadanos_tendran_acceso_a_datos_abiertos_de_transporte_publico)
- CTP "transporte inteligente" project (date not visible): a Centro de Gestión, about 1,700 GPS units on buses, and agreements with the San José and Heredia municipalities to use their cameras. Current status unknown. — [Primera Plana](https://primeraplana.or.cr/es/Gobierno_al_D%C3%ADa/Arranca_el_transporte_inteligente_en_servicio_de_autobuses_en_Costa_Rica/)
- The MOPT published a "Guía estándar para el diseño de parabuses y estaciones" (MOPT-SPS-G-2025-001, Nov 2025). It is a stop-design standard, relevant to where real-time displays would go. — [MOPT PDF](https://www.mopt.go.cr/sites/default/files/destacados/planificacion-sectorial/documentacion/publicaciones/2026/mopt-sps-g-2025-001-guia-estandar-para-el-diseno-de-parabuses-y-estaciones.pdf)

### Inferences
- Static route and stop data now has an official, downloadable source in the CTP viewer. For a startup this is the best legal base for building a GTFS-like dataset. The terms of use and re-use license still need checking.
- The state has chosen an outsourced model for real-time info: UbiRider plus UCR, feeding Google Maps. The same vendor (UbiRider) is also partnered with the bus operators' chamber Canatrans (see section 7). A private app would be competing with, or plugging into, that stack.
- No GPS mandate means any live bus positions depend on operators volunteering them, on validator data from SINPE-TP (section 4), or on crowdsourcing.

### Gaps
- Whether the CTP viewer has a public API, bulk export or a stated license. Pages could not be fetched.
- Whether the 1,700-GPS CTP project was ever implemented, and its date.
- Timeline for buses joining the national information system.

## 2. ARESEP: tariff methodology, operational data, GPS monitoring, open data

### Takeaway
ARESEP is the state body with the most bus data. It has run GPS pilots (225–254 buses), publishes a nationwide GPS-surveyed route geometry layer (2015–2018 vintage, WFS), and gets passenger and electronic-payment data under law. It does not require continuous GPS from operators. Its tariff rules rely on CTP/ARESEP "official" demand data, and a new tariff model with SINPE-TP incentives was expected in H2 2026.

### Cited Findings
- **Tariff methodology (approved 25 Feb 2016):** passenger counts are central because route costs are divided among users. The methodology stopped accepting operator-reported counts and uses only official CTP or ARESEP data under 3 years old; without such data it assumes 100% occupancy. — [ARESEP news](https://aresep.go.cr/noticias/aresep-aprobo-nueva-metodologia-para-tarifas-de-autobus/)
- ARESEP later moved to again consider automatic counters on buses and monthly operator statistics, filtered through an "intervalo de confianza" protocol. — [La Nación](https://www.nacion.com/el-pais/servicios/aresep-alista-reglas-para-incorporar-datos-de/MYMN5MWM5FHKRLC6FLGS5VQMY4/story/)
- **ARESEP GPS pilot (approx. mid-2021 by index age):** 225 GPS devices for 3 months on randomly chosen routes in all 7 provinces, with Racsa's technical support. Its purpose was to check schedules, routes and authorized stops. The same report says the CTP was refusing to give ARESEP key data such as passengers per route. — [La Nación](https://www.nacion.com/el-pais/servicios/aresep-seguira-rastro-a-225-buses-mediante-gps/PGHMSINT5JAU3E3HNFYRR66UAY/story/); [ARESEP: "ARESEP instalará GPS en autobuses"](https://aresep.go.cr/noticias/aresep-instalara-gps-en-autobuses/)
- **ARESEP quality study:** analyzed 280,000 trips on 10 routes using GPS on 254 buses over 4 months, covering distances and travel times. — [ARESEP: "ARESEP analizó calidad en viajes de autobús"](https://aresep.go.cr/noticias/aresep-analizo-calidad-en-viajes-de-autobus/)
- **Open data – route geometries:** a nationwide GPS survey of bus routes, broken down by ramal. Published 7 Nov 2019, it covers 2015–2018 and declares annual updates. It is served as OGC WFS from mapas.aresep.go.cr, and access is marked with a "Licencia" restriction. It is not GTFS. — [ARESEP Datos abiertos: Rutas de autobuses](https://aresep.go.cr/datos-abiertos/rutas-autobuses/)
- **Other ARESEP open datasets:** passengers carried and reported revenue, historic bus fares, historic tariff variables, and fleet. — [ARESEP Datos abiertos](https://aresep.go.cr/datos-abiertos/); [Tarifas históricas](https://aresep.go.cr/datos-abiertos/tarifas-autobus/); [Histórico de variables tarifarias](https://aresep.go.cr/datos-abiertos/historico-variables-utilizadas-fijaciones-tarifarias-autobus/); [Tarifas vigentes](https://aresep.go.cr/autobus/tarifas/); [ARESEP transparenta datos del servicio de bus](https://aresep.go.cr/noticias/aresep-transparenta-datos-del-servicio-de-bus/)
- **2026 tariff actions:**
  - May 2026: a 5.43% bus increase for fuel.
  - From 1 Jul 2026: fares rounded to multiples of ₡10.
  - Aug 2026: a proposal to cut 842 of 4,793 fares (17.6%), with the cut varying by operator size and by use of SINPE-TP. Public consultation ran to 24 Aug.
  - ARESEP is building a new bus tariff model with SINPE-TP incentives, with approval expected in H2 2026.
  - Sources: [Delfino, Aug 2026](https://delfino.cr/2026/08/aresep-propone-ajustes-en-tarifas-de-taxis-y-buses); [El Observador](https://observador.cr/aresep-propone-rebaja-en-tarifas-para-el-18-de-las-rutas-de-autobus-y-aumento-para-taxis/); [ARESEP](https://aresep.go.cr/noticias/aresep-propone-ajustes-en-tarifas-de-buses-y-taxis/); [ARESEP redondeo](https://aresep.go.cr/noticias/aresep-aplica-redondeo-en-tarifas-transporte-publico/)
- **Ley 10638 (2025):** operators must supply ARESEP with information on all electronic payments, in the form and timing ARESEP sets. The law also lets ARESEP create incentives for electronic payment. — [Bufete de Costa Rica summary](https://bufetedecostarica.com/sistema-electronico-para-cobrar-la-tarifa-transporte-remunerado-de-personas-en-costa-rica-10638/); [Delfino, Jan 2025](https://delfino.cr/2025/01/la-asamblea-da-un-ultimatum-de-dos-y-cuatro-anos-para-que-todos-los-autobuses-cuenten-con-pago-electronico)

### Inferences
- Under Ley 10638, ARESEP is becoming the legal recipient of electronic-payment (validation) data for every route. That makes it a high-value data-partnership target, alongside BCCR.
- The pull toward tying tariffs to SINPE-TP adoption gives operators a financial reason to install validators. Validators are the most likely route to near-universal onboard connected hardware.
- The 2015–2018 ARESEP route geometries are useful for bootstrapping shapes but are stale and license-restricted.

### Gaps
- Exact license text of the ARESEP WFS layer, and whether the service still responds.
- Whether ARESEP has issued the rule defining the format and frequency of electronic-payment data reporting under Ley 10638, and whether it includes timestamps or locations.
- Whether the 2025 tariff-methodology reform requires GPS or AVL data.

## 3. Sectorización / reorganización del transporte público in the GAM: status 2025–2026

### Takeaway
Sectorización has been promised since the 1990s–2000s and was written into the 2021 concession renewals, but it had **not started operating as of April 2026**. The first pilot (Tibás–Santo Domingo) slipped from Dec 2024 to 2025 and then past 2025, and the MOPT and ARESEP blame each other. The new Fernández administration (from 8 May 2026) is framing the electric train as the backbone, with buses feeding stations.

### Cited Findings
- Plan: 12 subsectors, with Tibás–Santo Domingo first. Planned start was Dec 2024 with one subsector, and Minister Mauricio Batalla said all 12 would be enabled in 2026. — [El Observador](https://observador.cr/primera-linea-de-sectorizacion-del-transporte-publico-estara-habilitada-en-diciembre-preve-el-mopt/); [CRHoy, 2024](https://www.crhoy.com/nacionales/sectorizacion-de-buses-arrancaria-a-cuentagotas-al-cierre-de-este-2024/)
- The government pushed the start date back a third time, to 2025. — [CRHoy](https://www.crhoy.com/nacionales/gobierno-corre-inicio-de-sectorizacion-por-tercera-vez-ahora-queda-para-2025/); [La Nación](https://www.nacion.com/el-pais/sectorizacion-de-transporte-publico-le-tomara-al/SU6Q6GR5CREHNNPLPJHEL3FXQ4/story/)
- La Nación reported four routes "listas para operar" under sectorización, and that the plan was reduced to an exclusive lane in Tibás. — [La Nación](https://www.nacion.com/el-pais/como-funcionara-la-sectorizacion-cuatro-rutas-de/WHQSQNQN2VHT7DLIEA3D3AGYIQ/story/); [La Nación](https://www.nacion.com/el-pais/servicios/plan-para-ordenar-buses-se-redujo-a-carril/OX2YF4HXXZAWNCY5B2IG3XNDUA/story/)
- Pilot phasing: 7 sectors in stage 1, then Guadalupe–Coronado, Uruca–Heredia, Paso Ancho–San Sebastián and the central sector in stage 2. Sectorización was expected to remain only a pilot in the 2022–2026 term. — [CRHoy](https://crhoy.com/nacionales/sectorizacion-no-ira-mas-alla-de-ser-un-plan-piloto-durante-este-gobierno/)
- **April 2026:** Vice-minister Carlos Ávila said the MOPT has operating schemes ready for the first four segments but lacks tariffs. ARESEP replied that its board approved a tariff-methodology change for sectorized (trunk-feeder) routes, published 20 Oct 2025, and said the MOPT had not delivered complete information on the operating consortia. "Otro gobierno finalizará sin iniciar la sectorización". — [La Nación](https://www.nacion.com/el-pais/aresep-contradice-al-mopt-y-rechaza-culpa-por/N5WAEQU7QVBTNAP52562I53VSI/story/); [La Nación](https://www.nacion.com/el-pais/otro-gobierno-finalizara-sin-ver-iniciar-la/3V3SALDTNBCFNIPZPOW7ELFRQM/story/); [ARESEP](https://aresep.go.cr/noticias/aresep-avanza-definir-esquema-tarifario-para-sectorizar-servicio-bus/)
- Sectorización depends on agreement from bus operators. — [CRHoy](https://crhoy.com/nacionales/plan-de-sectorizacion-dependera-de-aval-de-autobuseros/)
- **Electric train / intermodality:** the government plan includes 17 intermodal nodes where train stations meet bus lines. — [La Nación](https://www.nacion.com/el-pais/infraestructura/gobierno-asegura-avanzar-con-plan-para/KR67ZRT6KRFZLGFG2L3FFXKYGI/story/)
  - "Tibi" is a 51 km, 30-station electric train from Paraíso to Alajuela, with about $800M in total financing. — [El Observador](https://observador.cr/gobierno-presenta-tibi-el-proyecto-de-tren-electrico-por-800-millones-con-un-recorrido-de-51-km/)
  - The Assembly approved the CABEI loan ($550M) in second debate in May 2026. — [Delfino, May 2026](https://delfino.cr/2026/05/asamblea-aprueba-en-segundo-debate-credito-para-tren-electrico-de-pasajeros)
  - The minister expects construction to start in 2027. — [Amelia Rueda](https://ameliarueda.com/noticia/construccion-tren-electrico-capitalino-trabjaos-ruta-san-jose-san-ramon-2027-noticias-costa-rica)
  - Minister Efraím Zeledón (continuing under President Laura Fernández) calls the train the backbone of GAM transit. — [Tico Times, 10 May 2026](https://ticotimes.net/2026/05/10/costa-rica-infrastructure-push-focuses-on-roads-train-and-traffic-relief)
- **EU / BCR / MOPT / GIZ (Oct 2026):** an €8M EU grant, through a BCR trust, for about 75 electric buses in the GAM, expected in circulation in 2027 with routes not yet defined. It is part of TUE-Mobility (GIZ, Global Gateway). — [Infobae, 10 Oct 2026](https://www.infobae.com/costa-rica/2026/10/10/costa-rica-incorporaria-75-autobuses-electricos-en-2027-gracias-a-una-inversion-de-8-millones-de-euros-de-la-union-europea/); [El Observador](https://observador.cr/union-europea-aportara-8-millones-de-euros-para-financiar-incorporacion-de-75-buses-electricos-en-la-gam/)

### Inferences
- A route network that may be reorganized (trunk-feeder) means route data could change substantially. An app's data model and partnership with the CTP must handle route versioning.
- The 2028 concession expiry (section 5) and the 2027 train construction start are the next structural decision points.

### Gaps
- Any confirmed sectorización start date after April 2026, and the current Fernández-administration stance on it.
- Whether the EU/GIZ project includes a passenger-information or GTFS component. One search summary suggested it might, but that was not verified in the source.

## 4. Electronic payment (SINPE-TP / BCCR) and its data potential

### Takeaway
Electronic payment is the one area with a legal mandate and real deployment. BCCR's SINPE-TP takes contactless bank cards, phones and wearables, and from June 2026 also a BAC/Visa prepaid "Monedero SINPE-TP" card topped up via SINPE Móvil. Ley 10638 (in force 17 Mar 2025) requires validators on all buses, with deadlines of about Mar 2027 in the GAM and about Mar 2029 elsewhere. Operators must send payment data to ARESEP. Validators need connectivity, which makes them a candidate source of tap-based vehicle presence and location data, but no source confirms GPS is captured or shared.

### Cited Findings
- **Ley 10638:** adds inciso g) to Art. 17 and Transitorio XII to Ley 3503. Operators must accept debit, credit and prepaid cards through the system the BCCR establishes or authorizes. GAM routes have 2 years and other routes 4 years from entry into force. Payment information must go to ARESEP. It was published in La Gaceta No. 51 on 17 Mar 2025 and took effect on publication. — [Bufete de Costa Rica](https://bufetedecostarica.com/sistema-electronico-para-cobrar-la-tarifa-transporte-remunerado-de-personas-en-costa-rica-10638/); [MOPT repository](https://repositorio.mopt.go.cr/items/1ba7199c-a05f-43d5-b9a3-d04d6f6a34fe); [Delfino, Jan 2025 (2nd debate, unanimous)](https://delfino.cr/2025/01/la-asamblea-da-un-ultimatum-de-dos-y-cuatro-anos-para-que-todos-los-autobuses-cuenten-con-pago-electronico); [El Observador](https://observador.cr/avanza-proyecto-para-que-sea-obligatorio-el-pago-electronico-en-todas-las-rutas-de-autobus-del-pais/)
- **Pilot origin:** the SINPE-TP pilot started in April 2022 (Mastercard press release). — [Mastercard](https://www.mastercard.com/news/latin-america/es/sala-de-prensa/comunicados-de-prensa/pr-es/2022/abril/costa-rica-inicia-piloto-de-pago-electronico-en-servicio-publico-de-autobuses/)
- **Early expansions:** Cartago–San José, San José–Guadalupe and others. — [SUMMA](https://revistasumma.com/costa-rica-pago-electronico-llega-a-ruta-de-autobuses-cartago-san-jose/); [El Financiero](https://www.elfinancierocr.com/tecnologia/pago-electronico-en-buses-se-expande-a-la-ruta-san/4ZU6I6AGLNB6ZEYXQAQRQZ4IEQ/story/)
- **2024–2025 scale:** about 50,000 card fares a day, with about 1,500 more buses projected for 2025. The target was all GAM routes, about 3,000 buses, by 2025. That target was missed. — [El Observador](https://observador.cr/50-000-pasajes-de-bus-se-pagan-a-diario-con-tarjeta-estas-son-las-nuevas-rutas-con-pago-electronico/); [La Nación](https://www.nacion.com/el-pais/estas-son-las-nuevas-rutas-de-buses-con-pago/SJ2YFFXROFGM3ENZIQ2KKXZRYA/story/)
- **2026 scale (sources conflict):**
  - More than 80 million cumulative transactions and more than 200,000 payments a day.
  - BAC and Visa have funded equipment on more than 700 buses, out of about 2,500 expected nationally.
  - One Aug 2026 report says about 2,000 buses have active validators; it also mentions "5,000 rutas", likely a confusion with buses.
  - Sources: [Delfino, Jun 2026](https://delfino.cr/2026/06/bac-y-visa-lanzan-tarjeta-de-monedero-sinpe-tp-para-el-pago-electronico-en-transporte-publico); [El Mundo CR](https://elmundo.cr/economia-y-negocios/bac-y-visa-lanzan-nueva-tarjeta-para-pagar-autobuses-y-trenes-con-sinpe-tp/); [La Mesa Redonda](https://www.lamesaredonda.net/empresariales/115508-bac-y-visa-lanzan-la-nueva-tarjeta-monedero-sinpe-tp-para-masificar-el-pago-digital-en-el-transporte-publico/)
- **Monedero SINPE-TP card (June 2026):** for users aged 12 and over, valid 4 years, works on buses and trains, and is topped up through SINPE Móvil or transfer. The "SINPE-TP Pasajero" app shows balance and trips. — [La República](https://www.larepublica.net/noticia/nueva-tarjeta-permitira-pagar-autobuses-y-trenes-con-recargas-desde-sinpe-movil); [Chepetown](https://www.chepetown.com/blog/tarjeta-sinpe-tp-bac-visa-transporte-publico); [CRHoy (technical challenges)](https://crhoy.com/nacionales/tarjeta-de-pago-exclusiva-para-transporte-publico-enfrenta-retos-tecnologicos-para-incorporarla-a-sinpe-movil/)
- **Next steps:** BAC is equipping 7 strategic routes (San Pedro, Tres Ríos, Curridabat, Zapote and others). The following phase targets rural routes and routes with fraccionada (distance-based) fares. — [Delfino, Jun 2026](https://delfino.cr/2026/06/bac-y-visa-lanzan-tarjeta-de-monedero-sinpe-tp-para-el-pago-electronico-en-transporte-publico)
- **Connectivity:** a BCCR official said the system needs internet connectivity and validators that can store transactions. — [El Observador summary](https://observador.cr/pago-electronico-obligatorio-en-todas-las-rutas-de-autobuses-entre-las-tareas-pendientes-de-la-asamblea-legislativa/)
- **Cash:** operators say cash should be eliminated to make electronic payment profitable. Cash remains legal under the 2021 contracts. — [La República](https://www.larepublica.net/noticia/pago-en-efectivo-de-buses-debe-eliminarse-para-hacer-rentable-metodo-electronico-segun-autobuseros)

### Inferences
- By about March 2027, every GAM bus should legally carry a connected validator. That is the most realistic path to fleet-wide onboard connectivity in Costa Rica. Validators often include GPS, but this is not confirmed for SINPE-TP.
- Tap events (route, vehicle, timestamp) reported to ARESEP and BCCR could in principle yield delayed or near-real-time vehicle activity. Any access would need a formal agreement and must respect Ley 8968 data protection, which this research did not cover.
- The ₡10 rounding and the SINPE-TP-linked tariff differences make fare data more complex. A fare calculator would need ARESEP's pliego.

### Gaps
- Official BCCR figures on buses and routes enabled as of Oct 2026.
- Whether SINPE-TP validators log GPS, and whether BCCR or ARESEP would share validation data. No public statement was found.
- Whether the GAM deadline (about 17 Mar 2027) is on track.

## 5. Concession contracts (2021 renewals to 2028): GPS, passenger counting, open data

### Takeaway
In 2021 the CTP renewed concessions for 227 companies (35 in the San José metro area) for 7 years, to 2028. The contracts require gradual fleet renewal, electronic payment, tariff integration and sectorización. No source found mentions a GPS, AVL, automatic passenger counting or open-data clause.

### Cited Findings
- The CTP renewed concessions for 227 bus companies and will require fleet change, electronic collection and sectorización. — [Delfino, Sep 2021](https://delfino.cr/2021/09/ctp-renueva-concesiones-a-227-empresas-autobuseras-exigira-cambio-de-flotilla-cobro-electrico-y-sectorizacion); [Monumental](https://www.monumental.co.cr/2021/09/30/ctp-autoriza-renovacion-de-concesiones-a-mas-de-200-empresas-autobuseras/); [CRC 891](https://crc891.com/nacionales/servicios/227-empresas-autobuseras-renovaran-concesiones-para-rutas/)
- The term is 7 years, to 2028, instead of the 15 originally proposed. — [El Financiero](https://www.elfinancierocr.com/economia-y-politica/firmas-de-nuevas-concesiones-de-buses-continuan-y/UQRMMZD275DQ5BLXQVVMRN2734/story/); [CRHoy (Procuraduría consulted on 15 years)](https://crhoy.com/nacionales/ctp-consulta-a-procuraduria-sobre-legalidad-para-renovar-concesiones-de-bus-por-15-anos/)
- Companies operated under provisional CTP permits from 1 Oct 2021 while contracts were signed and endorsed (refrendo) by ARESEP. The first two were signed in Dec 2021: La Tapachula (Escazú–Santa Ana) and Autotransportes Pavas. — [Monumental, Dec 2021](https://www.monumental.co.cr/2021/12/22/mopt-renovo-primeras-concesiones-de-autobuses-que-deberan-cumplir-plan-de-sectorizacion-de-transporte-publicoo/)
- The process was criticized as secretive. ARESEP and the CTP clashed over the renewals. — [Amelia Rueda](https://ameliarueda.com/nota/contratos-bus-vence-este-jueves-mopt-secreto-renovacion-noticias-costa-rica); [El Financiero](https://www.elfinancierocr.com/economia-y-politica/la-aresep-y-el-ctp-chocan-en-el-proceso-de-renovacion-de-concesiones-para-rutas-de-autobuses/WD4AKRB5GNFDRAGV3HB7FOV6KU/story/)
- The base law is Ley 3503 (1965), Ley Reguladora del Transporte Remunerado de Personas. — [vLex](https://vlex.co.cr/vid/ley-n-3503-reguladora-652624805)

### Inferences
- The 2028 renewal or tender is the next point where the state could write GPS/AVL, data-sharing and GTFS clauses into contracts. Advocacy aimed at that window (2026–2028) is strategically timed.

### Gaps
- The actual contract template text. A GPS clause could exist without press coverage.

## 6. Open data portals: routes, stops, GTFS, schedules

### Takeaway
No official GTFS (static or realtime) for Costa Rican buses was found. The available official sources are:
- the CTP route and stop viewer (2026, downloadable)
- the ARESEP route-geometry WFS (2015–2018) and its fare, passenger and fleet datasets
- the 2015 MOPT open-data platform (status unknown)

At least one private operator publishes its own GTFS.

### Cited Findings
- No confirmed MOPT GTFS feed. ARESEP's layer is WFS, not GTFS. — [ARESEP](https://aresep.go.cr/datos-abiertos/rutas-autobuses/)
- Transportes San Gabriel (San Ignacio de Acosta / San Gabriel de Aserrí) publishes a downloadable GTFS zip. — [TSG GTFS page](https://transportessangabriel.com/gtfs/)
- The OpenStreetMap community keeps a Costa Rica public-transport mapping effort. — [OSM Wiki](https://wiki.openstreetmap.org/wiki/ES:Costa_Rica/Transporte_p%C3%BAblico)
- datosabiertos.go.cr and INEC: no transit datasets surfaced in searches.

### Inferences
- A startup could become the de facto GTFS producer: combine CTP viewer exports with ARESEP geometries and fares and operator schedules, then offer it back to the UCR/CTP national system.

### Gaps
- Contents of datosabiertos.go.cr, which could not be accessed or searched effectively.
- Whether the UCR national system will publish GTFS openly or only feed Google.

## 7. Laws and bills on transit information, GPS on buses, train integration

### Takeaway
- Enacted: Ley 10638 (electronic payment plus data to ARESEP, 2025) and a stops-modernization law (exp. 23.162) that envisions real-time information at stops.
- Proposed, status unknown: a Frente Amplio bill (approx. April 2024) to make GPS mandatory on all buses, with the CTP sharing the data for apps.

### Cited Findings
- **Frente Amplio GPS bill (approx. April 2024 by index age):**
  - It would require GPS on all units and authorize the CTP to transfer the data automatically for apps and displays, so users can see routes and stops in real time.
  - The justification cited is that 46% of annual complaints concern delays.
  - Its legislative progress could not be confirmed.
  - Sources: [La República](https://www.larepublica.net/noticia/usuarios-podran-ver-en-tiempo-real-el-recorrido-de-los-buses); [Telediario video](https://www.telediario.cr/videos/television/presentan-proyecto-para-poner-gps-en-buses)
- **Exp. 23.162 (stops for bus, train and taxi):** approved in second debate. It contemplates real-time information on routes, schedules and maps at stops. The date of the article is unclear. — [Semanario Universidad](https://semanariouniversidad.com/pais/asamblea-legislativa-aprueba-ley-para-modernizar-paradas-de-transporte-publico-en-costa-rica/)
- **Ley 10638 (exp. 23.360):** electronic payment. See section 4.
- **Platforms bill:** a separate bill on Uber-type platforms returned to the plenary in Jul 2026 after 282 motions. It is not about buses, but it shapes the mobility-regulation climate. — [Delfino, Jul 2026](https://delfino.cr/2026/07/proyecto-para-regular-plataformas-tipo-uber-supera-282-mociones-y-vuelve-al-plenario)

### Inferences
- The legal trend points toward mandated data flows: payment data to ARESEP, and real-time information at stops. A GPS mandate has been proposed but not enacted.

### Gaps
- The law number and text of exp. 23.162, and whether it was signed or vetoed.
- The expediente number and status of the GPS bill.

## 8. Officials, agencies and existing players a startup should approach

### Takeaway
The key nodes are:
- CTP (Junta Directiva chaired by the MOPT minister; interim executive director since Aug 2026)
- UCR's SIMOVI lab (technical lead for the national information system)
- ARESEP Intendencia de Transportes (recipient of payment data; open-data owner)
- BCCR SINPE-TP team (validator network)
- Canatrans (operators' chamber, already partnered with UbiRider)

### Cited Findings
- **MOPT:**
  - Minister Efraím Zeledón Leiva continues for 2026–2030 under President Laura Fernández (took office 8 May 2026) and chairs the CTP board. — [Tico Times](https://ticotimes.net/2026/05/10/costa-rica-infrastructure-push-focuses-on-roads-train-and-traffic-relief); [CRHoy](https://crhoy.com/nacionales/consejo-de-transporte-publico-nombra-nuevo-director-ejecutivo/)
  - Vice-minister of Transport Carlos Ávila (spokesperson on sectorización, Apr 2026). — [La Nación](https://www.nacion.com/el-pais/aresep-contradice-al-mopt-y-rechaza-culpa-por/N5WAEQU7QVBTNAP52562I53VSI/story/)
  - Vice-minister Sofía Fallas (EU electric bus project). — [El Observador](https://observador.cr/union-europea-aportara-8-millones-de-euros-para-financiar-incorporacion-de-75-buses-electricos-en-la-gam/)
- **CTP:** architect José Fabio Ureña Gómez was named interim executive director on 13 Aug 2026, announced 21 Aug, pending a public competition. He previously worked at MIVAH (territorial planning and mobility). — [El Observador](https://observador.cr/ctp-designa-de-manera-interina-a-arquitecto-como-director-ejecutivo/); [CRHoy](https://crhoy.com/nacionales/consejo-de-transporte-publico-nombra-nuevo-director-ejecutivo/)
- **UCR SIMOVI (Laboratorio de Sistemas Inteligentes de Movilidad):** technical executor of the national information system and the INCOFER Google Maps integration. — [Delfino](https://delfino.cr/2026/08/ctp-anuncia-creacion-de-sistema-nacional-con-informacion-de-rutas-horarios-y-tarifas-de-transporte-publico); [INCOFER](https://www.incofer.go.cr/pasajeros-de-tren-podran-conocer-el-estado-del-servicio-en-tiempo-real/)
- **Canatrans and UbiRider:**
  - Agreement signed 17 Jun 2025 at the UITP Summit in Hamburg for a free app with real-time bus locations, nearby stops and ETAs, plus sharing to Google Maps, starting with at least 300 units. No launch confirmed by Oct 2026. — [Delfino, Jun 2025](https://delfino.cr/2025/06/canatrans-se-incorpora-a-red-global-de-transporte-y-anuncia-nueva-herramienta-tecnologica); [El Observador](https://observador.cr/autobuseros-desarrollaran-app-con-ubicacion-de-paradas-y-buses-en-tiempo-real/); [Teletica](https://www.teletica.com/nacional/desarrollan-aplicacion-para-monitorear-llegada-de-buses-en-tiempo-real_388973)
  - Canatrans also cites fuel costs, low demand and informal transport as pressures on operators. — [Teletica](https://teletica.com/nacional/combustible-baja-demanda-y-transporte-informal-presionan-a-los-autobuseros_418844)
- **Private apps in the space:**
  - Moovit (crowdsourced, older entry). — [El Financiero](https://www.elfinancierocr.com/tecnologia/moovit-la-app-que-es-el-waze-para-buses-esta-disponible-en-costa-rica/RP5XUOAVVRD2ZGGSVC3TTXEOLA/story/)
  - Yo Viajo (schedules). — [yoviajocr.com](https://yoviajocr.com/buses)
  - Ruticas (real-time, enrolling operators). — [ruticas.com](https://www.ruticas.com/en)
  - Pura Ruta ("muy pronto"). — [puraruta.app](https://puraruta.app/)
- **ARESEP:** the Intendencia de Transportes sets bus fares and owns the bus open data. — [ARESEP Autobús](https://aresep.go.cr/autobus/)
- **BCCR:** operates SINPE-TP, the validator and payment backbone. See section 4.

### Inferences
- The fastest data path is probably a partnership with UCR SIMOVI, which is building the national dataset, plus the CTP for official route and stop exports. Operator-level GPS would come through Canatrans member companies, but Canatrans already has UbiRider, a possible competitor or gatekeeper. Smaller operators outside that deal, such as Transportes San Gabriel which already publishes GTFS, may be easier early partners.
- The interim CTP director and the newly constituted board (Aug 2026) mean leadership is new. This is a window for proposals but also institutional churn.

### Gaps
- Names of the SIMOVI-UCR lab lead, ARESEP's Intendente de Transportes, and BCCR's SINPE-TP program lead. These were not surfaced.
- Whether UbiRider's Canatrans deal is exclusive.
