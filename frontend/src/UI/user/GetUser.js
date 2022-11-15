import React ,{useState , useEffect} from "react";
import axios from "axios"

const GetAllTask=() => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios.get("https://localhost:3000/getAllTask").then((res) => {
        setUsers(res.data);
      });
    }, []);
  
    if (!users) return null;
  
    return (
      <div>
        <h1>{users.firstName + users.lastName}</h1>
        <p>{users.email}</p>
      </div>
    );
  }

  export default GetAllTask