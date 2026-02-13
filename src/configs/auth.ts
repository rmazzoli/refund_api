import { SignOptions } from "jsonwebtoken";

export const authConfig = {
  jwt: {
    jwtSecret: "teste123",
    jwtExpiresIn: "1h" as SignOptions["expiresIn"],
  },
};