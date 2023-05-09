import React, {useCallback, useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import { AntDesign } from '@expo/vector-icons';

import {BookingFormState} from "../../app";
import {AvailableAppointmentSlotsResultsState} from "../../hooks/useAvailableAppointmentSlots";

import CalendarPicker from 'react-native-calendar-picker';
import {Button, Text} from "react-native-paper";
import {Moment} from "moment";
import AppointmentSlots from "../AppointmentSlots/index";
import {createDateTimeline} from "../../api/calendar/lib/date";


interface Props {
    availableAppointmentSlotsResults: AvailableAppointmentSlotsResultsState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    showModal: () => void;
}

const CalendarWithAppointments = ({availableAppointmentSlotsResults, setBookingForm, showModal}: Props) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Moment>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(true);

    const formattedStartDate = (dateFormat: string) => selectedStartDate ? selectedStartDate.format(dateFormat) : '';
    const today = new Date();
    const getStartDate = (fallbackDate: Date = null) => selectedStartDate ? new Date(selectedStartDate.toString()) : fallbackDate;

    // Refactor so it gets all the dates in-between
    const getMarkedDates = useMemo(() => {
        if(!availableAppointmentSlotsResults.data.length) return [];
        return createDateTimeline(availableAppointmentSlotsResults.data).reduce<Date[]>((markedDates, markedDate) => {
            return markedDate.disabled ? [...markedDates, new Date(markedDate.date)] : markedDates;
        }, []);
    }, [availableAppointmentSlotsResults.data]);

    const filteredSlots = useMemo(() => {
        if(!availableAppointmentSlotsResults.data.length || !selectedStartDate) return;
        return availableAppointmentSlotsResults.data.filter(availableAppointmentSlotsResult => {
                return availableAppointmentSlotsResult.title === selectedStartDate.format('YYYY-MM-DD')
            }
        )
    }, [selectedStartDate, availableAppointmentSlotsResults.data]);

    const displayAppointmentSlots = useMemo(() => {
        if(filteredSlots) {
            return (
                <AppointmentSlots
                    items={filteredSlots}
                    setBookingForm={setBookingForm}
                    showModal={showModal}
                />
            )
        }
    }, [filteredSlots]);

    const onCalendarDateChange = (date: Moment) => {
        setSelectedStartDate(date);
    };

    const onButtonDateChange = (direction: string) => {
        setSelectedStartDate((date) => {
            const clone = date.clone();
            return direction === 'right' ? clone.add('7', 'd') : clone.subtract('7', 'd');
        });
    };

    const handleCalendarDisplay = (action: string) => {
        if(action === 'reset') {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        };
    };

    return (
        <View style={styles.container}>
            {/* Refactor to use this instead of react-native-calenders library */}
            {showCalendar ?
                <View style={styles.calendarContainer}>
                    <Text variant='titleMedium'>Select a date for counselling</Text>
                    <CalendarPicker
                        onDateChange={onCalendarDateChange}
                        selectedStartDate={getStartDate()}
                        minDate={today}
                        maxDate={getMarkedDates ? getMarkedDates.at(-1) : null}
                        restrictMonthNavigation={true}
                        initialDate={getStartDate(today)}
                        disabledDates={getMarkedDates}
                    />
                    <Button disabled={!selectedStartDate} mode='contained' onPress={() => handleCalendarDisplay('show')}>Ok</Button>
                </View>
                :
                <>
                    <View style={styles.header}>
                        <AntDesign onPress={() => onButtonDateChange('left')} name="leftcircle" size={24} color="black" />
                        <View style={styles.headerTextContainer}>
                            <Text>{formattedStartDate('dddd Do MMMM YYYY')}</Text>
                            <Button compact={true} mode='elevated' onPress={() => handleCalendarDisplay('reset')}>Change date</Button>
                        </View>
                        {/* Major functionality to work on next: */}
                        {/* 1. Pulling it more appointment slots by using the pagination from the response (check docs) */}
                        {/* 2. Figure out how to add some kind of animation to show the button has been clicked */}
                        <AntDesign onPress={() => onButtonDateChange('right')} name="rightcircle" size={24} color="black" />
                    </View>
                    {displayAppointmentSlots}
                </>
            }
        </View>
    );
};

export default CalendarWithAppointments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    calendarContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
    },
    headerTextContainer: {
        alignItems: "center"
    },
    dateButton: {

    },
    view: {
        flex: 1
    }
});