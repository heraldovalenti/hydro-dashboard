# TODO

- use SVG for icons
- fix config to use absolute paths
- implement authentication
- fix console warnings/errors
- store data in DB
- retrieve data from AppEngine
- change dependency system to yarn
- update dependencies

# IN PROGRESS

- get last metrics from documents
  - review data files
  - get data from SMN
  - get data from INTA

# DONE

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
