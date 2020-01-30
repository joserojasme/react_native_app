import { Title as TitleNB } from 'native-base';
import React from 'react';
// Styles
import style from './Style';


const Title = ({text}) =>{
    return(
        <TitleNB style={style.title}>{text}</TitleNB>
    );
};

export default Title;