const app = require("./app");
const connectDB = require("./config/database");
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(cors());

connectDB();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening in port ${port}`);
});
