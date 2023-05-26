import React, {useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Moment} from "moment";
import {BookingFormState} from "../../app";
import {AvailableAppointmentSlotsResultsState} from "../../hooks/useAvailableAppointmentSlots";
import Calendar from "../Calendar";
import AppointmentSlots from "../AppointmentSlots/index";
import AppointmentSlotDates from "../AppointmentSlots/appointmentSlotDates";
import AppointmentSlotControls from "../AppointmentSlots/appointmentSlotControls";
import {createDateTimeline, STANDARD_DATE_FORMAT} from "../../lib/dates";


interface Props {
    availableAppointmentSlotsResults: AvailableAppointmentSlotsResultsState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    showModal: () => void;
}

const Counselling = ({availableAppointmentSlotsResults, setBookingForm, showModal}: Props) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Moment>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(true);

    const formattedStartDate = (dateFormat: string = STANDARD_DATE_FORMAT) => selectedStartDate ? selectedStartDate.format(dateFormat) : '';

    const onButtonDateChange = (direction: string, callback: (changedDateStr: string) => void) => {
        setSelectedStartDate((date) => {
            const clone = date.clone();
            const newDate = direction === 'right' ? clone.add('7', 'd') : clone.subtract('7', 'd');
            // callback(newDate.format(STANDARD_DATE_FORMAT));
            return newDate;
        });
    };

    const today = new Date(availableAppointmentSlotsResults.data.at(1).date);

    const getMaxDate = useMemo((): Date | null => {
        if(!availableAppointmentSlotsResults.data.length) return null;
        const dates = availableAppointmentSlotsResults.data.map(availableAppointmentSlot => availableAppointmentSlot.date);
        return new Date(dates.at(-1));
    }, [availableAppointmentSlotsResults.data]);

    const handleCalendarDisplay = (action: string) => {
        if(action === 'reset') {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        };
    };

    return (
        <View style={styles.container}>
            {showCalendar ?
                <Calendar
                    availableAppointmentSlotsResults={availableAppointmentSlotsResults}
                    setShowCalendar={setShowCalendar}
                    selectedStartDate={selectedStartDate}
                    setSelectedStartDate={setSelectedStartDate}
                    minDate={today}
                    maxDate={getMaxDate}
                />
                :
                <>
                    {availableAppointmentSlotsResults.data &&
                        <AppointmentSlots>
                            <AppointmentSlotControls
                                formattedStartDate={formattedStartDate}
                                onButtonDateChange={onButtonDateChange}
                                handleCalendarDisplay={handleCalendarDisplay}
                                minDate={today}
                                maxDate={getMaxDate}
                            />
                            <AppointmentSlotDates
                                items={availableAppointmentSlotsResults.data}
                                setBookingForm={setBookingForm}
                                showModal={showModal}
                                selectedStartDate={selectedStartDate}
                            />
                        </AppointmentSlots>
                    }
                </>
            }
        </View>
    );
};

export default Counselling;

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