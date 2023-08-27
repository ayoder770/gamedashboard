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

from . import views

admin.autodiscover()

#import gamedashboard.views

# To add a new path, first import the app:
# import blog
#
# Then add the new path:
# path('blog/', blog.urls, name="blog")
#
# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [
    path("", views.index, name="index"),
    path("clue/", views.clue, name="clue"),
    path("cluePlus/", views.cluePlus, name="cluePlus"),
    path("fivecrowns/", views.fivecrowns, name="fivecrowns"),
    path("sorry/", views.sorry, name="sorry"),
    path("taboo/", views.taboo, name="taboo"),
    path("pictionary/", views.pictionary, name="pictionary"),
    path("db/", views.db, name="db"),
    path("drawPictCard/", views.drawPictCard, name="DrawPictionaryCard"),
    path("admin/", admin.site.urls)
#    path("", include('render.urls'))
]
