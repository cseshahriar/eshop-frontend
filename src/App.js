import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';

function App() {
  return (
      <BrowserRouter>
          {/* header */}
          <Header/>

          {/* content */}
          <main className="py-3">
              <Container>
                  <Routes>
                      <Route path="/" element={<HomeScreen/>} />
                  </Routes>
              </Container>
          </main>

          {/* footer */}
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
