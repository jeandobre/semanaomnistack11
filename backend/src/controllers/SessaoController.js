const conexao = require("../database/connection");

module.exports = {
	async create(req, res){
		const { id } = req.body;

		const ong = await conexao('ongs')
			.where('id', id)
			.select('nome')
			.first();

		if(!ong){
			return res.status(400).json({ error: "Ong não encontrada com este ID" });
		}

		return res.json(ong);
	}
}