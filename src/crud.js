import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Fragment } from "react";


 const Crud = () => {
const [data, setData]=useState([]); 
 const empData =[
        {
        id:1,
        name:"Sushma",
        age: 29,
        isActive : 1
        },
        {
        id:2,
        name:"Karuna",
        age: 29,
        isActive : 1
        },
        {
            id:3,
            name:"Pragya",
            age: 29,
            isActive : 1
         },
         {
            id:6,
            name:"Sweekriti",
            age: 29,
            isActive : 1
            }
    ]   
 

useEffect(()=>{
setData(empData);
}, []);

 return(
      // <Fragment>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>SN</th>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>isActive</th>
          <th>Action</th>
        </tr>
      </thead>
    
       <tbody>     
         { 
            //  data && data.length >0 ?
             data.map((item, index)=>{
                 return(
                     <tr key={index}>
                         <td>{index+1}</td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.age}</td>
                     <td>{item.isActive}</td>
                     <td colSpan={2}>
                        <button className='btn btn-primary'>Edit</button> &nbsp;
                        <button className='btn btn-danger'>Delete</button>

                     </td>
                      </tr>     
                 )
             })//:
            //  "loading.."
             
         }           
       </tbody>
     </Table>
       // </Fragment>      
  )
    }
export default Crud