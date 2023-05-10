import React, {useCallback, useMemo, useState} from "react";
import {View, StyleSheet, FlatList, LayoutChangeEvent} from "react-native";
import {Moment} from "moment";
import {MarkedAppointmentSlot} from "../../api/calendar/types";
import {BookingFormState} from "../../app";
import AppointmentSlotCards from "./appointmentSlotCards";

interface Props {
    items: MarkedAppointmentSlot[];
    showModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
    selectedStartDate: Moment;
};

interface RenderItemProps {
    item: MarkedAppointmentSlot;
    showModal: () => void;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
};

const AppointmentSlotDates = ({ items, setBookingForm, showModal, selectedStartDate }: Props) => {
    const [dateYPositions, setDateYPositions] = useState(new Set());
    const filteredSlots = useMemo(() => {
        if(!items.length || !selectedStartDate) return;
        return items.filter(availableAppointmentSlotsResult => {
                return availableAppointmentSlotsResult.title === selectedStartDate.format('YYYY-MM-DD')
            }
        )
    }, [selectedStartDate, items]);

    const renderAppointmentSlotDates = useCallback(({ item, setBookingForm, showModal }: RenderItemProps) => {
        return (
            <View onLayout={(event: LayoutChangeEvent) => {
                const layout = event.nativeEvent.layout;
                setDateYPositions((state) => state.add(layout.y));
            }}>
                {/*<AppointmentSlotDate item={item} />*/}
                <AppointmentSlotCards
                    items={item.data}
                    setBookingForm={setBookingForm}
                    showModal={showModal}
                />
            </View>
        )
    }, []);

    return (
        <View style={styles.rootContainer}>
            <FlatList
                onScroll={(event) => {
                    const scrollY = event.nativeEvent.contentOffset.y;
                    const dateYPositionsArr = [...dateYPositions];
                    const currentDatePosition = dateYPositionsArr.filter(dateYPosition => scrollY > dateYPosition);
                    if(!currentDatePosition.length) return;
                    // console.log(currentDatePosition.at(-1));
                    const currentDatePositionItem = currentDatePosition.at(-1);
                    const currentDatePositionIndex = dateYPositionsArr.indexOf(currentDatePositionItem);
                    if(currentDatePositionIndex === -1) return;
                    const currentItem = items.at(currentDatePositionIndex);
                    // console.log(currentItem.title);
                }}
                initialNumToRender={1}
                data={filteredSlots}
                extraData={{setBookingForm, showModal}}
                // ListHeaderComponent={<Text>Date: </Text>}
                // stickyHeaderIndices={[0]}
                CellRendererComponent={({ item }) => renderAppointmentSlotDates({item, setBookingForm, showModal})}
                renderItem={() => null}
            />
        </View>
    )
};

export default React.memo(AppointmentSlotDates);

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});