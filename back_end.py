import certifi
from pymongo import MongoClient
import os

# Get environment variables for mongoDB connection
dbuser = os.environ.get("dbusername")
dbpassword = os.environ.get("dbpassword")
dbcluster = os.environ.get("dbcluster")
dbnum = os.environ.get("dbnum")

# Create connection string
CONNECTION_STRING = "mongodb+srv://" + dbuser + ":" + dbpassword + "@" + dbcluster + "." + dbnum + ".mongodb.net/"

# Create client
client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
