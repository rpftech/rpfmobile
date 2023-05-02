import {View, StyleSheet, GestureResponderEvent} from "react-native";
import React, {useCallback, useEffect, useMemo, useState} from "react";

import {ExpandableCalendar, CalendarProvider, AgendaList} from "react-native-calendars";
import {ActivityIndicator, MD2Colors, Text} from 'react-native-paper'

import {AvailableAppointmentSlot, MarkedAppointmentSlot} from "../api/calendar/types";
import Calendar from "../api/calendar/index";
import AppointmentSlotCards from "../components/appointmentSlotCards";
import BookingForm from "../components/bookingForm";
import ExpandableCalendarScreen from "../example/src/screens/expandableCalendarScreen";
import {createDateTimeline, getDate} from "../api/calendar/lib/date";


interface ItemProps {
    item: AvailableAppointmentSlot;
}

export interface BookingFormState {
    fullName: string;
    email: string;
    startTime: string;
    endTime: string;
};

export interface AvailableAppointmentSlotsResultsState {
    loading: boolean;
    error: boolean;
    data: MarkedAppointmentSlot[];
}


const Index = () => {
    // const [availableAppointmentSlots, setAvailableAppointmentSlots] = useState<MarkedAppointmentSlot[]>(null);
    const [availableAppointmentSlotsResults, setAvailableAppointmentSlotsResults] = useState<AvailableAppointmentSlotsResultsState>({
        loading: false,
        error: false,
        data: []
    });
    const [visible, setVisible] = useState(false);
    const [bookingForm, setBookingForm] = useState<BookingFormState>({
        fullName: '',
        email: '',
        startTime: '',
        endTime: ''
    })
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const fetchAvailableAppointmentSlots = async () => {
        setAvailableAppointmentSlotsResults(state => ({
            ...state,
            loading: true,
            data: []
        }));
        const results = await Calendar.Appointments.getAvailableAppointmentSlots();
        // setAvailableAppointmentSlots(results.slice(0, 100));
        setAvailableAppointmentSlotsResults(state => ({
            ...state,
            loading: false,
            data: results.slice(0, 100)
        }));
        // console.log(results.slice(0, 100))
        // cache.set(availableAppointmentSlotsResults.data, results);
    };

    const cache = new Map();
    useEffect(() => {
        // if(cache.get('availableAppointmentSlotsResults.data')) return cache.get('availableAppointmentSlotsResults.data');
        fetchAvailableAppointmentSlots();
    }, []);

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

    return (
        <View style={styles.view}>
            {availableAppointmentSlotsResults.loading || !availableAppointmentSlotsResults.data.length
                ?
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size='large' animating={true} color={MD2Colors.red800} />
                </View>
                :
                <View style={styles.view}>
                    <CalendarProvider
                        date='2023-05-01'
                        showTodayButton
                    >
                        <BookingForm
                            setVisible={setVisible}
                            setBookingForm={setBookingForm}
                            refreshAppointmentSlots={fetchAvailableAppointmentSlots}
                            bookingForm={bookingForm}
                            visible={visible}
                            hideModal={hideModal}
                        />
                        <ExpandableCalendar
                            firstDay={1}
                            minDate={availableAppointmentSlotsResults.data.at(0).title}
                            disabledByDefault={true}
                            disableAllTouchEventsForDisabledDays={true}
                            markedDates={getMarkedDates}
                        />
                        <AgendaList
                            sectionStyle={styles.view}
                            sections={availableAppointmentSlotsResults.data}
                            renderItem={renderAppointmentSlotCard}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </CalendarProvider>
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        backgroundColor: 'lightgrey'
    },
    section: {
        color: 'grey',
        textTransform: 'capitalize'
    },
    view: {
        flex: 1
    }
});

export default Index;