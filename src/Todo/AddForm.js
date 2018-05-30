import React, { Component } from 'react';

class AddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adding: false,
            data: {
                text: "",
                date: "",
                done: false,
            },
        }
        this.handleStartAdding = this.handleStartAdding.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleStartAdding () {
        this.setState({adding: true})
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
        e.preventDefault()
        // validate data and then send
        let data = this.state.data
        data.date = new Date (data.date)
        !this.props.onSubmit || this.props.onSubmit(data)
        this.setState({
            data: {
                text: "",
                date: "",
                done: false,
            },
            adding: false
        })
    }

    handleCancel () {
        this.setState({adding: false})
    }

    render () {
        return <div>
            {
                this.state.adding
                ? <form action={"#"} onSubmit={this.handleSubmit}>
                    <div className="input__container">
                        <label className="input__label" htmlFor="text">Task: </label>
                        <div className="input__wrapper">
                            <input type="text" 
                                id="text"
                                value={this.state.data.text} 
                                name="text"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input__container">
                        <label className="input__label" htmlFor="date">Date: </label>
                        <div className="input__wrapper">
                            <input type="date" 
                                id="date"
                                value={this.state.data.date}
                                name="date"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="input__container">
                        <label className="input__label" htmlFor="done">Estado: </label>
                        <div className="input__wrapper">
                            <input type="checkbox" 
                                id="done"
                                checked={this.state.data.done}
                                name="done"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <button onClick={this.handleSubmit} className="submit-button">Submit</button>
                    <button onClick={this.handleCancel} className="submit-button">Cancel</button>
                </form>
                : <button onClick={this.handleStartAdding}>Add</button>
            }
        </div>
    }
}
export default AddForm;