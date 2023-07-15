import React, { useEffect, useState } from 'react';
import Tag from './Tag';

const TagsInput = ({ initValue, updateTags }) => {
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    const value = e.target.value.trim().toLowerCase();
    if (!value) {
      return;
    }

    if (tags.includes(value)) {
      e.target.value = "";
      return;
    }

    setTags([...tags, value]);
    updateTags([...tags, value]);
    e.target.value = "";
  };

  const handleDelete = (index) => {
    setTags(tags.filter((value, i) => i !== index));
  }

  useEffect(() => {
    if (initValue) {
      setTags(initValue);
    }
  }, [initValue]);

  useEffect(() => {
    if (tags.length === 0) {
      console.log(tags);
    }
  }, [tags]);

  return (
    <div className="border border-black dark:border-gray-400 p-2 rounded mt-4 flex flex-col flex-wrap gap-2 w-full">
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} handleDelete={() => handleDelete(index)} />
        ))}
      </div>
      <div className="relative z-0">
        <input onKeyDown={handleKeyDown}
          type="text"
          id="floating_standard"
          autoComplete="off"
          className="block pb-1 pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">Enter some tag</label>
      </div>
    </div>
  );
};

export default TagsInput;