const Crypto = require('../models/crypto');


// Add a new crypto
exports.createNewCrypto = async (req, res) => {
	await Crypto.addNewCrypto(req.body);
	res.sendStatus(200);
};

// Get crypto by id
exports.getCryptoById = async function (req, res) {
	res.send(await Crypto.getById(req.params.id));
};

// Get by crypto_id
exports.getCryptoByCryptoId = async function (req, res) {
	res.send(await Crypto.getByCryptoId(req.params.crypto_id));
};

// Get by Name
exports.getCryptoByName = async function (req, res) {
	res.send(await Crypto.getByName(req.params.name));
};

// Get all cryptos
exports.getAll = async (req, res) => {
     res.send(await Crypto.getAll());
 };

exports.getNameId = async (req, res) => {
	res.send(await Crypto.getBasics());
}
