import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" },
  // id: 0
};

const ColorList = ({ colors, updateColors, setDirty }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const [adding, setAdding] = useState(false);

  const editColor = color => {
    setAdding(false);
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = () => {
    setEditing(false);
    setAdding(true);
  }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    const token = JSON.parse(localStorage.getItem('token'));
    axiosWithAuth(token).put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log({res})
        // close editing form
        setEditing(false);
        // update master list and propagage upwards
        const newColors = colors.map(item => (item.id === res.data.id) ? res.data : item )
        updateColors(newColors)
      })
      .catch(err => {
        console.log({err})
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    const token = JSON.parse(localStorage.getItem('token'));
    axiosWithAuth(token).delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log({res})
        setDirty(true);
      })
      .catch(err => {
        console.log({err})
      })
  };

  const saveNew = e => {
    e.preventDefault();
    // Make a put request to save the new color
    const token = JSON.parse(localStorage.getItem('token'));
    axiosWithAuth(token).post(`/api/colors/`, colorToAdd)
      .then(res => {
        console.log({res})
        // close editing form
        setAdding(false);
        // update master list and propagage upwards
        setDirty(true);
        // const newColors = colors.map(item => (item.id === res.data.id) ? res.data : item )
        // updateColors(newColors)
      })
      .catch(err => {
        console.log({err})
      })


  }


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {!adding && (
        <button onClick={() => addColor()}>Create New</button>
      )}
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {adding && (
        <form onSubmit={saveNew}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
