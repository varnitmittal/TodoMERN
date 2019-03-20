import React from 'react';
import axios from 'axios';

class DeleteTodo extends React.Component {
    constructor (props){
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    deleteTodo(){
        var url = `http://localhost:4000/delete/${this.props.match.params.id}`;
        axios.get(url)
        .then(Response => {
            window.alert("Todo has been deleted!!")
        })
        .catch(err => {
            return err.message
        })
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.deleteTodo()}
                <p>Todo for id - {this.props.match.params.id} has been deleted...</p>
            </div>
        )
    }
}

export default DeleteTodo; 