#/bin/bash
#set -x
if [[ $1 -eq '' ]] 
then
    echo "A gcloud project name to be checked is required"
    echo "Usage: $0 <project_name>"
    exit 1
fi
GCLOUD_REQUIRED_PROJECT=$(gcloud config configurations list | grep True | grep $1 | wc -l)
if [[ $GCLOUD_REQUIRED_PROJECT -eq 0 ]]
then
    GCLOUD_ACTIVE_PROJECT=$(gcloud config configurations list | grep True | awk '{ print $4 }')
    echo "<$1> project is not activated, <$GCLOUD_ACTIVE_PROJECT> is active instead"
    exit 127
else
    exit 0
fi