const crypto = require('crypto');
const secp256k1 = require('secp256k1');

const msg = process.argv[2];
const digested = digest(msg);
console.log(`0) Alice's message:
    message: ${msg}
    message digest: ${digested.toString("hex")}`);

function digest(str, algo = "sha256") {
    return crypto.createHash(algo).update(str).digest();
}


// Generate privat Key
let privateKey;
do {
  privateKey = crypto.randomBytes(32);
} while (!secp256k1.privateKeyVerify(privateKey));

// Get the public Key
const publicKey = secp256k1.publicKeyCreate(privateKey);
console.log(`1) Alice aquired new keypair:
    publicKey: ${publicKey.toString("hex")}
    privateKey: ${privateKey.toString("hex")}`);

console.log(`2) Alice signed her message digest with her privateKey to get its signature:`);

const sigObj = secp256k1.sign(digested, privateKey);
const sig = sigObj.signature;
console.log("    signature: ", sig.toString("hex"));

console.log(`3) Bob verifyed by 3 elements ("message digest", "signature", and Alice's "publicKey")`);
let  verified = secp256k1.verify(digested, sig, publicKey);
console.log("    verified: ", verified);
