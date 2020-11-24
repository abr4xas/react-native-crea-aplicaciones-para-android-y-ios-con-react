/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import Cita from './components/organisms/cita/Cita';
import Formulario from './components/organisms/formulario/Formulario';

const App = () => {
	// definir el state de citas

	const [mostrarForm, guardarMostrarForm] = useState(false);

	const [citas, setCitas] = useState([]);

	const citasActuales = [...citas];

	// eliminar los pacientes del state

	const eliminarPaciente = (id) => {
		setCitas((citasActuales) => {
			return citasActuales.filter((cita) => cita.id !== id);
		});
	};

	// mostrar formulario

	const mostrarFormulario = () => {
		guardarMostrarForm(!mostrarForm);
	};

	// ocultar el teclado

	const cerrarTeclado = () => {
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
			<View style={styles.contenedor}>
				<Text style={styles.titulo}>Administrador de Citas</Text>

				<View>
					<TouchableHighlight
						onPress={() => mostrarFormulario()}
						style={styles.btnMostrarForm}>
						<Text style={styles.textoSubmit}>
							{mostrarForm
								? 'Cancelar cita '
								: 'Crear nueva cita'}
						</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.contenido}>
					{mostrarForm ? (
						<>
							<Text style={styles.titulo}>Crear nueva cita</Text>
							<Formulario
								citas={citas}
								setCitas={setCitas}
								guardarMostrarForm={guardarMostrarForm}
							/>
						</>
					) : (
						<>
							<Text style={styles.titulo}>
								{citasActuales.length > 0
									? 'Administa tus Citas'
									: 'No hay citas, agrega una'}
							</Text>

							<FlatList
								style={styles.listado}
								data={citas}
								renderItem={({item}) => (
									<Cita
										item={item}
										eliminarPaciente={eliminarPaciente}
									/>
								)}
								keyExtractor={(cita) => cita.id}
							/>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	contenedor: {
		backgroundColor: '#aa076b',
		flex: 1,
	},

	titulo: {
		color: '#fff',
		marginTop: Platform.OS === 'ios' ? 40 : 20,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	contenido: {
		flex: 1,
		marginHorizontal: '2.5%',
	},
	listado: {
		flex: 1,
	},
	btnMostrarForm: {
		padding: 10,
		backgroundColor: '#7d024e',
		marginVertical: 10,
	},
	textoSubmit: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16,
	},
});

export default App;
