"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.platformDecrypt = exports.platformEncrypt = exports.decrypt = exports.encrypt = void 0;
const crypto_1 = require("crypto");
/**
 * Encrypt an message or payload with `aes` algorithm with static vector.
 * and formatted as `hex`
 * @param key string - secret passphrase
 * @param message string - message want to be encrypt
 * @returns encrypted string with hex format
 */
const encrypt = (key, message) => {
    return new Promise((resolve, reject) => {
        if (!key.length || !message.length) {
            reject(new Error("invalid parameter"));
            return;
        }
        try {
            const iv = (0, crypto_1.randomBytes)(12);
            const cipher = (0, crypto_1.createCipheriv)("aes-256-gcm", key, iv);
            const enc = Buffer.concat([iv, cipher.update(message, "utf-8"), cipher.final(), cipher.getAuthTag()]);
            resolve(enc.toString("hex"));
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.encrypt = encrypt;
/**
 * Decrypt an encrypted message or payload with 'aes algorithm with static vector
 * @param key string - secret passphrase
 * @param encrypted encrypted payload that want to be decrypt
 * @returns decrypted message utf-8 format
 */
const decrypt = (key, payload) => {
    return new Promise((resolve, reject) => {
        if (!key.length || !payload.length) {
            reject("invalid parameter");
            return;
        }
        try {
            const ivLen = 12;
            const tagLen = 16;
            const buf = Buffer.from(payload, "hex");
            const iv = Buffer.allocUnsafe(ivLen);
            const tag = Buffer.allocUnsafe(tagLen);
            const data = Buffer.alloc(buf.length - (ivLen + tagLen), 0);
            buf.copy(iv, 0, 0, ivLen);
            buf.copy(tag, 0, buf.length - tagLen);
            buf.copy(data, 0, ivLen);
            const decipher = (0, crypto_1.createDecipheriv)("aes-256-gcm", Buffer.from(key, "utf-8"), iv);
            decipher.setAuthTag(tag);
            const dec = decipher.update(data);
            dec.write(decipher.final("utf-8"));
            resolve(dec.toString("utf-8"));
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.decrypt = decrypt;
/**
 * Encryption replication from platform golang repository, to allow encrypt with a same result
 * and enable to decrypt from platform repository
 * @param key secret key
 * @param message string - message want to be encrypt
 * @returns encrypted string with hex format
 */
const platformEncrypt = (key, message) => {
    return new Promise((resolve, reject) => {
        if (!key.length || !message.length) {
            reject(new Error("invalid parameter"));
            return;
        }
        try {
            const iv = (0, crypto_1.randomBytes)(12);
            const cipher = (0, crypto_1.createCipheriv)("aes-256-gcm", key, iv);
            const enc = Buffer.concat([cipher.update(message, "utf-8"), cipher.final(), cipher.getAuthTag()]);
            return resolve(`${enc.toString("hex")}.${iv.toString("hex")}`);
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.platformEncrypt = platformEncrypt;
/**
 * Encryption replication from platform repository. To allow decrypt a payload
 * that should came from platform repository and give a same result.
 * @param key secret passphrase
 * @param payload encrypted data want to encrypt
 * @returns encrypted string with hex format
 */
const platformDecrypt = (key, payload) => {
    return new Promise((resolve, reject) => {
        if (!key.length || !payload.length) {
            reject("invalid parameter");
            return;
        }
        try {
            const tagLen = 16;
            const message = payload.split(".");
            const buf = Buffer.from(message[0], "hex");
            const iv = Buffer.from(message[1], "hex");
            const tag = Buffer.allocUnsafe(tagLen);
            const data = Buffer.alloc(buf.length - tagLen, 0);
            buf.copy(tag, 0, buf.length - tagLen);
            buf.copy(data, 0, 0);
            const decipher = (0, crypto_1.createDecipheriv)("aes-256-gcm", Buffer.from(key, "utf-8"), iv);
            decipher.setAuthTag(tag);
            const dec = decipher.update(data);
            dec.write(decipher.final("utf-8"));
            resolve(dec.toString("utf-8"));
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.platformDecrypt = platformDecrypt;
/**
 * hash a message combined `md5` and `sha256`
 * @param message payload that want to hash
 * @returns
 */
const hash = (message) => {
    if (!message.length) {
        return "";
    }
    const md5 = (0, crypto_1.createHash)("md5").update(message).digest("hex");
    return (0, crypto_1.createHash)("sha256").update(md5).digest("hex");
};
exports.hash = hash;
