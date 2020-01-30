import {
  Body,
  Button,
  Header as HeaderNB,
  Icon,
  Left,
  Right,
  Text,
  Title,
  Thumbnail
} from "native-base";
import React from "react";
import { style } from "./Style";

const Header = ({ username, HandleClickSingOut }) => (
  <HeaderNB style={style.Header}>
    <Left style={style.flex}>
      <Button transparent>
        <Icon onPress={HandleClickSingOut} name="power" />
      </Button>
    </Left>
    <Body style={style.flex}>
          <Thumbnail square small source={require("../../../assets/images/logo.png")}  style={style.Image}/>
        </Body>
    <Right style={style.flex}>
      <Title style={style.title}>{username}</Title>
    </Right>
  </HeaderNB>
);

export default Header;
