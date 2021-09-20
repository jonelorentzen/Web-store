"""Assignment #8: Webshop"""

from flask import Flask, request, g, abort
import mysql.connector
import json

app = Flask(__name__)

# Application config
app.config["DATABASE_USER"] = "root"
app.config["DATABASE_PASSWORD"] = "foobarfoo"
app.config["DATABASE_DB"] = "dat310"
app.config["DATABASE_HOST"] = "localhost"
app.debug = True  # only for development!


def get_db():
    if not hasattr(g, "_database"):
        print("create connection")
        g._database = mysql.connector.connect(host=app.config["DATABASE_HOST"], user=app.config["DATABASE_USER"],
                                              password=app.config["DATABASE_PASSWORD"], database=app.config["DATABASE_DB"])
    return g._database


@app.teardown_appcontext
def teardown_db(error):
    """Closes the database at the end of the request."""
    db = getattr(g, '_database', None)
    if db is not None:
        print("close connection")
        db.close()


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/products")
def products():
    return json.dumps(getProducts())


@app.route("/order", methods=["POST"])
def order():
    data = request.get_json()
    addresses = {"firstname": data["firstname"], "lastname": data["lastname"], "email": data["email"],
                 "street": data["street"], "city": data["city"], "postalcode": data["postalcode"]}
    order = {}

    for i in data.keys():
        try:
            idx = int(i)
            order[i] = data[i]
        except ValueError:
            pass

    cur = get_db()
    cursor = cur.cursor()
    query = ("INSERT INTO orders (first_name, last_name, email, street, city, postcode) VALUES ( %s, %s, %s, %s, %s, %s)")
    cart = (addresses["firstname"], addresses["lastname"], addresses["email"],
            addresses["street"], addresses["city"], addresses["postalcode"])
    cursor.execute(query, cart)

    order_id = cursor.lastrowid

    query2 = (
        "INSERT INTO order_row (product_id, order_id, count, size) VALUES ( %s, %s, %s, %s)")
    for i in order.keys():
        new_cart = (order[i]["pid"], order_id, order[i]
                    ["count"], order[i]["size"])
        cursor.execute(query2, new_cart)

    cur.commit()
    cursor.close()
    cur.close()
    return ""


def getProducts():
    products = {}
    cur = get_db()
    cursor = cur.cursor()

    cursor.execute(
        "SELECT product_id, title, price, discount, img, description, details FROM products")
    products_all = cursor.fetchall()

    for product in products_all:
        products[product[0]] = {"title": product[1],
                                "price": product[2],
                                "discount": product[3],
                                "img": product[4],
                                "description": product[5],
                                "details": product[6]
                                }
    return products


if __name__ == "__main__":
    app.run()
