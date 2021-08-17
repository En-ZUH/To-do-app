import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form.js";
import List from "../List/List.js";
//import Header from "../header";
import FormContent from "../FormContent/FormContent";

import { v4 as uuid } from "uuid";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      {/* <Header incomplete={incomplete} /> */}
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
        <h3>incomplete={incomplete}</h3>
      </header>
      <FormContent handleChange={handleChange} handleSubmit={handleSubmit} />

      <List toggleComplete={toggleComplete} list={list} />
    </>
  );
};

export default ToDo;