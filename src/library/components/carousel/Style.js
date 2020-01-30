import { StyleSheet, Dimensions } from "react-native";

const {width} = Dimensions.get('window');

export const style = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center"
        },
        image: {
          flex: 1,
          width
        }
});