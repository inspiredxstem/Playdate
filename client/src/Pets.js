import Navbar from "./Navbar";
import Footer from "./Footer";
import PetCards from "./PetCards";
import {useEffect, useState} from 'react';
import axios from 'axios';

function Pets() {
  const [users, setUsers] = useState([])

  console.log(localStorage.getItem("jwt"))
  useEffect(()=>{
    axios
    .get("http://localhost:3000/users", { headers: { Authorization: "Bearer " + localStorage.getItem('jwt')  } } )
    .then(r => {
      setUsers(r.data)
    })
  },[])

  const petsDisplay = users.map((user) => (
    <PetCards key={user.id} user={user} />
  ));

  console.log(petsDisplay);

  return (

    <div className="pet-feed">
      {petsDisplay}
    </div>
  );
}

export default Pets;
