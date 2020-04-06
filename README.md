# Back end point of sales myGadget


## Getting Started

* Install node js 
* Install mysql
* Install postman

### Installing
* clone https://github.com/lukmansp/backend_pos
* run npm install on cmd
* create new file .env in route document and paste

```
PORT = 9009
DB_HOST ='localhost'
DB_USER = 'root'
DB_PASSWORD='arkademy'
DB_NAME ='restful_pos'
JWT_KEY='lukmans'
```

### Run project

```
*add product
http://localhost:9009/product
method: POST
*body
- name
- description
- image (file)
- price
- stock
- category_id
```
```
*get product
http://localhost:9009/product
method:GET
```
```
*update product
http://localhost:9009/product/(id_product)
method:PATCH
*body
- name
- description
- image (file)
- price
- stock
- category_id
```
```
*delete product
http://localhost:9009/product/(id_product)
method:DELETE
```


```
*register user
http://localhost:9009/user/register
*body
- name
- email
- username
- password
- status
```
```
*login user
http://localhost:9009/user/login
*body
- password
- email



