import React, {  useHistory,useState } from 'react'

const Login = () => {
   const history =useHistory()
  const [detail,setDetail] = useState({
    email:"",password:""
  })

let name , value
 const handleDetail = (e) => {
  name = e.target.name
  value = e.target.value
  setDetail({...detail,[name]:value})
}; 

const handleSubmit = async(e)=>{

  e.preventDefault()
  //object destructuring
 const {email,password} = detail

 const fetchedData = await fetch('/login',{
  method :"POST",
  headers :{
    "Content-Type" :"application/json"
  },
  body : JSON.stringify({email,password})
 })
 const data = fetchedData.json()

 if(data.status === 404 || !data){
  window.alert("Either invalid password or email")
  console.log("Either invalid password or email")
 }else{
  window.alert("Logged in Successfully")
  console.log("Logged in Successfully")
  history.pushState("/getAllTask")
 }
}

  return (
    <div>
      <form>
        <ul>
         <li> <label className='label' >Email</label>
         <input className='input' name='email' onChange={handleDetail} placeholder = 'Enter Your Email' />
          </li>
         <li> <label className='label' >Password</label> </li>
         <input className='input' name='password' onChange={handleDetail} placeholder = 'Enter Your Password' />
        </ul>

        <button onClick={handleSubmit} className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login