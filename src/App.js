import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchProvider } from './components/SearchContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Home from './pages/Home';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Setting from './components/UserSettings';
import NavItem from './AdminAccess/NavItem';
import NavSubItem from './AdminAccess/NavSubItem';
import ManageSlide from './AdminAccess/ManageSlide';
import Product from './components/Product';
import ProductAdd from './Shopkeyper/ProductAdd';
// import ForgotPassword from './components/ForgotPassword';

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          {/* Routes outside of Dashboard */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/itemname" element={<NavItem />} />
          <Route path="/subitemname" element={<NavSubItem />} />
          <Route path="/mangeslid" element={<ManageSlide />} />
          <Route path="/addproduct" element={<ProductAdd />} />

          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="*" element={<Error />} />

          {/* Routes within Dashboard */}
          <Route path="/" element={<Dashboard />}>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/setting" element={<Setting />} /> 
            <Route path="/product" element={<Product />} /> 
          </Route>
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;
