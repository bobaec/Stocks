const Crypto = require('../models/crypto');


// Add a new crypto
exports.createNewCrypto = async (req, res) => {
	try {
		await Crypto.addNewCrypto(req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};

// Get crypto by id
exports.getCryptoById = async function (req, res) {
	res.send(await Crypto.getById(req.params.id));
};

// Get by crypto_id
exports.getCryptoByCryptoId = async function (req, res) {
	res.send(await Crypto.getByCryptoId(req.params.crypto_id));
};

// Get by symbol
exports.getCryptoBySymbol = async (req, res) => {
	res.send(await Crypto.getBySymbol(req.params.symbol));
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
};
