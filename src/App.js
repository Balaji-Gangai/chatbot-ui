import React from 'react';
import {Route, Routes } from 'react-router-dom'
import ChatBox from './pages/ChatBox';


const App = () => { 
  return (

    <Routes>    
      <Route path="/" element={<ChatBox />}></Route>
    </Routes>
  );
};

export default App;
