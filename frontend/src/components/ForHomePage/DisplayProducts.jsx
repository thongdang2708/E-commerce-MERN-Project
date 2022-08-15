
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { displayProducts } from '../../actions/ProductListFetchAction';
import {toast} from "react-toastify"
import Spinner from '../layouts/Spinner';
import SingleProduct from './SingleProduct';
import PropTypes from 'prop-types';
import { animate, AnimatePresence, motion } from 'framer-motion';


function DisplayProducts({text}) {

    //Global state of products
    let {products, isError, message, isLoading} = useSelector(state => state.products);

    //Set dispatch
    let dispatch = useDispatch();

    //Set effect to fetch products' details
    useEffect(() => {
        if (isError) {
            toast.error(message)
        };

        dispatch(displayProducts());
    },[isError, message, dispatch]);

    //Filter a product list

    let filterProducts = products.filter((product) => {
        if (text === "") {
            return product
        } else if (product.name.toLowerCase().indexOf(text) > -1) {
            return product
        }
    });




    if (isLoading) {
        return (<Spinner />)
    }

    if (filterProducts.length === 0) {
        return (<div className='text-center mb-96 text-red-500 font-bold'> No Products Found With This Search! </div>)
    }

  return (
    <div className='w-10/12 xl:w-9/12 lg:w-9/12 md:w-9/12 mx-auto my-8 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8 mb-40'>
        <AnimatePresence>
        {filterProducts.map((product) => (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <SingleProduct key={product._id} product={product}/>
            </motion.div>
        ))}
        </AnimatePresence>
    </div>
  )
};

DisplayProducts.propTypes = {
    text: PropTypes.string
};

export default DisplayProducts