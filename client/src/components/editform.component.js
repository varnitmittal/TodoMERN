import React from 'react';
import axios from 'axios';

const ToEdit = (props) => {
    console.log(props);
    return(
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
    </tr>
)}

class EditForm extends React.Component{
    constructor(props){
        super(props);
        //Binding Methods
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Initial State
        this.state = {
            todos:[]
        };
    }

    onChangeTodoDescription = (e) =>{
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible = (e) =>{
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority = (e) =>{
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit = (e) =>{
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        //Post to backend
        var {params} = this.props.todo.match;
        axios.post(`http://localhost:4000/update/${params.id}`, newTodo)
        .then(res =>{
            window.alert("Todo has been updated!!");
            return <ToEdit todo={this.state.todos} />
        });

        //Resetting the form:
        this.setState({
                todo_description:"",
                todo_responsible:"",
                todo_priority:"Low",
                todo_completed:false
        });
    }

    componentDidMount(){
        //Retrieving Current Data
        var {params} = this.props.todo.match;
        axios.get(`http://localhost:4000/${params.id}`)
        .then(response => {
            this.setState({todos: response.data});
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    render() {
        return (
            <div style={{margin: "10px"}}>
                <div>
                    <h3>Todo being edited:</h3>
                    <table className="table table-striped" style={{marginTop: "20px"}}>
                        <tbody>
                        <tr>
                                <th>Description</th>
                                <th>Responsible</th>
                                <th>Priority</th>
                            </tr>
                            <ToEdit todo={this.state.todos} />
                        </tbody>
                    </table>
                 </div>
                <br />
                <h4>Edit Todo-</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Enter Description..." 
                                value={this.state.todo_description} 
                                onChange={this.onChangeTodoDescription}>
                            </input>
                    </div>
                    <div className="form-group">
                        <label>Responsible:</label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Enter Responsibe..."
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}>
                            </input>
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <div className="form-check form-check-inline">    
                            <label className="form-check-label"><input 
                                className="form-check-input" 
                                type="radio" 
                                name="priority" 
                                value="Low" 
                                onChange={this.onChangeTodoPriority}
                                checked={this.state.todo_priority === "Low"}
                                id="priority-low" />Low</label>
                        </div>
                        <div className="form-check form-check-inline">    
                            <label className="form-check-label"><input 
                                className="form-check-input" 
                                type="radio" 
                                name="priority" 
                                value="Medium"
                                onChange={this.onChangeTodoPriority}
                                checked={this.state.todo_priority === "Medium"} 
                                id="priority-med" />Medium</label>
                        </div>
                        <div className="form-check form-check-inline">    
                            <label className="form-check-label"><input 
                                className="form-check-input" 
                                type="radio" 
                                name="priority" 
                                value="High" 
                                onChange={this.onChangeTodoPriority}
                                checked={this.state.todo_priority === "High"}
                                id="priority-high" />High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input 
                        type="submit" 
                        className="btn btn-primary"
                        value="Update Todo" />
                    </div>                
                </form>
            </div>
        )
    }
}

export default EditForm;