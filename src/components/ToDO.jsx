import React, { useState, useEffect } from 'react';
import ToDoImage from '../components/image/todo.svg';
import '../App.css';

const ToDO = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [lightMode, setLightMode] = useState(false); // Light Mode toggle
  const [dueDate, setDueDate] = useState('');

  // Load from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('todoItems'));
    if (storedItems) setItems(storedItems);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);

  const addItems = () => {
    if (!inputData.trim()) return;

    setItems([...items, { task: inputData, date: dueDate }]);
    setInputData('');
    setDueDate('');
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((_, index) => index !== id);
    setItems(updatedItems);
  };

  const deleteAll = () => {
    setItems([]);
  };

  return (
    <div className={lightMode ? 'main-div light-mode' : 'main-div'}>
      <div className='child-div'>
        <div className='top-header'>
          <figure>
            <img src={ToDoImage} alt="todo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <button className='mode-toggle-btn' onClick={() => setLightMode(!lightMode)}>
            {lightMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        <div className='addItems'>
          <input
            type="text"
            placeholder='✍ Add item...'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-input"
          />
          <i className="fa fa-plus add-btn" title='Add Item' onClick={addItems}></i>
        </div>

        <div className="showItems">
          {items.map((elem, ind) => (
            <div className='eachItem' key={ind}>
              <div className='task-text'>
                <h3>{elem.task}</h3>
                {elem.date && <p className="due-date">📅 Due: {elem.date}</p>}
              </div>
              <i
                className="far fa-trash-alt add-btn"
                title='Delete Item'
                onClick={() => deleteItem(ind)}
              ></i>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className='showItems'>
            <button className='btn effect04' onClick={deleteAll}>
              <span>🗑️ Clear All</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDO;
