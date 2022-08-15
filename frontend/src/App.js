
import { Provider } from "react-redux";
import store from "./store";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/layouts/Header";
import CartPage from "./pages/CartPage";
import LogInPage from "./pages/LogInPage";
import SearchBar from "./components/layouts/SearchBar";
import Footer from "./components/layouts/Footer";
import SliderProducts from "./components/ForHomePage/SliderProducts";
import DisplayProducts from "./components/ForHomePage/DisplayProducts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import SingleProductDetail from "./pages/SingleProductDetail";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Private from "./components/Private/Private";
import UserListOfAdmin from "./pages/UserListOfAdmin";
import UpdatePasswordForUser from "./pages/UpdatePasswordForUser";
import ShippingPage from "./pages/ShippingPage";
import PaymentSelection from "./pages/PaymentSelection";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import SingleOrderDetailsPage from "./pages/SingleOrderDetailsPage";
import ProductListOfAdmin from "./pages/ProductListOfAdmin";
import OrderListOfAdmin from "./pages/OrderListOfAdmin";
import EditUserForAdmin from "./pages/EditUserForAdmin";
import CreateProductByAdmin from "./pages/CreateProductByAdmin";
import UpdateProductByAdmin from "./pages/UpdateProductByAdmin";

//Main App

function App() {

  //Set text for search bar

  let [text, setText] = useState("");
  

  //Set function to change text
  const changeText = (text) => {
    setText(text);
  };




  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Header />

   
      <Routes>
        {/* Home Page */}
        <Route exact path="/" element={
        <>
        <SliderProducts /> 
        <SearchBar changeText={changeText}/>
        <DisplayProducts text={text}/>
        </>
        }/>
        {/* Cart Page */}
        <Route path="/cart" element={<CartPage />}/>

        {/* Log In Page */}
        <Route path="/login" element={<LogInPage />}/>

        {/* Single Product Page */}
        <Route path="/product/:id" element={<SingleProductDetail />} />

        {/* Register Page */}
        <Route path="/register" element={<SignUpPage />}/>

        {/* Profile page of user */}
        <Route path="/profile" element={<Private />}>
        <Route path="/profile" element={<ProfilePage />}/>
        </Route>

        {/* User list for admin */}
        <Route path="/admin/userlist" element={<Private/>}>
        <Route path="/admin/userlist" element={<UserListOfAdmin />}/>
        </Route>

        {/* Update password for user */}
        <Route path="/updatepassword" element={<Private />}>
            <Route path="/updatepassword" element={<UpdatePasswordForUser />}/>
        </Route>

        {/* Page to fill out a shipping address for user*/}
        <Route path="/shippingaddress" element={<Private/>}>
            <Route path="/shippingaddress" element={<ShippingPage />}/>
        </Route>

        {/* Page to fill out payment method for user*/}
        <Route path="/paymentmethod" element={<Private />}> 
            <Route path="/paymentmethod" element={<PaymentSelection />}/>
        </Route>

        {/* Page to place order for user */}
        <Route path="/placeorder" element={<Private />}>
            <Route path="/placeorder" element={<PlaceOrderPage />}/>
        </Route>

        {/* Page for a single order's details*/}

        <Route path="/order/:orderId" element={<Private />}>
            <Route path="/order/:orderId" element={<SingleOrderDetailsPage />} />
        </Route>

        {/* Page to show a product list for admin */}
        <Route path="/admin/productlist" element={<Private />}>
            <Route path="/admin/productlist" element={<ProductListOfAdmin />}/>
        </Route>

        {/* Page to show an order list for admin */}
        <Route path="/admin/orderlist" element={<Private />}>
            <Route path="/admin/orderlist" element={<OrderListOfAdmin/>}/>
        </Route>

        {/* Page to edit user for admin */}
        <Route path="/edituser/:userId" element={<Private />}>
            <Route path="/edituser/:userId" element={<EditUserForAdmin />}/>
        </Route>

        {/* Create products by admin */}
        <Route path="/admin/createproduct" element={<Private />}>
            <Route path="/admin/createproduct" element={<CreateProductByAdmin />}/>
        </Route>

        {/* Update product by admin */}
        <Route path="/admin/updateproduct/:productId" element={<Private />}>
            <Route path="/admin/updateproduct/:productId" element={<UpdateProductByAdmin/>}/>
        </Route>

      </Routes>
      <Footer />
    </div>
    </Router>
    <ToastContainer />
    </Provider>
  );
}

export default App;
