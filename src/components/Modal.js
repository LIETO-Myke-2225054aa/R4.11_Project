// Modal.js
import React, { useState } from 'react';

function Modal({ isOpen, handleClose, handleAddTask }) {
    const [taskTitle, setTaskTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
        handleAddTask(taskTitle); // Appeler la fonction pour ajouter la tâche avec le titre saisi
        setTaskTitle(""); // Réinitialiser le champ de texte après l'ajout de la tâche
        handleClose(); // Fermer la modal après l'ajout de la tâche
    };

    return (
        <div className={isOpen ? "modal-open" : "modal-closed"}>
            <div className="modal-content">
                <h2>Ajouter une tâche</h2>
                <form onSubmit={handleSubmit}>
                    <label>Titre de la tâche:</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
