import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import OptionsListEOD from './components/OptionsListEOD'
import OptionsListTradier from './components/OptionsListTradier'
import OptionsListCboe from './components/OptionsListCboe'
import OptionsListPolygon from './components/OptionsListPolygon'
import Home from './components/Home'
import Risk from './components/Risk'
import Alerts from './Alerts'
import Header from './components/Header'
import Typography from '@mui/material/Typography';
import './App.css';

function App() {
  return (
    <div className="App">
        <Header />
        <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/risk" element={<Risk />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/options-eod" element={<OptionsListEOD />} />
              <Route path="/options-tradier" element={<OptionsListTradier />} />
              <Route path="/options-cboe" element={<OptionsListCboe />} />
              <Route path="/options-polygon" element={<OptionsListPolygon />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
