import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "./builderSlice";

const BuilderComponent = () => {
  const [text, setText] = useState("");
  const items = useSelector((s) => s.builder.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Redux Builder</h2>
      <input value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={()=>{dispatch(addItem(text)); setText("");}}>
        Add
      </button>

      <ul>
        {items.map((i)=>(
          <li key={i.id}>
            {i.text}
            <button onClick={()=>dispatch(deleteItem(i.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuilderComponent;
