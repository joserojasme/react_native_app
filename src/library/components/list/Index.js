import React from 'react';
import { List as Listt, ListItem,Text } from 'native-base';

// Styles
import style from './Style';

const List = ({ data, onPress, type }) => {
    return (
        <Listt>
            {data.map(item => (
                <ListItem style={style.itemList} key={type === 'province' ? item.daneCode : item.id} onPress={()=>onPress(item)}>
                    <Text style={style.text}>{item.name}</Text>
                </ListItem>
            ))
            }
        </Listt>
    );
};

export default List;