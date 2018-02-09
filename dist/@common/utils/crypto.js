"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var __Crypto = /** @class */ (function () {
    function __Crypto() {
    }
    Object.defineProperty(__Crypto.prototype, "aesEncrypt", {
        get: function () {
            return __Crypto._aesEncrypt;
        },
        set: function (data) {
            var cipher = crypto_1.createCipher('aes-128-ecb', __Crypto.secretKey);
            __Crypto._aesEncrypt = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
        },
        enumerable: true,
        configurable: true
    });
    __Crypto.prototype.aesEncryptPipe = function (data) {
        var cipher = crypto_1.createCipher('aes-128-ecb', __Crypto.secretKey);
        return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    };
    __Crypto.prototype.aesDecryptPipe = function (data) {
        var decipher = crypto_1.createDecipher('aes-128-ecb', __Crypto.secretKey);
        return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
    };
    __Crypto.secretKey = '天冰，天上冰、亮晶晶！';
    return __Crypto;
}());
exports.Crypto = new __Crypto();
