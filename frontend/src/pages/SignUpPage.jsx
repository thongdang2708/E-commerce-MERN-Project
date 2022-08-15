
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { register } from '../actions/UserActions.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { resetFunction } from '../actions/UserActions.js';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner.jsx';


//Sign up page
function SignUpPage() {

    //Set state for form

    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    //Global state of user
    let {user, isError, isLoading, isSuccess, message} = useSelector(state => state.user);

    //Set dispatch and navigate

    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Set changes for data in form

    const handleChange = (e) => {

        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };


    //Submit to register
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            toast.error("Password does not match");
        } else {
            let inputData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };
        
            dispatch(register(inputData));
        
        }

        
        

        setFormData({
            name: "",
            email: "",
            password: "",
            password2: ""
        })
    };

    //Set effect for page

    useEffect(() => {

        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            toast.success("Register successfully!");
            navigate("/login")
        }

        dispatch(resetFunction());

    },[isError, isSuccess, message, user, dispatch, navigate]);


    if (isLoading) {
        return (<Spinner />)
    }


  return (
    <div className='mt-10 w-10/12 mx-auto border-2 p-5 rounded-lg shadow-lg bg-sky-100 mb-60'>
        <h1 className='text-center text-black font-bold text-3xl'> Sign Up Page! </h1>

        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group flex flex-col mb-3'>
                    <label htmlFor="name" className='text-black font-bold text-lg mb-3'> Name: </label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder='Enter your name!' className='input input-lg w-full bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col mb-3'>
                    <label htmlFor="email" className='text-black font-bold text-lg mb-3'> Email </label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder='Enter your email!' className='input input-lg w-full bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col mb-3'>
                    <label htmlFor="password" className='text-black font-bold text-lg mb-3'> Password: </label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder='Enter your password!' className='input input-lg w-full bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col mb-8'>
                    <label htmlFor="password2" className='text-black font-bold text-lg mb-3'> Confirm Password: </label>
                    <input type="password" name="password2" id="password2" value={formData.password2} onChange={handleChange} placeholder='Confirm your password!' className='input input-lg w-full bg-gray-500 text-white focus:outline-0'/>
                </div>

               
                <div className='form-group mb-5'>
                    <button type="submit" className='w-full btn btn-lg bg-sky-500 text-white focus:outline-0 hover:text-sky-500 hover:bg-slate-200'> Register! </button>
                </div>

                <div className='form-group my-5'>
                    <Link to="/login">
                    <h3 className='text-sky-500 font-bold text-xl underline cursor-pointer text-center'> Already have an account? Please log in! </h3>
                    </Link>
                </div>

                
            </form>
        </div>
    </div>
  )
}

export default SignUpPage