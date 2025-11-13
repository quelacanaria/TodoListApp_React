import React, {useState} from "react"
import './App.css'

function App() {
  const [addLists, setAddLists] = useState([]);
  const [addTodos, setAddTodos] = useState("");
  const [error1, setError1] = useState("none");
  const [error2, setError2] = useState("none");
  const [error3, setError3] = useState("none");
  const [error4, setError4] = useState("none");
  const [error5, setError5] = useState("none");
  const [editValue, setEditValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const addTodoList = () => {
    const finalInput = addTodos.trim();
    if(finalInput == "" ){
      setTimeout(() => {
        setError1("block");
        setTimeout(()=>{
          setError1("none");
        },2000)
      },0);
    }else{
      if(addLists.some(addList => addList.toLowerCase() === finalInput.toLowerCase())){
        setTimeout(() => {
          setError2("block");
          setTimeout(()=>{
            setError2("none");
          },2000)
        },0);
      }else{
        setAddLists(a => [...a, addTodos]);
        setAddTodos("");
        setTimeout(() => {
          setError4("block");
          setTimeout(()=>{
            setError4("none");
          },2000)
        },0);
      }
    }
  }
  // const inputAdd = (event) => {
  //   setAddTodos(event.target.value);
  // }
  const delTodoList = (index) => {
    setAddLists(addLists.filter((_, i) => i !== index));
    setDeleteIndex(null);
    setTimeout(() => {
        setError3("block");
        setTimeout(()=>{
          setError3("none");
        },2000)
      },0);
  }
  
  const edit = (event) => {
    setAddLists(event.target.value);
  }
  const showDisplayEdit = (index) => {
    setEditIndex(index);
    setEditValue(addLists[index]);
  }
  
  const moveUp = (index) => {
    if(index > 0){
      const upBtn = [...addLists];
      [upBtn[index], upBtn[index-1]]=
      [upBtn[index-1], upBtn[index]];
      setAddLists(upBtn);
    }
  }
  const moveDown = (index) => {
    if(index+1 < addLists.length){
      const downBtn = [...addLists];
      [downBtn[index+1], downBtn[index]]=
      [downBtn[index], downBtn[index+1]];
      setAddLists(downBtn);
    }
  }
  const editing = (index) =>{
    setEditIndex(index)
    setEditValue(addLists[index]);
  }
  const saveEdit = () => {
    const inputEdit = editValue.trim();
    if(inputEdit == ""){
      setTimeout(() => {
        setError1("block");
        setTimeout(() => {
          setError1("none")
        }, 2000);
      },0);
    }else{
      if(addLists.some(al => al.toLowerCase() === inputEdit.toLowerCase())){
       setTimeout(() => {
          setError2("block");
          setTimeout(()=>{
            setError2("none");
          },2000)
        },0);
    }else{
      const updated = [...addLists];
      updated[editIndex] = inputEdit;
      setAddLists(updated);
      setEditIndex(null);
      setTimeout(() => {
        setError5("block");
        setTimeout(() => {
          setError5("none");
        }, 2000);
      }, 0);   
    }
    }
  }

  return (
    <>
        <div className="titleContainer">
          <p>My Todo List</p>
        </div>
        <div className="AppContainer">
          <div className="TodoAddContainer">
            <input value={addTodos} maxLength={40} onChange={(event) => setAddTodos(event.target.value)} type="text" />
            <button className="addBtn" onClick={addTodoList}>Add</button>
          </div>
          <div className="ulContainer">
            <ul className="listContainer">
              {addLists.map((addList, index) => 
              <li className="TaskList" key={index}>
                <p>Task {index+1}: {addList}</p>
                <div className="BtnContainer">
                  <button className="del" key={`${index}del`} onClick={() => setDeleteIndex(index)}><i className="fa-solid fa-trash"></i></button>
                  <button className="edit" key={`${index}edit`}  onClick={() => showDisplayEdit(index)}><i className="fa-solid fa-pen-to-square"></i></button>
                  <button className="up" key={`${index}up`} onClick={() => moveUp(index)}><i className="fa-solid fa-arrow-up"></i></button>
                  <button className="down" key={`${index}down`}  onClick={() => moveDown(index)}><i className="fa-solid fa-arrow-down"></i></button>
                </div>
              </li>)}
            </ul>
          </div>
        </div>
        {deleteIndex !== null && (
        <div className="deleteList">
          <div  className="deleteContainer">
            <div className="delQuestionContainer">
              <p className="delQuestion">Are you sure you want to delete this task?</p>
            </div>
            <div className="containerBtn">
              <button onClick={() => setDeleteIndex(null)} >No</button>
               <button onClick={() => delTodoList(deleteIndex)}>Yes</button>
            </div>
          </div>
       </div>)}
       {editIndex !==null && (
        <div className="deleteList">
          <div  className="deleteContainer">
            <div className="delQuestionContainer">
              <input className="input1" type="text" value={editValue} onChange={(event) => setEditValue(event.target.value)} />
            </div>
            <div className="containerBtn">  
              <button onClick={() => setEditIndex(null)} >Cancel</button>
               <button onClick={saveEdit}>Save</button>
            </div>
          </div>
       </div>)}   
       <div className="Error1" style={{display: error1}}>
          <div className="Error1Container">
            <p>"Please Enter a word!!"</p>
          </div>
       </div>
       <div className="Error1" style={{display: error2}}>
          <div className="Error1Container">
            <p>"That Task is already added!!"</p>
          </div>
       </div>
       <div className="Error1" style={{display: error3}}>
          <div className="Error1Container">
            <p>"Successfully deleted!"</p>
          </div>
       </div>
       <div className="Error1" style={{display: error4}}>
          <div className="Error1Container">
            <p>"Successfully added!"</p>
          </div>
       </div>
       <div className="Error1" style={{display: error5}}>
          <div className="Error1Container">
            <p>"Successfully edited!"</p>
          </div>
       </div>
       
    </>
  )
}

export default App
