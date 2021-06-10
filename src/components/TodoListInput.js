import React from 'react';
import PropTypes from 'prop-types';


/**
 * An input component for the TodoList
 */
export default class TodoListInput extends React.Component {

    static defaultProps = {
        placeholder: 'Title...',
    }

    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
    }

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    /**
     * Reset state.value and ask the list for adding an item
     */
    confirm = () => {
        if (this.state.value.trim()) {
            this.props.onConfirm(this.state.value);
            this.setState({ value: '' });
        }
    }

    /**
     * Update state on every change in the input
     */
    onInputChange = (event) => {
        this.setState({ value: event.target.value });
    }

    /**
     * Add an item by pressing enter
     */
    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.confirm();
        }
    }

    /**
     * Render this component
     */
    render() {
        return (
            <div className='TodoListInput'>
                <input type='text' placeholder={this.props.placeholder} onKeyPress={this.onKeyPress} onChange={this.onInputChange} value={this.state.value}></input>
                <input type="button" value="Add" onClick={this.confirm} />
            </div>
        );
    }
}
