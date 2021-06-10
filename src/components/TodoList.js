import React from 'react';
import TodoListInput from './TodoListInput';
import TodoListItem from './TodoListItem';

export default class TodoList extends React.Component {

    static defaultProps = {
        title: 'Todo List',
    };

    constructor(props) {
        super(props);
        this.lastIndex = 0;
        this.items = [];
        this.state = { items: [] };
    }

    componentDidMount() {
        this.addItem('Buy eggs');
        this.addItem('Read a book', true);
        this.addItem('Organize office');
        this.addItem('Send a letter');
    }

    addItem = (value, checked = false) => {
        this.items.push([this.lastIndex++, value, checked])
        this.setState({ items: this.items });
    }

    removeItem = (id) => {
        let items = this.state.items;
        let index = items.findIndex(element => { return element[0] === id });
        if (index !== -1) {
            items.splice(index, 1);
            this.setState({ items });
        }
    }

    renderItems() {
        return this.state.items.map((item) => {
            let id = item[0];
            let value = item[1];
            return (
                <TodoListItem content={value}
                    onRemove={this.removeItem}
                    checked={item[2]}
                    key={id} id={id} />
            );
        });
    }

    render() {
        return (
            <div className='TodoList'>
                <div className="TodoList-header">
                    <h2>{this.props.title}</h2>
                    <TodoListInput onConfirm={this.addItem} />
                </div>
                {this.renderItems()}
            </div>
        );
    }
}
