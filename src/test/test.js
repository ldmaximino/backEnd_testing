import { describe, before, test } from "node:test";
import assert from "node:assert";
import { PORT } from "../config/config.js";

let token = "";
let cartUser = "",
  roleUser = "";
let productID = "",
  productOwner = "";
const urlAPI = `http://localhost:${PORT}`;

const userRegister = () => {
  return {
    first_name: "Leandro",
    last_name: "Maximino",
    email: "leandro@gmail.com",
    password: "a1234",
    role: "admin",
  };
};

const userLogin = () => {
  return {
    email: "leandro@gmail.com",
    password: "a1234",
  };
};

const product = () => {
  return {
    title: "Lámpara de Pie Ecocuero",
    description: "Lámpara De Pie Decorativa - Ecocuero - Intensa Luz - Colores",
    code: "LAEco",
    price: 86,
    status: true,
    stock: 123,
    category: "Iluminacion",
    thumbnails: ["LAEco_01.jpg", "LAEco_02.jpg"],
  };
};

const product2 = () => {
  return {
    title: "Samsung Galaxy Tab S9",
    description: "Tablet Samsung Galaxy Tab S9 Fe 256gb 8gb Ram Color Silver",
    code: "SGXS9",
    price: 1148,
    status: true,
    stock: 35,
    category: "Tablet",
    thumbnails: ["SGXS9_01.jpg", "SGXS9_02.jpg"],
  };
};

describe("TESTING API ECOMMERCE", () => {
  //Clean collections
  before(async () => {
    await fetch(`${urlAPI}/users`, { method: "DELETE" });
    await fetch(`${urlAPI}/api/products`, { method: "DELETE" });
    await fetch(`${urlAPI}/api/carts/allcarts`, { method: "DELETE" });
  });

  //----------------------------------------------------------------- USERS --------------------------------------------------------------//
  //Register New User
  test("USERS - Register New User - [POST] /users/register -", async () => {
    const body = userRegister();
    const response = await fetch(`${urlAPI}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-requested-from": "swagger",
      },
      body: JSON.stringify(body),
    });

    const responseJson = await response.json();

    assert.equal(responseJson.status, 200);
    assert.equal(responseJson.data, "User created");
  });

  //User Login
  test("USERS - User Login - [POST] /users/login -", async () => {
    const body = userLogin();
    const response = await fetch(`${urlAPI}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-requested-from": "swagger",
      },
      body: JSON.stringify(body),
    });

    const cookies = response.headers.get("set-cookie");
    token = cookies
      ? cookies
          .split(";")
          .find((cookie) => cookie.includes("token"))
          .split("=")[1]
      : null;

    const responseJson = await response.json();
    cartUser = responseJson.data.cart;
    roleUser = responseJson.data.role;

    assert.equal(responseJson.status, 200);
    assert.equal(responseJson.data.email, body.email);
    assert.notEqual(responseJson.cart, "");
  });

  //Get All Users
  test("USERS - Get All Users - [GET] /users -", async () => {
    const response = await fetch(`${urlAPI}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    const responseJson = await response.json();

    assert.equal(responseJson.message, "Success");
    assert.strictEqual(Array.isArray(responseJson.data), true);
    assert.equal(responseJson.data.length, 1);
  });

  //----------------------------------------------------------------- PRODUCTS --------------------------------------------------------------//
  //Add a Product
  test("PRODUCTS - Add a Product - [POST] /api/products -", async () => {
    const body = product();
    const response = await fetch(`${urlAPI}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-requested-from": "swagger",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(body),
    });

    const responseJson = await response.json();

    if (roleUser === "user") {
      productID = "999999xxxxxx999999xxxxxx"; // the user role 'user' can't create a product, so it's define an ID that doesn't exist
      assert.equal(responseJson.status, 403);
      assert.equal(
        responseJson.error,
        "This endpoint is only for users with role 'admin' or 'premium'"
      );
    } else {
      productID = responseJson.data._id;
      productOwner = responseJson.data.owner;
      assert.ok(responseJson.data, "_id");
      assert.deepStrictEqual(body.title, responseJson.data.title);
      assert.notEqual(responseJson.data, {});
    }
  });

  //Get All Products
  test("PRODUCTS - Get All Products - [GET] /api/products -", async () => {
    const response = await fetch(`${urlAPI}/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    const responseJson = await response.json();

    if (roleUser === "user") {
      assert.equal(responseJson.totalDocs, 0);
    } else {
      assert.equal(responseJson.status, "success");
      assert.strictEqual(Array.isArray(responseJson.payload), true);
      assert.equal(responseJson.payload.length, 1);
      assert.notEqual(responseJson.payload, 0);
    }
  });

  //Get Product By Id
  test("PRODUCTS - Get Product By Id - [GET] /api/products/:id  -", async () => {
    const body = product2();
    let response = await fetch(`${urlAPI}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-requested-from": "swagger",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(body),
    });

    let responseJson = await response.json();

    if (roleUser === "user") {
      assert.equal(responseJson.status, 403);
      assert.equal(
        responseJson.error,
        "This endpoint is only for users with role 'admin' or 'premium'"
      );
    } else {
      const id = responseJson.data._id;
      response = await fetch(`${urlAPI}/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      });

      responseJson = await response.json();

      assert.equal(responseJson.status, 200);
      assert.notEqual(responseJson.data, {});
      assert.equal(body.title, responseJson.data.title);
    }
  });

  //----------------------------------------------------------------- CARTS --------------------------------------------------------------//
  //Get All Carts
  test("CARTS - Get all Carts - [GET] /api/carts -", async () => {
    const response = await fetch(`${urlAPI}/api/carts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    const responseJson = await response.json();

    assert.equal(responseJson.message, "Success");
    assert.equal(responseJson.data[0]._id, cartUser);
    assert.strictEqual(Array.isArray(responseJson.data), true);
  });

  //Get Cart By Id
  test("CARTS - Get Cart By Id - [GET] /api/carts/cart/ -", async () => {
    const response = await fetch(`${urlAPI}/api/carts/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    const responseJson = await response.json();

    assert.equal(responseJson.status, 200);
    assert.equal(responseJson.data._id, cartUser);
    assert.strictEqual(Array.isArray(responseJson.data.products), true);
    assert.deepStrictEqual(responseJson.data.products, []);
  });

  //Add Product to cart
  test("CARTS - Add Product to Cart - [POST] /api/carts/product/:id -", async () => {
    const response = await fetch(`${urlAPI}/api/carts/product/${productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    const responseJson = await response.json();

    if (roleUser === "admin") {
      assert.equal(responseJson.status, 403);
      assert.equal(
        responseJson.error,
        "Only users with role 'user' or 'premium' can add products to the cart"
      );
    } else if (roleUser === "premium") {
      if (productOwner !== "admin") {
        assert.equal(responseJson.status, 403);
        assert.equal(
          responseJson.error,
          "User with 'premium' role cannot add a product created by himself"
        );
      } else {
        assert.equal(responseJson.message, "Success");
        assert.equal(
          responseJson.data.status,
          "Product added to cart" || "Cart updated"
        );
      }
    }
  });
});
