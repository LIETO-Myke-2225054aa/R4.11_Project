import React from 'react';
import './TodoApp.css';
import upArrow from './upArrow.png'; // Importer l'image de flèche vers le haut
import downArrow from './downArrow.png';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { text: "Learn JavaScript", done: false },
                { text: "Learn React", done: false },
                { text: "Play around in JSFiddle", done: true },
                { text: "Build something awesome", done: true }
            ],
            newTaskTitle: ""
        };
    }

    add = () => {
        if (this.state.newTaskTitle.trim() === "") {
            return; // Empêcher l'ajout d'une tâche vide
        }
        this.setState({
            items: [
                { text: this.state.newTaskTitle, done: false },
                ...this.state.items
            ],
            newTaskTitle: "" // Réinitialiser le champ d'entrée après l'ajout de la tâche
        });
    }

    check = (index) => {
        this.setState(prevState => {
            const updatedItems = prevState.items.map((item, i) => {
                if (i === index) {
                    return { ...item, done: !item.done };
                }
                return item;
            });
            return { items: updatedItems };
        });
    }

    handleInputChange = (e) => {
        this.setState({ newTaskTitle: e.target.value });
    };

    delete = (index) => {
        this.setState(prevState => {
            const items = [...prevState.items];
            items.splice(index, 1);
            return { items };
        });
    }

    moveUp = (index) => {
        if (index === 0) return; // Ne rien faire si l'élément est déjà en haut de la liste
        this.setState(prevState => {
            const updatedItems = [...prevState.items];
            const temp = updatedItems[index];
            updatedItems[index] = updatedItems[index - 1];
            updatedItems[index - 1] = temp;
            return { items: updatedItems };
        });
    }

    moveDown = (index) => {
        if (index === this.state.items.length - 1) return; // Ne rien faire si l'élément est déjà en bas de la liste
        this.setState(prevState => {
            const updatedItems = [...prevState.items];
            const temp = updatedItems[index];
            updatedItems[index] = updatedItems[index + 1];
            updatedItems[index + 1] = temp;
            return { items: updatedItems };
        });
    }

    render() {
        return (
            <div>
                <h2>Todos:</h2>
                <ol>
                    {this.state.items.map((item, index) => (
                        <li key={index}>
                            <input type="checkbox" checked={item.done} onChange={() => this.check(index)} />
                            <span className={item.done ? "done" : ""}>{item.text}</span>
                            <button onClick={() => this.delete(index)}>Supprimer</button>
                            <img src={upArrow} className="arrow-icon" onClick={() => this.moveUp(index)}/>
                            <img src={downArrow} className="arrow-icon" onClick={() => this.moveDown(index)}/>
                        </li>
                    ))}
                </ol>
                <div>
                    <span>Il y a {this.state.items.length} tâches et {this.state.items.filter(item => !item.done).length} en attente</span>
                    <br />
                    <input type="text" value={this.state.newTaskTitle} onChange={this.handleInputChange} />
                    <button onClick={this.add}>Ajouter</button>
                </div>
            </div>
        );
    }
}

export default TodoApp;
