
import React from 'react';
import { useSelector } from 'react-redux';
import NavbarComponentForCheckOut from '../components/layouts/NavbarComponentForCheckOut';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addOrder } from '../actions/OrderActions';
import { resetForOrder } from '../actions/OrderActions';
import { resetCart } from '../actions/CartActions';
import { removePaymentMethod } from '../actions/PaymentMethodActions';
import { removeAddress } from '../actions/ShippingAddressActions';
import Spinner from '../components/layouts/Spinner';
import { Link } from 'react-router-dom';
import { displaySingleOrder } from '../actions/OrderActions';

import {toast} from 'react-toastify';


//Page to place an order
function PlaceOrderPage() {

  //Global states of shipping address, payment method, cart, user, and order.
  let {shippingAddress} = useSelector(state => state.shippingAddress);
  let {paymentMethod} = useSelector(state => state.paymentMethod);
  let {cartItems} = useSelector(state => state.cart);
  let {user} = useSelector(state => state.user);
  let {order, isLoadingOrder, isErrorOrder, isSuccessOrder, messageOrder} = useSelector(state => state.order);

  //Set state of tax price
  let [taxPrice, setTaxPrice] = useState(24);


  //Set navigate and dispatch
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //Set effect when there is a user and this user is admin, not authorized to access this page

  useEffect(() => {
      if (user && user.isAdmin) {
        navigate("/admin/userlist")
      };
  },[user, navigate]);

 


  //Calculate the total price of the cart

  let amount = cartItems.map((item) => item.price * item.quantity);
  let totalAmount = Number(amount.reduce((acc, item) => acc+=item, 0).toFixed(2));

  //Check shipping price
  let shippingPrice;

  if (totalAmount >= 100) {
      shippingPrice = Number(0);
  } else {
      shippingPrice = Number(25);
  };

  //Calculate the total price of the cart
  let totalPriceForCart = Number(totalAmount + shippingPrice + taxPrice).toFixed(2);

  //Reduce information in array of cart items

  let reducedCart = cartItems.map((item) => ({
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
      product: item.product_id
  }));

  
  //Function to handle click for placing orders

  const handlePlaceOrder = (e) => {

      e.preventDefault();

      let inputData = {
        orderItems: reducedCart,
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country
        },
        paymentMethod: paymentMethod.paymentMethod,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: Number(totalPriceForCart)
      };

      dispatch(addOrder(inputData));
    
  };

  // Set effect when placing order

  useEffect(() => {

    if (isErrorOrder) {
        toast.error(messageOrder);
        dispatch(resetForOrder());
    };

    if (isSuccessOrder) {
        toast.success("Add Order Successfully!");
        navigate(`/order/${order._id}`);
        dispatch(resetCart());
        dispatch(removePaymentMethod());
        dispatch(removeAddress());
        dispatch(resetForOrder());
    };


  },[isErrorOrder, isSuccessOrder, dispatch, navigate, order, messageOrder])

   //Calculate the total price of each product

   const calculateEachPrice = (quantity, price) => {

    return quantity * price;
};



 
  if (isLoadingOrder) {
      return (<Spinner />);
  };

  if (cartItems.length === 0) {
      return (<div className='text-center text-pink-500 text-3xl mt-96 mb-96'> There are no products in cart! Please go back to <Link to="/" className="text-sky-500 font-bold underline cursor-pointer"> main page! </Link> to order to be able to place an order in this page! </div>)
  };

  

  return (
    <div className='mb-72'>
      <NavbarComponentForCheckOut />

      <div className="w-11/12 mx-auto mt-10 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 gap-5">
         <div className='col-span-1 xl:col-span-4 lg:col-span-4 md:col-span-4 border-r-2 p-4'>
              <div className='shippinginfo mb-5'>
                  <h1 className='text-black font-bold text-xl mb-3'> Shipping Address: </h1>
                  <p> <span className='text-black font-bold'> Address: </span> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country} </p>
              </div>

              <div className='paymentinfo mb-5'>
                 <h1 className='text-black font-bold text-xl mb-3'> Payment Method: </h1>
                  <p> <span className='text-black font-bold'> Method: </span> {paymentMethod.paymentMethod}</p>
              </div>

              {/* <div className='orderinfo'>
             c
                {cartItems.map((item, index) => (
                  <SingleProductInOrder key={index} item={item}/>
                ))}
        </div> */}

        <div className='orderinfo'>
        <h1 className='text-black font-bold text-xl mb-3'> Order Items: </h1>

        {cartItems.map((genre, index) => (
           <div className='my-3 pb-4 pl-2 border-b-2 border-b-gray-200 last:border-0 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4' key={index}>
           <div className='col-span-0 xl:col-span-2 lg:col-span-2 md:col-span-2 grid grid-cols-2 gap-5'>
               <div>
               <img src={genre.image} alt="product" className='inline-block w-full rounded-lg shadow-lg h-52'/>
               </div>
   
               <div>
               <p className='text-black font-bold'> {genre.name} </p>
               </div>
            
           </div>
   
           <div className='col-span-0 xl:col-span-1 lg:col-span-1 md:col-span-1 mt-4 xl:mt-0 lg:mt-0 md:mt-0'>
               <p className='text-black'> {genre.quantity} x ${genre.price} = ${calculateEachPrice(genre.quantity, genre.price)}</p>
           </div>
       </div>  
        ))}
        </div>



         </div>

         <div className='col-span-1'>
            <h1 className='text-black font-bold text-left text-2xl mb-5'> Order Summary </h1>

            <p className='mb-4'> <span className='text-black font-bold'> Items: </span> ${totalAmount} </p>

            <p className='mb-4'> <span className='text-black font-bold'> Shipping Price: </span> ${shippingPrice} </p>
            
            <p className='mb-4'> <span className='text-black font-bold'> Tax Price: </span> ${taxPrice} </p>

            <p className='mb-4'> <span className='text-black font-bold'> Total Price: </span> ${totalPriceForCart} </p>
                
            <form onSubmit={handlePlaceOrder}>
            <button type="submit" className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 w-full'>
                Place Order
            </button>
            </form>
         </div> 

      </div>  
    </div>
  )
}

export default PlaceOrderPage