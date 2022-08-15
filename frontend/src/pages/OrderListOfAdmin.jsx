
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { displayOrderListByAdmin } from '../actions/OrderListActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner';
import SingleOrderInOrderList from '../components/ForOrderListPage/SingleOrderInOrderList';

function OrderListOfAdmin() {

  //Global state of user who logged in
  let {user} = useSelector(state => state.user);

  //Set dispatch and navigate
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //Global state of order list

  let {orderList, orderListLoading} = useSelector(state => state.orderList); 

  //Set effect to prevent a user to access this route

   useEffect(() => {

    if (user && !user.isAdmin) {
      navigate("/profile");
    }
  },[user]);

  //Set effect to display an order list

  useEffect(() => {

      dispatch(displayOrderListByAdmin());
  },[dispatch])

  if (orderListLoading) {
    return (<Spinner />)
  };



  return (
    <div className='w-10/12 mx-auto mb-96'>
    <h1 className='text-black font-bold text-3xl my-10'> Order List! </h1>


    <div className='overflow-x-auto relative my-5'>
          <table className='auto w-full'>
              <thead>
                  <tr>
                      <th className='py-3 px-10 text-left border-2 border-gray-200'> ID </th>
                      <th className='py-3 px-10 text-left border-2 border-gray-200'> USER </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'>  DATE </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> TOTAL </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> PAID </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> DELIVERED </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> DETAILS </th>
                  </tr>
              </thead>

              <tbody>
                  {orderList.map((order) => (
                    <SingleOrderInOrderList key={order._id} order={order}/>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default OrderListOfAdmin