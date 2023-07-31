import { StyleSheet } from 'react-native';
import { greyColor, primaryColor } from '../../../../../includes/variable';

const styles = StyleSheet.create({
    
    card: {
        backgroundColor:'#e8f7ff',
       // backgroundColor: "#FEDFF6",
        marginTop: 10,
        marginHorizontal:10,
        borderWidth:1,
        borderColor: 'rgba(0,0,0,0.2)',
        padding:0,
        flexDirection:'column',
        justifyContent: 'space-between',
        borderRadius:10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primaryColor,
        marginTop:10
    },
    description:{
        fontSize:16,
        color: greyColor,
        maxHeight:36
    },
    mood:{
        fontSize:16,
        fontWeight:'bold',
        color: greyColor,
        maxHeight:36,
        paddingVertical:5
    },
    switch:{
        alignItems: 'center',
        flexDirection: 'row'
    },
    switchText: {
        fontSize: 16,
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
    },
    modal: {
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.25)'
        },
        box: {
          backgroundColor: 'white',
          padding: 30,
          width: '70%',
          borderRadius: 15,
          elevation: 5,
          shadowOpacity: 0.25,
          shadowRadius: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4
          }
        }
      },
    
      close: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: -20,
          right: -15,
        },
        text: {
          marginLeft: 5,
        }
      },
    
      options: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 20 : 10
      },
    
    //   switch: {
    //     container: {
    //       alignItems: 'center'
    //     },
    //     label: {
    //       paddingTop: Platform.OS === 'ios' ? 10 : 0,
    //       fontSize: 12
    //     }
    //   },
    
      remove: {
        container: {
          alignItems: 'flex-end',
          justifyContent: 'center',
          textAlign: 'center'
        },
        icon: {
          color: '#c00',
          alignSelf: 'center'
        },
        label: {
          paddingTop: 5,
          fontSize: 12,
          color: '#c00'
        }
      }
});

export default styles