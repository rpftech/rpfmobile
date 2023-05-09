import React from "react";
import {List} from "react-native-paper";
import {MarkedAppointmentSlot} from "../../api/calendar/types";
import {BookingFormState} from "../../app";
import AppointmentSlotDates from "./appointmentSlotDates";
import {StyleSheet} from "react-native";

interface Props {
    items: MarkedAppointmentSlot[];
    showModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
}

const AppointmentSlots = ({ items, setBookingForm, showModal }: Props) => {
    return (
        <List.Section style={styles.rootContainer}>
            <AppointmentSlotDates
                items={items}
                setBookingForm={setBookingForm}
                showModal={showModal}
            />
        </List.Section>
    )
};

export default React.memo(AppointmentSlots);

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});