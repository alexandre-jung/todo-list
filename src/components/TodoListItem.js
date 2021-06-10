import React from 'react';
import PropTypes from 'prop-types';

export default class TodoListItem extends React.Component {

    static defaultProps = {
        content: '',
        checked: false,
    }

    static propTypes = {
        onRemove: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
        };
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked });
    }

    render() {
        return (
            <div className={`TodoListItem ${this.state.checked ? 'checked' : ''}`} onClick={this.toggle}>
                <span className="TodoListItem-check "></span>
                <span className="TodoListItem-content">{this.props.content}</span>
                <span className='TodoListItem-remove' onClick={() => { this.props.onRemove(this.props.id) }}>✗</span>
            </div>
        );
    }
}
