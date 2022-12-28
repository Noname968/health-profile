import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import profilecontext from '../context/profiles/Profilecontext'
import './Addprofile.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Addprofile() {
    const [state, setstate] = useState({ name: "", age: "", dob: "", phone: "", address: "", gender: "" });
    const context = useContext(profilecontext)
    const { addprofile } = context;
    console.log(state)

    const handleclick = (e) => {
        try {
            e.preventDefault()
            addprofile(state.name, state.age, state.dob, state.phone, state.address, state.gender);
            setstate({ name: "", age: "", dob: "", phone: "", address: "", gender: "" });
            toast.success("Profile Created Successfully", { autoClose: 5000, theme: "colored" });
        } catch (error) {
            toast.error(error, { theme: "colored", });
        }

    }

    const onchange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
    }

    const disable=()=>{
        if(state.name === "" || state.age === "" || state.dob === "" || state.address === "" || state.phone ==="" || state.gender === ""){
            return true;
        }
    }

    useEffect(()=>{
        disable();
    },[state])

    return (
        <>
            <Navbar />
            <div className="cont">
                <form>
                    <div className="basicdata">
                        <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input type="text" id="name" className="form-control" name='name' onChange={onchange} value={state.name} />
                        </div>
                        <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="age">Age</label>
                            <input type="number" id="age" name='age' className="form-control " onChange={onchange} value={state.age} />
                        </div>
                        <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="dob">Dob</label>
                            <input type="date" id="dob" name='dob' className="form-control " onChange={onchange} value={state.dob} />
                        </div>
                        <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name='phone' className="form-control " onChange={onchange} value={state.phone} />
                        </div>
                        <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="address">Address</label>
                            <textarea type="text" id="address" name='address' className="form-control " onChange={onchange} value={state.address} />
                        </div>
                        <div className="form-outline mb-2 w-25">
                            <label> Gender</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Male" value="Male" onChange={onchange} />
                                <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Female" value="Female" onChange={onchange} />
                                <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="but">
                        <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: "2rem", paddingRight: "2rem", borderRadius: "15px" }} onClick={handleclick} disabled={disable()}>Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Addprofile
