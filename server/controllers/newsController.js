const newsapi = require('../utils/news');

/**
 * GET /
 *  News By keyword.
 */
exports.query = async (req, res) =>  {
    const query = req.params.query;

    try {
        const news = await newsapi.query(query);
        res.json(news);
    } catch (error) {
        console.log(error.message)
    }
};