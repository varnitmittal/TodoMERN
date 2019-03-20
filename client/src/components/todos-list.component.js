import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const EachTodo = (props) => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={`/edit/${props.todo._id}`}>Edit</Link>
        </td>
        <td>
            <Link to={`/delete/${props.todo._id}`}>Delete</Link>
        </td>
    </tr>
)

class TodosList extends React.Component {
    constructor(props){
        super(props);
        this.state = {todos: []};
    }

    componentDidMount(){
        axios.get("http://localhost:4000")
        .then(response => {
            this.setState({todos: response.data});
            console.log(this.state.todos)
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    todoList(){
        return this.state.todos.map((currentTodo, i) => {
            return <EachTodo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{marginTop: "20px"}}>
                    <tbody>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Edit Todo</th>
                            <th>Delete Todo</th>
                        </tr>
                        {this.todoList()}
                    </tbody>
                </table>
                <div style={{margin: "12px"}}>
                    <a href={window.location.href+"create/"}>
                        <button
                            type="submit" 
                            className="btn btn-primary"
                            value="Add a Todo">Add a Todo
                        </button>
                    </a>
                </div>
            </div>
        )
    }
}

export default TodosList;