/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
	StyleSheet,
	Image,
	View,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import Formulario from './components/organisms/Formulario';
import Header from './components/organisms/Header';
import axios from 'axios';
import Cotizacion from './components/organisms/Cotizacion';

const App = () => {
	const [moneda, guardarMoneda] = useState('');
	const [cripto, guardarCripto] = useState('');

	const [consultarApi, guardarConsultarApi] = useState(false);
	const [respuestaApi, guardarRespuestaApi] = useState({});
	const [cargando, guardarCargando] = useState(false);

	useEffect(() => {
		const cotizarCriptoMoneda = async () => {
			if (consultarApi) {
				// consultar la api para obtener la cotizacion
				const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
				const resultado = await axios.get(url);

				console.log('aqui', cargando);

				setTimeout(() => {
					guardarRespuestaApi(resultado.data.DISPLAY[cripto][moneda]);
					guardarConsultarApi(false);
					guardarCargando(false);
				}, 3000);
			}
		};
		cotizarCriptoMoneda();
	}, [consultarApi]);

	console.log(cargando);

	const componente = cargando ? (
		<ActivityIndicator size="large" color="#5E49E2" />
	) : (
		<Cotizacion resultado={respuestaApi} />
	);

	return (
		<>
			<ScrollView>
				<Header />
				<Image
					style={styles.imagen}
					source={require('./assets/img/cryptomonedas.png')}
				/>
				<View style={styles.contenido}>
					<Formulario
						moneda={moneda}
						guardarMoneda={guardarMoneda}
						cripto={cripto}
						guardarCripto={guardarCripto}
						guardarConsultarApi={guardarConsultarApi}
					/>
				</View>
				<View style={{marginTop: 40}}>{componente}</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	imagen: {
		width: '100%',
		height: 150,
		marginHorizontal: '2.5%',
	},
	contenido: {
		marginHorizontal: '2.5%',
	},
});

export default App;
