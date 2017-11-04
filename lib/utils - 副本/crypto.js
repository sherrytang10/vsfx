import { createCipher, createDecipher } from 'crypto';
import { Readonly, Enumerable } from '../@common/decorator'
// const crypto = require('crypto');
const ecretKey = '天冰，天上冰、亮晶晶！';
class __Crypto {
    @Readonly
    // @Enumerable
    secretKey = '天冰，天上冰、亮晶晶！';
    // @Enumerable //class 属性默认不枚举
    _aesEncrypt = '';
    set aesEncrypt(data) {
        let cipher = createCipher('aes-128-ecb', this.secretKey);
        this._aesEncrypt = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    }
    get aesEncrypt() {
        return this._aesEncrypt;
    }
    aesEncryptPipe(data) {
        let cipher = createCipher('aes-128-ecb', this.secretKey);
        return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    }
    aesDecryptPipe(data) {
        let decipher = createDecipher('aes-128-ecb', this.secretKey)
        return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
    }
}
export default new __Crypto();