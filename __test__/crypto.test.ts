import {
  platformEncrypt,
  platformDecrypt,
  encrypt,
  decrypt,
} from "../src/crypto";

describe("crypto", () => {
  describe("encryption replication from golang", () => {
    const key = "1abduktor2gompal3lauk-pauk4kaper";
    const message = "hello world";
    let decrypted = "";
    it("encrypt", async () => {
      decrypted = await encrypt(key, message);
      const expected = await encrypt(key, message);
      expect(decrypted).not.toBe(expected);
    });
    it("decrypt", async () => {
      const dec = await decrypt(key, decrypted);
      expect(dec).toBe(message);
    });
  });

  describe("encryption replication from platform without nonce", () => {
    const oldKey = "1abduktor2gompal3lauk-pauk4kaper";
    const oldMessage = "hello world";
    let oldResult = "";
    it("platformEncrypt", async () => {
      oldResult = await platformEncrypt(oldKey, oldMessage);
      const expected = await platformEncrypt(oldKey, oldMessage);
      expect(oldResult).not.toBe(expected);
    });
    it("platformDecrypt", async () => {
      const result = await platformDecrypt(oldKey, oldResult);
      expect(result).toBe(oldMessage);
    });
  });
});
