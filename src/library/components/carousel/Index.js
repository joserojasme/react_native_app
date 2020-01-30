import React, { Component } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get("window");

const Slider = props => (
  <View style={style.container}>
    <Image style={style.Image} source={{uri:props.uri}} />
  </View>
);

const style = {
  container: {
    flex: 1,
    justifyContent: "center"
  },
  Image: {
    flex: 1,
    width
  }
};

export default class extends Component {
  render() {
    const {data} = this.props;
    return (
      <View style={{ flex: 1, marginTop: -30 }}>
        <Swiper autoplay={true} loop={true} height={250} >
          {data.map((item, i) => (
            <Slider uri={item.imageUrl} key={i} />
          ))}
        </Swiper>
      </View>
    );
  }
}
