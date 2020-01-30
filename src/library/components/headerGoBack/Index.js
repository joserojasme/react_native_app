import {
  Body,
  Button,
  Header as HeaderNB,
  Icon,
  Left,
  Title,
} from "native-base";
import React from "react";
import { style } from "./Style";

const Header = ({ title, HandleClick }) => (
  <HeaderNB style={style.Header}>
    <Left style={style.Left}>
      <Button transparent>
        <Icon style={style.icon} onPress={HandleClick} name="md-arrow-back" />
      </Button>
    </Left>
    <Body style={style.Body}>
      <Title style={style.title}>{title}</Title>
    </Body>
  </HeaderNB>
);

export default Header;
