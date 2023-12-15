// const jwt = require("jsonwebtoken")
// const { OAuth2Client } = require('google-auth-library');
// const crypto = require("crypto");
// import crypto from "crypto";
import crypto from "crypto-browserify";
import { Buffer } from "buffer";

// import { Buffer } from 'buffer';
global.Buffer = Buffer;

/**
 * NOT FOR YOUR USE. KINDLY DONT'T USE THIS CLASS
 */

class scripts {
  generateToken(length) {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    let token = password.split(".").join();
    return token;
  }
  createToken(dataInJson, key) {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      key,
      Buffer.alloc(16, 0)
    );
    let token = cipher.update(JSON.stringify(dataInJson), "utf8", "base64");
    token += `${cipher.final("base64")}&&tkn${Date.now() + 120000}`;

    return token;
  }
  verifyToken(token, key) {
    try {
      const [encryptedData, expirationTimeStr] = token.split("&&tkn");
      const expirationTime = Number(expirationTimeStr);

      // Check if the token is expired.
      if (Date.now() > expirationTime) {
        return [false, "Token expired"];
      }

      // Decrypt the data with the decipher.
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        key,
        Buffer.alloc(16, 0)
      );
      const decryptedData = decipher.update(encryptedData, "base64", "utf8");
      decryptedData += decipher.final("utf8");

      // Parse the decrypted data as JSON.
      const data = JSON.parse(decryptedData);

      return [true, data];
    } catch (errors) {
      return [false, errors];
    }
  }
}

export default scripts;
