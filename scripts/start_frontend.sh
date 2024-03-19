#!/bin/bash
cd /Users/joaorocha/Projects/mrjohnnyrocha.com/frontend
set -a
source .env
set +a
npm install
npm run serve
