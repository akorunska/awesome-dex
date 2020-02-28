import sha256 from "js-sha256";
import { Crypto, utils } from "ontology-ts-sdk";

export const gasPrice = 500;
export const gasLimit = 30000;

export const getHashlock = secret => {
  let hash = sha256.create();
  hash.update(secret);
  const hashHex = hash.hex();
  return hashHex;
};

export function reverseAddressHex(str) {
  return new Crypto.Address(utils.reverseHex(str));
}

export function cryptoAddress(address) {
  return new Crypto.Address(address);
}

export function cryptoPrivateKey(key) {
  return new Crypto.PrivateKey(key);
}

export function hexArrToArr(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res.push({ [utils.hexstr2str(arr[i][0])]: utils.hexstr2str(arr[i][1]) });
    } else if (typeof arr[i] === "string" && arr[i] !== null) {
      res.push(utils.hexstr2str(arr[i]));
    }
  }
  return res;
}

export function parseAmounts(arr) {
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    const amount = parseInt(utils.reverseHex(arr[i][1]), 16);
    const symbol = utils.hexstr2str(arr[i][0]);
    if (amount) {
      res.push({
        symbol,
        amount,
        key: symbol
      });
    }
  }

  return res;
}

// Convert a hex string to a byte array
export function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

export function signWithPk(msg, pk, schema) {
  return pk.sign(msg, schema);
}

export function parseBcError(er) {
  try {
    const errorObj = JSON.parse(er);
    return errorObj.Error === 42002 ? errorObj.Desc : errorObj.Result;
  } catch (e) {
    return "Something went wrong at the blockchain network";
  }
}

export function toUTF8Array(str) {
  var utf8 = [];
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode =
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }
  return utf8;
}
