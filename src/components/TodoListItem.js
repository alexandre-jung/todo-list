import React from 'react';
import PropTypes from 'prop-types';


/**
 * A TodoListItem component
 */
export default class TodoListItem extends React.Component {

    static defaultProps = {
        content: '',
        checked: false,
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        content: PropTypes.string,
        checked: PropTypes.bool,
        onRemove: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
    }

    /**
     * Ask the list container to toggle the state of the item
     */
    toggle = () => {
        this.props.onToggle(this.props.id, !this.props.checked);
    }

    /**
     * Render this component
     */
    render() {
        return (
            <div className={`TodoListItem ${this.props.checked ? 'checked' : ''}`} onClick={this.toggle}>
                <span className="TodoListItem-check "></span>
                <span className="TodoListItem-content">{this.props.content}</span>
                <span className='TodoListItem-remove' onClick={() => { this.props.onRemove(this.props.id) }}>✗</span>
            </div>
        );
    }
}
