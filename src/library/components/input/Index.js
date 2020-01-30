import React from 'react';
import { Input as InputNB, Item, Icon } from 'native-base';

const Input = ({error,styleItem,styleInput,placeholder, onChangeText, secureTextEntry, placeholderTextColor, autoCapitalize, value, icon,iconColor,keyboardType,editable, onBlur}) =>{
    return(
        <Item style={styleItem} regular error={error ? true : false}>
            <Icon active name={icon} style={{color:iconColor}} />
            <InputNB
                placeholder={placeholder}
                onChangeText = {onChangeText}
                secureTextEntry = {secureTextEntry}
                style={styleInput}
                placeholderTextColor={placeholderTextColor} 
                autoCapitalize={autoCapitalize}
                value={value}
                keyboardType={keyboardType}
                editable={editable}
                onBlur={onBlur}
            />
        </Item>

    );
};

export default Input;