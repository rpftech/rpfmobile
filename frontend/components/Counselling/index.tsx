import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Moment} from "moment";
import {BookingFormState} from "../../app";
import {AvailableAppointmentSlotsResultsState} from "../../hooks/useAvailableAppointmentSlots";
import Calendar from "../Calendar";
import AppointmentSlots from "../AppointmentSlots/index";
import AppointmentSlotDates from "../AppointmentSlots/appointmentSlotDates";
import AppointmentSlotControls from "../AppointmentSlots/appointmentSlotControls";


interface Props {
    availableAppointmentSlotsResults: AvailableAppointmentSlotsResultsState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    showModal: () => void;
}

const Counselling = ({availableAppointmentSlotsResults, setBookingForm, showModal}: Props) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Moment>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(true);

    const formattedStartDate = (dateFormat: string) => selectedStartDate ? selectedStartDate.format(dateFormat) : '';

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
            {showCalendar ?
                <Calendar
                    availableAppointmentSlotsResults={availableAppointmentSlotsResults}
                    setShowCalendar={setShowCalendar}
                    selectedStartDate={selectedStartDate}
                    setSelectedStartDate={setSelectedStartDate}
                />
                :
                <>
                    {availableAppointmentSlotsResults.data &&
                        <AppointmentSlots>
                            <AppointmentSlotControls
                                formattedStartDate={formattedStartDate}
                                onButtonDateChange={onButtonDateChange}
                                handleCalendarDisplay={handleCalendarDisplay}
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