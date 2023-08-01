import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const {  Location, BudgetValue,dispatch} = useContext(AppContext);
   
    const addBudget = (val)=>{
        dispatch({
            type: 'ADD_BUDGET',
            payload: val,
        })
}
    return (
        <div className='alert alert-secondary'>
            <span>Budget: {Location} 
            <input
                        required='required'
                        type='number'
                        id='budget'
                        value={BudgetValue}
                        style={{size: 10}}
                        onChange={(event) => addBudget(event.target.value)}
                        >
                        </input></span>
        </div>
    );
};

export default Budget;