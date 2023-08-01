import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimesCircle,FaPlusCircle, FaMinusCircle } from 'react-icons/fa';


const ExpenseItem = (props) => {
    const { dispatch, Location} = useContext(AppContext);

    const handleDeleteItem = () => {
        const item = {
            name: props.name,
        };

        dispatch({
            type: 'DELETE_ITEM',
            payload: item,
        });
    };
    const handleAddItem = () => {
        const item = {
            name: props.name,
        };

        dispatch({
            type: 'ADD_ITEM',
            payload: item,
        });
    };


    return (
        <tr>
        <td>{props.name}</td>
        <td>{Location}{props.quantity}</td>
        <td><FaPlusCircle size='2.2em' color="green" onClick={handleAddItem}></FaPlusCircle></td>
        
        <td><FaMinusCircle size='2.2em' color="red" onClick={handleDeleteItem}></FaMinusCircle></td>
        </tr>
    );
};

export default ExpenseItem;