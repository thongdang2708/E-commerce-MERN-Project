
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { displaySingleOrder } from '../actions/OrderActions';
import { useParams } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner';
import {toast} from "react-toastify";
import axios from 'axios';
import { useState } from 'react';
import { resetForOrderPay } from '../actions/OrderPayActions';
import { PayPalButton } from 'react-paypal-button-v2';
import { updateForPayment } from '../actions/OrderPayActions';
import { markDeliverByAdmin } from '../actions/OrderActions';


const API_URL = "/api/config/clientId";

//Page to display details of a single order

function SingleOrderDetailsPage() {

    //Set dispatch and params
    let dispatch = useDispatch();
    let {orderId} = useParams();

    //Global state of order
    let {order, shippingAddressInfo, isLoadingOrder} = useSelector(state => state.order);
    let {numItems} = useSelector(state => state.order);

    //Global state of order pay

    let {isSuccessPay, messagePay} = useSelector(state => state.orderPay);

    //Global state of user

    let {user} = useSelector(state => state.user);
    

    //Set sdk

    let [sdkReady, setSdkReady] = useState(false);

    

    //Set effect to fetch a single order

    useEffect(() => {
        if (order.message) {
            toast.error("Something went wrong")
        };
        dispatch(displaySingleOrder(orderId));
    },[orderId]);

    //Set effect to fetch a single id from a param when paying succesfully

    useEffect(() => {


        if (order.message) {
            toast.error("Something went wrong!")
        };

        const setPaypal = async () => {

            let response = await axios.get(API_URL);

            let data = response.data;

            let clientId = data.clientId;

            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src  = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };

            document.body.appendChild(script);
            
        };

        if (!order || isSuccessPay) {
            toast.success(messagePay);
            dispatch(resetForOrderPay());
            dispatch(displaySingleOrder(orderId));
            
        } else if (!order.isPaid) {
            if (!window.paypal) {
                setPaypal();
            } else {
                setSdkReady(true)
            }
        };
     
        
        
       
    },[orderId, dispatch, order, isSuccessPay]);

    

    //Calculate the total price of products before tax and shipping prices

    let totalAmount = Number(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2);

    //Handle success after successful payment

    const handleSuccess = (paymentResult) => {

        dispatch(updateForPayment(order._id, paymentResult));
        
    };

     //Calculate the total price of each product

     const calculateEachPrice = (quantity, price) => {
        return quantity * price;
    };

    //Mark an order as delivered by admin

    const markDeliver = (oid) => {

        dispatch(markDeliverByAdmin(oid));
       

    };



    if (isLoadingOrder) {
        return (<Spinner />)
    };

    if (order.message) {
        return (<div className='text-center text-pink-500 text-3xl mt-96 mb-96 pt-3'> Something Went Wrong! </div>)
    };

  
    
    return (
        <div>
         <div className='mb-72'> 
         <div className="w-11/12 mx-auto mt-10 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 gap-5">
         <div className='col-span-1 xl:col-span-4 lg:col-span-4 md:col-span-4 border-r-2 p-4'>
         <div className='shippinginfo mb-5'>
                  <h1 className='text-black font-bold text-xl mb-3'> Shipping Address: </h1>
                  <p> <span className='text-black font-bold'> Address: </span> {shippingAddressInfo.address}, {shippingAddressInfo.city}, {shippingAddressInfo.postalCode}, {shippingAddressInfo.country} </p>
        </div>

        <div className="notice">
           {order.isPaid ? (<div className='w-full p-4 bg-sky-400 rounded-lg shadow-lg my-3 text-black font-bold'> Paid at: {new Date(order.paidAt).toLocaleString("en-US")}</div>) : (<div className='w-full p-4 bg-pink-400 rounded-lg shadow-lg my-3 text-black font-bold'> Not Paid Yet! </div>)}
        </div>

        <div className='paymentinfo mb-5'>
                 <h1 className='text-black font-bold text-xl mb-3'> Payment Method: </h1>
                  <p> <span className='text-black font-bold'> Method: </span> {order.paymentMethod}</p>
        </div>

        <div className='notice'>
            {order.isDelivered ?  (<div className='w-full p-4 bg-sky-400 rounded-lg shadow-lg my-3 text-black font-bold'> Delivered at: {new Date(order.deliveredAt).toLocaleString("en-US")}</div>) :  (<div className='w-full p-4 bg-pink-400 rounded-lg shadow-lg my-3 text-black font-bold'> Not Delivered Yet! </div>)}
        </div>



        <div className='orderinfo'>
            <h1 className='text-black font-bold text-xl mb-3'> Order Items: </h1>
                    
                    
                 
                    {numItems.map((item) => (
                        <>
                        <div className='my-3 pb-4 pl-2 border-b-2 border-b-gray-200 last:border-0 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4'>
                        <div className='col-span-0 xl:col-span-2 lg:col-span-2 md:col-span-2 grid grid-cols-2 gap-5'>
                         <div>
                         <img src={item.image} alt="product-in-order" className='inline-block w-full rounded-lg shadow-lg h-52'/>
                         </div>
             
                         <div>
                         <p className='text-black font-bold'> {item.name} </p>
                         </div>
                      
                     </div>
             
                     <div className='col-span-0 xl:col-span-1 lg:col-span-1 md:col-span-1 mt-4 xl:mt-0 lg:mt-0 md:mt-0'>
                         <p className='text-black'> {item.quantity} x ${item.price} = ${calculateEachPrice(item.quantity, item.price)}</p>
                     </div>
                 </div>  
                        
                        </>
                    ))}
                 
                
            </div> 
        </div>

         <div className='col-span-1'>
            <h1 className='text-black font-bold text-left text-2xl mb-5'> Order Summary </h1>

            <p className='mb-4'> <span className='text-black font-bold'> Items: </span> ${totalAmount}  </p>

            <p className='mb-4'> <span className='text-black font-bold'> Shipping Price: </span> ${order.shippingPrice} </p>
            
            <p className='mb-4'> <span className='text-black font-bold'> Tax Price: </span> ${order.taxPrice} </p>

            <p className='mb-4'> <span className='text-black font-bold'> Total Price: </span> ${order.totalPrice} </p>

            {!order.isPaid && !user.isAdmin
            
            ?

            (
                <div>
                    <PayPalButton amount={order.totalPrice} onSuccess={handleSuccess}/>
                </div>
            )
                
            
            :

            order.isPaid && !user.isAdmin

            ?
            
            (<div className='w-full p-4 bg-pink-500 rounded-lg shadow-lg text-white text-xl font-bold text-center'> Paid already! </div>)
            
            :

            (<> </>)
            }

            {order.isPaid && user.isAdmin && !order.isDelivered 
            
            &&

            (<div className='w-full btn btn-lg bg-pink-500 rounded-lg shadow-lg text-white text-xl font-bold cursor-pointer' onClick={() => markDeliver(order._id)}>
                Mark As Delivered!
            </div>)
            }

            {order.isDelivered && !user.isAdmin && (<div className='w-full p-4 bg-pink-500 rounded-lg shadow-lg text-white text-xl font-bold text-center mt-10'> Delivered Already! </div>)}
            
            
        
         </div> 
        </div>
         </div>
    </div>
    )
  

    
   
    

    
    
}

export default SingleOrderDetailsPage