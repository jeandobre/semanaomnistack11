import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Registro";
import Profile from "./pages/Perfil";
import NewIncident from "./pages/NovoIncidente";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon} />
				<Route path="/registro" component={Register} />
				<Route path="/perfil" component={Profile} />
				<Route path="/incidentes/novo" component={NewIncident} />
			</Switch>
		</BrowserRouter>
	);
}