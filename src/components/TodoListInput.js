import React from 'react';
import PropTypes from 'prop-types';

export default class TodoListInput extends React.Component {

    static defaultProps = {
        placeholder: 'Title...',
    }

    static propTypes = {
        onConfirm: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    confirm = () => {
        this.props.onConfirm(this.state.value);
        this.setState({ value: '' });
    }

    onInputChange = (event) => {
        this.setState({ value: event.target.value });
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({ value: event.target.value }, () => {
                this.confirm();
            });
        }
    }

    render() {
        return (
            <div className='TodoListInput'>
                <input type='text' placeholder={this.props.placeholder} onKeyPress={this.onKeyPress} onChange={this.onInputChange} value={this.state.value}></input>
                <input type="button" value="Add" onClick={this.confirm} />
            </div>
        );
    }
}
