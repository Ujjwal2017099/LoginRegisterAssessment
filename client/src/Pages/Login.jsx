import React ,{useState} from 'react'
import './style.css'
import { Link ,useNavigate} from 'react-router-dom';
import { URL } from '../Utill';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState(false);
  const handleSubmit = (e)=>{
    e.preventDefault();
    e.preventDefault();
        const url = `${URL}/login?email=${email}&password=${password}`
        
        const options = {
            method: "GET",
            headers: { 'content-type': 'application/json' },
            url
        };
         axios(options)
        .then((res)=>{
            const token =res.data;
            if(token && token.length){
                localStorage.setItem('id',JSON.stringify(token));
                navigate(`/`)
            }else{
                setErr(true)
            }
        }).catch((err)=>{
          setErr(true)
        })
  }
  return (
    <div className='login-main'>
        <div className="login-container">
          <h2>User Login</h2>

          <form onSubmit={handleSubmit} >
          {
            err && 
            <div className='err-msg'>
              <p>Please Enter Correct Credentials</p>
            </div>
          }
            
            <input required type="email" name="" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' id="" />
            <input required type="password" name="" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' id="" />
            <button type="submit">Submit</button>
          </form>
          <p>Don't have an account <Link to='/signup'>Signup here</Link></p>
        </div>
    </div>
  )
}

export default Login