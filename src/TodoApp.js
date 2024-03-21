import React from 'react';
import './TodoApp.css';
import upArrow from './upArrow.png'; // Importer l'image de flèche vers le haut
import downArrow from './downArrow.png';
import Header from "./Header";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        const storedItems = JSON.parse(localStorage.getItem('items'));
        this.state = {
            items: storedItems || [],
            newTaskTitle: ""
        };
    }

    updateLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(this.state.items));
    }

    add = () => {
        if (this.state.newTaskTitle.trim() === "") {
            return; // Empêcher l'ajout d'une tâche vide
        }
        this.setState({
            items: [
                { Title: this.state.newTaskTitle, isChecked: false },
                ...this.state.items
            ],
            newTaskTitle: "" // Réinitialiser le champ d'entrée après l'ajout de la tâche
        }, () => {
            this.updateLocalStorage();
        });
    }

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

    handleInputChange = (e) => {
        this.setState({ newTaskTitle: e.target.value });
    };

    delete = (index) => {
        this.setState(prevState => {
            const items = [...prevState.items];
            items.splice(index, 1);
            return { items };
        }, () => {
            this.updateLocalStorage();
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
        }, () => {
            this.updateLocalStorage();
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
        }, () => {
            this.updateLocalStorage();
        });
    }

    render() {
        return (
            <div>
                <Header task={this.state.items.length} checked={this.state.items.filter(item => !item.isChecked).length}/>
                <h2>Todos:</h2>
                <ol>
                    {this.state.items.map((item, index) => (
                        <li key={index}>
                            <input type="checkbox" checked={item.isChecked} onChange={() => this.check(index)} />
                            <span className={item.isChecked ? "isChecked" : ""}>{item.Title}</span>
                            <button onClick={() => this.delete(index)}>Supprimer</button>
                            <img src={upArrow} className="arrow-icon" onClick={() => this.moveUp(index)}/>
                            <img src={downArrow} className="arrow-icon" onClick={() => this.moveDown(index)}/>
                        </li>
                    ))}
                </ol>
                <div>
                    <input type="text" value={this.state.newTaskTitle} onChange={this.handleInputChange} />
                    <button onClick={this.add}>Ajouter</button>
                </div>
            </div>
        );
    }
}

export default TodoApp;
