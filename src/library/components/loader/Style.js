import { StyleSheet } from "react-native";
import Colors from '../../../constants/Colors';

const style = StyleSheet.create({
  Loader: {
    height: '100%',
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: Colors.fontFamilyBold,
    color: Colors.gray,
    fontSize: 15,
  }
});

export default style;
