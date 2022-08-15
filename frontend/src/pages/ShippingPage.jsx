
import React from 'react';
import NavbarComponentForCheckOut from '../components/layouts/NavbarComponentForCheckOut';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addShippingAddress } from '../actions/ShippingAddressActions';
import { useState } from 'react';
import {toast} from "react-toastify";
import Spinner from '../components/layouts/Spinner';


//Page to add a shipping address of user
function ShippingPage() {

    //Global state of user
    
    let {user} = useSelector(state => state.user);

    //Global state of shipping address

    let {shippingAddress, shippingIsLoading} = useSelector(state => state.shippingAddress);

    //Global state of cart

    let {cartItems} = useSelector(state => state.cart);

    //Set navigate and dispatch

    let navigate = useNavigate();
    let dispatch = useDispatch();

    //Set effect to check whether a user is admin or not. If admin, cannot allow to access this page and route

    useEffect(() => {

        if (user && user.isAdmin) {
            navigate("/admin/userlist")
        };

    },[user, navigate]);

    //Set effect when there are no items in cart, redirect to cart page

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/");
        };
    },[cartItems, navigate]);


    //Set state for data in form

    let [address, setAddress] = useState("");
    let [city, setCity] = useState("");
    let [postalCode, setPostalCode] = useState("");
    let [country, setCountry] = useState("");

    //Set effect to display shipping address

    useEffect(() => {

        setAddress(shippingAddress.address);
        setCity(shippingAddress.city);
        setPostalCode(shippingAddress.postalCode);
        setCountry(shippingAddress.country);
        
    
    },[shippingAddress]);
    
    //Set changes for data in form

    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleChangeCity = (e) => {
        setCity(e.target.value);
    };


    const handleChangePostalCode = (e) => {
        setPostalCode(e.target.value);
    };


    const handleChangeCountry = (e) => {
        setCountry(e.target.value);
    };
    

    //Submit to add shipping address

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!address || !city || !postalCode || !country) {
            toast.error("Please fill information!")
        } else {
            let inputData = {
                address,
                city,
                postalCode,
                country
            };
    
            dispatch(addShippingAddress(inputData));
            navigate("/paymentmethod");
        }
        
    };

    if (shippingIsLoading) {
        return (<Spinner />)
    };

  return (
    <div>
        <NavbarComponentForCheckOut />

        <div className='form mt-10 mb-52 w-10/12 mx-auto'>

            <h1 className='text-black font-bold text-3xl'> Fill in your address! </h1>

            <form onSubmit={handleSubmit}>
                <div className='form-group flex flex-col my-4'>
                    <label htmlFor="address" className='text-black font-bold text-xl mb-2'> Address: </label>
                    <input type="text" name="address" id="address" value={address} onChange={handleChangeAddress} placeholder='Enter your address' className='input input-lg bg-gray-500 focus:outline-0 text-white placeholder:text-white'/>
                </div>

                <div className='form-group flex flex-col my-4'>
                    <label htmlFor="city" className='text-black font-bold text-xl'> City: </label>
                    <input type="text" name="city" id="city" value={city} placeholder='Enter your city' onChange={handleChangeCity} className='input input-lg bg-gray-500 focus:outline-0 text-white placeholder:text-white'/>
                </div>

                <div className='form-group flex flex-col my-4'>
                    <label htmlFor="postalCode" className='text-black font-bold text-xl'> Post Code: </label>
                    <input type="text" name="postalCode" id="postalCode" value={postalCode} onChange={handleChangePostalCode} placeholder='Enter your postal code' className='input input-lg bg-gray-500 focus:outline-0 text-white placeholder:text-white'/>
                </div>

                <div className='form-group flex flex-col my-4'>
                    <label htmlFor="country" className='text-black font-bold text-xl'> Country: </label>
                    <input type="text" name="country" id="country" value={country} onChange={handleChangeCountry} placeholder='Enter your country' className='input input-lg bg-gray-500 focus:outline-0 text-white placeholder:text-white'/>
                </div>

                <div className='form-group my-4'>
                    <button type='submit' className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 focus:outline-0'> Continue </button>
                </div>
                

            </form>
        </div>
    </div>
  )
}

export default ShippingPage
