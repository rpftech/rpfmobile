import React, {useCallback} from "react";
import {AvailableAppointmentSlot} from "../../services/data/appointmentSlots/types";
import {BookingFormState} from "../../app";
import AppointmentSlotCard from "./appointmentSlotCard";
import {FlatList, StyleSheet, View} from "react-native";

interface Props {
    items: AvailableAppointmentSlot[];
    showModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
};

interface AppointmentSlotCardProps {
    item: AvailableAppointmentSlot;
    showModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
};

const AppointmentSlotCards = ({ items, setBookingForm, showModal }: Props) => {
    const renderAppointmentSlotCard = useCallback(({ item, showModal, setBookingForm }: AppointmentSlotCardProps) => {
        return (
            <AppointmentSlotCard
                item={item}
                setBookingForm={setBookingForm}
                showModal={showModal}
            />
        )
    }, []);

    return (
        <>
            <FlatList
                style={styles.card}
                data={items}
                extraData={{setBookingForm, showModal}}
                renderItem={({item}) => renderAppointmentSlotCard({ item, showModal, setBookingForm })}
            />
        </>
    )
};

export default React.memo(AppointmentSlotCards);

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    card: {
        gap: 10
    }
});