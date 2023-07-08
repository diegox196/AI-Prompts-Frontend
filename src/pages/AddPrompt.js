import React, { useState } from 'react';

const AddPrompt = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [input, setInput] = useState('');
  const [instructions, setInstructions] = useState('');
  const [temperature, setTemperature] = useState('');
  const [categories, setCategories] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleCategoriesChange = (e) => {
    const selectedCategories = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setCategories(selectedCategories);
  };

  const handleAddPrompt = () => {
    // Lógica para agregar el prompt (acción a realizar)
  };

  const handleCancel = () => {
    // Lógica para cancelar y limpiar el formulario
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>

      <div>
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="edit">Edit</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div>
        <label htmlFor="input">Input:</label>
        <textarea id="input" value={input} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea id="instructions" value={instructions} onChange={handleInstructionsChange} />
      </div>

      <div>
        <label htmlFor="temperature">Temperature:</label>
        <input type="number" id="temperature" value={temperature} onChange={handleTemperatureChange} />
      </div>

      <div>
        <label htmlFor="categories">Categories:</label>
        <select multiple id="categories" value={categories} onChange={handleCategoriesChange}>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>

      <button type="button" onClick={handleAddPrompt}>Add Prompt</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddPrompt;