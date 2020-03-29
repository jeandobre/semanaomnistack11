import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import styles from "./styles";
import logoImg from "../../assets/logo.png";

export default function Detail() {
	const navigation = useNavigation();
	const route = useRoute();

	const incidente = route.params.incidente;
	const message = `Olá ${incidente.nome}, estou entrando em contato pois gostaria de ajudar no caso '${incidente.titulo}' com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidente.valor)}`;

	function navigateBack(){
		navigation.goBack()
	}

	function sendMail(){
		MailComposer.composeAsync({
			subject: `Herói do caso: ${incidente.titulo}`,
			recipients: [incidente.email],
			body: message,
		})
	}

	function sendWhatsapp(){
		Linking.openURL(`whatsapp://send?phone=${incidente.whatsapp}&text=${message}`);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				
				<TouchableOpacity onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#E82041" />
				</TouchableOpacity>
			</View>

			<View style={styles.incident}>
				<Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
				<Text style={styles.incidentValue}>{incidente.nome} de {incidente.cidade}/{incidente.uf}</Text>					
				
				<Text style={styles.incidentProperty}>CASO:</Text>
				<Text style={styles.incidentValue}>{incidente.descricao}</Text>					
				
				<Text style={styles.incidentProperty}>VALOR:</Text>
				<Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidente.valor)}</Text>	
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Salve o dia!</Text>
				<Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

				<Text style={styles.heroDescription}>Entre em contato:</Text>

				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
						<Text style={styles.actionText}>WhatsApp</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.action} onPress={sendMail}>
						<Text style={styles.actionText}>E-mail</Text>
					</TouchableOpacity>
				</View>
			</View>

		</View>
	);
};
