import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    }
  });

  export default style;