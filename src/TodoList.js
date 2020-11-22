import { useState } from 'react';
import usePersistedState from "./persistedState"


const Item = ({item}) => {
    if (!item.done)
         return <li>{item.text}</li>;
     else
         return <li><strike>{item.text}</strike></li>;
}

const ItemsList = ({items, updateItem, removeItem}) => <ul>
    { items.map((item, idx) => (
      <li key={idx}>
          <Item item={item}  />
          <button onClick={() => removeItem(idx)}>Remove</button>
          <button onClick={() => updateItem(idx, {done: !item.done})}>Toggle</button>
      </li>
    )) }
</ul>;


const AddItemForm = ({addItem}) => {
    let [currentItem, setCurrentItem] = useState({
      text: '',
      done: false
    });
  
         const handleChange = event => {
            let newItem = {...currentItem}
            newItem[event.target.name] = event.target.value;
  
            setCurrentItem(newItem);
        }
    
      const handleSubmit = event => {
        event.preventDefault();
        addItem(currentItem);
        setCurrentItem({ // Clear input
            text: '',
            done: false
            });
        }
    
    
      return <form onSubmit={handleSubmit}>
        
        <input type='text' value={currentItem.text} name='text' placeholder='Texte' onChange={handleChange} />
        <input type='submit' value='Ajouter' />
      </form>;
    };
  


const TodoList = () => {

    const [items, setItems] = usePersistedState("todolist", []);

    const removeItem = (index) =>{
      setItems(items => items.filter((i, idx) => idx !== index)); 
    }
    
    const addItem = (item) =>{
      setItems(items => [item, ...items].sort((a, b) => a.name.localeCompare(b.name)));
    }

    const updateItem = (index, changes) => {
        //On parcourt tout les items, si l'index est identique, on ecrase les valeurs de i par les valeurs de changes
        setItems(items => items.map((i, idx) => idx !== index ? i : { ...i, ...changes}));
  
    }
  
    return <>
        <AddItemForm addItem={addItem} />
        <ItemsList items={items} updateItem={updateItem} removeItem={removeItem} />
    </>;
  }



export default TodoList;
