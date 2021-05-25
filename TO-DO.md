# TODO

- caudal (curvas H-Q)
- grafico y tablas
- use SVG for icons
- fix config to use absolute paths
- fix console warnings/errors
- update dependencies
- include GeoTIFF, GOE

# IN PROGRESS

# DONE

- integrate react router
- store accumulation data on redux store:
  - load data on startup and update when date interval is changed.
  - load Map data from store.
- filtrado desde-hasta
- plan de manejo de embalse mas grande
- implement authentication
- exportacion de datos
- deploy site on cloud (staging)
  - build project: `npm run build:staging`
  - upload objects: `gsutil -m cp -r ./build/* gs://hydro-dashboard-staging/`
  - make objects public available: `gsutil iam -r ch allUsers:objectViewer gs://hydro-dashboard-staging/`
- configure redux store
- use redux store for filtering
- improve filtering section
  - use i18n strings
- get last metrics from documents
  - test for cookie expiration: 5days
  - get data from wundermap
- update tab title
- formato 24hs
- normalize timezones
- incluir UCASAL desde weatherunderground
  - missing: UCASAL - El Tipal
- medir cada 1 hora las de AES
- INTA LA VINNA
- get last metrics from documents
  - review data files
  - get data from SMN
  - get data from INTA
- convert unit (e.g.: inches to mm)
- store data in DB
- retrieve data from AppEngine
- change dependency system to yarn
- map last 24hs/12hs/6hs
