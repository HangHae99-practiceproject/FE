import { Route, Routes} from 'react-router-dom'
import React from 'react';

//pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Search from './pages/Search';
import AddPlans from './pages/AddPlans';

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path='/*' element={<Home/>} />
        <Route path='/search/*' element={<Search/>} />
        <Route path='/add/*' element={<AddPlans/>}/>
        <Route path='/signin/*' element={<Signin/>} />
        <Route path='/signup/*' element={<Signup/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
