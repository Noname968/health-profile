import React, { useContext } from 'react'
import './Profileshow.css'
import profilecontext from '../context/profiles/Profilecontext'
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';

function Profileshow({ singleprofile, updateprofile }) {
  const { name, age, dob, phoneno, address, gender } = singleprofile
  const context = useContext(profilecontext);
  const { deleteprofile } = context;

  return (
    <>
      <div className="conitem">
        <p className='name'><strong>Name : </strong>{name}</p>
        <p className='name'><strong>DOB : </strong>{dob}</p>
        <p className='name'><strong>Age : </strong>{age}</p>
        <p className='name'><strong>Gender : </strong>{gender}</p>
        <p className='name'><strong>Mobile : </strong>{phoneno}</p>
        <div className="address">
          <p className='name ad'><strong>Address : </strong></p>
          <p className="addr">{address}</p>
        </div>
        <div className="icons">
          <i className="fa-solid fa-pen-to-square sq" onClick={() => updateprofile(singleprofile)}></i>
          <i className="fa-regular fa-trash-can ca" onClick={() => {
            deleteprofile(singleprofile._id)
            // toast.success("Profile Deleted Successfully", { autoClose: 5000, theme: "colored" });
          }}></i>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  )
}

export default Profileshow
