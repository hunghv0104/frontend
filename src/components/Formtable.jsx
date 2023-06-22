import React from 'react'
import "../App.css"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
axios.defaults.baseURL = 'https://backendfinal-u9mo.onrender.com/admin';

const Formtable = () =>{
  //giup bat tat add section
//setAddSection la 1 function de update addSection, useState de set mac dinh addSection la false
const[addSection, setAddSection] = useState(false)
//bat tat update section
const [editSection, setEditSection] = useState(false)

const handlePhoto = (e) => {
  setFormData((previous) => ({
    ...previous,
    image: e.target.files[0],
    
  }));
};

const handlePhotoOnChange = (e) => {
  setFormDataEdit((previous) => ({
    ...previous,
    image: e.target.files[0],
    
  }));
};

//giup lay du lieu trong form
//setFormData la built-in function trong React
const[formData, setFormData] = useState({
  name: "",
  year: "",
  age_restriction: "",
  price: "",
  category: "",
  description: "",
  image: ""
})
const[formDataEdit, setFormDataEdit] = useState({
  name: "",
  year: "",
  age_restriction: "",
  price: "",
  category: "",
  description: "",
  image: ""
})
//giup lay du lieu tu backend
const [dataList, setDataList] = useState([])

const handleOnChange = (e)=>{ //e: event triggered. Trong truong hop nay la khi minh update. khi minh gan no vao onChange, React tu hieu e la 1 event
  const {value, name} = e.target //target la cac input, value va name la value va name cua cac input
  setFormData((previous)=>{ //previous: previous state trong form
    return{
      ...previous,//neu k co previous thi data se k lay dc het ma chi lay dc cai state ngay trc do
      [name] : value //update value trong form data
    }
  })
}

const handleSubmit = async(e)=>{
  e.preventDefault()
  const formDataWithImage = new FormData(); //FormData la built-in object
  formDataWithImage.append('name', formData.name);
  formDataWithImage.append('year', formData.year);
  formDataWithImage.append('age_restriction', formData.age_restriction);
  formDataWithImage.append('price', formData.price);
  formDataWithImage.append('category', formData.category);
  formDataWithImage.append('description', formData.description);
  formDataWithImage.append('image', formData.image);
  const data = await axios.post("/create", formDataWithImage);
   //avoid refreshing when submit
  // const data = await axios.post("/create", formData) //gui formData den /create de backend xu ly
  console.log(data)
  if(data.data.success){
    setAddSection(false)
    alert(data.data.message)
    getFetchData()
  }
}

//fetch data from db, display all data
const getFetchData = async()=>{
  const data = await axios.get("/")
  console.log(data)
  if(data.data.success){
    setDataList(data.data.data)
    // alert(data.data.message)
  }
}

useEffect(()=>{
  getFetchData()
}, [])

//delete
const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)
  if (data.data.success)
  {
    getFetchData()
    alert(data.data.message)
  }
}

//update
const handleUpdate = async(e)=>{
  e.preventDefault()
  const formDataEditWithImage = new FormData(); //FormData la built-in object
  formDataEditWithImage.append('_id', formDataEdit._id);
  formDataEditWithImage.append('name', formDataEdit.name);
  formDataEditWithImage.append('year', formDataEdit.year);
  formDataEditWithImage.append('age_restriction', formDataEdit.age_restriction);
  formDataEditWithImage.append('price', formDataEdit.price);
  formDataEditWithImage.append('category', formDataEdit.category);
  formDataEditWithImage.append('description', formDataEdit.description);
  formDataEditWithImage.append('image', formDataEdit.image);
  // const data = await axios.post("/create", formDataWithImage);
  const data = await axios.put("/update", formDataEditWithImage)
  if (data.data.success)
  {
    getFetchData()
    alert(data.data.message)
    setEditSection(false)
  }
}

const handleEditOnChange = async(e)=>{
  const {value, name} = e.target
  setFormDataEdit((previous)=>{
    return{
      ...previous,
      [name] : value
    }
  })
}

const handleEdit = (el) =>{
  setFormDataEdit(el)
  setEditSection(true)
}

const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

//con thieu logout o day

return(
<div className='container'>
        <button className='btn btn-success' onClick={()=>setAddSection(true)}>Add</button>
      {
        addSection && ( //neu addSection la true thi moi hien thi form
        <div className='addContainer'>
          <div className='addContainer'>
  <form onSubmit={handleSubmit} className="container">
    <button className='close-btn' onClick={()=>setAddSection(false)}>X</button>
    
    <div className="form-group">
      <label htmlFor='name'>Name:</label>
      <input type="text" className="form-control" id='name' name='name' onChange={handleOnChange} value={formData.name}/>
    </div>

    <div className="form-group">
      <label htmlFor='year'>Year:</label>
      <input type="number" className="form-control" id='year' name='year' min='1900' max='2023' onChange={handleOnChange} value={formData.year}/>
    </div>

    <div className="form-group">
      <label htmlFor='age_restriction'>Age restriction:</label>
      <input type="number" className="form-control" id='age_restriction' name='age_restriction' min='0' max='120' onChange={handleOnChange}  value={formData.age_restriction}/>
    </div>

    <div className="form-group">
      <label htmlFor='price'>Price:</label>
      <input type="number" className="form-control" id='price' name='price' min='0' onChange={handleOnChange} value={formData.price}/>
    </div>

    <div className="form-group">
      <label htmlFor='category'>Choose a category:</label>
      <select className="form-control" name="category" id="category" onChange={handleOnChange}>
        <option value="">Select an option</option>
        <option value="puzzle">Puzzle</option>
        <option value="stuffed animal">Stuffed Animal</option>
        <option value="technology">Technology</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor='description'>Description:</label>
      <input type="text" className="form-control" id='description' name='description' onChange={handleOnChange} value={formData.description}/>
    </div>

    <div className="form-group">
      <label htmlFor='image'>Image:</label>
      <input type="file" className="form-control-file" name="image" onChange={handlePhoto} />
    </div>

    <button className='btn btn-primary'>Submit</button>
  </form>
</div>
        </div>
        )
      }
      {
        editSection &&(
          <div className='addContainer'>
          <form onSubmit={handleUpdate} className="container">
  <button className='close-btn' onClick={() => setEditSection(false)}>X</button>

  <div className="form-group">
    <label htmlFor='name'>Name:</label>
    <input type="text" className="form-control" id='name' name='name' onChange={handleEditOnChange} value={formDataEdit.name} />
  </div>

  <div className="form-group">
    <label htmlFor='year'>Year:</label>
    <input type="number" className="form-control" id='year' name='year' min='1900' max='2023' onChange={handleEditOnChange} value={formDataEdit.year} />
  </div>

  <div className="form-group">
    <label htmlFor='age_restriction'>Age restriction:</label>
    <input type="number" className="form-control" id='age_restriction' name='age_restriction' min='0' max='120' onChange={handleEditOnChange} value={formDataEdit.age_restriction} />
  </div>

  <div className="form-group">
    <label htmlFor='price'>Price:</label>
    <input type="number" className="form-control" id='price' name='price' min='0' onChange={handleEditOnChange} value={formDataEdit.price} />
  </div>

  <div className="form-group">
    <label htmlFor='category'>Choose a category:</label>
    <select className="form-control" name="category" id="category" onChange={handleEditOnChange}>
      <option value="">Select an option</option>
      <option value="puzzle">Puzzle</option>
      <option value="stuffed animal">Stuffed Animal</option>
      <option value="technology">Technology</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor='description'>Description:</label>
    <input type="text" className="form-control" id='description' name='description' onChange={handleEditOnChange} value={formDataEdit.description} />
  </div>

  <div className="form-group">
    <label htmlFor='image'>Image:</label>
    <input type="file" className="form-control-file" name="image" onChange={handlePhotoOnChange} />
  </div>

  <button className='btn btn-primary'>Submit</button>
</form>

        </div>
        )
      }

      <div className='tableContainer'>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Year</th>
        <th>Age Restriction</th>
        <th>Price</th>
        <th>Category</th>
        <th>Description</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {dataList.map((el) => {
        return (
          <tr key={el._id}>
            <td>{el.name}</td>
            <td>{el.year}</td>
            <td>{el.age_restriction}</td>
            <td>{el.price}</td>
            <td>{el.category}</td>
            <td>{el.description}</td>
            <td>
              <img src={`/images/${el.image}`} alt="" width='100' height='100' />
            </td>
            <td>
              <button className='btn btn-warning' onClick={() => handleEdit(el)}>Edit</button>
              <button className='btn btn-danger' onClick={() => handleDelete(el._id)}>Delete</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
<button onClick={logOut} className="btn btn-primary">
  Log Out
</button>
</div>
 )
}

export default Formtable