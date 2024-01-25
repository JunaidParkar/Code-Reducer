// const jwt = require("jsonwebtoken")
// const { OAuth2Client } = require('google-auth-library');
// const crypto = require("crypto");
// import crypto from "crypto";
// import crypto from "crypto-browserify";
// import { Buffer } from "buffer";

// import { Buffer } from 'buffer';
// global.Buffer = Buffer;

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
  async createToken(dataInJson, key) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(dataInJson));

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(key),
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );

    const encryptedData = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: new Uint8Array(16) },
      cryptoKey,
      encodedData
    );

    const base64EncryptedData = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    const token = `${base64EncryptedData}&&tkn${Date.now() + 120000}`;

    return token;
  }

  async verifyToken(token, key) {
    try {
      const [base64EncryptedData, expirationTimeStr] = token.split("&&tkn");
      const expirationTime = Number(expirationTimeStr);

      // Check if the token is expired.
      if (Date.now() > expirationTime) {
        return [false, "Token expired"];
      }

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(key),
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );

      const encryptedData = new Uint8Array(atob(base64EncryptedData).split('').map(char => char.charCodeAt(0)));
      const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: new Uint8Array(16) },
        cryptoKey,
        encryptedData
      );

      const decodedData = new TextDecoder().decode(decryptedData);
      const data = JSON.parse(decodedData);

      return [true, data];
    } catch (errors) {
      return [false, errors];
    }
  }
}

export default scripts;
