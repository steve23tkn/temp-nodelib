/**
 * Encrypt an message or payload with `aes` algorithm with static vector.
 * and formatted as `hex`
 * @param key string - secret passphrase
 * @param message string - message want to be encrypt
 * @returns encrypted string with hex format
 */
export declare const encrypt: (key: string, message: string) => Promise<string>;
/**
 * Decrypt an encrypted message or payload with 'aes algorithm with static vector
 * @param key string - secret passphrase
 * @param encrypted encrypted payload that want to be decrypt
 * @returns decrypted message utf-8 format
 */
export declare const decrypt: (key: string, payload: string) => Promise<string>;
/**
 * Encryption replication from platform golang repository, to allow encrypt with a same result
 * and enable to decrypt from platform repository
 * @param key secret key
 * @param message string - message want to be encrypt
 * @returns encrypted string with hex format
 */
export declare const platformEncrypt: (key: string, message: string) => Promise<string>;
/**
 * Encryption replication from platform repository. To allow decrypt a payload
 * that should came from platform repository and give a same result.
 * @param key secret passphrase
 * @param payload encrypted data want to encrypt
 * @returns encrypted string with hex format
 */
export declare const platformDecrypt: (key: string, payload: string) => Promise<string>;
/**
 * hash a message combined `md5` and `sha256`
 * @param message payload that want to hash
 * @returns
 */
export declare const hash: (message: string) => string;
