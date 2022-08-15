
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { displayProducts } from '../../actions/ProductListFetchAction';
import { useEffect } from 'react';
import {toast} from "react-toastify";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import SingleProductForCarousel from './SingleProductForCarousel';
import '@splidejs/react-splide/css';


function SliderProducts() {

    //Global state of products
    let {products, isError, message} = useSelector(state => state.products);

    //Set dispatch
    let dispatch = useDispatch();

    //Set effect to fetch products' details
    useEffect(() => {
        if (isError) {
            toast.error(message)
        };

        dispatch(displayProducts());
    },[isError, message, dispatch]);


  return (
      <div className='my-14 w-10/12 xl:w-9/12 lg:w-9/12 md:w-9/12 mx-auto'>
        <Splide options={{
          rewind: true,
          arrows: true,
          pagination: true,
        }}>
        {products.slice(0, 3).map((product) => (
          <SplideSlide>
          <SingleProductForCarousel key={product._id} product={product}/>
          </SplideSlide> 
        ))}
       </Splide>
      </div>
  )
}

export default SliderProducts