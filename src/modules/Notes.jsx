// Notes.jsx
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Notes = ({ listData, setListData }) => {
  const [editedText, setEditedText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const textareaRef = useRef();

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedText(listData[index].text);
  };

  const handleDelete = (index) => {
    const newListData = [...listData];
    newListData.splice(index, 1);
    setListData(newListData);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      const newListData = [...listData];
      newListData[index].text = editedText;
      setListData(newListData);
      setEditIndex(null);
    }
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  useEffect(() => {
    if (editIndex !== null && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editIndex]);

  return (
    <div className="list">
      {listData.map((note, index) => (
        <div className="item" key={index}>
          <div className="header">
            <button className="controls" onClick={() => handleEdit(index)}>
              <FaEdit />
            </button>
            <button className="controls delete" onClick={() => handleDelete(index)}>
              <FaRegTrashAlt />
            </button>
          </div>
          <div className="content">
            <p>
              {editIndex === index ? (
                <textarea
                  ref={textareaRef}
                  onBlur={() => handleKeyDown({ key: "Enter" }, index)}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  value={editedText}
                />
              ) : (
                note.text
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notes;
