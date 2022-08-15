
import React, { useEffect } from 'react';
import { useState } from 'react';
import { updatePassword } from '../actions/UserActions';
import { resetFunctionForLogIn } from '../actions/UserActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {toast} from "react-toastify";
import Spinner from '../components/layouts/Spinner';
import { Link } from 'react-router-dom';

//Update password page for user

function UpdatePasswordForUser() {

    //Set state for data in form

    let [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: ""
    });

    //Set dispatch and navigate
    let navigate = useNavigate();
    let dispatch = useDispatch();

    //Global state of user
    let {isError, isSuccess, isLoading, message} = useSelector(state => state.user);


    //Set changes for data in form

    const handleChange = (e) => {

        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value 
        }));
    };

    //Submit to update password

    const handleSubmit = (e) => {

        e.preventDefault();

        let inputData = {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        };

        dispatch(updatePassword(inputData));


        setFormData({
            currentPassword: "",
            newPassword: ""
        })
    };

    //Set effect for page when updating password

    useEffect(() => {

        if (isError) {
            toast.error(message);
        };

        if (isSuccess) {
            toast.success(message);
            navigate("/profile")
        };

        dispatch(resetFunctionForLogIn());

    },[dispatch, navigate, isError, isSuccess, message]);
    
    if (isLoading) {
        return (<Spinner />);
    };


  return (
    <div className='w-10/12 mx-auto p-4 mt-2 mb-96'>
        <Link to="/profile">
        <div className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 focus:outline-0 mb-4'>
            Back
        </div>
        </Link>

        <h1 className='text-black font-bold text-3xl'> Update Password! </h1>
        <h3 className='text-black font-bold mt-3 text-xl mb-3'> Please fill your current password and new password to update the password! </h3>

        <div className='form'>
            <form onSubmit={handleSubmit}> 
            <div className='form-group flex flex-col mb-3'>
                <label htmlFor="currentPassword" className='mb-4 text-black font-bold text-xl'> Your current password: </label>
                <input type="password" name="currentPassword" id="currentPassword" onChange={handleChange} className='input input-lg bg-gray-500 focus:outline-0 text-white'/>
            </div>

            <div className='form-group flex flex-col mb-3'>
                <label htmlFor="newPassword" className='mb-4 text-black font-bold text-xl'> Your new password: </label>
                <input type="password" name="newPassword" id="newPassword" onChange={handleChange} className='input input-lg bg-gray-500 focus:outline-0 text-white'/>
            </div>

            <div className='form-group mb-3'>
                <button type='submit' className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 focus:outline-0'> Update password! </button>
            </div>
            </form>
        </div>

    </div>
  )
};



export default UpdatePasswordForUser;