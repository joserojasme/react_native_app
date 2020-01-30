import React from 'react';
import { Segment as SegmentComponent, Button, Text } from "native-base";

// Styles
import style from './Style';
const Segment = ({ firstText, lastText, activeButton, handlePressFirst, handlePressLast, data }) => {
    return (
        <SegmentComponent style={style.segment}>
            <Button
                onPress={handlePressFirst}
                first
                style={activeButton === data[0].id ? style.buttonActive : style.button}
                active={activeButton ===  data[0].id  ? true : false}>
                <Text
                    style={activeButton ===  data[0].id  ? style.text : style.textActive}>
                    {firstText}
                </Text>
            </Button>
            <Button
                onPress={handlePressLast}
                last style={activeButton ===  data[1].id  ? style.buttonActive : style.button}
                active={activeButton ===  data[1].id  ? true : false}>
                <Text style={activeButton ===  data[1].id  ? style.text : style.textActive}>
                    {lastText}
                </Text>
            </Button>
        </SegmentComponent>
    );
};

export default Segment;