import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

print('BASE_DIR: ', BASE_DIR)

# Development settings
SECURE_REFERRER_POLICY = 'no-referrer-when-downgrade'
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = (
    'django-insecure-+yv1spyz9)gn7=b+oy#pj0ya8q=^)yqcg5^%5t+wd^+eavey!w'
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:8080', # Vue.js
]
DATABASES = {
  'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'admin',
        'PASSWORD': 'Tatianar7',
        'HOST': 'localhost',
        'PORT': '1717',
    }
}

# SECURITY
AUTH_USER_MODEL = 'app.CustomUser'
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'
SSL_CERTIFICATE = os.path.dirname(BASE_DIR) + '/127.0.0.1.pem'
SSL_KEY = os.path.dirname(BASE_DIR) + '/127.0.0.1-key.pem'

INTERNAL_IPS = ['127.0.0.1']

X_FRAME_OPTIONS = 'DENY'
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',  # Use the custom formatter defined above
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django.utils.autoreload': {
            'level': 'INFO',  # Adjust this level as needed
            'handlers': ['console'],
            'propagate': False,
        },
        'django.db.backends': {
            'level': 'WARNING',
            'handlers': ['console'],
            'propagate': False,
        },
    },
}



 #Other settings

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '0.0.0.0']

INSTALLED_APPS = [
    'app',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'sslserver',
    'rest_framework',
    'corsheaders',
]


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    #'app.middleware.GeolocationMiddleware',
]


ROOT_URLCONF = 'mrjohnnyrocha.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mrjohnnyrocha.wsgi.application'
ASGI_APPLICATION = 'mrjohnnyrocha.asgi.application'




AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
  #  'app.models.user.CognitoAuthenticationBackend',
]


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': (
            'django.contrib.auth.'
            'password_validation.UserAttributeSimilarityValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.' 'password_validation.MinimumLengthValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.'
            'password_validation.CommonPasswordValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.'
            'password_validation.NumericPasswordValidator'
        ),
    },
]

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
        },
    },
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')
STATIC_URL = 'static/'

