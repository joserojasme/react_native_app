import { StyleSheet, Platform, StatusBar } from "react-native";
import Colors from '../../../constants/Colors';
import { Left } from "native-base";

export const style = StyleSheet.create({
  Header: {
    backgroundColor: Colors.greenDark,
    height: (Platform.OS === 'ios' ? 20 :  56) + StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight, 
  },
  title:{
    fontFamily: Colors.fontFamily,
  },

  flex:{
    flex: 1
  }, 

  Image:{
    width: 100, 
    height: 40, 
    marginLeft: 'auto', 
    marginRight: 'auto'
  }

});