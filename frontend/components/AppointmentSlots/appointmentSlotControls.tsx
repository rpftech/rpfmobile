import {StyleSheet, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Button, Text} from "react-native-paper";
import React from "react";

interface Props {
    formattedStartDate: (format: string) => string;
    onButtonDateChange: (direction: string) => void;
    handleCalendarDisplay: (action: string) => void;
}

const AppointmentSlotControls = ({ formattedStartDate, onButtonDateChange, handleCalendarDisplay }: Props) => {
    return (
        <View style={styles.header}>
            <AntDesign onPress={() => onButtonDateChange('left')} name="leftcircle" size={24} color="black" />
            <View style={styles.headerTextContainer}>
                <Text>{formattedStartDate('dddd Do MMMM YYYY')}</Text>
                <Button compact={true} mode='elevated' onPress={() => handleCalendarDisplay('reset')}>Change date</Button>
            </View>
            {/* Major functionality to work on next: */}
            {/* 2. Figure out how to add some kind of animation to show the button has been clicked */}
            <AntDesign onPress={() => onButtonDateChange('right')} name="rightcircle" size={24} color="black" />
        </View>
    )
};

export default AppointmentSlotControls;

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