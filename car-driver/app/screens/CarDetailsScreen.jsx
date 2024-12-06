import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CarDetailsScreen = () => {
    const [carBrand, setCarBrand] = useState('');
    const [carName, setCarName] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [fuelType, setFuelType] = useState('Petrol');
    const [seats, setSeats] = useState(4);
    const [addedCar, setAddedCar] = useState(null);
    const [isFormDisabled, setIsFormDisabled] = useState(false);

    const addCar = () => {
        if (!carBrand || !carName || !carNumber) {
            alert("Please fill in all fields");
            return;
        }
        setAddedCar({
            carBrand,
            carName,
            carNumber,
            fuelType,
            seats,
        });
        setIsFormDisabled(true);
    };

    const resetForm = () => {
        setCarBrand('');
        setCarName('');
        setCarNumber('');
        setFuelType('Petrol');
        setSeats(4);
        setIsFormDisabled(false);
        setAddedCar(null);
    };

    return (
        <View style={styles.tabContent}>
            {isFormDisabled && addedCar ? (
                <View style={styles.previewContainer}>
                    <Text style={styles.previewHeading}>Added Car Details:</Text>
                    <Text>Brand: {addedCar.carBrand}</Text>
                    <Text>Name: {addedCar.carName}</Text>
                    <Text>Number: {addedCar.carNumber}</Text>
                    <Text>Fuel Type: {addedCar.fuelType}</Text>
                    <Text>Seats: {addedCar.seats}</Text>
                    <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
                        <Text style={styles.resetButtonText}>Add Another Car</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <Text style={styles.label}>Car Brand</Text>
                    <Picker
                        selectedValue={carBrand}
                        onValueChange={(itemValue) => setCarBrand(itemValue)}
                        style={styles.picker}
                        enabled={!isFormDisabled}
                    >
                        <Picker.Item label="Select a brand" value="" />
                        <Picker.Item label="Toyota" value="Toyota" />
                        <Picker.Item label="Honda" value="Honda" />
                        <Picker.Item label="Ford" value="Ford" />
                    </Picker>

                    <Text style={styles.label}>Car Name</Text>
                    <Picker
                        selectedValue={carName}
                        onValueChange={(itemValue) => setCarName(itemValue)}
                        style={styles.picker}
                        enabled={!isFormDisabled}
                    >
                        <Picker.Item label="Select a car name" value="" />
                        <Picker.Item label="Corolla" value="Corolla" />
                        <Picker.Item label="Civic" value="Civic" />
                        <Picker.Item label="Mustang" value="Mustang" />
                    </Picker>

                    <Text style={styles.label}>Car Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter car number"
                        value={carNumber}
                        onChangeText={(text) => setCarNumber(text)}
                        editable={!isFormDisabled}
                    />

                    <Text style={styles.label}>Fuel Type</Text>
                    <Picker
                        selectedValue={fuelType}
                        onValueChange={(itemValue) => setFuelType(itemValue)}
                        style={styles.picker}
                        enabled={!isFormDisabled}
                    >
                        <Picker.Item label="Petrol" value="Petrol" />
                        <Picker.Item label="Diesel" value="Diesel" />
                        <Picker.Item label="Electric" value="Electric" />
                    </Picker>

                    <Text style={styles.label}>No. of seats</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={seats.toString()}
                        onChangeText={(text) => setSeats(Number(text))}
                        editable={!isFormDisabled}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={addCar}>
                        <Text style={styles.addButtonText}>Add Car</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    usersContainer: { marginTop: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginStart: 10 },
    userCard: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 10, elevation: 2 },
    userName: { fontSize: 16, fontWeight: 'bold' },
    userContact: { fontSize: 14, color: '#555' },
    noUsers: { textAlign: 'center', color: '#999', marginTop: 20 },
    addButton1: { backgroundColor: '#0a6c8c', padding: 15, borderRadius: 10, alignItems: 'center', margin: 5 },
    addButtonText1: { color: 'white', fontSize: 18 },
    modalContainer1: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent1: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 20 },
    closeButton1: { alignSelf: 'flex-end' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
    formInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 5,
        height: 50,
    },
    fileButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        borderRadius: 10,
        margin: 3,
        alignItems: 'center',
    },
    fileButtonText: {
        color: '#999',
        textAlign: 'center',
    },
    submitButton: { backgroundColor: '#0a6c8c', padding: 15, borderRadius: 10, alignItems: 'center' },
    submitButtonText: { color: 'white', fontSize: 18 },
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0a6c8c',
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    companyName: { color: 'white', fontSize: 20, fontWeight: 'bold' },

    tabContent: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 5,
        borderRadius: 5,
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#0a6c8c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    previewContainer: {
        marginTop: 20,
    },
    previewHeading: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default CarDetailsScreen;