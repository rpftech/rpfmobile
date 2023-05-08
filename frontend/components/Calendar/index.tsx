import React, {useCallback, useMemo, useState} from "react";
import {AgendaList, CalendarProvider, ExpandableCalendar, Calendar} from "react-native-calendars";
import {StyleSheet, View} from "react-native";

import {AvailableAppointmentSlot} from "../../api/calendar/types";
import AppointmentSlotCards from "../AppointmentSlotCards";
import {BookingFormState} from "../../app";
import {AvailableAppointmentSlotsResultsState} from "../../hooks/useAvailableAppointmentSlots";

import CalendarPicker from 'react-native-calendar-picker';
import {Text} from "react-native-paper";
import {Moment} from "moment";


interface ItemProps {
    item: AvailableAppointmentSlot;
};

interface Props {
    availableAppointmentSlotsResults: AvailableAppointmentSlotsResultsState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    showModal: () => void;
}

const CalendarWithAppointments = ({availableAppointmentSlotsResults, setBookingForm, showModal}: Props) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Moment>(null);
    // Refactor so it gets all the dates in-between
    const getMarkedDates = useMemo(() => {
        if(!availableAppointmentSlotsResults.data.length) return {};
        return availableAppointmentSlotsResults.data.reduce((allAvailableAppointmentSlots, currAvailableAppointmentSlot) => {
            return {
                ...allAvailableAppointmentSlots,
                [currAvailableAppointmentSlot.title]: {
                    marked: true,
                    disabled: false
                }
            }
        }, {})
        // return {
        //     ...createDateTimeline(availableAppointmentSlotsResults.data)
        // }
    }, [availableAppointmentSlotsResults.data]);

    const renderAppointmentSlotCard = useCallback(({ item }: ItemProps) => {
        return (
            <AppointmentSlotCards
                item={item}
                setBookingForm={setBookingForm}
                showModal={showModal}
            />)
    }, []);

    const onDateChange = (date: Moment) => {
        setSelectedStartDate(date);
    };

    return (
        <View style={styles.container}>
            {/* Refactor to use this instead of react-native-calenders library */}
            <CalendarPicker
                onDateChange={onDateChange}
                selectedStartDate={selectedStartDate ? new Date(selectedStartDate.toString()) : new Date()}
            />
            <View>
                <Text>SELECTED DATE:{ selectedStartDate ? selectedStartDate.toString() : ''}</Text>
            </View>
        </View>
    );

    // return (
    //     <CalendarProvider
    //         date='2023-05-01'
    //         showTodayButton
    //     >
    //         <ExpandableCalendar
    //             firstDay={1}
    //             minDate={availableAppointmentSlotsResults.data.at(0).title}
    //             disabledByDefault={true}
    //             disableAllTouchEventsForDisabledDays={true}
    //             markedDates={getMarkedDates}
    //         />
    //         <AgendaList
    //             sectionStyle={styles.view}
    //             sections={availableAppointmentSlotsResults.data}
    //             renderItem={renderAppointmentSlotCard}
    //         />
    //     </CalendarProvider>
    // )
};

export default CalendarWithAppointments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    },
    view: {
        flex: 1
    }
});