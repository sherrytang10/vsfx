"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class __Crypto {
    set aesEncrypt(data) {
        let cipher = crypto_1.createCipher('aes-128-ecb', __Crypto.secretKey);
        __Crypto._aesEncrypt = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    }
    get aesEncrypt() {
        return __Crypto._aesEncrypt;
    }
    aesEncryptPipe(data) {
        let cipher = crypto_1.createCipher('aes-128-ecb', __Crypto.secretKey);
        return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    }
    aesDecryptPipe(data) {
        let decipher = crypto_1.createDecipher('aes-128-ecb', __Crypto.secretKey);
        return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
    }
}
__Crypto.secretKey = '天冰，天上冰、亮晶晶！';
exports.Crypto = new __Crypto();
