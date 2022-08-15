
import React from 'react';
import PropTypes from 'prop-types';
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import {AiOutlineStar} from "react-icons/ai";

function SingleReview({review}) {
  return (
    <div className='pl-2 mt-3 pb-3 border-b-2 border-b-gray-500 last:border-0'>
        <h1 className='text-lg font-bold text-black mb-3'> {review.name} </h1>

        <div className='flex mb-3'>
            <div>  
                {review.rating >= 1 ? <BsStarFill color="brown"/> : review.rating === 0.5 ? <BsStarHalf color="brown"/> : <AiOutlineStar color="brown"/>}
            </div>

            <div>  
                {review.rating >= 2 ? <BsStarFill color="brown"/> : review.rating === 1.5 ? <BsStarHalf color="brown"/> : <AiOutlineStar color="brown"/>}
            </div>

            <div>  
                {review.rating >= 3 ? <BsStarFill color="brown"/> : review.rating === 2.5 ? <BsStarHalf color="brown"/> : <AiOutlineStar color="brown"/>}
            </div>

            <div>  
                {review.rating >= 4 ? <BsStarFill color="brown"/> : review.rating === 3.5 ? <BsStarHalf color="brown"/> : <AiOutlineStar color="brown"/>}
            </div>

            <div>  
                {review.rating >= 5 ? <BsStarFill color="brown"/> : review.rating === 4.5 ? <BsStarHalf color="brown"/> : <AiOutlineStar color="brown"/>}
            </div>

            
        </div>

        <div className='text-black font-bold mb-3'>
            {new Date(review.createdAt).toLocaleString("en-US")}
        </div>

        <div className='text-black font-bold'>
            {review.comment}
        </div>


    </div>
  )
};

SingleReview.propTypes = {
    review: PropTypes.object
};

export default SingleReview