const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const admin = require("./routes/adminRouter");
const customer = require("./routes/customerRouter");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/pub", customer);
app.use("/", admin);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
