import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import TodoList from './Todo/List'
import TodoAddForm from './Todo/AddForm'

var estado_geral = {
  nextid_categoria: 2,
  categorias: [
    {
      id: 0,
      nome: "xpto",
      cor: "#fff"
    },
    {
      id: 1,
      nome: "xpti",
      cor: "#f00"
    }
  ],
  nextid_estado: 2,
  estados: [
    {
      id: 0,
      designacao: "feito",
      prepend: "v",
    },
    {
      id: 1,
      designacao: "urgente",
      prepend: "!!!",
    },
  ],
  tasks: [
    {
      descricao: "comer amendoins",
      data: "2017/08/03",
      estado: [0],
      categorias: [0, 1]
    }
  ],
}


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
    list = list.map (item => {
      item.date = new Date(item.date)
      return item
    })
    this.setState({list})
  }

  setLocalList (list) {
    this.setState({statusMessage: "A gravar dados localmente..."})
    localStorage.setItem("list", JSON.stringify(list))
    setTimeout(() => {
      this.setState({update_state_message: ""})
    }, 1000)
  }

  handleUpdateListItem (index, data) {
    let list = this.state.list.slice()
    list[index] = data
    this.updateList(list)
  }

  handleRemoveListItem (index) {
    let list = this.state.list.slice()
    list.splice(index, 1)
    this.updateList(list)
  }

  handleAddListItem (data) {
    //console.log (data)
    let list = this.state.list.slice()
    list.push(data)
    this.updateList(list)
  }

  render() {
    console.log("App Render")
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
        <div className="app-section">
          <h2><span>Tasks de 2017</span></h2>
          <TodoList list={this.state.list}
                    filter={item => item.date.getFullYear() === 2017}
                    onUpdate={this.handleUpdateListItem}
                    onRemove={this.handleRemoveListItem}
          />
        </div>
        <div className="app-section">
          <h2><span>Tasks de 2017 feitas</span></h2>
          <TodoList list={this.state.list}
                    filter={item => item.date.getFullYear() === 2017 && item.done}
                    onUpdate={this.handleUpdateListItem}
                    onRemove={this.handleRemoveListItem}
          />
        </div>
        <div className="app-section">
          <h2><span>Todas as Tasks</span></h2>
          <TodoList list={this.state.list}
                    onUpdate={this.handleUpdateListItem}
                    onRemove={this.handleRemoveListItem}
          />
        </div>
      </div>
    )
  }
}

export default App;
