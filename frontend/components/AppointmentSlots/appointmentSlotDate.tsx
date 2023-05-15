import React from "react";
import {Text} from "react-native-paper";
import {MarkedAppointmentSlot} from "../../services/data/appointmentSlots/types";

interface Props {
    item: MarkedAppointmentSlot;
};

const AppointmentSlotDate = ({ item }: Props) => {
    return (
        <Text>Date: {item.date}</Text>
    )
};

export default React.memo(AppointmentSlotDate);