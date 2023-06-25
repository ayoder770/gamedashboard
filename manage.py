#!/usr/bin/env python
#####################################################################
# File Name: manage.py
#
# Description: manage.py file for app
#
# File History
# 06/25/2023 - Andrew Yoder : Added header
#                           : Update name from gettingstarted to gamedashapp
######################################################################

import os
import sys

if __name__ == "__main__":

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gamedashapp.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
