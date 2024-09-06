export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API ECommerce",
      version: "1.0.0",
      description: "Documentacion API ECommerce",
    },
    servers: [
      {
        url: "http://localhost:5002",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
