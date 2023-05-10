import {View, StyleSheet} from "react-native";
import { SplashScreen } from "expo-router";
import React, {useCallback} from "react";
import {Text} from 'react-native-paper'
import BookingOnboarding from "../components/BookingOnboarding";
import Loader from "../components/Loader";
import Counselling from "../components/Counselling";
import useAvailableAppointmentSlots from "../hooks/useAvailableAppointmentSlots";
import useBookingForm from "../hooks/useBookingForm";
import useModalVisibility from "../hooks/useModalVisibility";
import useBookingAppointment from "../hooks/useBookingAppointment";


export interface BookingFormState {
    fullName: string;
    email: string;
    startTime: string;
    endTime: string;
};


const Index = () => {
    const {fetchAvailableAppointmentSlots, availableAppointmentSlotsResults} = useAvailableAppointmentSlots();
    const {bookingForm, setBookingForm} = useBookingForm();
    const {bookAppointmentStatus, setBookAppointmentStatus} = useBookingAppointment();
    const {visible, setVisible, showModal, hideModal} = useModalVisibility();


    const onLayoutRootView = useCallback(async () => {
        if (availableAppointmentSlotsResults.data.length) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [availableAppointmentSlotsResults.data]);

    SplashScreen.preventAutoHideAsync();

    return (
        <View style={styles.view} onLayout={onLayoutRootView}>
            {availableAppointmentSlotsResults.loading || !availableAppointmentSlotsResults.data.length
                ?
                <Loader>
                    <Text variant='titleMedium'>Loading appointments...</Text>
                </Loader>
                :
                <View style={styles.view}>
                    <BookingOnboarding
                        fetchAvailableAppointmentSlots={fetchAvailableAppointmentSlots}
                        bookingForm={bookingForm}
                        setBookingForm={setBookingForm}
                        visible={visible}
                        setVisible={setVisible}
                        bookAppointmentStatus={bookAppointmentStatus}
                        setBookAppointmentStatus={setBookAppointmentStatus}
                        hideModal={hideModal}
                    />
                    <Counselling
                        availableAppointmentSlotsResults={availableAppointmentSlotsResults}
                        setBookingForm={setBookingForm}
                        showModal={showModal}
                    />
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
});

export default Index;