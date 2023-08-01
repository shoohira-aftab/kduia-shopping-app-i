import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { Location,RemainingValue } = useContext(AppContext);
    
    
    
    return (
        <div className='alert alert-success'>
            <span>Remaining: {Location}{RemainingValue}</span>
            
        </div>
    );
};

export default Remaining;