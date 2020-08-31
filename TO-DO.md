# TODO

- use SVG for icons
- fix config to use absolute paths
- implement authentication
- fix console warnings/errors

# IN PROGRESS

- get last metrics from documents

# DONE

- deploy site on cloud (staging)
  - build project: `npm run build:staging`
  - upload objects: `gsutil -m cp -r ./build/* gs://hydro-dashboard-staging/`
  - make objects public available: `gsutil iam -r ch allUsers:objectViewer gs://hydro-dashboard-staging/`
- configure redux store
- use redux store for filtering
- improve filtering section
  - use i18n strings
