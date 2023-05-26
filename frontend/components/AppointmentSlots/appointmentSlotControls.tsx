import {StyleSheet, View} from "react-native";
import React, {useMemo, useState} from "react";
import {getFutureDate, STANDARD_DATE_FORMAT} from "../../lib/dates";
import AppointmentSlotControlsButton from "./appointmentSlotControlsButton";
import AppointmentSlotControlsHeader from "./appointmentSlotControlsHeader";

interface Props {
    formattedStartDate: (format: string) => string;
    onButtonDateChange: (direction: string, callback?: (changedDateStr: string) => void) => void;
    handleCalendarDisplay: (action: string) => void;
    minDate: Date;
    maxDate: Date;
};

const AppointmentSlotControls = ({ formattedStartDate, onButtonDateChange, handleCalendarDisplay, minDate, maxDate }: Props) => {
    const [disableButtons, setDisableButtons] = useState(false);

    const maxDateThresholdReached = useMemo((): boolean => {
        const startDateObj = new Date(formattedStartDate(STANDARD_DATE_FORMAT));
        const lastDateBeforeDisable = getFutureDate({day: -7}, maxDate);
        return startDateObj.getTime() > lastDateBeforeDisable.getTime();
    }, [formattedStartDate, maxDate]);

    const minDateThresholdReached = useMemo((): boolean => {
        const startDateObj = new Date(formattedStartDate(STANDARD_DATE_FORMAT));
        const earliestDateBeforeDisable = getFutureDate({day: 7}, minDate);
        return startDateObj.getTime() < earliestDateBeforeDisable.getTime();
    }, [formattedStartDate, minDate]);

    return (
        <View style={styles.root}>
            <AppointmentSlotControlsButton
                onButtonDateChange={onButtonDateChange}
                dateThresholdReached={minDateThresholdReached}
                disableButtons={disableButtons}
                setDisableButtons={setDisableButtons}
                buttonArrowDirection='left'
                name='leftcircle'
            />
            <AppointmentSlotControlsHeader
                formattedStartDate={formattedStartDate}
                handleCalendarDisplay={handleCalendarDisplay}
            />
            <AppointmentSlotControlsButton
                onButtonDateChange={onButtonDateChange}
                dateThresholdReached={maxDateThresholdReached}
                disableButtons={disableButtons}
                setDisableButtons={setDisableButtons}
                buttonArrowDirection='right'
                name='rightcircle'
            />
        </View>
    )
};

export default AppointmentSlotControls;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
    }
});