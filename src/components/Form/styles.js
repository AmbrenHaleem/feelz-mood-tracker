import { StyleSheet } from 'react-native';
import { primaryColor, secondaryColor } from '../../includes/variable';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  dateTimeLabel: {
    fontSize: 26,
    color:primaryColor,
    textAlign:'center',
    paddingBottom:12
  },
  label: {
    color: '#777',
    fontSize: 16,
    paddingBottom: 5
  },
  textbox: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#bcbcbc',
    paddingVertical: 7,
    paddingHorizontal: 14,
    fontSize: 16,
    borderRadius: 10,
  },
  selectlist:{
    container:{
        flexDirection:'row',
        alignSelf: 'stretch',
        paddingBottom: 20,
        
    },
    list:{
        flex:8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    button:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: primaryColor,
        padding: 10,
        alignSelf: 'flex-start',
        marginTop : 2
    },
     //contact style
     textInput:{
      flex: 3,
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft:10
    }
  },
  multilineTextbox:{
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#747474',
    paddingVertical: 7,
    paddingHorizontal: 14,
    fontSize: 16,
    borderRadius: 10,
    flex: 1,
    textAlignVertical:'top'
  },
  detailTextbox:{
    borderWidth: 1,
    borderColor: '#747474',
    paddingTop: 9,
    paddingHorizontal: 14,
    fontSize: 16,
    borderRadius: 10,
    flex: 1,
    height:80,
    textAlignVertical:'top'},
  button: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: primaryColor,
      marginTop : 20
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  },
  errorMessage: {
    container: {
      backgroundColor: '#f2f2f2',
      padding: 10,
      marginBottom: 30,
      borderColor: '#c00',
      borderWidth: 1,
      borderLeftWidth: 8
    },
    label: {
      color: '#c00',
      fontSize: 14,
      fontWeight: 'bold'
    },
    text: {
      color: '#c00',
      fontSize: 16
    }
  },
  loadingContainer: {
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#444',
    fontSize : 21,
    marginTop: 10
  },

  // tag
  containers: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    paddingHorizontal: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
  },
  tagText: {
    color: '#333',
    fontSize: 14,
  },
 
 primaryColor: '#2A6194'
});

export default styles;