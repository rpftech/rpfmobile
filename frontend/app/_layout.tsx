import { Slot } from "expo-router";
import {Provider as PaperProvider} from 'react-native-paper'

const Layout = () => {
    return (
        <PaperProvider>
            <Slot />
        </PaperProvider>
    );
};

export default Layout;