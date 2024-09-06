import { faker } from "@faker-js/faker";
faker.locale = "es";

export const addProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(8),
    price: faker.commerce.price(),
    status: true,
    stock: faker.datatype.number({ min: 0, max: 99 }),
    category: faker.commerce.product(),
    thumbnails: []
  };
};
