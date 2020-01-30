import React from "react";
import { View, Text } from "react-native";
import { Spinner } from "native-base";
import  style  from "./Style";
import Colors from '../../../constants/Colors';

const Loader = () => (
  <View style={style.Loader}>
    <Spinner color={Colors.greenDark} />
    <Text style={style.text}>Cargando...</Text>
  </View>
);

export default Loader;
