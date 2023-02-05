
import './App.css';
import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import  Button  from 'react-bootstrap/Button';





function App() {
  const [myData, setMyData] = useState([]);
  const [IsError, setIsError] = useState();
  const API="https://localhost:7196/api/Employees";
  const [btnname, setBtnName] = useState("Add");
  const [documentmode, setDocumentMode] = useState("add");


  const [formData, setFormData] = useState({
   
    firstName: '',
    lastName: '',
    mobile: '',
    email: ''
  })


  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const getData =async() =>{
    try{
      const resp=  await axios.get(`${API}/GetEmployee`)
    setMyData(resp.data)
    }
    catch(error){
      setIsError(error.message);
    }
    


  }

  const addPost = async (e) => {
    e.preventDefault();
    if (documentmode == "add") {
      var resp = await axios.post(`${API}/AddEmployees`, formData).then((res) => {
        console.warn("Posting data =", res)
        setMyData([...myData, res.data]);
      })
      alert("Your data has been added" );
    }
    else if (documentmode == "edit") {
      console.warn("update=", formData);
      const item = formData.id;
      console.warn(item);

      // const data =
      // {
      //   userId: item.userId,
      //   id: item.id,
      //   title: item.title,
      //   body: item.body
      // }
      // setUpdateData(...updateData, data);

      axios.put(`${API}/${item}`, formData)
        .then((response) => {
          //console.log(typeof (response.data));
          const tempData = [response.data];
          setMyData(tempData);
        });
        setBtnName("Add");
        setDocumentMode("add");
        alert("Your data has been updated" );
    }




    //console.log(resp.data)

    // //axios.post(`${API}, data `)

  }
  function updatePost(id) {
    setBtnName("Update");
    setDocumentMode("edit");
    //console.warn(id, "object =", myData[id - 1]);
    let item = myData[id];
    console.warn(item);
    setFormData(
      {
        id:item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        mobile: item.mobile,
        email: item.email
      }

    )
   
  }
  
  const Delete =(id)=>{
    //var r=confirm("Do you want to remove data of id " + id);
       axios.delete(`${API}/${id}`);
       alert("Your data has been Deleted" );


  }
  useEffect(()=>{
    getData();
  },[myData])

  
  return (
    <>
   
   <form>
        <label>firstName</label><br />
        <input type="text" name='firstName' value={formData.firstName || ""} onChange={changeHandler} /> <br /><br />
        <label>lastName</label><br />
        <input type="text" name='lastName' value={formData.lastName || ""} onChange={changeHandler} /> <br /><br />
        <label>mobile</label><br />
        <input type="text" name='mobile' value={formData.mobile || ""} onChange={changeHandler} /> <br /><br />
        <label>email</label><br />
        <input type="text" name='email' value={formData.email || ""} onChange={changeHandler} /> <br /><br />
        <button type='button' onClick={addPost}>{btnname}
        
        </button>
        
      </form>
  
    {IsError !=="" && <h2>{IsError}</h2> }
     <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Mobile</th>
          <th>Email</th>
        </tr>
      </thead>
    
       <tbody>     
       {
            myData.map((item, i)=>{

              return(<tr key={i}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.mobile}</td>
            <td>{item.email}</td>
            <td>

          <Button variant="success" onClick={() => updatePost(i)}>Edit</Button>&nbsp; &nbsp;
          <Button variant="danger" onClick={()=>Delete(item.id)} >Remove</Button>
          </td>
          </tr>)
       })
      } 
       </tbody>
     </Table>
    </>
   
  );
}

export default App;
