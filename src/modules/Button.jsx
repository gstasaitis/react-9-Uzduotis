
const Button = ({ setListData, listData }) => {
  const handleClick = () => {

    const newNote = {
      id: Math.random(), 
      text: "New note...",
    }

    setListData((prevListData) => [...prevListData, newNote]);
  }

  return (
    <div className="top">
      <button onClick={handleClick}>+ Add Note</button>
    </div>
  )
}

export default Button;
