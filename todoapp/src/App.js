import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import TodoApp from './Pages/TodoApp';



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/TodoApp" element={<TodoApp />} />
      </Routes>
    </div>
  );
}

export default App;
