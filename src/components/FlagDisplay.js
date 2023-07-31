import React from 'react';

const FlagDisplay = ({ currentFlag }) => {
    return (
        <div>
            <img src={`https://flagcdn.com/w320/${currentFlag.code}.png`} alt={currentFlag.name}/>
        </div>
    );
};

export default FlagDisplay;
