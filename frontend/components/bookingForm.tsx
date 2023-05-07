import {ActivityIndicator, Button, MD2Colors, Modal, Portal, Text, TextInput} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import React, {useCallback, useState} from "react";
import {BookingFormState} from "../app/index";
import Calendar from "../api/calendar";
import {formatDate} from "../api/calendar/lib/date";

interface Props {
    visible: boolean;
    bookingForm: BookingFormState;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    hideModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    refreshAppointmentSlots: () => void;
};

const BookingForm = ({ visible, setVisible, hideModal, bookingForm, setBookingForm, refreshAppointmentSlots }: Props) => {
    const [bookAppointmentStatus, setBookAppointmentStatus] = useState({
        loading: false,
        loaded: false,
        error: false
    });

    const bookAppointmentHandler = useCallback(async() => {
        setBookAppointmentStatus(state => ({
            ...state,
            loading: true,
        }));
       await Calendar.Appointments.bookAppointment({
            booking: {
                booked_from: bookingForm.startTime,
                booked_to: bookingForm.endTime,
                person_attributes: {
                    name: bookingForm.fullName
                }
            }
        });
        setBookAppointmentStatus(state => ({
            ...state,
            loading: false,
            loaded: true
        }));
    }, []);

    const handlePostBookHandling = useCallback(async() => {
        setBookingForm({
            fullName: '',
            email: '',
            startTime: '',
            endTime: ''
        });
        setVisible(false);
        await refreshAppointmentSlots();
    }, []);

    const onModalHide = useCallback(async() => {
        if (bookAppointmentStatus.loaded) await handlePostBookHandling();
        hideModal();
    }, []);

    const handleInput = useCallback((inputFieldKey: string, inputFieldValue: string) => {
        setBookingForm(state => ({
            ...state,
            [inputFieldKey]: inputFieldValue
        }))
    }, []);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onModalHide} contentContainerStyle={styles.containerStyle}>
            {bookAppointmentStatus.loading
                ?
                <View style={styles.loaderContainer}>
                    <Text variant='titleMedium'>Saving appointment... Please do not leave this page.</Text>
                    <ActivityIndicator size='large' animating={true} color={MD2Colors.red800} />
                </View>
                : bookAppointmentStatus.loaded
                    ?
                    <View style={styles.appointmentSuccessContainer}>
                        <Text style={styles.appointmentSuccessTitle} variant="headlineLarge">Appointment booked successfully</Text>
                        <Text variant="bodyMedium">
                            Your appointment is scheduled for:
                        </Text>
                        <Text style={styles.appointmentText}>{formatDate(bookingForm.startTime)}</Text>
                        <Button mode='elevated' onPress={handlePostBookHandling}>Ok</Button>
                    </View>
                    :
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
            }
            </Modal>
        </Portal>
    )
};

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

export default React.memo(BookingForm);