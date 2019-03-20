import React from 'react';
import EditForm from './editform.component';
class EditTodo extends React.Component {
    render() {
        return (
            <div>
                {console.log(this.props)}
                <EditForm todo={this.props}/>
            </div>
        )
    }
}

export default EditTodo;