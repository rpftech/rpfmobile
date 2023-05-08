import {Provider as PaperProvider} from 'react-native-paper'

const cssBootstrap = ({ children }) => {
    return (
        <PaperProvider>
            {children}
        </PaperProvider>
    )
};

export default cssBootstrap;