import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

const Header = () => {
    return (
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
            {/*<Slot />*/}
        </Tabs>
    );
};

export default Header;