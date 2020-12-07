import React, {useState} from 'react';

import {
	Text,
	TextInput,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Animated,
	Alert
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
	const {pais, ciudad} = busqueda;

	const [animacionboton] = useState(new Animated.Value(1));

	const animacionEntrada = () => {
		Animated.spring(animacionboton, {
			toValue: 0.9,
			useNativeDriver: true,
		}).start();
	};
	const animacionSalida = () => {
		Animated.spring(animacionboton, {
			toValue: 1,
			friction: 40,
			tension: 30,
			useNativeDriver: true,
		}).start();
	};

	const estiloAnimacion = {
		transform: [
			{
				scale: animacionboton,
			},
		],
	};

	const consultarClima = () => {
		if (pais.trim() === '' || ciudad.trim() === '') {
			mostrarAlerta();
			return;
		}
		guardarConsultar(true);
	};

	const mostrarAlerta = () => {
		Alert.alert('Error', 'Ambos campos son obligatorios.', [
			{
				text: 'OK',
			},
		]);
	};

	return (
		<>
			<View style={styles.formulario}>
				<View>
					<TextInput
						value={ciudad}
						style={styles.input}
						onChangeText={(ciudad) =>
							guardarBusqueda({...busqueda, ciudad})
						}
						placeholder="Ciudad"
						placeholderTextColor="#666"
					/>
				</View>
				<View>
					<Picker
						selectedValue={pais}
						itemStyle={{height: 120, backgroundColor: '#fff'}}
						onValueChange={(pais) =>
							guardarBusqueda({...busqueda, pais})
						}>
						<Picker.Item
							label="-- Seleccione un país --"
							value=""
						/>
						<Picker.Item label="Uruguay" value="UY" />
						<Picker.Item label="Venezuela" value="VE" />
					</Picker>
				</View>
				<TouchableWithoutFeedback
					onPressIn={() => animacionEntrada()}
					onPressOut={() => animacionSalida()}
					onPress={() => consultarClima()}>
					<Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
						<Text style={styles.textoBuscar}>Buscar Clima</Text>
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	input: {
		padding: 10,
		height: 50,
		backgroundColor: '#fff',
		fontSize: 20,
		marginBottom: 20,
		textAlign: 'center',
	},
	btnBuscar: {
		marginTop: 50,
		backgroundColor: '#000',
		padding: 10,
		justifyContent: 'center',
	},
	textoBuscar: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 18,
	},
});

export default Formulario;
