import React, { Component } from 'react';
import TodoItem from './Item'
import './../css/List.css'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index_editing: -1
        }
    }
    handleItemUpdate (index, data) {
        !this.props.onUpdate || this.props.onUpdate (index, data)
        this.setState({index_editing: -1})
    }
    handleItemRemove (index) {
        !this.props.onRemove || this.props.onRemove (index)
    }
    handleSomeEditing (index) {
        this.setState({index_editing: index})
    }
    renderItem (item, index) {
        return <TodoItem key={"item" + index} 
                         data={item}
                         isEditing={index === this.state.index_editing}
                         cantRemove={this.state.index_editing !== -1}
                         onEditing={this.handleSomeEditing.bind(this, index)}
                         onUpdate={this.handleItemUpdate.bind(this, index)}
                         onRemove={this.handleItemRemove.bind(this, index)}
               />
    }
    render () {
        console.log (this.props.list.map(
            (item, index) => !this.props.filter 
                                ? this.renderItem(item, index) 
                                : (
                                    this.props.filter(item) 
                                    ? this.renderItem(item, index) 
                                    : null
                                )))
        return <table className="todo-list">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Due date</th>
                </tr>
            </thead>
            <tbody>
            {
                this.props.list.map(
                    (item, index) => !this.props.filter 
                                        ? this.renderItem(item, index) 
                                        : (
                                            this.props.filter(item) 
                                            ? this.renderItem(item, index) 
                                            : null
                                        ))
            }
            </tbody>
        </table>
    }
}
export default List;