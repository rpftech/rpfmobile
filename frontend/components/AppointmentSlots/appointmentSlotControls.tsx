import {Animated, Pressable, StyleSheet, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Button, Text} from "react-native-paper";
import React, {useRef, useState} from "react";

interface Props {
    formattedStartDate: (format: string) => string;
    onButtonDateChange: (direction: string) => void;
    handleCalendarDisplay: (action: string) => void;
};

interface ButtonProps {
    scale: Animated.Value;
    opacity: Animated.Value;
}

const AppointmentSlotControls = ({ formattedStartDate, onButtonDateChange, handleCalendarDisplay }: Props) => {
    const leftButtonProps = {
        scale: useRef(new Animated.Value(1)).current,
        opacity: useRef(new Animated.Value(1)).current
    };
    const rightButtonProps = {
        scale: useRef(new Animated.Value(1)).current,
        opacity: useRef(new Animated.Value(1)).current
    };
    const buttonProps = {
        left: leftButtonProps,
        right: rightButtonProps
    };
    const [disableButtons, setDisableButtons] = useState(false);

    const scaleButton = (buttonProps: ButtonProps) => {
        return Animated.sequence([
            Animated.timing(buttonProps.scale, {
                toValue: 1.4,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(buttonProps.scale, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            })
        ])
    };
    const handlePressOut = (direction: string) => {
        setDisableButtons(true);
        const buttonProp = buttonProps[direction as keyof typeof buttonProps];
        scaleButton(buttonProp).start(({ finished }) => {
            onButtonDateChange(direction);
            setDisableButtons(false);
        })
    };

    const setScale = (scale: Animated.Value | number) => {
        return {
            transform: [
                {scale: scale}
            ]
        };
    };

    const handlePressIn = () => {
        console.log('Pressing in!')
    };

    return (
        <View style={styles.header}>
            <Animated.View style={[styles.animatedView, setScale(leftButtonProps.scale)]}>
                <Pressable style={{ opacity: disableButtons ? 0.5 : 1 }} disabled={disableButtons} onPressIn={handlePressIn} onPressOut={() => handlePressOut('left')}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </Pressable>
            </Animated.View>
            <View style={styles.headerTextContainer}>
                <Text>{formattedStartDate('dddd Do MMMM YYYY')}</Text>
                <Button compact={true} mode='elevated' onPress={() => handleCalendarDisplay('reset')}>Change date</Button>
            </View>
            {/* Major functionality to work on next: */}
            {/* 2. Figure out how to add some kind of animation to show the button has been clicked */}
            <Animated.View style={[styles.animatedView, setScale(rightButtonProps.scale)]}>
                <Pressable style={{ opacity: disableButtons ? 0.5 : 1 }} disabled={disableButtons} onPressIn={handlePressIn} onPressOut={() => handlePressOut('right')}>
                    <AntDesign disabled={disableButtons} name="rightcircle" size={24} color="black" />
                </Pressable>
            </Animated.View>
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
    animatedView: {
        transform: [
            {perspective: 1000},
        ]
    },
    dateButton: {
        transform: [
            {scale: 1.5},
        ]
    },
    view: {
        flex: 1
    }
});