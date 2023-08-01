import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Spent = () => {
    const {  Location,SpentValue } = useContext(AppContext);
 

    return (
        <div className='alert alert-primary'>
            <span>Spent: {Location}{SpentValue}</span>
            
        </div>
    );
};

export default Spent;