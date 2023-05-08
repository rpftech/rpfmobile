import { Tabs } from "expo-router";
import {Provider as PaperProvider} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';

const Layout = () => {
    return (
        <PaperProvider>
            <Tabs screenOptions={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <MaterialIcons name="meeting-room" size={size} color={color} />;
                }
            }}>
                <Tabs.Screen
                    // Name of the route to hide.
                    name="index"
                    options={{
                        tabBarLabel: 'Counselling',
                        headerShown: false
                    }}
                />
            </Tabs>
            {/*<Slot />*/}
        </PaperProvider>
    );
};

export default Layout;