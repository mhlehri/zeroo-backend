import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  uri: process.env.DATABASE_URI,
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  appApi:
    process.env.NODE_ENV == "production"
      ? process.env.APP_API
      : "http://localhost:3000",
};
