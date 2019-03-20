import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/delete-todo.component";
import Notfound from "./components/notfound.component";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch } from 'react-router-dom';
import logo from './static/logo.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="conatiner">
          <nav className="navbar navbar-expand navbar-light bg-light">
              <a href="/" className="navbar-brand">
                <img src={logo} alt="App Logo" height="50px" width="50px" />
              </a>
              <Link to="/" className="navbar-brand">Todo App</Link>
            <div className="collapse navbar-collapse">  
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link"> Create-Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
            <Switch>
                <Route exact path = "/" component={TodosList}></Route>
                <Route path = "/create" component={CreateTodo}></Route>
                <Route path = "/edit/:id" component={EditTodo}></Route>
                <Route path = "/delete/:id" component={DeleteTodo}></Route>
                <Route component={Notfound}></Route>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;