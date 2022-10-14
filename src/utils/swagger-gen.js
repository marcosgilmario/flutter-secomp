const options = {
  openapi: "Disable",
  language: "pt-BR", 
  disableLogs: true,
  autoHeaders: true, 
  autoQuery: true, 
  autoBody: true,
};

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "VCODES TESTE - API",
    description: "BY: MARCOS GILMÁRIO FERREIRA MOREIRA", 
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Users",
      description: "Rotas de usuário",
    },
    {
      name: "Auth",
      description: "Rotas com TOKEN de validação de sessão",
    },
  ],
  securityDefinitions: {},
  definitions: {},
  components: {},
};

const outputFile = "./src/utils/swagger-output.json";
const endpointsFiles = [
  "./src/routes/router.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Documentação gerada!");
});
