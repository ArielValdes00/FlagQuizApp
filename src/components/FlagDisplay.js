import React from 'react';

const FlagDisplay = ({ currentFlag }) => {
    return (
        <div>
            <img src={currentFlag?.flags?.png} alt={currentFlag?.name?.common}/>
        </div>
    );
};

export default FlagDisplay;
