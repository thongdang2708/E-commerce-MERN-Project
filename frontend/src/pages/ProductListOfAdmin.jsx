
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductWithAdminRole, displayProductListByAdmin } from '../actions/ProductListActions';
import { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import {MdDelete} from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//Page to show a product list for an admin

function ProductListOfAdmin() {

    //Global state of a product list

    let {productList, productListLoading, productListError, productListMessage} = useSelector(state => state.productList);
    let {user} = useSelector(state => state.user);

    //Set dispatch and navigate
    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Set effect to display a product list

    useEffect(() => {
        dispatch(displayProductListByAdmin());
    },[dispatch]);

    //Set effect to prevent a user to access this route

    useEffect(() => {

      if (user && !user.isAdmin) {
        navigate("/profile");
      }
    },[user]);

    //Function to delete product

    const deleteProduct = (productId) => {
        dispatch(deleteProductWithAdminRole(productId));
    };



  return (
    <div className='w-10/12 mx-auto mb-80 mt-10'>
        <h1 className='text-black font-bold text-3xl my-10'> Product List! </h1>

        <Link to="/admin/createproduct">
        <div className='btn btn-lg bg-sky-500 text-white hover:bg-slate-200 hover:text-sky-500 my-5'> Create A Product! </div>
        </Link>
       
        <div className='overflow-x-auto relative my-5'>
          <table className='auto w-full'>
              <thead>
                  <tr>
                      <th className='py-3 px-10 text-left border-2 border-gray-200'> ID: </th>
                      <th className='py-3 px-10 text-left border-2 border-gray-200'> NAME: </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> PRICE: </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> CATEGORY: </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> BRAND: </th>
                      <th className='py-3 px-5 text-left border-2 border-gray-200'> DETAILS: </th>
                  </tr>
              </thead>

              <tbody>
                {productList.map((product) => (
                  <tr>
                    <td className='py-3 px-10 border-2 border-gray-200'> {product._id}</td>
                    <td className='py-3 px-10 border-2 border-gray-200'> {product.name} </td>
                    <td className='py-3 px-5 border-2 border-gray-200'> ${product.price} </td>
                    <td className='py-3 px-5 border-2 border-gray-200'> {product.category} </td>
                    <td className='py-3 px-5 border-2 border-gray-200'> {product.brand} </td>
                    <td className='py-3 px-5 border-2 border-gray-200'> 
                        <Link to={`/admin/updateproduct/${product._id}`}>
                        <div className='btn btn-sm bg-emerald-500 text-white hover:bg-slate-200 hover:text-emerald-500 mb-5 mr-3 xl:mb-0 lg:mb-5 md:mb-5'> <FaEdit /> </div>
                        </Link>

                        <div className='btn btn-sm bg-pink-500 text-white hover:bg-slate-200 hover:text-emerald-500' onClick={() => deleteProduct(product._id)}> <MdDelete /> </div>
                     </td>
                
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default ProductListOfAdmin



