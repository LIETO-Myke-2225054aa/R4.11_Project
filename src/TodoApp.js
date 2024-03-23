import React from 'react';
import './assets/styles/TodoApp.css';
import upArrow from './assets/imgs/upArrow.png'; // Importer l'image de flèche vers le haut
import downArrow from './assets/imgs/downArrow.png';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal"; // Importer le composant Modal

/**
 * Composant principal représentant l'application Todo.
 */
class TodoApp extends React.Component {
    /**
     * Constructeur du composant TodoApp.
     * @param {object} props - Les propriétés passées au composant.
     */
    constructor(props) {
        super(props);
        const storedItems = JSON.parse(localStorage.getItem('items'));
        this.state = {
            items: storedItems || [],
            newTaskTitle: "",
            showModal: false // Ajouter un état pour contrôler l'affichage de la pop-up
        };
    }

    /**
     * Met à jour le localStorage avec les tâches.
     */
    updateLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(this.state.items));
    }

    /**
     * Ouvre la fenêtre modale pour ajouter une nouvelle tâche.
     */
    add = () => {
        // Ouvrir la pop-up
        this.setState({
            showModal: true
        });
    }

    /**
     * Ajoute une nouvelle tâche à la liste des tâches.
     * @param {string} title - Le titre de la tâche à ajouter.
     */
    handleAddTask = (title) => {
        if (title.trim() === "") {
            return; // Empêcher l'ajout d'une tâche vide
        }
        // Ajouter la nouvelle tâche à la liste des tâches
        const newTask = { Title: title, isChecked: false };
        this.setState(prevState => ({
            items: [newTask, ...prevState.items],
            showModal: false // Fermer la pop-up après l'ajout de la tâche
        }), () => {
            this.updateLocalStorage();
        });
    }

    /**
     * Marque une tâche comme complétée ou non.
     * @param {number} index - L'index de la tâche à modifier.
     */
    check = (index) => {
        this.setState(prevState => {
            const updatedItems = prevState.items.map((item, i) => {
                if (i === index) {
                    return { ...item, isChecked: !item.isChecked };
                }
                return item;
            });
            return { items: updatedItems };
        }, () => {
            this.updateLocalStorage();
        });
    }

    /**
     * Met à jour l'état du champ de saisie du titre de la nouvelle tâche.
     * @param {object} e - L'événement de changement de champ de saisie.
     */
    handleInputChange = (e) => {
        this.setState({ newTaskTitle: e.target.value });
    };

    /**
     * Supprime une tâche de la liste des tâches.
     * @param {number} index - L'index de la tâche à supprimer.
     */
    delete = (index) => {
        this.setState(prevState => {
            const items = [...prevState.items];
            items.splice(index, 1);
            return { items };
        }, () => {
            this.updateLocalStorage();
        });
    }

    /**
     * Déplace une tâche vers le haut dans la liste.
     * @param {number} index - L'index de la tâche à déplacer.
     */
    moveUp = (index) => {
        if (index === 0) return; // Ne rien faire si l'élément est déjà en haut de la liste
        this.setState(prevState => {
            const updatedItems = [...prevState.items];
            const temp = updatedItems[index];
            updatedItems[index] = updatedItems[index - 1];
            updatedItems[index - 1] = temp;
            return { items: updatedItems };
        }, () => {
            this.updateLocalStorage();
        });
    }

    /**
     * Déplace une tâche vers le bas dans la liste.
     * @param {number} index - L'index de la tâche à déplacer.
     */
    moveDown = (index) => {
        if (index === this.state.items.length - 1) return; // Ne rien faire si l'élément est déjà en bas de la liste
        this.setState(prevState => {
            const updatedItems = [...prevState.items];
            const temp = updatedItems[index];
            updatedItems[index] = updatedItems[index + 1];
            updatedItems[index + 1] = temp;
            return { items: updatedItems };
        }, () => {
            this.updateLocalStorage();
        });
    }

    /**
     * Recherche les tâches correspondant à un critère de recherche donné.
     * @param {string} query - Le critère de recherche.
     * @returns {array} - Tableau des tâches correspondant à la recherche.
     */
    searchTasks = (query) => {
        const regex = new RegExp(query, 'i'); // 'i' pour insensible à la casse
        return this.state.items.filter(item => regex.test(item.Title));
    }

    /**
     * Rendu du composant TodoApp.
     * @returns {JSX.Element} Élément JSX représentant TodoApp.
     */
    render() {
        const { newTaskTitle, showModal } = this.state;
        const tasks = this.searchTasks(newTaskTitle);
        return (
            <div>
                <Header task={this.state.items.length} checked={this.state.items.filter(item => !item.isChecked).length}/>
                <h2>Todos:</h2>
                <ol>
                    {tasks.map((item, index) => (
                        <li key={index}>
                            <input type="checkbox" checked={item.isChecked} onChange={() => this.check(index)} />
                            <span className={item.isChecked ? "isChecked" : ""}>{item.Title}</span>
                            <button onClick={() => this.delete(index)}>Supprimer</button>
                            <img src={upArrow} className="arrow-icon" onClick={() => this.moveUp(index)}/>
                            <img src={downArrow} className="arrow-icon" onClick={() => this.moveDown(index)}/>
                        </li>
                    ))}
                </ol>
                {showModal && (
                    <Modal
                        isOpen={showModal}
                        handleClose={() => this.setState({ showModal: false })}
                        handleAddTask={this.handleAddTask} // Assurez-vous de passer la fonction handleAddTask à la modal
                    />
                )}
                <Footer add={this.add} newTaskTitle={newTaskTitle} handleInputChange={this.handleInputChange} />
            </div>
        );
    }
}

export default TodoApp;


