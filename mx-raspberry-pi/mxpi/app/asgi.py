import os,sys,mxpi

from django.conf import settings
from channels.routing import get_default_application
# 注意修改应用名
import django
from asgi_middleware_static_file import ASGIMiddlewareStaticFile


sys.path.append(os.path.dirname(mxpi.__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MxPisite.settings')
django.setup()
django_application = get_default_application()
django_application = ASGIMiddlewareStaticFile(
  django_application, static_url=settings.STATIC_URL,
  static_root_paths=[settings.STATIC_ROOT]
)


