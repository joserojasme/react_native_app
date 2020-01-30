import React, { Component } from "react";
import { Image } from 'react-native';
import { Container, Card, Text, Icon } from "native-base";
import { styles } from "./Styles";

export default class Cardd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: [
        {
          Icon: "md-cash",
          Text: "Giros",
          Image: require('../../../assets/images/Turns.jpeg')
        },
        {
          Icon: "md-document",
          Text: "Documentos",
          Image: require('../../../assets/images/Documents.jpeg')
        },
        {
          Icon: "md-chatbubbles",
          Text: "Paquetes",
          Image: require('../../../assets/images/Packages.jpeg')
        }
      ]
    };
  }

  render() {
    const { cardInfo } = this.state;
    const { navigation } = this.state;
    return (
      <Container style={styles.Container}>
        {cardInfo.map((Item, index) => (
          <Card key={index} style={styles.Card}>
            <Image source={Item.Image} style={styles.Image}/>
            <Icon style={styles.ColorIcon} name={Item.Icon} />
            <Text style={styles.ColorText}>{Item.Text}</Text>
          </Card>
        ))}
      </Container>
    );
  }
}
