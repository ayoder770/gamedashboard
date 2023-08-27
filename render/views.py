#####################################################################
# File Name: views.py
#
# Description: Views file for gamedashboard django app
#
# File History
# 12/03/2021 - Andrew Yoder : Added header
#                           : Pass clue lists to clue plus 
######################################################################

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
#import requests
import os
#import psycopg2
import json

#from .models import Greeting

# Lists for clue views
clue_suspects = [ "Mr. Green", "Col. Mustard", "Mrs. Peacock", "Prof. Plum", "Ms. Scarlet", "Mrs. White" ]
clue_weapons = [ "Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench" ]
clue_rooms = [ "Ballroom", "Billiard Room", "Conservatory", "Dining Room", "Hall", "Kitchen", "Library", "Lounge", "Study" ]


# gamedashboard views
def index(request):
    return render(request, "index.html")

def clue(request):
    return render(request, "clue.html")

def fivecrowns(request):
    return render(request, "fivecrowns.html")

def sorry(request):
    return render(request, "sorry.html")

def taboo(request):
    return render(request, "taboo.html")

def pictionary(request):
    return render(request, "pictionary.html")

def cluePlus(request):
    context = { "suspects" : clue_suspects, "weapons" : clue_weapons, "rooms" : clue_rooms, "range" : range(1,5) }
    return render(request, "clue-plus.html", context)

def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, "db.html", {"greetings": greetings})

# Function to draw pictionary card and send data back the client
@csrf_exempt
def drawPictCard(request):

    # Process the json data passed from the client
    cardData = json.loads(request.body)

    # The color of the card being used (either red or blue)
    cardColor = cardData['cardColor']
    # The category: orange, green, pink, yellow, blue
    cardCategory = cardData['categoryColor']
    
    # Build the table name to query from
    thisTable = "pict_"+cardColor+"_card_"+cardCategory

    # Connect to the DB
    DATABASE_URL = os.getenv('DATABASE_URL')
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = conn.cursor()

    # Perform the query on the table
    cursor.execute("SELECT * FROM "+thisTable)
    row = cursor.fetchone()
    response = {'word':row[1], 'allPlay':row[2]}

    # Close the DB connection
    cursor.close()
    conn.close()

    # Return the JSON response to the client
    return HttpResponse(json.dumps(response))
