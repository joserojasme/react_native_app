import React from 'react';
import { Button as ButtonNB, Text } from 'native-base';

// Styles
import style from './Style';

const Button = ({onPress, children, disable}) =>{
    return(
        <ButtonNB disabled={disable} onPress={onPress} block style={style.Button}>
            <Text>{children}</Text>
        </ButtonNB>
    );
};

export default Button;