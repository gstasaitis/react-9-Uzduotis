import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"

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



  const divAnimation = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="list">
      {listData.map((note, index) => (
        <motion.div 
        className="item" 
        key={index}
        variants={divAnimation} 
        initial="hidden" 
        animate="visible">
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
        </motion.div>
      ))}
    </div>
  );
};

export default Notes;
