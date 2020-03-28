import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./style.css"

import logoImg from "../../assets/logo.svg";

export default function Profile(){

	const [incidentes, setIncidentes] = useState([]);

	const ongId = localStorage.getItem("ongId");
	const ongName = localStorage.getItem("ongName");

	const history = useHistory();

	//executa a funcao para cada vez que cada variável do array mudar
	useEffect(() => {
		api.get("perfil", {
			headers: {
				Authorization: ongId,
			}
		}).then(response => {
			setIncidentes(response.data);
		})
	}, [ongId]);

	async	function handleDeleteIncident(id) {
		try {
			await api.delete(`incidentes/${id}`, {
				headers: {
					Authorization: ongId,
				}
			});
			setIncidentes(incidentes.filter(incidente => incidente.id !== id));
		} catch (err) {
			alert("Erro ao deletar caso, tente novamente.")
		}
	}

	function handleLogout() {
		localStorage.clear();
		history.push("/");
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be the hero" />
				<span>Bem vindo, {ongName}</span>

				<Link className="button" to="/incidentes/novo">Cadastrar novo caso</Link>
				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>

			<ul>
				{incidentes.map(incidente => (
					<li key={incidentes.id}>
					<strong>CASO:</strong>
					<p>{incidente.titulo}</p>

					<strong>DESCRIÇÃO:</strong>
					<p>{incidente.descricao}</p>

					<strong>VALOR:</strong>
					<p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incidente.valor)}</p>

					<button type="button" onClick={() => handleDeleteIncident(incidente.id)}>
						<FiTrash2 size={20} color="#a8a8b3" />
					</button>
				</li>
				))}
				
			</ul>
		</div>
	);
};