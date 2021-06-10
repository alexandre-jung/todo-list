import React from 'react';
import PropTypes from 'prop-types';
import TodoListInput from './TodoListInput';
import TodoListItem from './TodoListItem';


/**
 * A TodoList component
 */
export default class TodoList extends React.Component {

    static defaultProps = {
        title: 'Todo List',
    };

    static propTypes = {
        title: PropTypes.string,
    };

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.lastIndex = 0;
        this.items = [];
        this.state = { items: [] };
    }

    /**
     * Add some default items to the list
     */
    componentDidMount() {
        this.loadOrFillWithExample();
    }

    /**
     * Load items from localstorage
     * If loading fails, fill with example items
     */
    loadOrFillWithExample() {
        let loadingSuccess = this.load();
        if (!loadingSuccess) {
            this.exampleFill();
        }
    }

    /**
     * Add some example items to the list
     */
    exampleFill() {
        this.addItem('Buy eggs');
        this.addItem('Read a book', true);
        this.addItem('Organize office');
        this.addItem('Send a letter');
    }

    /**
     * Find the index of an item from its ID
     */
    findItemIndexById(id) {
        let index = this.items.findIndex(element => { return element[0] === id });
        return index !== -1 ? index : null;
    }

    /**
     * Add an item to the list
     */
    addItem = (value, checked = false) => {
        this.items.push([this.lastIndex++, value, checked])
        this.setState({ items: this.items });
    }

    /**
     * Remove an item by its ID
     */
    removeItem = (id) => {
        let index = this.findItemIndexById(id);
        if (index !== null) {
            this.items.splice(index, 1);
            this.setState({ items: this.items });
        }
    }

    /**
     * Remove all items from the list
     */
    clearList = () => {
        this.items = [];
        this.setState({ items: this.items });
    }

    /**
     * Clear the localstorage data for the list
     */
    clearStorage = () => {
        localStorage.removeItem('data');
    }

    /**
     * Save the list to localstorage
     */
    save = () => {
        localStorage.setItem('data', JSON.stringify(this.items));
    }

    /**
     * Load the list from localstorage
     */
    load = () => {
        let data = localStorage.getItem('data');
        if (data !== null) {
            let items = JSON.parse(data);
            for (let item of items) {
                this.addItem(item[1], item[2]);
            }
            // this.setState({ items: this.items });
            return true;
        }
        return false;
    }

    /**
     * Update the state [checked/unchecked] of an item
     */
    onItemToggle = (id, newCheckedState) => {
        let index = this.findItemIndexById(id);
        if (index !== null) {
            this.items[index][2] = newCheckedState;
            this.setState({ items: this.items });
        }
    }

    /**
     * Restore the list to its initial state
     */
    reset = () => {
        this.clearList();
        this.clearStorage();
        this.loadOrFillWithExample();
    }

    /**
     * Save to localstorage after every component update
     */
    componentDidUpdate() {
        this.save();
    }

    /**
     * Render the items
     */
    renderItems() {
        return this.state.items.map((item) => {
            let id = item[0];
            let value = item[1];
            let checked = item[2];
            return (
                <TodoListItem content={value}
                    onRemove={this.removeItem}
                    checked={checked}
                    key={id}
                    id={id}
                    onToggle={this.onItemToggle}
                />
            );
        });
    }

    /**
     * Render this component
     */
    render() {
        return (
            <div className='TodoList'>
                <div className="TodoList-header">
                    <h2>{this.props.title}</h2>
                    <div className="ListOptions" hidden>
                        <input type="button" value="Clear" onClick={this.clearList} />
                        <input type="button" value="Reset" onClick={this.reset} />
                        <input type="button" value="Save" onClick={this.save} />
                        <input type="button" value="Load" onClick={this.load} />
                    </div>
                    <TodoListInput onConfirm={this.addItem} />
                </div>
                {this.renderItems()}
            </div>
        );
    }
}
