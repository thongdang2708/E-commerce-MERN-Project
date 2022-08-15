
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SingleOrderInOrderList({order}) {
  return (
    <tr>
        <td className='py-3 px-10 border-2 border-gray-200'> {order._id}</td>
        <td className='py-3 px-10 border-2 border-gray-200'> {order.user.name} </td>
        <td className='py-3 px-5 border-2 border-gray-200'> {new Date(order.createdAt).toLocaleString("en-US")} </td>
        <td className='py-3 px-5 border-2 border-gray-200'> {order.totalPrice}</td>
        <td className='py-3 px-5 border-2 border-gray-200'> {order.isPaid ? `Paid at ${new Date(order.paidAt).toLocaleString("en-US")}` : "Not Paid Yet"} </td>
        <td className='py-3 px-5 border-2 border-gray-200'> {order.isDelivered ? `Delivered at ${new Date(order.deliveredAt).toLocaleString("en-US")}` : "Not Delivered Yet"} </td>
        <td className='py-3 px-5 border-2 border-gray-200'>
            <Link to={`/order/${order._id}`}>
            <div className='w-full btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500'> Details </div>
            </Link>
        </td>

    </tr>
  )
};

SingleOrderInOrderList.propTypes = {
    order: PropTypes.object
};

export default SingleOrderInOrderList