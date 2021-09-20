import mysql.connector

cur = mysql.connector.connect(
    host="localhost", user="root", password="foobarfoo", database="dat310")
cursor = cur.cursor()
query = ("INSERT INTO products (title, price, discount, img, description, details) VALUES (%s, %s, %s, %s, %s, %s)")


products = {}
products[1] = {
    "title": 'Special socks',
    "price": 170,
    "discount": 18,
    "img": "tsock.jpg",
    "description": "Perfectly good socks!",
    "details": ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales neque quis nisi facilisis lobortis. Nam'
                'efficitur eget nisi sit amet bibendum. Vestibulum elementum faucibus quam ut posuere. Vivamus pellentesque'
                'luctus nunc at bibendum. Mauris viverra ultrices nisi, sit amet imperdiet lectus accumsan eu. Morbi ornare diam'
                'nulla, nec aliquet nisl accumsan dictum. Mauris sit amet tellus in ipsum commodo hendrerit. Nunc at mollis'
                'magna. Proin felis nibh, venenatis non lobortis quis, ullamcorper nec dolor. Vivamus tempus volutpat fringilla.'
                'Praesent volutpat sit amet massa nec ultricies. Curabitur sollicitudin pharetra tortor in dictum. In mattis orci'
                'vel augue vehicula rutrum. Nullam vitae sollicitudin orci.')
}
products[2] = {
    "title": 'Good socks',
    "price": 170,
    "discount": 0,
    "img": "tsock.jpg",
    "description": "Keep you warm.",
    "details": ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales neque quis nisi facilisis lobortis. Nam'
                'efficitur eget nisi sit amet bibendum. Vestibulum elementum faucibus quam ut posuere. Vivamus pellentesque'
                'luctus nunc at bibendum. Mauris viverra ultrices nisi, sit amet imperdiet lectus accumsan eu. Morbi ornare diam'
                'nulla, nec aliquet nisl accumsan dictum. Mauris sit amet tellus in ipsum commodo hendrerit. Nunc at mollis'
                'magna. Proin felis nibh, venenatis non lobortis quis, ullamcorper nec dolor. Vivamus tempus volutpat fringilla.'
                'Praesent volutpat sit amet massa nec ultricies. Curabitur sollicitudin pharetra tortor in dictum. In mattis orci'
                'vel augue vehicula rutrum. Nullam vitae sollicitudin orci.')
}


for i in products.keys():
    product = (products[i]["title"], products[i]["price"], products[i]["discount"],
               products[i]["img"], products[i]["description"], products[i]["details"])
    cursor.execute(query, product)

cur.commit()

if (cur.is_connected()):
    cursor.close()
    cur.close()
    print("Mysql connection is gone")
