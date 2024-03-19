#!/bin/bash
cd /Users/joaorocha/Projects/mrjohnnyrocha.com/backend
source /Users/joaorocha/opt/anaconda3/etc/profile.d/conda.sh
conda activate loka
set -a
source .env
set +a
python manage.py makemigrations
python manage.py migrate
python manage.py runserver_plus --cert-file /Users/joaorocha/Projects/mrjohnnyrocha.com/nginx/ssl/127.0.0.1.crt

sleep 10

open -a "Google Chrome" http://127.0.0.1:8000/api/auth