const Crypto = require('../models/crypto');

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
