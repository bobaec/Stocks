const Crypto = require('../models/crypto');

exports.getCoinById = async function (req, res) {
	const coin = await Crypto.getById(req.params.id);
	res.send(coin);
};

exports.getAll = async (req, res) => {
    const coins = await Crypto.getAll();
    res.send(coins);
};