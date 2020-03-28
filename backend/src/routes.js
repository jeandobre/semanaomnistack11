const express = require("express");

const OngController = require('./controllers/OngController');
const IncidenteController = require('./controllers/IncidenteController');
const PerfilController = require("./controllers/PerfilController");
const SessaoController = require("./controllers/SessaoController");

const routes = express.Router();

routes.post("/sessions", SessaoController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/perfil", PerfilController.index);

routes.get("/incidentes", IncidenteController.index);
routes.post("/incidentes", IncidenteController.create);
routes.delete("/incidentes/:id", IncidenteController.delete)

module.exports = routes;