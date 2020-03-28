const conexao = require('../database/connection');

module.exports = {

	async index(req, res) {
		const { page = 1 } = req.query;

		const [ count ] = await conexao('incidentes').count('id');

		console.log(count);

		const incidentes = await conexao('incidentes')
			.join('ongs', 'ongs.id', '=', 'incidentes.ong_id')
			.limit(5)
			.offset((page - 1) * 5)
			.select(['incidentes.*', 
				'ongs.nome', 
				'ongs.email', 
				'ongs.whatsapp', 
				'ongs.cidade', 
				'ongs.uf']);

		res.header('X-Total-Count', count["count(`id`)"]);

		return res.json(incidentes);
	},

	async create(req, res) {
		const { titulo, descricao, valor } = req.body;
		const ong_id = req.headers.authorization;

		const [id] = await conexao('incidentes').insert({
			titulo,
			descricao,
			valor,
			ong_id
		});

		return res.json({ id }); 
	},

	async delete(req, res){
		const { id } = req.params;
		const ong_id = req.headers.authorization;

		const incidente = await conexao('incidentes')
			.where('id', id)
			.select('ong_id')
			.first();

		if(incidente.ong_id != ong_id){
			return res.status(401).json({ error: "Operação não permitida." });
		}

		await conexao('incidentes').where('id', id).delete();

		return res.status(204).send();
	}
};