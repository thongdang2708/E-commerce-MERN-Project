
import React from 'react';
import NavbarComponentForCheckOut from "../components/layouts/NavbarComponentForCheckOut";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addPaymentMethod } from '../actions/PaymentMethodActions';
import { useDispatch } from 'react-redux';
import Spinner from '../components/layouts/Spinner';


//Page to select a payment method

function PaymentSelection() {

    //Global state of user
    
    let {user} = useSelector(state => state.user);

    //Global state of payment method

    let {paymentMethod, isLoadingPaymentMethod} = useSelector(state => state.paymentMethod);

    //Set navigate and dispatch

    let navigate = useNavigate();
    let dispatch = useDispatch();

     //Set effect to check whether a user is admin or not. If admin, cannot allow to access this page and route

    useEffect(() => {

        if (user && user.isAdmin) {
            navigate("/admin/userlist")
        };

    },[user, navigate]);

    // Global state of cart

     let {cartItems} = useSelector(state => state.cart);

     //Set effect when there are no items in cart, redirect to cart page

     useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/");
        };
    },[cartItems, navigate]);


    //Set state for payment method selection

    let [paymentOption, setPaymentMethod] = useState("Paypal");
    
    //Set changes for data in form

    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    //Submit to save a payment method
    
    const handleSubmit = (e) => {

        e.preventDefault();

        let inputData = {
            paymentMethod: paymentOption
        };

        dispatch(addPaymentMethod(inputData));

        setPaymentMethod("Paypal");
        navigate("/placeorder");
    };

    if (isLoadingPaymentMethod) {
        return (<Spinner />)  
    };
    

  return (
    <div>
        <NavbarComponentForCheckOut /> 

        <div className='w-10/12 mx-auto mb-96'>
            <Link to="/shippingaddress">
            <div className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 my-5'>
                Back
            </div>
            </Link>

            <h1 className='text-black font-bold mt-5 text-3xl'> Payment Method </h1>
            
            <h3 className='text-gray-600 font-bold my-7 text-xl'> Select payment method! </h3>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                <div className='form-group mb-5'>
                <input type="radio" name="paymentmethod" id="paymentmethod" value={paymentOption} checked={paymentOption === "Paypal"} onChange={handleChange} className="mr-3"/>
                <label htmlFor="paymentmethod" className='text-black font-bold'> Paypal or credit card! </label>
                </div>

                <div className='form-group'>
                    <button type='submit' className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500'> Continue </button>
                </div>


                </form>
            </div>
        </div>
    </div>
  )
}

export default PaymentSelection