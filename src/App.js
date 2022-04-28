import { Route, Routes} from 'react-router-dom'
import React from 'react';

//pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path='/*' element={<Home/>} />
        <Route path='/signin/*' element={<Signin/>} />
        <Route path='/signup/*' element={<Signup/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
