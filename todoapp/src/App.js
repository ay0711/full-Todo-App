import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import TodoApp from './Pages/TodoApp';



function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => {
          console.log(`SW registered: ${reg}`);
          console.log(reg);
        })
        .catch(regError => {
          console.log(`SW registration failed: ${regError}`);
          console.log(regError);
        })
    }
  }, [])
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
