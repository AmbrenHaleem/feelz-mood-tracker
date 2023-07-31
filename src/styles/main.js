import { Platform, StyleSheet } from 'react-native';
import { secondaryColor } from '../includes/variable';

const styles = StyleSheet.create({
    containter: {
        paddingTop: Platform.OS === 'ios' ? 55:35,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor : secondaryColor
    },
    list: {
        flex: 3,
        backgroundColor: '#EFEFFE'
    },
    form: {
        flex: 1
    }
});

export default styles;