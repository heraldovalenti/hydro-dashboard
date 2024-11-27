# TODO

- grafico y tablas
- use SVG for icons
- fix config to use absolute paths
- update dependencies
- include GeoTIFF, GOE
- caudal H-Q on maps

- upgrade from google-maps-react library:

  - https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0
  - rotate map key and move to .env file

- AES GSHEET:

  - add maroma and medina stations #DONE
  - add gsheet healthcheck #DONE
  - move gsheet auth token to DB #DONE
  - update observations by date interval #DONE
  - add update for historic data
  - add link to spreadsheet on stations with gsheet origin

- migrate Away from makeStyles: Replace makeStyles with the styled API:
  - import { makeStyles } from '@mui/styles';
  - https://chat.deepseek.com/a/chat/s/b2fd73bb-3f18-4eda-acd6-d9cfdc9bf068

# IN PROGRESS

- forecasts table
- fix console warnings/errors

# DONE

- caudal (curvas H-Q)
- separate dimensions in tabs
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
