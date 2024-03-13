import express from "express";
import morgan from "morgan";
import donenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import otpRoute from "./routes/otpRoute.js";
import otpValidationRoute from "./routes/otpValidationRoute.js";
import resetPasswordRoute from "./routes/resetPasswordRoute.js";
import cors from "cors";
// port setup
donenv.config();
const port = process.env.PORT || 5000;

// databae config
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", otpRoute);
app.use("/api/v1/otp", otpValidationRoute);
app.use("/api/v1", resetPasswordRoute);

//rest api
app.get("/", (req, res) => {
  res.send({
    messsage: "server is running on 5000",
  });
});

// port
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
