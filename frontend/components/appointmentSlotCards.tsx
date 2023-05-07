import React, {useMemo, useCallback} from "react";
import {Button, Card, List, Text} from "react-native-paper";
import {AvailableAppointmentSlot} from "../api/calendar/types";
import {BookingFormState} from "../app/index";

interface ItemProps {
    item: AvailableAppointmentSlot;
    showModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
}

const AppointmentSlotCards = ({ item, setBookingForm, showModal }: ItemProps) => {
    const handleBooking = useCallback(() => {
        showModal();
        setBookingForm(state => ({
            ...state,
            startTime: item.timestamp,
            endTime: item.timestamp_end
        }))
    }, []);

    const formatTimeRange = useMemo(() =>
        `${item.formatted_timestamp.split(', ')[2]} - ${item.formatted_timestamp_end.split(', ')[2]}`
        , []);

    return (
        <List.Section>
            <Card>
                {/*<Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />*/}
                <Card.Content>
                    <Text>Counselling</Text>
                    <Text>Pastor Austin</Text>
                    <Text>60min</Text>
                    <Text>{formatTimeRange}</Text>
                </Card.Content>
                <Card.Actions>
                    {item.available
                        ? <Button
                            mode='contained'
                            onPress={handleBooking}
                        >BOOK NOW</Button>
                        : <Button disabled>BOOKED</Button>}
                </Card.Actions>
            </Card>
        </List.Section>
    )
};

export default React.memo(AppointmentSlotCards);