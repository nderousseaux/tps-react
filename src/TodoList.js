import { useState } from 'react';

let TodoList = () => {
    let [items, setItems] = useState([
        { text: 'bla', done: false },
        { text: 'bli', done: true }
    ]);

    let addItem = text => {
        setItems(current => [{ text, done: false }, ...current]);
    };
    let removeItem = item => {
        // filter
    };
    let updateItem = (item, changes) => {
        // map
    };

    let [text, setText] = useState('');
    let handleChange = e => {
        setText(e.target.value);
    };
    let handleSubmit = e => {
        e.preventDefault();
        addItem(text);
        setText('');
    };

    return <div>
        <h3>TodoList</h3>
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={handleChange} />
            <button>Add</button>
        </form>
        <ul>
            {items.map(i => {
                if (!i.done)
                    return <li>{i.text}</li>;
                else
                    return <li><strike>{i.text}</strike></li>;
            })}
        </ul>
    </div>;
};

export default TodoList;
