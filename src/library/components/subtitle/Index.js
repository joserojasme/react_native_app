import { Title as TitleNB } from 'native-base';
import React from 'react';
// Styles
import style from './Style';


const SubTitle = ({text, styles}) =>{
    return(
        <TitleNB style={styles ? styles : style.title}>{text}</TitleNB>
    );
};

export default SubTitle;