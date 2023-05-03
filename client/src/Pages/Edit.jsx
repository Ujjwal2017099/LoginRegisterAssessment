import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../Utill'

const Edit = () => {
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('id'))
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
    useEffect(()=>{
    const data = JSON.stringify({
        token
    })
    const url = `${URL}/profile?token=${token}`
    const options = {
        method: "GET",
        headers: { 'content-type': 'application/json' },
        data,
        url
    };
    axios(options)
    .then((res)=>{
      setName(res.data.Name)
      setPassword(res.data.Password)
    }).catch((err)=>{
      navigate('/login')
    })
  },[])
  const handleUpdate = (e)=>{
    const url = `${URL}/update?token=${token}`
    const data = JSON.stringify({
        name,password
    })
    const options = {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        data,
        url
    };
    axios(options)
    .then(()=>{
      navigate('/');
    })
    .catch((err)=>{
      console.log(err);
      navigate('/login');
    })
  }
  return (
    <div className='home-main'>
      <div className="card">
        <div className="img"></div>
        <span>Edit</span>
        <p className="info">
          <input required type="text" name="" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name' id="" />
            <input required type="password" name="" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' id="" />
        </p>
        
        <button onClick={handleUpdate} >Save</button>
      </div>
    </div>
  )
}

export default Edit