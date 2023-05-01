import {View, StyleSheet, GestureResponderEvent} from "react-native";
import {useCallback, useEffect, useMemo, useState} from "react";

import {ExpandableCalendar, CalendarProvider, AgendaList} from "react-native-calendars";
import {Text, Provider as PaperProvider} from 'react-native-paper'

import {AvailableAppointmentSlot, MarkedAppointmentSlot} from "../api/calendar/types";
import Calendar from "../api/calendar/index";
import AppointmentSlotCards from "../components/appointmentSlotCards";
import BookingForm from "../components/bookingForm";
import ExpandableCalendarScreen from "../example/src/screens/expandableCalendarScreen";


interface ItemProps {
    item: AvailableAppointmentSlot;
}

export interface BookingFormState {
    fullName: string;
    email: string;
    startTime: string;
    endTime: string;
}


const Index = () => {
    const [availableAppointmentSlots, setAvailableAppointmentSlots] = useState<MarkedAppointmentSlot[]>(null);
    const [visible, setVisible] = useState(false);
    const [bookingForm, setBookingForm] = useState<BookingFormState>({
        fullName: '',
        email: '',
        startTime: '',
        endTime: ''
    })
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const cache = new Map();
    useEffect(() => {
        // if(cache.get('availableAppointmentSlots')) return cache.get('availableAppointmentSlots');
        const fetchAvailableAppointmentSlots = async () => {
            const results = await Calendar.Appointments.getAvailableAppointmentSlots();
            setAvailableAppointmentSlots(results.slice(0, 100));
            // console.log(results.slice(0, 100))
            // cache.set(availableAppointmentSlots, results);
        };
        fetchAvailableAppointmentSlots()
    }, []);

    // Refactor so it gets all the dates in-between
    const getMarkedDates = useMemo(() => {
        if(!availableAppointmentSlots) return {};
        return availableAppointmentSlots.map(availableAppointmentSlot =>
            ({
                [availableAppointmentSlot.title]: {
                    [availableAppointmentSlot.data.some(availableAppointmentSlotData => availableAppointmentSlotData.available) ? 'marked': 'disabled']: true
                }
            })
        )
    }, [availableAppointmentSlots]);

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
            {!availableAppointmentSlots
                ? <Text>Loading...</Text>
                :
                <View style={styles.view}>
                    <CalendarProvider
                        date='2023-05-01'
                        showTodayButton
                    >
                        <BookingForm
                            setVisible={setVisible}
                            setBookingForm={setBookingForm}
                            bookingForm={bookingForm}
                            visible={visible}
                            hideModal={hideModal}
                        />
                        <ExpandableCalendar
                            firstDay={1}
                            // markedDates={getMarkedDates}
                        />
                        <AgendaList
                            sectionStyle={styles.view}
                            sections={availableAppointmentSlots}
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