import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Profilecontext from './Profilecontext';

const Profilestate = (props) => {
  const profileinitial = []
  const [profile, setprofile] = useState(profileinitial);
  const [loggedIn, setLoggedIn] = useState(undefined);
  // const host = "http://localhost:5000"
  const host = "https://health-profile-mern.onrender.com";

  // logged in status
  const getloggedin = async () => {
    const response = await axios.get(`${host}/api/auth/loggedIn`, { withCredentials: true });
    setLoggedIn(response.data);
  }
  useEffect(() => {
    getloggedin();
  }, [loggedIn])

  // get all profiles 
  const getprofiles = async () => {
    const response = await axios.get(`${host}/api/profile/fetchallprofiles`, {
      withCredentials: true,
    });
    // console.log(response.data);
    setprofile(response.data);
  }

  // add a profile
  const addprofile = async (name, age, dob, phone, address, gender) => {
    const response = await axios.post(`${host}/api/profile/createprofile`, {
      "name": name,
      "age": age,
      "dob": dob,
      "phoneno": phone,
      "address": address,
      "gender": gender
    }, { withCredentials: true }).catch(err => console.log(err));
    const data = await response.data;
    // console.log(data);
    const profileinfo = data;
    setprofile(profile.concat(profileinfo))
  }

  // delete a profile
  const deleteprofile = async (id) => {
    const response = await axios.delete(`${host}/api/profile/deleteprofile/${id}`, {
      withCredentials: true,
    });
    const data = await response.data;
    // console.log(data);
    const newprofiles = profile.filter(profile => { return profile._id !== id });
    setprofile(newprofiles);
  }

  // update a profile
  const editprofile = async (id, name, age, dob, phoneno, gender, address) => {
    const response = await axios.put(`${host}/api/profile/updateprofile/${id}`, {
      "name": name,
      "age": age,
      "dob": dob,
      "phoneno": phoneno,
      "address": address,
      "gender": gender
    }, {
      withCredentials: true,
    });
    const data = await response.data;
    console.log(data);

    let newprofile = JSON.parse(JSON.stringify(profile));

    for (let index = 0; index < newprofile.length; index++) {
      const element = newprofile[index];
      if (element._id === id) {
        newprofile[index].name = name;
        newprofile[index].age = age;
        newprofile[index].dob = dob;
        newprofile[index].phoneno = phoneno;
        newprofile[index].address = address;
        newprofile[index].gender = gender;
        break;
      }
    }
    setprofile(newprofile);
  }

  return (
    <Profilecontext.Provider value={{ profile, setprofile, addprofile, editprofile, deleteprofile, getprofiles, getloggedin, loggedIn }}>
      {props.children}
    </Profilecontext.Provider>
  )
}

export default Profilestate;
