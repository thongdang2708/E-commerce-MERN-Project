
import React from 'react';
import PropTypes from 'prop-types';
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import {AiOutlineStar} from "react-icons/ai";
import { Link } from 'react-router-dom';

function SingleProduct({product}) {
  return (
    <Link to={`/product/${product._id}`}>
   <div className='h-full p-5 border-2 rounded-lg shadow-lg cursor-pointer'>
       <div>
       <img src={product.image} alt="product" className='inline-block w-full h-44 rounded-lg'/>
       </div>

        <h1 className='text-black font-bold mt-5 text-xl'> {product.name} </h1>

        <div className='flex mt-5'>
            <div>
                {product.rating >= 1 ? <BsStarFill color={"brown"}/> : product.rating === 0.5 ? <BsStarHalf  color={"brown"}/> : <AiOutlineStar color={"brown"}/>}
            </div>

            <div>
                {product.rating >= 2 ? <BsStarFill color={"brown"}/> : product.rating === 1.5 ? <BsStarHalf  color={"brown"}/> : <AiOutlineStar color={"brown"}/>}
            </div>

            <div>
                {product.rating >= 3 ? <BsStarFill color={"brown"}/> : product.rating === 2.5 ? <BsStarHalf color={"brown"}/> : <AiOutlineStar  color={"brown"}/>}
            </div>

            <div>
                {product.rating >= 4 ? <BsStarFill color={"brown"}/> : product.rating === 3.5 ? <BsStarHalf  color={"brown"}/> : <AiOutlineStar color={"brown"}/>}
            </div>

            <div>
                {product.rating >= 5 ? <BsStarFill color={"brown"}/> : product.rating === 4.5 ? <BsStarHalf color={"brown"}/> : <AiOutlineStar color={"brown"}/>}
            </div>
        </div>

        <h3 className='text-black font-bold text-lg mt-5'> {product.numReviews} reviews </h3>

        <h5 className='text-black font-bold text-lg mt-5'> $ {product.price} </h5>
   </div>
   </Link>
  )
};

SingleProduct.propTypes = {
    product: PropTypes.object.isRequired
};

export default SingleProduct