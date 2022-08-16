
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/UserActions';
import { resetFunctionForLogIn } from '../actions/UserActions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {toast} from "react-toastify";
import Spinner from '../components/layouts/Spinner';

function LogInPage() {

    //Set state for data in form

    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    //Set dispatch and navigate
    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Global state of user

    let {user, isLoading, isError, isSuccess, message} = useSelector(state => state.user);

    //Global state of cart

    let {cartItems} = useSelector(state => state.cart);

    //Set changes for form

    const handleChange = (e) => {

        let {name, value} = e.target;

        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }))
    };

    //Submit to log in

    const handleSubmit = (e) => {

        e.preventDefault();

        
        let inputData = {
            email: formData.email,
            password: formData.password
        };

        dispatch(login(inputData));

        setFormData({
          email: "",
          password: ""
        });
    };  

    //Set effect for page when logging in

    useEffect(() => {

        if (isError) {
          toast.error(message)
        };

        if (isSuccess) {
          toast.success("Log In Successfully!");
        };

        if (user && !user.isAdmin) {
          navigate("/profile");
        };

        if (user && user.isAdmin) {
          navigate("/admin/userlist");
        };

        if (user && !user.isAdmin && cartItems.length > 0) {
          navigate("/shippingaddress");
        };

        dispatch(resetFunctionForLogIn());

    },[dispatch, navigate, isError, isSuccess, message, user, cartItems]);



    if (isLoading) {
      return (<Spinner />)
    };

  return (
    <div className='mt-20 w-10/12 mx-auto p-8 rounded-lg shadow-lg border-2 mb-72'>
      <h1 className='text-center font-bold text-black text-3xl'> Sign In Page! </h1>

      <div className='form'>
        <form onSubmit={handleSubmit}>
            <div className='form-group flex flex-col mb-4'>
              <label htmlFor="email" className='mb-3 text-black font-bold text-xl'> Email: </label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder='Enter your email!' className='input input-lg bg-gray-500 focus:outline-0 text-white'/>
            </div>

            <div className='form-group flex flex-col mb-10'>
              <label htmlFor="password" className='mb-3 text-black font-bold text-xl'> Password: </label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder='Enter your password!' className='input input-lg bg-gray-500 focus:outline-0 text-white'/>
            </div>

            <div className='form-group mb-4'>
                <button type='submit' className='btn btn-lg w-full bg-sky-500 hover:bg-slate-200 hover:text-sky-500 focus:outline-0'> Sign In! </button>
            </div>

            <div className='form-group mb-4'>
              <Link to="/register">
                <h3 className='text-center font-bold text-sky-500 text-2xl underline cursor-pointer'> Don't you have an account? Please register! </h3>
              </Link>
            </div>
            
        </form>
      </div>

    </div>
  )
};



export default LogInPage