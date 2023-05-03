import React ,{useState , useEffect} from 'react'
import './style.css'
import { URL } from '../Utill'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('id'))
  const [name,setName] = useState("Name")
  const [email,setEmail] = useState("Email")
  const [password,setPassword] = useState("Password")

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
      // console.log(res.data);
      setName(res.data.Name)
      setEmail(res.data.Email)
      setPassword(res.data.Password)
    }).catch((err)=>{
      navigate('/login')
    })
  },[])


  const handleLogout = (e) =>{
    localStorage.setItem('id',"");
    navigate('/login');
  }
  return (
    <div className='home-main'>
      <div className="card">
        <div className="img"></div>
        <span>My Profile</span>
        <p className="info">
          <p>Name : {name}</p>
          <p>Email : {email}</p>
          <p>Password : {password}</p>
        </p>
        
        <button onClick={(e)=>{navigate('/editprofile')}} >Edit</button>
        <button onClick={handleLogout} >Logout</button>
      </div>
    </div>
  )
}

export default Home