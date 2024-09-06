ADD PRODUCTS
------------
POST http://localhost:5002/api/products - name: Add Product Code IPad109
body:
        {
            "title": "Apple iPad Air",
            "description": "Apple iPad Air (5ª generación) 10.9' Wi-Fi 64 GB Chip M1 - Gris espacial",
            "code": "IPad109",
            "price": 895,
            "status": false,
            "stock": 22,
            "category": "Tablet",
            "thumbnails": ["IPad109_01.jpg","IPad109_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code SGXS9
body:
        {
            "title": "Samsung Galaxy Tab S9",
            "description": "Tablet Samsung Galaxy Tab S9 Fe 256gb 8gb Ram Color Silver",
            "code": "SGXS9",
            "price": 1148,
            "status": true,
            "stock": 35,
            "category": "Tablet",
            "thumbnails": ["SGXS9_01.jpg","SGXS9_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code LNV4
body:
        {
            "title": "Lenovo Tab M10 Plus",
            "description": "Tablet Lenovo Tab M10 Plus 3rd Gen TB125FU 10.61' 64GB color storm gray",
            "code": "LNV4",
            "price": 256,
            "status": true,
            "stock": 27,
            "category": "Tablet",
            "thumbnails": ["LNV4_01.jpg","LNV4_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code CSGA235G
body:
        {
            "title": "Samsung Galaxy A23 5G 128GB",
            "description": "Samsung Galaxy A23 5G 128 GB awesome black 4 GB RAM",
            "code": "CSGA235G",
            "price": 399,
            "status": true,
            "stock": 98,
            "category": "Telefono",
            "thumbnails": ["CSGA235G_01.jpg","CSGA235G_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code CSGA34
body:
        {
            "title": "Samsung Galaxy A34 128gb",
            "description": "Samsung Galaxy A34 128gb 6gb Ram Awesome Silver",
            "code": "CSGA34",
            "price": 569,
            "status": true,
            "stock": 73,
            "category": "Telefono",
            "thumbnails": ["CSGA34_01.jpg","CSGA34_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code CXMi11
body:
        {
            "title": "Xiaomi Mi 11 Lite 5G",
            "description": "Xiaomi Mi 11 Lite 5G NE Dual SIM 128 GB negro trufa 8 GB RAM",
            "code": "CXMi11",
            "price": 499,
            "status": true,
            "stock": 81,
            "category": "Telefono",
            "thumbnails": ["CXMi11_01.jpg","CXMi11_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code HWH5602
body:
        {
            "title": "Heladera Whirlpool WRM5602 c/Freezer 462L",
            "description": "Heladera inverter no frost Whirlpool WRM56D2 blanca con freezer 462L 220V",
            "code": "HWH5602",
            "price": 1801,
            "status": false,
            "stock": 32,
            "category": "Helad-Freezer",
            "thumbnails": ["HWH5602_01.jpg","HWH5602_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code HD320F
body:
        {
            "title": "Heladera Drean Freezer 314 Lts",
            "description": "Heladera Con Freezer 314 Lts Black Steel Drean Hdr320f00n Color Negro",
            "code": "HD320F",
            "price": 668,
            "status": true,
            "stock": 45,
            "category": "Helad-Freezer",
            "thumbnails": ["HD320F_01.jpg","HD320F_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code LAGad320
body:
        {
            "title": "Lámpara Escritorio Gadnic Articulada",
            "description": "Lámpara De Escritorio Articulada Gadnic Velador De Metal Color de la estructura Negro",
            "code": "LAGad320",
            "price": 46,
            "status": true,
            "stock": 254,
            "category": "Iluminacion",
            "thumbnails": ["LAGad320_01.jpg","LAGad320_02.jpg"]
        }

POST http://localhost:5002/api/products - name: Add Product Code LAEco
body:
        {
            "title": "Lámpara de Pie Ecocuero",
            "description": "Lámpara De Pie Decorativa - Ecocuero - Intensa Luz - Colores",
            "code": "LAEco",
            "price": 86,
            "status": true,
            "stock": 123,
            "category": "Iluminacion",
            "thumbnails": ["LAEco_01.jpg","LAEco_02.jpg"]
        }

EDIT PRODUCT
------------
PUT http://localhost:5002/api/products/ID - name: Edit Product ID
body:
        {
                "title": "Samsung Galaxy A23 5G 128GB",
                "description": "Samsung Galaxy A23 5G 128 GB awesome black 4 GB RAM",
                "code": "CSGA235G",
                "price": 504,
                "status": false,
                "stock": 104,
                "category": "Telefono",
                "thumbnails": [
                    "CSGA235G_01.jpg",
                    "CSGA235G_02.jpg",
                    "CSGA235G_03.jpg
                ]
        }

GET PRODUCTS
------------
GET http://localhost:5002/api/products?page=1&limit=2&sort=desc&category=Iluminacion - name: GET All Products FilterBy Category -
GET http://localhost:5002/api/products?page=1&limit=3&sort=desc&stock=100 - name: GET All Products FilterBy Stock Greater Than X -
GET http://localhost:5002/api/products?page=1&limit=2&sort=desc&stock=10&category=Tablet - name: GET All Products FilterBy Category AND Stock Greater Than X
GET http://localhost:5002/api/products/ID - name: GET One Product

DELETE PRODUCT
--------------
DELETE http://localhost:5002/api/products/ID - name: Delete Product ID


ADD NEW CART
------------
POST http://localhost:5002/api/carts - name: Add New Cart

ADD PRODUCT TO CART
-------------------
POST http://localhost:5002/api/carts/product/IDPRODUCT - name: Add Product to Cart

PUT ARRAY PRODUCTS TO CART
--------------------------
PUT http://localhost:5002/api/carts
body:
        [
            {
                "quantity": 2,
                "product": "ID Product"
            },
            {
                "quantity": 1,
                "product": "ID Product"
            }
        ]

PUT PRODUCT QUANTITY
--------------------
PUT http://localhost:5002/api/carts/product/ID - name: PUT Update Product Quantity
body: 
        {
            "quantity":3
        }

GET CARTS
---------
GET http://localhost:5002/api/carts/cart - name: GET One Cart - This method includes 'mongoose-populate'
GET http://localhost:5002/api/carts - name: GET All Carts - This method includes 'mongoose-populate'

DELETE PRODUCTS FROM CART
-------------------------
DELETE http://localhost:5002/api/carts/ID/product/ID - name: DELETE Product from Cart
DELETE http://localhost:5002/api/carts/ID - name: DELETE All Products from Cart

CURRENT USER USING REPOSITORY Y DTO
-----------------------------------
http://localhost:5002/api/sessions/current returns the current user

USERS
-----
POST http://localhost:5002/users/register (en Headers agregar orig(key) postman(value) ) - name POST Create User
POST http://localhost:5002/users/login (en Headers agregar orig(key) postman(value) ) - name POST Login User
GET http://localhost:5002/users - name: GET All Users
GET http://localhost:5002/users/ID - name: GET One User

CREATE TICKET
-------------
POST http://localhost:5002/api/tickets/purchase - name POST Create Ticket

MOCKING PRODUCTS
----------------
http://localhost:5002/api/products/mockingproducts?cant=100 - name POST Create Mocking Products

CUSTOM ERROR 
------------
POST http://localhost:5002/api/products - name: Add Product Code JJ2020 (Generar error without Title and Price)
body:
        {
            "description": "Heladera Bambi 350 Lts Color Blanco",
            "code": "JJ2020",
            "status": true,
            "stock": 45,
            "category": "Helad-Freezer",
            "thumbnails": ["HD320F_01.jpg","HD320F_02.jpg"]
        }

LOGGER TEST
-----------
GET http://localhost:5002/loggertest 

RESET PASSWORD BY EMAIL
-----------------------
POST http://localhost:5002/users/reset-pass

UPDATE PASSWORD
---------------
PUT http://localhost:5002/users/update-pass
body:
        {
            "password":"1234"
        }

CHANGE USER ROLE
----------------
PUT http://localhost:5002/users/premium

#Tareas extras a realizar:
        #ejecutar la request http://localhost:5002/users/reset-pass que envía el correo para habilitar el cambio de password.
        #ejecutar la request http://localhost:5002/users/update-pass (body "password": "1234") para que se modifique la password.
        #Al intentar agregar un nuevo producto a la colección products, solo permite hacerlo si el usuario tiene role = admin o premium
        #El usuario con rol 'admin' puede modificar o borrar cualquier producto
        #El usuario con rol 'premium' solo puede modificar o borrar los productos que tienen su email en el campo owner, es decir los productos que le pertenecen.
        #Un usuario con rol 'premium' no puede agregar al carrito un producto que le pertenece.
        #Al llamar al end-point http://localhost:5002/users/premium, si el usuario tiene rol premium se cambia a rol user y viceversa. Si el usuario tiene rol 'admin' impide que pueda realizar el cambio.
        

