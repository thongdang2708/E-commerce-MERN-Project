
import React from 'react';

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner';
import { getSingleProductWithAdminRole } from '../actions/ProductListActions';
import {toast} from "react-toastify";
import { resetAfterAddingProduct } from '../actions/ProductListActions';
import { updateProductWithAdminRole } from '../actions/ProductListActions';


//Page to update a product
function UpdateProductByAdmin() {

     //Global state of user

     let {user} = useSelector(state => state.user);

     //Set navigate
     let navigate = useNavigate();
     let dispatch = useDispatch();
     let params = useParams();
     let productId = params.productId;

     //Global state of product with admin role

     let {singleproduct, productListLoading, productListSuccess, productListMessage} = useSelector(state => state.productList);

     //Set effect not to allow users to access this page

     useEffect(() => {

        if (user && !user.isAdmin) {
          navigate("/profile");
        }
      },[user]);

    
    //Set effect to display a single product
    useEffect(() => {
        dispatch(getSingleProductWithAdminRole(productId));
    },[productId]);


     //Set state for data in form

     let [formData, setFormData] = useState({
        name: "",
        price: 0,
        brand: "",
        countInStock: 0,
        category: "",
        description: ""
    })

    let [image, setImage] = useState("");
    let [imageFile, setImageFile] = useState({}); 

    //Set effect when a single product is fetched

    useEffect(() => {

        setFormData({
            name: singleproduct.name,
            price: Number(singleproduct.price),
            brand: singleproduct.brand,
            countInStock: Number(singleproduct.countInStock),
            category: singleproduct.category,
            description: singleproduct.description
        });
        setImage(singleproduct.image);

    },[singleproduct]); 


    //Set effect when updating successfully

    useEffect(() => {

        if (productListSuccess) {
            toast.success(productListMessage);
            navigate("/admin/productlist");
            dispatch(resetAfterAddingProduct());
        }

    },[productListSuccess, productListMessage, navigate, dispatch]);

    //Set changes for data in form

    const handleChange = (e) => {

        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleImage = (e) => {

        if (e.target.files[0] !==  undefined) {
            setImage(e.target.files[0].name);
            setImageFile(e.target.files[0]);
        }
    };

    //Submit to edit a product's information

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || Number(formData.price) === 0 || !formData.brand || Number(formData.countInStock) === 0 || !formData.category || !formData.description) {
            toast.error("Please fill information!")
        } else {

            let newForm = new FormData();
            newForm.append("image", imageFile);

            let inputData = {
                name: formData.name,
                image,
                price: Number(formData.price),
                brand: formData.brand,
                countInStock: Number(formData.countInStock),
                category: formData.category,
                description: formData.description
            };

            newForm.append("body", JSON.stringify(inputData));

            dispatch(updateProductWithAdminRole(productId, newForm));
        }
    };
   
    


    if (productListLoading) {
        return (<Spinner />)
    };

    if (singleproduct.message) {
        return (<div className='text-center text-pink-500 text-3xl mt-96 mb-96'> Something Went Wrong! </div>)
    };


  return (
    <div className="mx-auto w-10/12 mb-52 mt-10 p-2">
        <Link to="/admin/productlist">
            <div className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500'> Back </div>
        </Link>

        <h1 className='text-black font-bold text-2xl mt-5'> Create Product </h1>

        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className='form-group flex flex-col'>
                    <label htmlFor="name" className='text-black font-bold text-xl my-3'> Name: </label>
                    <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col'>
                    <label htmlFor="price" className='text-black font-bold text-xl my-3'> Price: </label>
                    <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col mb-5'>
                    <label className='text-black font-bold text-xl my-3'> Image: </label>

                    <div className='mt-4'>
                    <div className='flex'>
                    <label htmlFor="image" className='rounded-lg shadow-lg p-2 w-36 flex items-center justify-center bg-sky-500 text-black font-bold mr-2 cursor-pointer'> Browse File </label>
                    <div className='w-full rounded-lg shadow-lg bg-gray-500 p-4 text-white'> {image} </div>
                    </div>
                    <input type="file" name="image" id="image" className='hidden' onChange={handleImage}/>
                    </div>
                </div>

                <div className='form-group flex flex-col'>
                    <label htmlFor="brand" className='text-black font-bold text-xl my-3'> Brand: </label>
                    <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col'>
                    <label htmlFor="countInStock" className='text-black font-bold text-xl my-3'> Count In Stock: </label>
                    <input type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} id="countInStock" className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col'>
                    <label htmlFor="category" className='text-black font-bold text-xl my-3'> Category: </label>
                    <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div className='form-group flex flex-col'>
                    <label htmlFor="description" className='text-black font-bold text-xl my-3'> Description: </label>
                    <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} className='input input-lg bg-gray-500 text-white focus:outline-0'/>
                </div>

                <div>
                    <button type='submit' className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 mt-5'> Submit </button>
                </div>

                
            </form>
        </div>
    </div>
  )
};

export default UpdateProductByAdmin