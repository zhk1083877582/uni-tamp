
//解密方法
function Decrypt(word) {
    // 特殊字符处理
    // word = word.replace(/\n/g,'');
    // let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    // let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    // let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    // let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    // return decryptedStr.toString();
	return word
}
//加密方法
function Encrypt(word) {
    // let srcs = CryptoJS.enc.Utf8.parse(word);
    // let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    // return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	return word
}

export default {
	Decrypt ,
	Encrypt
}