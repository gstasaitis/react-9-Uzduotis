import { useState, useEffect } from 'react';
import './App.css'
import Button from './modules/Button'
import Notes from './modules/Notes'

function App() {
  const [listData, setListData] = useState([])

  // Užkrovimas iš localstorage ir pavertimas į masyvą
  useEffect(() => {
    const savedData = localStorage.getItem("listData")
    if(savedData) setListData(savedData.split(","))
  }, [])

  // Išsaugojimas localstorage
  useEffect(() => {
    localStorage.setItem("listData", listData)
  }, [listData])

  return (
    <>
      <Button setListData={setListData} />
      <Notes 
      listData={listData}
      setListData={setListData} 
      />
    </>
  )
}

export default App
