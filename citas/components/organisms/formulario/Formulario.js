import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	TouchableHighlight,
	ScrollView,
	Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm}) => {
	const [paciente, setPaciente] = useState('');
	const [propietario, setPropietario] = useState('');

	const [telefono, setTelefono] = useState('');
	const [sintomas, setSintomas] = useState('');

	const [fecha, setFecha] = useState('');
	const [hora, setHora] = useState('');

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

	// selector de fechas
	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		const opciones = {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		};

		setFecha(date.toLocaleDateString(opciones));
		hideDatePicker();
	};
	// selector de hora
	const showTimePicker = () => {
		setTimePickerVisibility(true);
	};

	const hideTimePicker = () => {
		setTimePickerVisibility(false);
	};

	const handleConfirmTime = (time) => {
		const opciones = {
			hour: 'numeric',
			minute: '2-digit',
			hour12: false,
		};

		setHora(time.toLocaleString('en-US', opciones));
		hideTimePicker();
	};

	// crear citas
	const crearNuevaCita = () => {
		if (
			paciente.trim() === '' ||
			propietario.trim() === '' ||
			telefono.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			mostrarAlerta();
			return;
		}

		// crear citas
		const cita = {
			paciente,
			propietario,
			telefono,
			fecha,
			hora,
			sintomas,
		};
		cita.id = shortid.generate();

		// agregamos la cita al state

		const citasNuevo = [...citas, cita];
		setCitas(citasNuevo);
		guardarMostrarForm(false);
	};

	// muestra alerta si falla validacion

	const mostrarAlerta = () => {
		Alert.alert(
			'Error', // titulo
			'Todos los campos son obligatorios', // mensaje
			[
				{
					text: 'Ok',
				},
			],
		);
	};

	return (
		<>
			<ScrollView style={styles.formulario}>
				<View>
					<Text style={styles.label}>Paciente:</Text>
					<TextInput
						style={styles.input}
						onChangeText={(texto) => setPaciente(texto)}
					/>
				</View>
				<View>
					<Text style={styles.label}>Dueño:</Text>
					<TextInput
						style={styles.input}
						onChangeText={(texto) => setPropietario(texto)}
					/>
				</View>
				<View>
					<Text style={styles.label}>Teléfono de contacto:</Text>
					<TextInput
						style={styles.input}
						onChangeText={(texto) => setTelefono(texto)}
						keyboardType="numeric"
					/>
				</View>
				<View>
					<Text style={styles.label}>Fecha seleccionada:</Text>
					<Text>{fecha}</Text>
					<Button
						title="Seleccionar fecha"
						onPress={showDatePicker}
					/>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
				</View>
				<View>
					<Text style={styles.label}>Hora seleccionada:</Text>
					<Text>{hora}</Text>
					<Button title="Seleccionar hora" onPress={showTimePicker} />
					<DateTimePickerModal
						isVisible={isTimePickerVisible}
						mode="time"
						onConfirm={handleConfirmTime}
						onCancel={hideTimePicker}
						is24Hour
					/>
				</View>
				<View>
					<Text style={styles.label}>Sintomas:</Text>
					<TextInput
						multiline
						style={styles.input}
						onChangeText={(texto) => setSintomas(texto)}
					/>
				</View>
				<View>
					<TouchableHighlight
						onPress={() => crearNuevaCita()}
						style={styles.btnSubmit}>
						<Text style={styles.textoSubmit}>Crear nueva cita</Text>
					</TouchableHighlight>
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	formulario: {
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	label: {
		fontWeight: 'bold',
		fontSize: 18,
		marginTop: 20,
	},
	input: {
		marginTop: 10,
		height: 50,
		borderColor: '#e1e1e1',
		borderWidth: 1,
		borderStyle: 'solid',
	},
	btnSubmit: {
		padding: 10,
		backgroundColor: '#7d024e',
		marginVertical: 10,
	},
	textoSubmit: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default Formulario;
