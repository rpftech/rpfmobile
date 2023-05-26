import React, {useMemo} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import CalendarPicker from 'react-native-calendar-picker';
import {Moment} from "moment";
import {AvailableAppointmentSlotsResultsState} from "../../hooks/useAvailableAppointmentSlots";
import {createDateTimeline} from "../../lib/dates";


interface Props {
    availableAppointmentSlotsResults: AvailableAppointmentSlotsResultsState;
    setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
    selectedStartDate: Moment;
    setSelectedStartDate: React.Dispatch<React.SetStateAction<Moment>>;
    minDate: Date;
    maxDate: Date;
}

const Calendar = ({availableAppointmentSlotsResults, setShowCalendar, selectedStartDate, setSelectedStartDate, minDate, maxDate}: Props) => {
    const getStartDate = (fallbackDate: Date = null) => selectedStartDate ? new Date(selectedStartDate.toString()) : fallbackDate;

    const getMarkedDates = useMemo(() => {
        if(!availableAppointmentSlotsResults.data.length) return [];
        return createDateTimeline(availableAppointmentSlotsResults.data).reduce<Date[]>((markedDates, markedDate) => {
            return markedDate.disabled ? [...markedDates, new Date(markedDate.date)] : markedDates;
        }, []);
    }, [availableAppointmentSlotsResults.data]);

    const onCalendarDateChange = (date: Moment) => {
        setSelectedStartDate(date);
    };

    const handleCalendarDisplay = (action: string) => {
        if(action === 'reset') {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        };
    };

    return (
        <View style={styles.calendarContainer}>
            <Text variant='titleMedium'>Select a date for counselling</Text>
            <CalendarPicker
                onDateChange={onCalendarDateChange}
                selectedStartDate={getStartDate()}
                minDate={minDate}
                maxDate={maxDate}
                restrictMonthNavigation={true}
                initialDate={getStartDate(minDate)}
                disabledDates={getMarkedDates}
            />
            <Button disabled={!selectedStartDate} mode='contained' onPress={() => handleCalendarDisplay('show')}>Ok</Button>
        </View>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 20
    }
});