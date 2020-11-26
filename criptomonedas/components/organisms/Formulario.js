import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
	moneda,
	guardarMoneda,
	cripto,
	guardarCripto,
	guardarConsultarApi,
}) => {
	const [criptos, guardarCriptos] = useState([]);

	useEffect(() => {
		const consultarApi = async () => {
			const url =
				'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
			const resultado = await axios.get(url);

			guardarCriptos(resultado.data.Data);
		};
		consultarApi();
	}, []);

	const obtenerMoneda = (moneda) => {
		guardarMoneda(moneda);
	};

	const obtenerCripto = (criptom) => {
		guardarCripto(criptom);
	};

	const cotizarPrecio = () => {
		if (moneda.trim() === '' || cripto.trim() === '') {
			mostrarAlerta();
			return;
		}
		guardarConsultarApi(true);
	};

	const mostrarAlerta = () => {
		Alert.alert('Error', 'Ambos campos son obligatorios.', [
			{
				text: 'OK',
			},
		]);
	};

	return (
		<View>
			<Text style={styles.label}>Moneda</Text>
			<Picker
				selectedValue={moneda}
				onValueChange={(moneda) => obtenerMoneda(moneda)}>
				<Picker.Item label="- Selecciona -" value="" />
				<Picker.Item label="Dolar de Estados Unidos" value="USD" />
				<Picker.Item label="Peso Uruguayo" value="UYU" />
				<Picker.Item label="Peso Argentino" value="ARS" />
			</Picker>
			<Text style={styles.label}>Criptomoneda</Text>
			<Picker
				selectedValue={cripto}
				onValueChange={(cripto) => obtenerCripto(cripto)}>
				<Picker.Item label="- Selecciona -" value="" />
				{criptos.map((criptomoneda, i) => (
					<Picker.Item
						label={criptomoneda.CoinInfo.FullName}
						value={criptomoneda.CoinInfo.Name}
						key={i}
					/>
				))}
			</Picker>
			<TouchableHighlight
				style={styles.btnCotizar}
				onPress={() => {
					cotizarPrecio();
				}}>
				<Text style={styles.textoCotizar}>Cotizar</Text>
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		fontFamily: 'Lato-Black',
		fontSize: 22,
		marginVertical: 20,
		textTransform: 'uppercase',
	},
	btnCotizar: {
		backgroundColor: '#5e49e2',
		padding: 10,
		marginTop: 20,
	},
	textoCotizar: {
		fontFamily: 'Lato-Black',
		textTransform: 'uppercase',
		color: '#fff',
		textAlign: 'center',
		fontSize: 14,
	},
});

export default Formulario;
