import {Modal, Portal, Text} from "react-native-paper";
import {StyleSheet} from "react-native";
import React, {useCallback} from "react";

import {BookAppointmentStatusState, defaultBookAppointmentStatus} from "../../hooks/useBookingAppointment";
import BookingForm from "./bookingForm";
import BookingFormSuccess from "./bookingFormSuccess";
import Loader from "../Loader";
import {BookingFormState} from "../../app";

interface Props {
    fetchAvailableAppointmentSlots: () => void;
    bookingForm: BookingFormState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    bookAppointmentStatus: BookAppointmentStatusState;
    setBookAppointmentStatus: React.Dispatch<React.SetStateAction<BookAppointmentStatusState>>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    hideModal: () => void;
};

const Index = ({ fetchAvailableAppointmentSlots, bookingForm, setBookingForm, visible, setVisible, hideModal, bookAppointmentStatus, setBookAppointmentStatus }: Props) => {
    const handlePostBookHandling = useCallback(async() => {
        setBookingForm({
            fullName: '',
            email: '',
            startTime: '',
            endTime: ''
        });
        setVisible(false);
        setBookAppointmentStatus(defaultBookAppointmentStatus);
        await fetchAvailableAppointmentSlots();
    }, []);

    const onModalHide = useCallback(async() => {
        if (bookAppointmentStatus.loaded) await handlePostBookHandling();
        hideModal();
    }, []);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onModalHide} contentContainerStyle={styles.containerStyle}>
            {bookAppointmentStatus.loading
                ?
                <Loader>
                    <Text variant='titleMedium'>Saving appointment... Please do not leave this page.</Text>
                </Loader>
                : bookAppointmentStatus.loaded
                    ?
                    <BookingFormSuccess
                        bookingForm={bookingForm}
                        setBookingForm={setBookingForm}
                        handlePostBookHandling={handlePostBookHandling}
                    />
                    :
                    <BookingForm
                        bookingForm={bookingForm}
                        setBookingForm={setBookingForm}
                        setBookAppointmentStatus={setBookAppointmentStatus}
                    />
            }
            </Modal>
        </Portal>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        height: '75%',
        backgroundColor: 'white',
        padding: 20
    }
});

export default React.memo(Index);