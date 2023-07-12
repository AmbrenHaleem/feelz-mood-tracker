import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../includes/variable';


const styles = StyleSheet.create({
    
    addButtonContainer: {
        backgroundColor: primaryColor,
        borderRadius:30,
        position: 'absolute',
        right: 25,
        bottom: 25,
        elevation: 2,
        shadowOpacity:0.25,
        shadowColor:'#000',
        shadowRadius: 2,
        shadowOffset: {
            width:0,
            height:2
        }
    },
    addButtonText: {
        width: 60,
        height: 60,
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign:'center',
        lineHeight: 56
    }
});

export default styles