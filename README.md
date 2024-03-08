## Description
To run this project, you first need to have poetry installed: https://python-poetry.org/docs/


Then you need only to run on your terminal the following commnands:

on the base dir:

```
poetry run python manage.py makemigrations
poetry run python manage.py migrate
```

and to run the server:

```
poetry run python manage.py runserver

```
OR to specify the ssl certificates:
```
poetry run python manage.py runsslserver 0.0.0.0:8000 --certificate ./localhost.crt --key ./localhost.key
```



on the llm-bot-framework/ dir:


```
poetry run python manage.py runserver

```

on the llm-bot-framework/frontend/ dir:

```
npm run serve

```

## Local Development
To develop locally you will need to run a local postgres DB

From the root level run 
```
docker compose up -d
```

Then you will need to apply migrations
```
poetry run python manage.py makemigrations backend
```
and apply them

```
poetry run python manage.py migrate
```

now your local db is ready to accept connections.

### New features
Before developing a new feature always make sure you are on the latest version of dev
```
git checkout dev
git pull
```

Then create a new branch with an explicit name for the feature you will be working on
```
git checkout -b <feature_name>
```

When doen with your changes you should add, commit and push them.

Once pushed you can open a PR to merge with dev and request an approval