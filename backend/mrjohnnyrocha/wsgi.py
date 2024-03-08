import os

from django.core.wsgi import get_wsgi_application
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="https://8ac195d530c33e6a83e7f7f46a8e2d73@o4506808685887488.ingest.sentry.io/4506808687263744",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mrjohnnyrocha.settings")

application = get_wsgi_application()
