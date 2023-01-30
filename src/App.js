import React, { useEffect, useState } from 'react'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

const App = () => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);

  const [newItems, setNewItems] = useState('');
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items])


  const addItems = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItems = { id, checked: false, item };
    const listItems = [...items, myNewItems];
    setItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => (
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
    setItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('shoppingList', JSON.stringify(listItems));
    setItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItems) return;
    addItems(newItems);
    setNewItems('');
  }
  return (
    <div className='App'>
      <Header title="To-Do-List" />
      <AddItem
        newItems={newItems}
        setNewItems={setNewItems}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />
      <Content
        items={items.filter((item) => ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  )
}

export default App
