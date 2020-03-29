const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require('./controllers/OngController');
const IncidenteController = require('./controllers/IncidenteController');
const PerfilController = require("./controllers/PerfilController");
const SessaoController = require("./controllers/SessaoController");

const routes = express.Router();

routes.post("/sessions", SessaoController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", celebrate({
	[Segments.BODY]: Joi.object({
		nome: Joi.string().required().min(1),
		email: Joi.string().required().email(),
		whatsapp: Joi.number().required().min(10).max(11),
		cidade: Joi.string().required(),
		uf: Joi.string().required().length(2)
	}).unknown()
}), OngController.create);

routes.get("/perfil", celebrate({
	[Segments.HEADERS] : Joi.object().keys({
		authorization: Joi.string().required(),
	}),
}), PerfilController.index);

routes.get("/incidentes", celebrate({
	[Segments.QUERY]: Joi.object.keys({
		page: Joi.number(),
	})
}), IncidenteController.index);
routes.post("/incidentes", IncidenteController.create);


routes.delete("/incidentes/:id", celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required(),
	})
}), IncidenteController.delete)

module.exports = routes;