import React from 'react';
import HamburgerMenuContent from '../../app/views/HamburgerMenuContent';

const HamburgerMenu = ({ toggle }) => {
    return <HamburgerMenuContent toggleHamburgerMenu={() => toggle()} />;
}

export default HamburgerMenu;