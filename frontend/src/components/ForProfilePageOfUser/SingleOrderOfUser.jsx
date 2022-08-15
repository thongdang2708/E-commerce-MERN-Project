
import React from 'react';
import PropTypes from 'prop-types';
import {AiFillCheckCircle} from "react-icons/ai";
import {TiDelete} from "react-icons/ti";
import { Link } from 'react-router-dom';

function SingleOrderOfUser({order}) {
  return (
        
      
        <tr>
        <td scope="row" className='py-5 pl-2 pr-16 border-2 border-b-gray-200'>
            <p className='font-bold text-black'> {order._id} </p>
        </td>

        <td scope="row" className='py-5 pl-2 pr-8 border-2 border-b-gray-200'>
            <p className='font-bold text-black'> {new Date(order.createdAt).toLocaleString("en-US")}</p>
        </td>

        <td scope="row" className='py-5 pl-2 pr-8 border-2 border-b-200'>
            <p className='font-bold text-black'> ${order.totalPrice} </p>
        </td>

        <td scope="row" className='py-5 pl-2 pr-8 border-2 border-b-200'>
            <p className='font-bold text-black'> {order.isPaid ? `${new Date(order.paidAt).toLocaleString("en-US")}` : "Not paid yet!"}</p>
        </td>

        <td scope="row" className='py-5 pl-2 pr-8 border-2 border-b-200 text-center'>
            <p className='font-bold text-black'> {order.isDelivered ? <AiFillCheckCircle className='inline-block text-emerald-600 text-center ml-4' size={30}/> : <TiDelete className='inline-block text-red-600 text-center ml-4' size={30}/>} </p>
        </td>

        <td scope='row' className='py-5 pl-2 pr-8 border-2 border-b-200 text-center'>
            <Link to={`/order/${order._id}`}>
            <div className='btn btn-md bg-sky-500 text-white focus:outline-0 hover:bg-slate-200 hover:text-sky-500 ml-4'> Details </div>
            </Link>
        </td>
        </tr>
  )
};

SingleOrderOfUser.propTypes = {
    order: PropTypes.object
};

export default SingleOrderOfUser