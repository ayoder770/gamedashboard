#####################################################################
# File Name: urls.py
#
# Description: urls file for gamedashboard django app
#
# File History
# 12/03/2021 - Andrew Yoder : Added header
#                           : Changed "hello" to "gamedashboard"
######################################################################

from django.urls import path, include

from django.contrib import admin

admin.autodiscover()

import gamedashboard.views

# To add a new path, first import the app:
# import blog
#
# Then add the new path:
# path('blog/', blog.urls, name="blog")
#
# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [
    path("", gamedashboard.views.index, name="index"),
    path("clue/", gamedashboard.views.clue, name="clue"),
    path("cluePlus/", gamedashboard.views.cluePlus, name="cluePlus"),
    path("fivecrowns/", gamedashboard.views.fivecrowns, name="fivecrowns"),
    path("sorry/", gamedashboard.views.sorry, name="sorry"),
    path("taboo/", gamedashboard.views.taboo, name="taboo"),
    path("pictionary/", gamedashboard.views.pictionary, name="pictionary"),
    path("db/", gamedashboard.views.db, name="db"),
    path("drawPictCard/", gamedashboard.views.drawPictCard, name="DrawPictionaryCard"),
    path("admin/", admin.site.urls)
]
