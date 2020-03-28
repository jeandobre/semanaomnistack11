const crypto = require('crypto');

const conexao = require('../database/connection');

module.exports = {

	async index(req, res){
		const ongs = await conexao('ongs').select('*');
	
		return res.json(ongs);
	},
	
	async create(req, res){

		const { nome, email, whatsapp, cidade, uf } = req.body;
	
		const id = crypto.randomBytes(4).toString('HEX');
	
		await conexao('ongs').insert({
			id,
			nome,
			email,
			whatsapp,
			cidade,
			uf
		});
	
		return res.json({ id });
	
	}
};