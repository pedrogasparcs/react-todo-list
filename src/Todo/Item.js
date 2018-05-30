import React, { Component } from 'react';
import {formatDate} from './../helpers'

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            editing: false,
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this)
    }

    handleEdit () {
        if(this.props.isEditing) {
            this.handleSubmit ()
        }
        else {
            !this.props.onEditing || this.props.onEditing()
        }
    }

    handleInputChange (e) {
        let val = e.target.value
        let name = e.target.name
        let data = Object.assign({}, this.state.data)
        data[name] = e.target.type === 'checkbox' ? e.target.checked : val
        this.setState({
            data
        })
    }

    handleSubmit (e) {
        !e || e.preventDefault ()
        // validate data and then send
        let data = this.state.data
        data.date = new Date (data.date)
        !this.props.onUpdate || this.props.onUpdate(data)
    }

    handleStateChange () {
        let data = Object.assign({}, this.state.data)
        data.done = !data.done
        this.setState({
            data
        })
        !this.props.onUpdate || this.props.onUpdate(data)
    }

    render () {
        const {text, date} = this.state.data
        return <tr>
            <td>{
                this.props.isEditing
                ? <form action={"#"} onSubmit={this.handleSubmit}>
                    <input type="text" 
                            value={this.state.data.text}
                            name="text"
                            onChange={this.handleInputChange}
                    />
                </form>
                : text
            }</td>
            <td>{
                this.props.isEditing
                ? <form action={"#"} onSubmit={this.handleSubmit}>
                    <input type="date" 
                            value={formatDate(this.state.data.date, true)}
                            name="date"
                            onChange={this.handleInputChange}
                    />
                </form>
                : formatDate(date)
            }</td>
            <td><button onClick={this.handleStateChange}>Toggle State</button></td>
            <td><button onClick={this.handleEdit}>{this.props.isEditing ? "Save" : "Edit"}</button></td>
            <td><button onClick={this.props.onRemove} disabled={this.props.cantRemove ? "disabled" : ""}>Remove</button></td>
        </tr>
    }
}
export default Item;