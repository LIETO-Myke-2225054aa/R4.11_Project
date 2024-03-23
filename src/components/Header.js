// Header.js
import React from 'react';

function Header({task, checked}) {
    return (
        <header>
            <h1>Il y a {task} tâches et {checked} en attente</h1>
        </header>
    );
}

export default Header;