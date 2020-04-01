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
	try {
		res.status(200).send(await Crypto.getById(req.params.id));
	} catch (err) {
		res.sendStatus(500);
	}
};

// Get by crypto_id
exports.getCryptoByCryptoId = async function (req, res) {
	try {
		res.status(200).send(await Crypto.getByCryptoId(req.params.crypto_id));
	} catch (err) {
		res.sendStatus(500);
	}
};

// Get by symbol
exports.getCryptoBySymbol = async (req, res) => {
	try {
		res.status(200).send(await Crypto.getBySymbol(req.params.symbol));
	} catch (err) {
		res.sendStatus(500);
	}
};

// Get by Name
exports.getCryptoByName = async function (req, res) {
	try {
		res.status(200).send(await Crypto.getByName(req.params.name));
	} catch (err) {
		res.sendStatus(500);
	}
};

// Get all cryptos
exports.getAll = async (req, res) => {
	try {
		res.status(200).send(await Crypto.getAll());
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.getNameId = async (req, res) => {
	try {
		res.status(200).send(await Crypto.getBasics());
	} catch (err) {
		res.sendStatus(500);
	}
};
