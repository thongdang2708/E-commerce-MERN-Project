
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function SingleProductInSingleOrderPage() {

    //Calculate the total price of each product

    // const calculateEachPrice = (quantity, price) => {
    //     return quantity * price;
    // };

    let {numItems} = useSelector(state => state.order);



  return (
    <div className='my-3 pb-4 pl-2 border-b-2 border-b-gray-200 last:border-0 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4'>
        {numItems.length}
        {/* <div className='col-span-0 xl:col-span-2 lg:col-span-2 md:col-span-2 grid grid-cols-2 gap-5'>
            <div>
            <img src={item.image} alt="product" className='inline-block w-full rounded-lg shadow-lg h-full'/>
            </div>

            <div>
            <p className='text-black font-bold'> {item.name} </p>
            </div>
         
        </div>
        
        
        <div className='col-span-0 xl:col-span-1 lg:col-span-1 md:col-span-1 mt-4 xl:mt-0 lg:mt-0 md:mt-0'>
            <p className='text-black'> {item.quantity} x ${item.price} = ${calculateEachPrice(item.quantity, item.price)}</p>
        </div> */}
    </div>  
  )
};

SingleProductInSingleOrderPage.propTypes = {
    item: PropTypes.object
};

export default SingleProductInSingleOrderPage