import React from 'react';
import { Icons } from '../data/icons';

const BackButton = ({ onClick }) => {
    return (
        <button className="back-btn-corner" onClick={onClick} title="Back">
            <Icons.Back />
        </button>
    );
};

export default BackButton;
