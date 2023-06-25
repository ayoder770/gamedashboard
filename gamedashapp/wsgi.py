#####################################################################
# File Name: wsgi.py
#
# Description: WSGI Config For App
#
# File History
# 06/25/2023 - Andrew Yoder : Added header
#                           : Update name from gettingstarted to gamedashapp
#                           : Migrate to Render Platform
######################################################################

"""
WSGI config for gamedashapp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gamedashapp.settings")

application = get_wsgi_application()