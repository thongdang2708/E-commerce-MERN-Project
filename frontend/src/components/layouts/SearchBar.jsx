

import React from 'react';
import { useState } from 'react';

//Search input
function SearchBar({changeText}) {

    //Set text for input
    let [searchText, setSearchText] = useState("");

    //Set change for input

    const handleChange = (e) => {
        setSearchText(e.target.value);
        changeText(e.target.value.trim().toLowerCase());
    };
    

  return (
    <div className='w-10/12 xl:w-9/12 lg:w-9/12 md:w-9/12 mx-auto my-10'>
        <div className='form-control'>
            <input type="text" name="search" value={searchText} onChange={handleChange} id="search" className='input input-lg bg-gray-500 focus:outline-0 text-white' placeholder='Search Products'/>
        </div>
    </div>  
  )
};



export default SearchBar