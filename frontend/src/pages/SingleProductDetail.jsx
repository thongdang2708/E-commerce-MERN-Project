
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { displaySingleProduct } from '../actions/ProductListFetchAction';
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import {AiOutlineStar} from "react-icons/ai";
import {FaPlus} from "react-icons/fa";
import {FaMinus} from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/CartActions';
import { displayReviews } from '../actions/reviewActions';
import SingleReview from '../components/ForSingleProductDetailPage/SingleReview';
import { addReview } from '../actions/reviewActions';
import Spinner from '../components/layouts/Spinner';
import { useNavigate } from 'react-router-dom';
import { removeSuccess } from '../actions/CartActions';

//Page to display single product
function SingleProductDetail() {

    //Set dispatch, navigate and params
    let dispatch = useDispatch();
    let param = useParams();
    let id = param.id;
    let navigate = useNavigate();

    //Global state of products (with single product information)
    let {product, isLoading} = useSelector(state => state.products);

    //Global state of reviews

    let {reviews, isLoadingReview, isErrorReview, messageReview} = useSelector(state => state.review);

    //Global state of cart
    let {isSuccessCart} = useSelector(state => state.cart);


    //Global state of user

    let {user} = useSelector(state => state.user); 

    //Set effect to display single product
    useEffect(() => {

        if (product.message) {
            toast.error("Something went wrong!")
        };

        dispatch(displaySingleProduct(id));
        //eslint-disabled-next-line

    },[product.message, id]);


    //Set effect to display reviews

    useEffect(() => {

        if (isErrorReview) {
            toast.error(messageReview);
        };

        dispatch(displayReviews(id));
        //eslint-disabled-next-line

    },[isErrorReview, messageReview, id]);

    //Set default number of quantity

    let [quantity, setQuantity] = useState(1);

    //Function to decrease quantity

    const decreaseQuantity = () => {

        quantity--;
        if (quantity < 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity);
        }
    };
    //Function to increase quantity

    const increaseQuantity = () => {
        quantity++;

        if (quantity > product.countInStock) {
            setQuantity(product.countInStock)
        } else {
            setQuantity(quantity);
        }
    };

    //Function to add products to cart


    const handleSubmitAddToCart = (e) => {
        e.preventDefault();

        dispatch(addToCart(product._id, quantity));
    };

    //Set effect when adding to cart successfully

    useEffect(() => {
        if (isSuccessCart) {
            toast.success("Add to cart successfully!");
            navigate("/cart");
        };
        dispatch(removeSuccess());
        
    },[isSuccessCart, dispatch, navigate]);

    //Check whether the user gave a comment to this product already with logged-in user

    let userId; 
    let isAdminCheck;
    let commentedUser;

    if (user !== null && !product.message) {
        userId = user.id;
        isAdminCheck = user.isAdmin;
        commentedUser = reviews.find((review) => review.user === userId);
    }

    //Set state for data in review submit form

    let [rating, setRating] = useState("Select...!");
    let [comment, setComment] = useState("");

    //Set changes for data in review submit form;
    
    const changeRating = (e) => {

        setRating(Number(e.target.value));
 
    };

    const changeComment = (e) => {

        setComment(e.target.value);
    };

    //Submit a review

    const handleSubmit = (e) => {

        e.preventDefault();

        if (rating !== "Select...!") {
            let inputData = {
                name: user.name,
                rating: rating,
                comment: comment
            }

            dispatch(addReview(id, inputData));
        
        };

        setRating("Select...!");
        setComment("");
    };
    
    if (isLoading || isLoadingReview) {
        return (<Spinner />)
    };

    if (product.message) {
        return (<div className='text-center text-pink-500 text-3xl mt-96 mb-96'> Something Went Wrong! </div>)
    };

  return (
    <div className='mb-80'>
    
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 w-11/12 mx-auto mt-10'>
        <div className='col-span-1'>
            <div className='h-96 rounded-lg shadow-lg mr-5'>
                <img src={product.image} alt="image" className='inline-block rounded-lg h-full w-full shadow-lg'/>
            </div>
        </div>

        <div className='col-span-1 xl:border-l-2 lg:border-l-2 md:border-l-2 xl:pl-4 lg:pl-4 md:pl-4 pt-5'>
            
            <div className='flex py-5 border-t-2 items-center justify-around'>
                <div className=''>
                    Price:
                </div>

                <div>
                    ${product.price}
                </div>
            </div>

            <div className='flex py-5 border-t-2 border-b-2 items-center justify-around'>
                <div className=''>
                    Status:
                </div>

                <div>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </div>
            </div>

            {product.countInStock > 0 && (
                <div className='flex py-5 items-center justify-around w-full ml-4'>
                <div className=''>
                    Quantity: 
                </div>

                <div className='flex items-center'>
                    <div className='rounded-full bg-gray-300 p-3 shadow-lg cursor-pointer' onClick={decreaseQuantity}>
                        <FaMinus />
                    </div>

                    {/* quantity = 0, so it cannot go lower, and when quantity > an in-stock figure, it cannot go higher */}
                    <div className='mx-5'>
                        {quantity}
                    </div>

                    <div className='rounded-full bg-gray-300 p-3 shadow-lg cursor-pointer' onClick={increaseQuantity}>
                        <FaPlus />
                    </div>
                </div>
            </div>
            )}

            {product.countInStock > 0 && user && !user.isAdmin ? (
                <form onSubmit={handleSubmitAddToCart}>
                <button type="submit" className='btn btn-lg w-full hover:outline-0'>
                    Add To Cart 
                </button>
                </form>
            ) : (
                <div className='w-full p-4 text-center bg-pink-500 rounded-lg shadow-lg text-black font-bold'>
                    Admin is not allowed to conduct a purchase! Only a user can!
                </div>
            )}
        </div>
    </div>

    <div className='w-11/12 mx-auto mt-10'>
                <h3 className='text-black font-bold text-lg xl:text-3xl lg:text-xl md:text-lg mb-6'> {product.name} </h3>

                <div className='flex mb-4'>
                    <div>
                    {product.rating >= 1 ? <BsStarFill color='brown'/> : product.rating === 0.5 ? <BsStarHalf color='brown'/> : <AiOutlineStar color='brown'/>}
                    </div>
                    <div>
                    {product.rating >= 2 ? <BsStarFill color='brown'/> : product.rating === 1.5 ? <BsStarHalf color='brown'/> : <AiOutlineStar color='brown'/>}
                    </div>
                    <div>
                    {product.rating >= 3 ? <BsStarFill color='brown'/> : product.rating === 2.5 ? <BsStarHalf color='brown'/> : <AiOutlineStar color='brown'/>}
                    </div>
                    <div>
                    {product.rating >= 4 ? <BsStarFill color='brown'/> : product.rating === 3.5 ? <BsStarHalf color='brown'/> : <AiOutlineStar color='brown'/>}
                    </div>
                    <div>
                    {product.rating >= 5 ? <BsStarFill color='brown'/> : product.rating === 4.5 ? <BsStarHalf color='brown'/> : <AiOutlineStar color='brown'/>}
                    </div>

                </div>

                <p className='text-black font-bold text-lg'> {product.numReviews} reviews </p>
                <p className='pb-4 border-b-2 border-b-gray-300 text-black font-bold text-lg mt-3'> ${product.price} </p>
                <p className='text-black font-bold text-lg mt-3'> Category: {product.category} </p>
                <p className='text-black font-bold text-lg mt-3 description text-justify'> Description: {product.description} </p>
                
    </div>

    <div className='w-11/12 mx-auto mt-10'>
        <h1 className='text-black font-bold text-3xl mb-5'> Reviews </h1>
        
        {reviews.length > 0 
        ? 
        (
            <div>
            {reviews.map((review) => (
                <SingleReview key={review._id} review={review}/>
            ))}
            </div>
        )

        :

        (
            <div className='ml-4 text-black font-bold text-2xl'>
                No Reviews
            </div>
        )
    
    }
        

        <div className='form my-5'>
            <h2 className='text-black font-bold text-2xl'> Write a customer review! </h2>
          
            {
            // Check whether this user already commented.
            
            commentedUser 

            ? 

            (
            
            <div className='w-full mt-5 pl-3 py-5 bg-pink-200 text-black font-bold rounded-lg shadow-lg'> This logged-in user already commented this product! </div>) 
            : 

            // Check whether this user already commented and this user is admin.
            (!commentedUser && isAdminCheck) 
            
            ? 
            
            (<div className='w-full mt-5 pl-3 py-5 bg-pink-200 text-black font-bold rounded-lg shadow-lg'> This user is admin. Not authorized to comment! </div>) 
            
            : 
            
            //Check whether there is a user. If not, please sign in.
            user === null 
            
            ? 
            
            (<Link to="/login"> <div className='btn btn-lg p-3 bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 mt-5'> Please sign in to review </div> </Link>) 
            
            : 
            
            (<form onSubmit={handleSubmit}> 
                
            <div className='form-group flex flex-col'>
                <label htmlFor="rating" className='text-black font-bold mb-4 mt-4'> Rating: </label>
                <select name="rating" id="rating" value={rating} className="input input-lg bg-gray-500 w-80 focus:outline-0 text-white cursor-pointer" onChange={changeRating}> 
                    <option value="Select...!" disabled> Select...! </option>
                    <option value="1"> 1 - Poor </option>
                    <option value="2"> 2 - Fair </option>
                    <option value="3"> 3 - Good </option>
                    <option value="4"> 4 - Very Good </option>
                    <option value="5"> 5 - Excellent </option>
                </select>
            </div>

            <div className='form-group flex flex-col'>
                <label htmlFor="comment" className='text-black font-bold mb-4 mt-4'> Comment: </label>
                <textarea name="comment" id="comment" rows="10" className='w-80 bg-gray-500 focus:outline-0 text-white pl-4 rounded-lg shadow-lg' value={comment} onChange={changeComment}></textarea>
            </div>

            <div className='form-group mt-5'>
                <button type='submit' className='w-80 btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500'> Submit </button>
            </div>

            
            </form>)}
        </div>

        
    </div>
    
    </div>

  )
};




export default SingleProductDetail