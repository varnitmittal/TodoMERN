import React from 'react';
import axios from 'axios';

class Form extends React.Component{
    constructor(props){
        super(props);
        //Binding Methods
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //Initial State
        this.state = {
            todo_description:"",
            todo_responsible:"",
            todo_priority:"Low", //priority is On/Active by default
            todo_completed:false
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

        axios.post('http://localhost:4000/add', newTodo)
        .then(res =>{
            console.log(res.data);
            window.alert("Todo has been created!!");
        });

        //Resetting the form:
        this.setState({
                todo_description:"",
                todo_responsible:"",
                todo_priority:"Low",
                todo_completed:false
        });
    }

    render() {
        return (
            <div style={{margin: "10px"}}>
                <h2>Create Todo-</h2>
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
                        value="Create Todo" />
                    </div>                
                </form>
            </div>
        )
    }
}

export default Form;