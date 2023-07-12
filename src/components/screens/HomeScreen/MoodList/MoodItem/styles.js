import { StyleSheet } from 'react-native';
import { greyColor, primaryColor } from '../../../../../includes/variable';

const styles = StyleSheet.create({
    
    card: {
        backgroundColor:'#fff',
       // backgroundColor: "#FEDFF6",
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth:1,
        borderColor: 'rgba(0,0,0,0.2)',
        padding:10,
        flexDirection:'column',
        justifyContent: 'space-between',
        borderRadius:10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primaryColor
    },
    description:{
        fontSize:14,
        color: greyColor,
        maxHeight:36
    },
    switch:{
        alignItems: 'center',
        flexDirection: 'row'
    },
    switchText: {
        fontSize: 14,
        opacity: 0.5,
        marginLeft:5
    },
    textContainer: {
        marginRight: 20,
        flex:1,
    },
    buttons: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingTop:10
    }
});

export default styles