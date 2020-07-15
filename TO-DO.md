# TODO

- get last metrics from documents
- use SVG for icons
- implement authentication
- fix console warnings/errors

# IN PROGRESS

- use redux store for filtering

# DONE

- deploy site on cloud (staging)
  - build project: `npm run buid:staging`
  - upload objects: `gsutil cp -r ./build/* gs://hydro-dashboard-staging/`
  - make objects public available: `gsutil iam -r ch allUsers:objectViewer gs://hydro-dashboard-staging/`
- configure redux store
