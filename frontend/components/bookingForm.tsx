import {Button, Modal, Portal, Text, TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";
import React from "react";
import {BookingFormState} from "../app/index";
import Calendar from "../api/calendar";

interface Props {
    visible: boolean;
    bookingForm: BookingFormState;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    hideModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
}

const BookingForm = ({ visible, setVisible, hideModal, bookingForm, setBookingForm }: Props) => {
    const bookAppointmentHandler = () => {
        Calendar.Appointments.bookAppointment({
            booking: {
                booked_from: bookingForm.startTime,
                booked_to: bookingForm.endTime,
                person_attributes: {
                    name: bookingForm.fullName
                }
            }
        })
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                <Text variant="titleLarge">Booking form</Text>
                <TextInput
                    label='Full name'
                    placeholder='Enter your full name'
                    value={bookingForm.fullName}
                    onChangeText={fullName => setBookingForm(state => ({
                        ...state,
                        fullName: fullName
                    }))}
                />
                <TextInput
                    label='Email'
                    placeholder='Enter your email'
                    value={bookingForm.email}
                    onChangeText={email => setBookingForm(state => ({
                        ...state,
                        email: email
                    }))}
                />
                <Button mode='contained' onPress={() => {
                    bookAppointmentHandler();
                    setVisible(false);
                }
                }>Book now</Button>
            </Modal>
        </Portal>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        height: '50%',
        backgroundColor: 'white',
        padding: 20
    }
});

export default BookingForm;