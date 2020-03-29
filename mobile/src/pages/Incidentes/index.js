import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Indicents() {

	const [incidentes, setIncientes] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation();

	function navigateToDetail(incidente) {
		navigation.navigate("Detail", { incidente });
	}

	async function loadIncidents(){
		if(loading) {
			return; //evitar outra requisição
		}

		if(total > 0 && incidentes.length === total){
			return;
		}

		setLoading(true);

		const response = await api.get("incidentes", {
			params: { page }
		});
		setIncientes([...incidentes, ...response.data]);
		setTotal(response.headers["x-total-count"]);
		setPage(page + 1);
		setLoading(false);
	};

	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>{total} casos</Text>
				</Text>
			</View>

			<Text style={styles.title}>Bem-vindo!</Text>
			<Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

		<FlatList 
			style={styles.incidentList} 
			data={incidentes} 
			keyExtractor={incidente => String(incidente.id)}
			showsVerticalScrollIndicator={false}
			onEndReached={loadIncidents}
			onEndReachedThreshold={0.2}
			renderItem={({ item: incidente }) => (
				<View style={styles.incident}>
					<Text style={styles.incidentProperty}>ONG:</Text>
					<Text style={styles.incidentValue}>{incidente.nome}</Text>					
					
					<Text style={styles.incidentProperty}>CASO:</Text>
					<Text style={styles.incidentValue}>{incidente.descricao}</Text>					
					
					<Text style={styles.incidentProperty}>VALOR:</Text>
					<Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidente.valor)}</Text>	

					<TouchableOpacity style={styles.detailButton} 
						onPress={() => navigateToDetail(incidente)}>
						<Text style={styles.detailButtonText} >Ver mais detalhes</Text>
						<Feather name="arrow-right" size={16} color="#E02041" />	
					</TouchableOpacity>				
				</View>
			)} />
	
		</View>
	);
};
