import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Todos = () => {
  // ------------All UseState-----------------

  // first useState define and store input data and render to the console
  // setInitial (props) get input value through e.target.value chahrachter by chahchrter so that transfer this value to initial(props)
  const [initial, setInitial] = useState();

  // second useState define and contain data in the form of array and render on the screen
  // setData contain initial(current) state and transfer to the data(props)
  const [data, setData] = useState([]);

  //Third and fourth useState for editing input or data vlue
  const [updateIndex, setupdateIndex] = useState("");

  // ***------------All Functions--------------***

  // function for access input data to the console
  const getInput = (e) => {
    console.log(e.target.value); //--> access input data to the console chahrachter by charachter

    setInitial(e.target.value); // -> go to current state
  };

  // function for access full input value at conosle
  const getData = () => {
    console.log(initial);

    // Now we have to store previous input(data) and add new input in the prop
    // (...)-> This is called spread operator which is help to store previous input(data)

    let store = [...data, { text: initial, completed: false }]; //-> This store array contains the previous data and initial data (new input) too

    setData(store); //-->  this props contain the store array or input value

    // Now we have to clear the input so set the setInitial to empty

    setInitial("");
  };

  const deleteTask = (index) => {
    console.log(index);
    let filterData = data.filter((_curElem, id) => {
      return id != index;
    });

    setData(filterData);
  };

  const handleEdit = (index) => {
    const filterData = data.filter((_curElem, id) => {
      return id == index;
    });
    setInitial(filterData[0].text);

    setupdateIndex(index);
  };

  const handleUpdate = () => {
    const updatedData = [...data];
    updatedData[updateIndex].text = initial;
    setData(updatedData);
    setInitial("");
  };

  // for checkbox
  const toggleCheckbox = (index) => {
    const updatedData = [...data];
    updatedData[index].completed = !updatedData[index].completed;
    setData(updatedData);
  };

  return (
    <>
      <div>
        <div className="container">
          <h1 className="header">My Todo</h1>
          <div className="inputTask">
            <input
              type="text"
              placeholder="Enter Your Task"
              onChange={getInput}
              value={initial}
            />
            <button onClick={getData}>Add</button>{" "}
            <button onClick={handleUpdate}>Update</button>
          </div>

          {/* {data}---> it render the data */}

          {data.map((curVal, index) => {
            return (
              <div className="taskData" key={index}>
                <div
                  className="text"
                  style={{
                    textDecoration: curVal.completed ? "line-through" : "none",
                    fontWeight: curVal.completed ? "bold" : "normal", // Add bold font weight for completed tasks
                  }}
                >
                  {curVal.text}{" "}
                </div>
                <div id="icon">
                  <input
                    type="checkbox"
                    checked={curVal.completed}
                    onChange={() => toggleCheckbox(index)}
                  />
                  <FaTrash className="Icon" onClick={() => deleteTask(index)} />
                  <FaEdit className="Icon" onClick={() => handleEdit(index)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todos;

// Notes:----
/* 
value attriute contain inital (current) props to clear the input
*/
