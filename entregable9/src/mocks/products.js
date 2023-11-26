import { faker } from "@faker-js/faker/locale/es";
export const generateProducts = () => {
    return {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      code: faker.commerce.isbn(10),
      stock: faker.number.int({ min: 10, max: 100 }),
      price: faker.commerce.price(),
      thumbnail: faker.image.url(100, 100, "product", true),
    };
  };