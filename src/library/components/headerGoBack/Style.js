import { StyleSheet, Platform, StatusBar } from "react-native";
import Colors from '../../../constants/Colors';

export const style = StyleSheet.create({
  Header: {
    backgroundColor: Colors.greenDark,
    height: (Platform.OS === 'ios' ? 20 :  56) + StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight, 
  },
  title:{
    fontFamily: Colors.fontFamily,
    color: Colors.white
  },
  Body:{
    flex:3
  },
  Left:{
    flex: 2
  },
  Image:{
    width: 100, 
    height: 40, 
    marginLeft: 'auto', 
    marginRight: 'auto'
  },
  icon:{
    color: Colors.white
  }
});