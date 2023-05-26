import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import React from "react";

interface Props {
    formattedStartDate: (format: string) => string;
    handleCalendarDisplay: (action: string) => void;
};

const AppointmentSlotControlsHeader = ({ formattedStartDate, handleCalendarDisplay }: Props) => {
    return (
        <View style={styles.headerTextContainer}>
            <Text>{formattedStartDate('dddd Do MMMM YYYY')}</Text>
            <Button compact={true} mode='elevated' onPress={() => handleCalendarDisplay('reset')}>Change date</Button>
        </View>
    )
};

export default AppointmentSlotControlsHeader;

const styles = StyleSheet.create({
    headerTextContainer: {
        alignItems: "center"
    }
});