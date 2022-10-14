const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const router = require("./routes/router");
require('dotenv').config()

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./utils/swagger-output.json");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Express start at http://localhost:${port}`);
});
