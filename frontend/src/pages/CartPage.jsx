
import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/layouts/Spinner';
import SingleProductInCart from '../components/ForCartPage/SingleProductInCart';
import { Link } from 'react-router-dom';

//Cart page

function CartPage() {

 
  //Global state of cart
  let {cartItems, isLoadingCart} = useSelector(state => state.cart);

  //Calculate the total price of cart
  let total = cartItems.map((item) => item.price * item.quantity);

  let totalAmount = Number(total.reduce((acc, item) => acc+=item, 0)).toFixed(2);



  if (isLoadingCart) {
      return (<Spinner />)
  }

  return (
      <div className={cartItems.length === 0 ? `mt-10 xl:w-10/12 lg:w-11/12 md:w-11/12 w-11/12 mx-auto cart` : cartItems.length === 1 ? `mt-10 xl:w-10/12 lg:w-11/12 md:w-11/12 w-11/12 mx-auto one`: `mt-10 xl:w-10/12 lg:w-11/12 md:w-11/12 w-11/12 mx-auto mb-60 page`}>
          <h1 className='text-black font-bold text-3xl ml-4 mb-5'> Shopping Cart </h1>

          <div className='mb-40 mt-10 ml-4'>
              {cartItems.map((item) => (
                  <SingleProductInCart key={item.product_id} item={item}/>
              ))}
          </div>

          {cartItems.length > 0 && (
            <div className='w-full ml-4 border-2 p-4 rounded-lg shadow-lg'>
              <h1 className='text-black font-bold text-2xl'> Subtotal ({cartItems.length}) Items </h1>

              <p className='text-black font-bold text-xl mt-4'> ${totalAmount}</p>

              <Link to="/shippingaddress">
              <div className='btn btn-lg bg-sky-500 hover:bg-slate-200 hover:text-sky-500 focus:outline-0 mt-5'>
                Proceed To Checkout
              </div>
              </Link>
            </div>
          )}

        
      </div>
  )
};





export default CartPage