import {StyleSheet, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import React, {useCallback} from "react";
import Calendar from "../../services/api/calendar";
import {BookingFormState} from "../../app";
import {BookAppointmentStatusState} from "../../hooks/useBookingAppointment";

interface Props {
    bookingForm: BookingFormState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    setBookAppointmentStatus: React.Dispatch<React.SetStateAction<BookAppointmentStatusState>>;
}

const BookingForm = ({bookingForm, setBookingForm, setBookAppointmentStatus}: Props) => {
    const handleInput = useCallback((inputFieldKey: string, inputFieldValue: string) => {
        setBookingForm(state => ({
            ...state,
            [inputFieldKey]: inputFieldValue
        }))
    }, [bookingForm.email, bookingForm.fullName]);

    const bookAppointmentHandler = useCallback(async() => {
        setBookAppointmentStatus(state => ({
            ...state,
            loading: true,
        }));
        const result = await Calendar.Bookings.bookAppointment({
            booking: {
                booked_from: bookingForm.startTime,
                booked_to: bookingForm.endTime,
                person_attributes: {
                    name: bookingForm.fullName
                }
            }
        });
        if('booking' in result) {
            setBookAppointmentStatus(state => ({
                ...state,
                loading: false,
                loaded: true
            }));
        } else {
            setBookAppointmentStatus(state => ({
                ...state,
                error: true
            }));
        }

    }, [bookingForm]);

    return (
        <View style={styles.bookingFormContainer}>
            <Text style={styles.bookingFormText} variant="titleLarge">Booking form</Text>
            <Text style={styles.bookingFormText} variant="bodyMedium">Please enter your details below to book a counselling appointment</Text>
            <TextInput
                style={styles.bookingFormInput}
                label='Full name'
                placeholder='Enter your full name'
                value={bookingForm.fullName}
                onChangeText={fullNameValue => handleInput('fullName', fullNameValue)}
            />
            <TextInput
                style={styles.bookingFormInput}
                label='Email'
                placeholder='Enter your email'
                value={bookingForm.email}
                onChangeText={emailValue => handleInput('email', emailValue)}
            />
            <Button mode='contained' onPress={bookAppointmentHandler}>Book now</Button>
        </View>
    );
};

export default BookingForm;

const styles = StyleSheet.create({
    containerStyle: {
        height: '75%',
        backgroundColor: 'white',
        padding: 20
    },
    loaderContainer: {
        flex: 1,
        gap: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    bookingFormContainer: {
        flex: 1,
        gap: 50,
        justifyContent: "center"
    },
    bookingFormInput: {
    },
    bookingFormText: {
        textAlign: "center"
    },
    appointmentSuccessTitle: {
        textAlign: "center"
    },
    appointmentSuccessContainer: {
        gap: 20,
        alignItems: "center"
    },
    appointmentText: {
        fontWeight: "bold"
    }
});