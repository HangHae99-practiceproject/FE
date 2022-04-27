import './App.css';
import { Route, Routes} from 'react-router-dom'
import {React, useEffect} from 'react';

//pages
import Main from './pages/Main';
import Signin from './pages/signin';
import Signup from './pages/signup';


// import { Counter } from './features/counter/Counter';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/*' element={<Main/>} />
        <Route path='/signin/*' element={<Signin/>} />
        <Route path='/signup/*' element={<Signup/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
