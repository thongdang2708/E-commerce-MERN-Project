
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { displaySingleUserByAdmin } from '../actions/SingleUserActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import Spinner from '../components/layouts/Spinner';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateUserByAdminRole } from '../actions/SingleUserActions';
import { resetSingleUserByAdmin } from '../actions/SingleUserActions';

//Page to edit a user by admin

function EditUserForAdmin() {

    //Set param, dispatch, and navigate

    let params = useParams();
    let userId = params.userId;
    let dispatch = useDispatch();
    let navigate = useNavigate();


    //Set state for data in an edit user page
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [isAdmin, setIsAdmin] = useState(false); 

    //Set global state of a single user and user who logged in

    let {singleUser, singleUserLoading, singleUserError, singleUserSuccess, singleUserMessage} = useSelector(state => state.singleUser); 
    let {user} = useSelector(state => state.user);

    //Set effect to display a single user's information

    useEffect(() => {

        if (singleUser.message) {
            toast.error("Something went wrong!")
        };

        dispatch(displaySingleUserByAdmin(userId));
        

    },[userId]);

    // Set effect to check whether this person is an admin 

    useEffect(() => {

        if (user && !user.isAdmin) {
            navigate("/profile");
        };
    },[user])

    //Set effect to add an information of a single user into current states of this page

    useEffect(() => {

        setName(singleUser.name);
        setEmail(singleUser.email);
        setIsAdmin(singleUser.isAdmin);
    }, [singleUser]);

    useEffect(() => {
        if (singleUserError) {
            toast.error(singleUserMessage);
            dispatch(resetSingleUserByAdmin());
        }

        if (singleUserSuccess) {
            toast.success(singleUserMessage);
            navigate("/admin/userlist");
            dispatch(resetSingleUserByAdmin());
        }
    },[singleUserError, singleUserSuccess, singleUserMessage, dispatch, navigate])

    //Set changes for data in form

    const handleName = (e) => {

        setName(e.target.value);
    };

    const handleEmail = (e) => {

        setEmail(e.target.value);

    };

    const handleCheck = (e) => {

        if (e.currentTarget.checked) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };

    //Handle submit to edit a user

    const handleSubmit = (e) => {

        e.preventDefault();

      
        let inputData = {
            name,
            email,
            isAdmin
        };
            
        
    
        dispatch(updateUserByAdminRole(singleUser._id, inputData));
        
       
        
    };


    

    if (singleUserLoading) {
        return (<Spinner />)
    };

    if (singleUser.message) {
        return (<div className='text-center text-pink-500 text-3xl mt-96 mb-96'> Something Went Wrong! </div>)
    };


  return (
    <div className='w-10/12 mx-auto mb-96 mt-10'>
        <Link to="/admin/userlist">
        <div className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 mb-10'> Back </div>
        </Link>
        <h1 className='text-black font-bold text-3xl mb-4'> Edit User...! </h1>

        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group flex flex-col mb-8'>
                    <label htmlFor="name" className='mb-4 text-black font-bold text-xl'> Name: </label>
                    <input type="text" name="name" id="name" value={name} onChange={handleName} className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col mb-8'>
                    <label htmlFor="email" className='mb-4 text-black font-bold text-xl'> Email: </label>
                    <input type="email" name="email" id="email" value={email} onChange={handleEmail} className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group mb-8 flex'>
                    <input type="checkbox" name="isAdmin" id="isAdmin" onChange={handleCheck} checked={isAdmin === true} className="cursor-pointer"/>
                    <label htmlFor="isAdmin" className='text-black font-bold ml-3 text-xl'> Set Admin </label>
                </div>

                <div className='form-group'>
                    <button type="submit" className='btn btn-lg bg-sky-500 text-white focus:outline-0 hover:text-sky-500 hover:bg-slate-200'> Edit User! </button>
                </div>


            </form>
        </div>
    </div>
  )
}

export default EditUserForAdmin