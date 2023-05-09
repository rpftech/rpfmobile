import React from "react";
import {Text} from "react-native-paper";
import {MarkedAppointmentSlot} from "../../api/calendar/types";

interface Props {
    item: MarkedAppointmentSlot;
};

const AppointmentSlotDate = ({ item }: Props) => {
    return (
        <Text>Date: {item.title}</Text>
    )
};

export default React.memo(AppointmentSlotDate);