// Footer.js
import React from 'react';

function Footer({add, newTaskTitle, handleInputChange}) {
    return (
        <footer>
            <label>Recherche rapide : </label>
            <input
                type="text"
                value={newTaskTitle}
                onChange={handleInputChange}
                placeholder="Rechercher une tâche..."/>
            <br/>
            <button onClick={add}>Ajouter une tâche</button>
        </footer>
    );
}

export default Footer;

// <input type="text" value={this.state.newTaskTitle} onChange={this.handleInputChange}/>
