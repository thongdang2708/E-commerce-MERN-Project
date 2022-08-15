
import React from 'react';
import PropTypes from 'prop-types';
import {FaTrash, FaPlus, FaMinus} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../../actions/CartActions';
import { removeItem } from '../../actions/CartActions';

function SingleProductInCart({item}) {

    //Set dispatch

    let dispatch = useDispatch();

    //Increase Quantity

    const increaseQuantity = (id, quantity, countInStock) => {

        quantity++;

        if (quantity > countInStock) {
            dispatch(changeQuantity(id, countInStock));
        } else {
            dispatch(changeQuantity(id, quantity));
        };
        
        console.log(id, quantity);

    };

    //Decrease Quantity

    const decreaseQuantity = (id, quantity) => {
        quantity--;

        if (quantity < 1) {
            dispatch(removeItem(id));
        } else {
            dispatch(changeQuantity(id, quantity));
        }
     
        console.log(id, quantity);
    };

    //Remove product out of cart

    const removeProduct = (id) => {
        dispatch(removeItem(id));  
    };


  return (
    <div className='w-full pb-4 border-b-2 last:border-0 border-b-gray-500 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 gap-12 mt-5 flex px-4'>
        <div className='col-span-1'>
            <img src={item.image} alt="item-image" className='rounded-lg shadow-lg inline-block h-36 xl:h-52 lg:h-52 md:h-52'/>
        </div>

        <div className='col-span-1 xl:col-span-4 lg:col-span-4 md:col-span-4 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4'>
            <div>
            <h3 className='text-black font-bold'> {item.name} </h3>
            </div>

            <div>
            <h3 className='text-black font-bold'> ${item.price}</h3>
            </div>

            <div>
            <div className='flex'>
            <div className=' p-2 rounded-full bg-gray-500 cursor-pointer active:bg-sky-100' onClick={() => decreaseQuantity(item.product_id, item.quantity)}>
                <FaMinus />
            </div>
            <div className='flex items-center justify-center'>
            <h3 className='mx-5'> {item.quantity} </h3>
            </div>
            <div className='p-2 rounded-full bg-gray-500 cursor-pointer active:bg-sky-100' onClick={() => increaseQuantity(item.product_id, item.quantity, item.countInStock)}>
                <FaPlus />
            </div>
            </div>
            {item.quantity >= item.countInStock  && (<p className='text-black font-bold text-sm outstock mt-3 text-left'> This quantity reached a number of products available in stock! </p>)}
            </div>

            <div className='cursor-pointer' onClick={() => removeProduct(item.product_id)}>
                <FaTrash size={30} color={"lightblue"}/>
            </div>
        </div>



    </div>
  )
};



SingleProductInCart.propTypes = {
    item: PropTypes.object
};

export default SingleProductInCart