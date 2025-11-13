import React, {useState} from "react"
import './App.css'

function App() {
  const [addLists, setAddLists] = useState([]);
  const [addTodos, setAddTodos] = useState("");
  const [displayFlex, setDisplayFlex] = useState("none");
  const [displayFlexEdit, setDisplayFlexEdit] = useState("none");
  const [error1, setError1] = useState("none");
  const [error2, setError2] = useState("none");
  const [error3, setError3] = useState("none");
  const [error4, setError4] = useState("none");
  const addTodoList = () => {
    const input = document.getElementById('input');
    const finalInput = input.value.trim();
    if(finalInput == "" ){
      setTimeout(() => {
        setError1("block");
        setTimeout(()=>{
          setError1("none");
        },2000)
      },0)
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
        document.getElementById('input').value = "";
        setTimeout(() => {
          setError4("block");
          setTimeout(()=>{
            setError4("none");
          },2000)
        },0);
      }
    }
  }
  const inputAdd = (event) => {
    setAddTodos(event.target.value);
  }
  const delTodoList = (index) => {
    setAddLists(addLists.filter((_, i) => i !== index));
    setDisplayFlex("none");
    setTimeout(() => {
        setError3("block");
        setTimeout(()=>{
          setError3("none");
        },2000)
      },0);
  }
  const showDisplayDel = (index) => {
    setDisplayFlex("flex");
  }
  const hideDisplayDel = (index) => {
    setDisplayFlex("none");
  }
  const edit = (event) => {
    setAddLists(event.target.value);
  }
  const showDisplayEdit = (index) => {
    setDisplayFlexEdit("flex");
  }
  const hideDisplayEdit = () => {
    setDisplayFlexEdit("none");
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
  

  return (
    <>
        <div className="titleContainer">
          <h1>My Todo List</h1>
        </div>
        <div className="AppContainer">
          <div className="TodoAddContainer">
            <input id="input" onChange={inputAdd} type="text" />
            <button className="addBtn" onClick={addTodoList}>Add</button>
          </div>
          <div className="ulContainer">
            <ul className="listContainer">
              {addLists.map((addList, index) => 
              <li className="TaskList" key={index}>
                <p>Task {index+1}: {addList}</p>
                <div className="BtnContainer">
                  <button className="del" key={`${index}del`} onClick={() => showDisplayDel(index)}><i className="fa-solid fa-trash"></i></button>
                  <button className="edit" key={`${index}edit`}  onClick={() => showDisplayEdit(index)}><i className="fa-solid fa-pen-to-square"></i></button>
                  <button className="up" key={`${index}up`} onClick={() => moveUp(index)}><i className="fa-solid fa-arrow-up"></i></button>
                  <button className="down" key={`${index}down`}  onClick={() => edit(index)}><i className="fa-solid fa-arrow-down"></i></button>
                </div>
              </li>)}
            </ul>
          </div>
        </div>
        {addLists.map((_, index) =>
        <div key={`${index}dl`} style={{display: displayFlex}} className="deleteList">
          <div  className="deleteContainer">
            <div className="delQuestionContainer">
              <p className="delQuestion">Are you sure you want to delete this task?</p>
            </div>
            <div className="containerBtn">
              <button onClick={hideDisplayDel} >No</button>
               <button key={`${index}yes`} onClick={() => delTodoList(index)}>Yes</button>
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
       {addLists.map((addList, index) =>
        <div key={`${index}dle`} style={{display: displayFlexEdit}} className="deleteList">
          <div  className="deleteContainer">
            <div className="delQuestionContainer">
              <input key={`${index}editing`} type="text" value={addList} onChange={inputAdd} />
            </div>
            <div className="containerBtn">
              <button onClick={() => hideDisplayEdit(index)} >Cancel</button>
               <button key={`${index}save`} onClick={() => edit(index)}>Save</button>
            </div>
          </div>
       </div>)}
    </>
  )
}

export default App
