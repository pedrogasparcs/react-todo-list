import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import TodoList from './Todo/List'
import TodoAddForm from './Todo/AddForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      statusMessage: '',
    }
    this.handleUpdateListItem = this.handleUpdateListItem.bind(this)
    this.handleRemoveListItem = this.handleRemoveListItem.bind(this)
    this.handleAddListItem = this.handleAddListItem.bind(this)
  }

  componentWillMount () {
    //localStorage.setItem("list", JSON.stringify([]))
    this.getLocalList()
  }

  handleUpdateListItem (index, data) {
    let list = this.state.list
    list[index] = data
    this.updateList(list)
  }

  handleRemoveListItem (index) {
    let list = this.state.list
    list.splice(index, 1)
    this.updateList(list)
  }

  handleAddListItem (data) {
    console.log (data)
    let list = this.state.list
    list.push(data)
    this.updateList(list)
  }

  updateList (list) {
    this.setState({list})
    this.setLocalList(list)
  }

  getLocalList () {
    let list = localStorage.getItem("list")
    if(list === null) {
      list = [];
    }
    else {
      list = JSON.parse(list)
    }
    this.setState({list})
  }

  setLocalList (list) {
    this.setState({statusMessage: "A gravar dados localmente..."})
    localStorage.setItem("list", JSON.stringify(list))
    setTimeout(() => {
      this.setState({update_state_message: ""})
    }, 1000)
  }

  render() {
    return (
      <div className="app">
        <div className="app-section">
          <h2><span>Tasks To be Done</span></h2>
          <TodoList list={this.state.list}
                    filter={item => !item.done}
                    onUpdate={this.handleUpdateListItem}
                    onRemove={this.handleRemoveListItem}
          />
        </div>
        <div className="app-section app-add-form__container">
          <h3>Add a new Task</h3>
          <TodoAddForm onSubmit={this.handleAddListItem}/>
        </div>

        <div className="app-section">
          <h2><span>Tasks Done</span></h2>
          <TodoList list={this.state.list}
                    filter={item => item.done}
                    onUpdate={this.handleUpdateListItem}
                    onRemove={this.handleRemoveListItem}
          />
        </div>
      </div>
    )
  }
}

export default App;
