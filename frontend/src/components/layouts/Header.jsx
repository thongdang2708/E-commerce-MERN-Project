
import React from 'react';
import {FaShoppingCart, FaUser} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {FaUserAlt} from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFunction } from '../../actions/UserActions';
import { logout } from '../../actions/UserActions';
import {AiOutlineArrowDown} from "react-icons/ai";
import {AiOutlineArrowUp} from "react-icons/ai";
import { removeAddress } from '../../actions/ShippingAddressActions';
import { removePaymentMethod } from '../../actions/PaymentMethodActions';
import { getAllOrdersOfUser } from '../../actions/OrderActions';

//Header
function Header() {

    //Set location, navigate, and dispatch

    let location = useLocation();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    //Validate routes
    const validateFunction = (route) => {

        if (route === location.pathname) {
            return true;
        }
    };


    //Set global state of user

    let {user} = useSelector(state => state.user);

    //Set state for navbar function with a user role

    let [open, setOpen] = useState(false);

    //Set state for navbar function with an admin role

    let [openNavAdmin, setOpenNavAdmin] = useState(false); 

    //Set function when clicking profile

    const ProfileFunction = () => {

        
        navigate("/profile");
        setOpen(false);
    };

    //Log out function for a user

    const LogOut = () => {

        dispatch(logout());
        dispatch(resetFunction());
        dispatch(removeAddress());
        dispatch(removePaymentMethod());
        setOpen(false);
        navigate("/");
    };

    //Log out for admin

    const LogOutForAdmin =  () => {
        dispatch(logout());
        navigate("/");
        setOpenNavAdmin(false);
    };

    //Handle click when clicking to an admin's user list
    const handleCommonClickForAdmin = (route) => {

        navigate(route);
        setOpenNavAdmin(false)
    };


  return (
    <div className='bg-sky-500 w-full p-10'>
        <div className='container mx-auto flex items-center justify-between'>
            <Link to="/">
            <div>
                <h1 className="text-black font-bold text-3xl"> Go Shop </h1>
            </div>
            </Link>

            <div className='flex items-center'>
                
                <Link to="/cart">
                <div className={validateFunction("/cart") ? 'flex items-center text-black text-2xl mr-10 cursor-pointer' : 'flex items-center text-white text-lg mr-10 cursor-pointer'}>
                    <div>
                        <FaShoppingCart className='inline-block mr-2' size={30}/>
                    </div>

                    <div>
                        <h3> Cart </h3>
                    </div>
                </div>
                </Link>
               
                {user && !user.isAdmin 

                ? 
                
                (<div className='relative'> 
                <div className='nameshow p-3 mb-3 rounded-lg shadow-lg bg-white flex items-center justify-center cursor-pointer' onClick={() => setOpen(!open)}> 
                <FaUserAlt className='inline-block mr-3'/> <span className='text-black font-bold mr-1'> {user.name} </span> {!open ? <AiOutlineArrowDown className='inline-block text-black font-bold'/> : <AiOutlineArrowUp className='inline-block text-black font-bold'/>}
                </div> 
                
               
   
                    <ul className={open ? 'navbarshow active p-0 bg-white absolute rounded-lg shadow-lg w-full top-20 xl:top-14 lg:top-14 md:top-14 z-50' : "navbarshow p-0 bg-white absolute rounded-lg shadow-lg w-full top-20 xl:top-14 lg:top-14 md:top-14"}>
                     
                        <li className='py-3 pl-4 border-b-2 border-b-gray-500 cursor-pointer' onClick={ProfileFunction}> Profile </li>
                    
                        <li className='py-3 pl-4 cursor-pointer' onClick={LogOut}> Log Out </li>
                    </ul>
               
               
                
                </div>) 
                
                : 

                user && user.isAdmin 

                ?
                
                
                (<div className='relative'> 
                    <div className='nameshow p-3 mb-3 rounded-lg shadow-lg bg-white flex items-center justify-center cursor-pointer' onClick={() => setOpenNavAdmin(!openNavAdmin)}> 
                    <FaUserAlt className='inline-block mr-3'/> <span className='text-black font-bold mr-1'> {user.name} </span> {!openNavAdmin ? <AiOutlineArrowDown className='inline-block text-black font-bold'/> : <AiOutlineArrowUp className='inline-block text-black font-bold'/>}
                    </div> 
                    
                   
       
                        <ul className={openNavAdmin ? 'navbarshowadmin active p-0 bg-white absolute rounded-lg shadow-lg w-full top-20 xl:top-14 lg:top-14 md:top-14 z-50' : "navbarshowadmin p-0 bg-white absolute rounded-lg shadow-lg w-full top-20 xl:top-14 lg:top-14 md:top-14"}>

                            
                            <li className='py-3 pl-4 border-b-2 border-b-gray-500 cursor-pointer' onClick={() => handleCommonClickForAdmin("/admin/userlist")}> Users </li>
                           

                           
                            <li className='py-3 pl-4 border-b-2 border-b-gray-500 cursor-pointer' onClick={() => handleCommonClickForAdmin("/admin/productlist")}> Products </li>
                          
                            
                            
                            <li className='py-3 pl-4 border-b-2 border-b-gray-500 cursor-pointer' onClick={() => handleCommonClickForAdmin("/admin/orderlist")}> Orders </li>
                           

                            <li className='py-3 pl-4 cursor-pointer' onClick={LogOutForAdmin}> Log Out </li>
                        </ul>
                   
                   
                    
                </div>) 
                
                :

                
                ( <Link to="/login">
                <div className={validateFunction("/login") ? "flex items-center text-black text-2xl cursor-pointer" : 'flex items-center text-white text-lg cursor-pointer'}>
                    <div>
                        <FaUser className='inline-block mr-2' size={27}/>
                    </div>

                    <div>
                        <h3> Sign In </h3>
                    </div>
                </div>
                </Link>)
                } 
               
              
                
              
            </div>
        </div>
    </div>
  )
}



export default Header