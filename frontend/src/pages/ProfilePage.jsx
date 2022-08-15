
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInfoToEdit } from '../actions/UserActions';
import { resetForUserInfoToEdit } from '../actions/UserActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUserInfo } from '../actions/UserActions';
import { getAllOrdersOfUser } from '../actions/OrderActions';
import SingleOrderOfUser from '../components/ForProfilePageOfUser/SingleOrderOfUser';

//Profile page of user
function ProfilePage() {

    //Global state of user

    let {user, editUser} = useSelector(state => state.user);

    //Global state of orders

    let {orders} = useSelector(state => state.order);

    //Set state for data when needing to edit users' info
    let [userData, setUserData] = useState({
        name: "",
        email: ""
    });

    //Set navigate and dispatch
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {

        if (user && !user.isAdmin) {
           
        } else {
            navigate("/admin/userlist");
        };

    },[user, dispatch, navigate]);

    //Click to change edit user's information

    const handleClickChange = () => {

        dispatch(userInfoToEdit(user));
    };


    //Set effect when choosing to edit user's information
    useEffect(() => {
            
        if (editUser.edit === true) {
            setUserData({
                name: editUser.info.name,
                email: editUser.info.email
            })
        }

    },[editUser])

    //Set changes for data to edit user's information

    const handleChange = (e) => {

        let {name, value} = e.target;

        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    //Submit to edit user's information

    const submitToEditInfo = () => {

        let inputData = {
            name: userData.name,
            email: userData.email
        };

        // console.log(inputData);
        dispatch(editUserInfo(inputData));
        dispatch(resetForUserInfoToEdit());

        setUserData({
            name: "",
            email: ""
        });

    };

    useEffect(() => {

        dispatch(getAllOrdersOfUser());
    },[dispatch])
 

  

  return (
    <div className='w-10/12 xl:w-9/12 lg:w-9/12 md:w-10/12 mx-auto mb-96 mt-10 p-2'>
        <h1 className='text-black font-bold text-3xl mb-4'> Profile Page </h1>

        <div className='w-full xl:w-5/12 lg:w-7/12 md:w-8/12'>
            
            {editUser.edit 
            ?
            (<h3 className='text-end text-sky-500 font-bold text-xl cursor-pointer' onClick={submitToEditInfo}> Done </h3>)
            :
            (<h3 className='text-end text-sky-500 font-bold text-xl cursor-pointer' onClick={handleClickChange}> Change </h3>)
            }
            
            
            <div className='w-full rounded-md shadow-lg bg-gray-200 p-5'>
                {editUser.edit 
                ? 
                
                (<div> 
                    <input type="text" name="name" id="name" value={userData.name} onChange={handleChange} className="input input-md w-full bg-gray-500 mb-5 focus:outline-0"/>
                    <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} className="input input-md w-full bg-gray-500 focus:outline-0"/>
                </div>) 
                
                : 
                
                (<div> 
                <h3 className='text-black font-bold text-lg mb-5'> Name: {user.name} </h3>
                <h3 className='text-black font-bold text-lg'> Email: {user.email} </h3>
                </div>    
                )}
                
            </div>

            <Link to="/updatepassword">
            <h3 className="text-sky-500 font-bold text-xl mt-5 underline cursor-pointer"> Update Password </h3>
            </Link>
        </div>

        <h1 className='text-black font-bold text-3xl mt-5 mb-20'> My Orders: </h1>
        <div className='overflow-x-auto relative rounded-lg shadow-lg'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th scope="col" className="py-3 px-20 border-2 border-gray-200"> Id </th>
                        <th scope="col" className="py-3 px-6 border-2 border-gray-200"> Date </th>
                        <th scope="col" className="py-3 px-6 border-2 border-gray-200"> Total </th>
                        <th scope="col" className="py-3 px-6 border-2 border-gray-200"> Paid</th>
                        <th scope="col" className="py-3 px-6 border-2 border-gray-200"> Delivered</th>
                        <th scope="col" className='py-3 px-6 border-t-2 border-b-2 border-r-2 border-t-gray-200 border-b-gray-200 border-r-gray-200'> Details </th>
                    </tr>
                </thead>

                <tbody>
                    
                    {orders.map((order) => (
                        <SingleOrderOfUser key={order._id} order={order}/>
                    ))}
                    
                </tbody>
            </table>

        </div>
    </div>
  )
}



export default ProfilePage