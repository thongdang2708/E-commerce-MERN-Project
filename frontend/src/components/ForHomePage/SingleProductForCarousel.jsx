
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SingleProductForCarousel({product}) {
  return (
    <Link to={`/product/${product._id}`}>
    <div className='w-full bg-gray-500 shadow-lg flex flex-col items-center justify-center p-5 border-white cursor-pointer'>
        <div>
            <h2 className='text-xl font-bold text-black'> {product.name} </h2>
        </div>

        <div>
            <img src={product.image} alt="product"  className='inline-block rounded-full h-52 w-52 my-5 shadow-lg'/>
        </div>
    </div>
    </Link>
  )
};


SingleProductForCarousel.propTypes = {
    product: PropTypes.object.isRequired
};

export default SingleProductForCarousel