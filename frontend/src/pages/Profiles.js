import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import profilecontext from '../context/profiles/Profilecontext';
import Profileshow from './Profileshow';
import './Profileshow.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Profiles() {
    const [state, setstate] = useState({ id: "", ename: "", eage: '', edob: "", ephone: "", eaddress: "", egender: "" });
    const context = useContext(profilecontext);
    const { profile, getprofiles, editprofile } = context;
    const ref = useRef(null);
    const refclose = useRef(null);
    useEffect(() => {
        getprofiles();
    }, [])

    const updateprofile = (singleprofile) => {
        ref.current.click()
        setstate({ id: singleprofile._id, ename: singleprofile.name, eage: singleprofile.age, edob: singleprofile.dob, ephone: singleprofile.phoneno, egender: singleprofile.gender, eaddress: singleprofile.address })

    }

    const handleclick = (e) => {
        editprofile(state.id, state.ename, state.eage, state.edob, state.ephone, state.egender, state.eaddress);
        refclose.current.click();
        toast.success("Profile Updated Successfully", { autoClose: 5000, theme: "colored" });
    }

    const onchange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Navbar />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 mx-3" id="staticBackdropLabel">Edit Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body mx-3">
                            <form>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" id="ename" className="form-control" name='ename' onChange={onchange} value={state.ename} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="age">Age</label>
                                    <input type="number" id="eage" name='eage' className="form-control " onChange={onchange} value={state.eage} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="dob">Dob</label>
                                    <input type="date" id="edob" name='edob' className="form-control " onChange={onchange} value={state.edob} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="phone">Phone</label>
                                    <input type="text" id="ephone" name='ephone' className="form-control " onChange={onchange} value={state.ephone} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="address">Address</label>
                                    <textarea type="text" id="eaddress" name='eaddress' className="form-control " onChange={onchange} value={state.eaddress} />
                                </div>
                                <div className="form-outline mb-2 w-75">
                                    <p className='my-0'> Gender</p>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="egender" id="eMale" value="Male" onChange={onchange} checked={state.egender === 'Male'} />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="egender" id="eFemale" value="Female" onChange={onchange} checked={state.egender === 'Female'} />
                                        <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleclick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='pp'>Your Profiles</h1>
            <div className="profileco">
                <div>{profile.length === 0 && <><p>No profiles to display....</p>
                    <p>Add a profile to view</p></>}</div>
                {profile.map((singleprofile) => {
                    return (
                        <div className="con">
                            <Profileshow singleprofile={singleprofile} updateprofile={updateprofile} key={state._id} />
                        </div>
                    )
                })}
            </div>
            <ToastContainer />
        </>
    )
}

export default Profiles
