import React from "react";
import {List} from "react-native-paper";
import {MarkedAppointmentSlot} from "../../services/data/appointmentSlots/types";
import {BookingFormState} from "../../app";
import {StyleSheet} from "react-native";
import {Moment} from "moment";

interface Props {
    items?: MarkedAppointmentSlot[];
    showModal?: () => void;
    setBookingForm?: React.Dispatch<React.SetStateAction<BookingFormState>>;
    selectedStartDate?: Moment;
    children: React.ReactNode;
}

const AppointmentSlots = ({ children }: Props) => {
    return (
        <List.Section style={styles.rootContainer}>
            {children}
        </List.Section>
    )
};

export default React.memo(AppointmentSlots);

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});