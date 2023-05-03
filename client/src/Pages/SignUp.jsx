import React ,{useState} from 'react'
import './style.css'
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'
import {URL} from '../Utill'

const SignUp = () => {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    const url = `${URL}/signup`
    const data = JSON.stringify({
        name,email,password
    })
    const options = {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        data,
        url
    };
    axios(options)
    .then(()=>{
      navigate('/login');
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className='login-main'>
        <div className="login-container">
          <h2>User Registration</h2>
          <form onSubmit={handleSubmit} >
            <input required type="text" name="" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name' id="" />
            <input required type="email" name="" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' id="" />
            <input required type="password" name="" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' id="" />
            <button type="submit">Submit</button>
          </form>
          <p>Already have an account <Link to='/login'>Login here</Link></p>
        </div>
    </div>
  )
}

export default SignUp