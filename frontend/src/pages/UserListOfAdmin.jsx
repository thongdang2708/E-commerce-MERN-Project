
import React, { useEffect } from 'react';
import { displayAllUsers } from '../actions/UsersActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {TiDelete} from "react-icons/ti";
import { Link } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner';
import { deleteUserByAdmin } from '../actions/UsersActions';

//Page to display a user list for admin

function UserListOfAdmin() {

  //Global state of user who logged in
  let {user} = useSelector(state => state.user);

  //Global state of a user list

  let {users, usersLoading} = useSelector(state => state.users);

  //Set dispatch and navigate

  let dispatch = useDispatch();
  let navigate = useNavigate();

  //Set effect when it is not allowed for user to access this page
  useEffect(() => {

      if (user && !user.isAdmin) {
        navigate("/profile");
      }
  },[user]);

  //Set effect to display a list of a user with an admin authentication

  useEffect(() => {

      dispatch(displayAllUsers());

  },[dispatch]);

  //Function to delete user

  const deleteUser = (userId) => {
      dispatch(deleteUserByAdmin(userId));
  };



  if (usersLoading) {
      return (<Spinner />)
  };


  return (
    <div className='mb-96 mt-10 w-10/12 mx-auto'>
      <div className='overflow-x-auto relative'>
          <table className='auto w-full rounded-lg shadow-lg mb-44'>
              <thead>
                  <tr>
                  <th scope="col" className='py-3 pl-2 pr-24 border-2 border-gray-200'> ID </th>
                  <th scope="col" className='py-3 pl-2 pr-10 border-2 border-gray-200'> NAME </th>
                  <th scope="col" className='py-3 pl-2 pr-10 border-2 border-gray-200'>  EMAIL </th>
                  <th scope="col" className='py-3 pl-2 pr-10 border-2 border-gray-200'>  ADMIN </th>
                  <th scope="col" className='py-3 pl-2 pr-10 border-2 border-gray-200'> EDIT / DELETE </th>
                  </tr>
              </thead>

              <tbody>
                  {users.map((user) => (
                    <tr>
                      <td className='py-3 pl-2 pr-24 border-2 border-gray-200'> {user._id} </td>
                      <td className='py-3 pl-2 pr-24 border-2 border-gray-200'> {user.isAdmin ? "Admin User" : `${user.name}`}</td>
                      <td className='py-3 pl-2 pr-24 border-2 border-gray-200'> {user.email} </td>
                      <td className='py-3 pl-2 pr-24 border-2 border-gray-200'> {user.isAdmin ? <BsFillCheckCircleFill className="inline-block ml-3" size={30} color={"green"}/> : <TiDelete size={43} className="inline-block ml-1" color={"red"}/>} </td>
                      <td className='py-3 pl-2 pr-24 border-2 border-gray-200 text-center'>
                          <Link to={`/edituser/${user._id}`}>
                          <div className='btn btn-sm bg-emerald-500 text-white hover:bg-slate-200 hover:text-emerald-500 xl:mb-0 ml-10 mb-5 lg:mb-5 lg:ml-10 md:mb-5 lg:ml-10'> <FaEdit /> </div>
                          </Link>
                          <div className='btn btn-sm bg-pink-500 text-white hover:bg-slate-200 hover:text-emerald-500 ml-10' onClick={() => deleteUser(user._id)}> <MdDelete /> </div>
                      </td>   
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  )
}




export default UserListOfAdmin