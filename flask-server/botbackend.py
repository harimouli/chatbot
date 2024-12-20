from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS  # type: ignore

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# Sample products data
products = [
    {"Product ID": 1, "Name": "Smart Watch", "Category": "Electronics", "Price": "$199", "Stock": 50},
    {"Product ID": 2, "Name": "Novel XYZ", "Category": "Books", "Price": "$15", "Stock": 100},
    {"Product ID": 3, "Name": "Cotton Shirt", "Category": "Textiles", "Price": "$25", "Stock": 75},
    {"Product ID": 4, "Name": "Gaming Laptop", "Category": "Electronics", "Price": "$1200", "Stock": 30},
    {"Product ID": 5, "Name": "Noise Cancelling Headphones", "Category": "Electronics", "Price": "$299", "Stock": 40},
    {"Product ID": 6, "Name": "Fictional Book ABC", "Category": "Books", "Price": "$20", "Stock": 150},
    {"Product ID": 7, "Name": "Leather Jacket", "Category": "Textiles", "Price": "$150", "Stock": 20},
    {"Product ID": 8, "Name": "Bluetooth Speaker", "Category": "Electronics", "Price": "$75", "Stock": 60},
    {"Product ID": 9, "Name": "Office Chair", "Category": "Furniture", "Price": "$85", "Stock": 25},
    {"Product ID": 10, "Name": "Yoga Mat", "Category": "Fitness", "Price": "$30", "Stock": 200},
    {"Product ID": 11, "Name": "Smartphone", "Category": "Electronics", "Price": "$699", "Stock": 50},
    {"Product ID": 12, "Name": "Cookbook", "Category": "Books", "Price": "$18", "Stock": 90},
    {"Product ID": 13, "Name": "Formal Trousers", "Category": "Textiles", "Price": "$40", "Stock": 100},
    {"Product ID": 14, "Name": "Electric Kettle", "Category": "Appliances", "Price": "$45", "Stock": 35},
    {"Product ID": 15, "Name": "Desk Lamp", "Category": "Electronics", "Price": "$20", "Stock": 150},
    {"Product ID": 16, "Name": "Wireless Mouse", "Category": "Electronics", "Price": "$25", "Stock": 120},
    {"Product ID": 17, "Name": "Fantasy Book DEF", "Category": "Books", "Price": "$12", "Stock": 80},
    {"Product ID": 18, "Name": "Running Shoes", "Category": "Footwear", "Price": "$60", "Stock": 90},
    {"Product ID": 19, "Name": "Kitchen Knife Set", "Category": "Appliances", "Price": "$70", "Stock": 50},
    {"Product ID": 20, "Name": "Sunglasses", "Category": "Accessories", "Price": "$25", "Stock": 200},
]

@app.route("/")
def home():
    return "Welcome to the E-commerce Chatbot!"

@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        data = request.get_json()
        query = data.get("query", "").lower()  # Ensure case insensitivity
        
        if not query:
            return jsonify({"response": "Please provide a product name to search."}), 400
        
        matching_products = {}
        
        for product in products:
            if query in product["Name"].lower() or query in product["Category"].lower() or query in product["Price"].lower() or query in str(product["Stock"]).lower():
                matching_products = product
                break
        
        if matching_products:
            return jsonify({"response": matching_products}), 200
        else:
            return jsonify({"response": "No matching products found."}), 404
    
    except Exception as e:
        return jsonify({"response": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)


