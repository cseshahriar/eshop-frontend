import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
      <BrowserRouter>
          {/* header */}
          <Header/>

          {/* content */}
          <main className="py-3">
              <Container>
                  <Routes>
                      <Route path="/" element={<HomeScreen />} />
                      <Route path="/product/:id" element={<ProductScreen />} />

                      <Route path="/login" element={<LoginScreen />} />
                      <Route path="/register" element={<RegisterScreen />} />
                      <Route path="/profile" element={<ProfileScreen />} />

                      <Route path="/cart/:id?" element={<CartScreen />} />
                  </Routes>
              </Container>
          </main>

          {/* footer */}
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
