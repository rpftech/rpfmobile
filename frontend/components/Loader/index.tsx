import {StyleSheet, View} from "react-native";
import {ActivityIndicator, MD2Colors, Text} from "react-native-paper";
import React from "react";

const Loader = ({ children }) => {
    return (
        <View style={styles.loaderContainer}>
            {children}
            <ActivityIndicator size='large' animating={true} color={MD2Colors.red800} />
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        gap: 30,
        justifyContent: "center",
        alignItems: "center"
    }
});