import React, {useRef} from "react";
import {Animated, Pressable, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons";

interface Props {
    onButtonDateChange: (direction: string, callback?: (changedDateStr: string) => void) => void;
    buttonArrowDirection: string;
    dateThresholdReached: boolean;
    disableButtons: boolean;
    setDisableButtons: React.Dispatch<React.SetStateAction<boolean>>;
    name: 'leftcircle' | 'rightcircle';
};

interface ButtonProps {
    scale: Animated.Value;
    opacity: Animated.Value;
};

const AppointmentSlotControlsButton = ({ onButtonDateChange,
                                           name,
                                           buttonArrowDirection,
                                           dateThresholdReached,
                                           disableButtons,
                                           setDisableButtons}: Props) => {
    const disableButton = disableButtons || dateThresholdReached;

    const buttonProps = {
        scale: useRef(new Animated.Value(1)).current,
        opacity: useRef(new Animated.Value(1)).current
    };

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
        scaleButton(buttonProps).start(({ finished }) => {
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
        <Animated.View style={[styles.animatedView, setScale(buttonProps.scale)]}>
            <Pressable style={{ opacity: disableButton ? 0.5 : 1 }} disabled={disableButton} onPressIn={handlePressIn} onPressOut={() => handlePressOut(buttonArrowDirection)}>
                <AntDesign name={name} size={24} color='black' />
            </Pressable>
        </Animated.View>
    )
};

export default AppointmentSlotControlsButton;

const styles = StyleSheet.create({
    animatedView: {
        transform: [
            {perspective: 1000},
        ]
    }
});