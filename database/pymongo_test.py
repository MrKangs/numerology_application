import certifi

# Get the database using the method we defined in pymongo_test_insert file
from pymongo import MongoClient
CONNECTION_STRING = "mongodb+srv://gykang00:24UnThp1VmQeORmx@sample.1yxajm0.mongodb.net/"
 
# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
 
# Create the database for our example (we will use the same database throughout the tutorial
collection_name = client['user_shopping_list']["user_1_items"]


item_1 = {
  "_id" : "U1IT00001",
  "item_name" : "Blender",
  "max_discount" : "10%",
  "batch_number" : "RR450020FRG",
  "price" : 340,
  "category" : "kitchen appliance"
}

item_2 = {
  "_id" : "U1IT00002",
  "item_name" : "Egg",
  "category" : "food",
  "quantity" : 12,
  "price" : 36,
  "item_description" : "brown country eggs"
}
collection_name.insert_many([item_1,item_2])