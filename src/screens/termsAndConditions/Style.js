import { StyleSheet,Dimensions } from "react-native";
import Colors from '../../constants/Colors';

const { height } = Dimensions.get('window');

const style = StyleSheet.create({
    container:{
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
      },
      title: {
          fontSize: 22,
          alignSelf: 'center',
          fontFamily:Colors.fontFamily
      },
      tcParrafo: {
          marginTop: 10,
          marginBottom: 10,
          fontSize: 12,
          fontFamily:Colors.fontFamily
      },
      
      tcLista:{
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 10,
          fontSize: 12,
          fontFamily:Colors.fontFamily
      },
      tcContainer: {
          marginTop: 15,
          marginBottom: 15,
          height: height * .7
      },
    
      button:{
          backgroundColor: Colors.green,
          borderRadius: 5,
          padding: 10
      },
    
      buttonDisabled:{
        backgroundColor: Colors.gray,
        borderRadius: 5,
        padding: 10
     },
    
      buttonLabel:{
          fontSize: 14,
          color: Colors.white,
          alignSelf: 'center',
          fontFamily:Colors.fontFamily
      },

      buttonCancel:{
        backgroundColor: Colors.green,
        borderRadius: 5,
        padding: 10,
        marginTop:10,
        color:Colors.white
      }

});

export default style;