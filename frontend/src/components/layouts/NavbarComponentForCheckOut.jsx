
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function NavbarComponentForCheckOut() {

    //Global state of user
    let {user} = useSelector(state => state.user);

    //Set location
    let location = useLocation();

    //Validate function to check routes
    const validateRoute = (route) => {
        if (route === location.pathname) {
            return true 
        }

    };


  return (
    <div className='w-10/12 mx-auto border-2 mt-3 flex items-center p-4 justify-around rounded-lg shadow-lg'>
        <div className={user ? "text-gray-400 font-bold" : "text-black font-bold"}>
            Sign In
        </div>

        <div className={validateRoute("/shippingaddress") ? "text-black font-bold" : "text-gray-400 font-bold"}>
            Shipping Address 
        </div>

        <div className={validateRoute("/paymentmethod") ? "text-black font-bold" : "text-gray-400 font-bold"}>
            Payment Method
        </div>

        <div className={validateRoute("/placeorder") ? "text-black font-bold" : "text-gray-400 font-bold"}>
            Place Order
        </div>
    </div>
  )
}

export default NavbarComponentForCheckOut