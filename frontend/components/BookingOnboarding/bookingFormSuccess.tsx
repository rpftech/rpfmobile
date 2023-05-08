import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";

import {formatDate} from "../../api/calendar/lib/date";
import {BookingFormState} from "../../app";

interface Props {
    bookingForm: BookingFormState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    handlePostBookHandling: () => void;
};

const bookingFormSuccess = ({bookingForm, handlePostBookHandling}: Props) => {
    return (
        <View style={styles.appointmentSuccessContainer}>
            <Text style={styles.appointmentSuccessTitle} variant="headlineLarge">Appointment booked successfully</Text>
            <Text variant="bodyMedium">
                Your appointment is scheduled for:
            </Text>
            <Text style={styles.appointmentText}>{formatDate(bookingForm.startTime)}</Text>
            <Button mode='elevated' onPress={handlePostBookHandling}>Ok</Button>
        </View>
    );
};

export default bookingFormSuccess;

const styles = StyleSheet.create({
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