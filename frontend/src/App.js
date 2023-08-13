import './App.css';
import {useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';


 
function App() {
    const { loading } = useLoadingWithRefresh();
      
    return loading ? (
        <Loader message="Loading, please wait.." />
    ) : (

        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route element={<GuestRoute/>}>
                      <Route  path="/" exact element={<Home />}></Route>
                      <Route path="/authenticate" element={<Authenticate />}> </Route>

                </Route>
                <Route element={<SemiProtectedRoute/>}>
                    <Route path="/activate" element={<Activate />}></Route>
                </Route>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/rooms" element={ <Rooms />}></Route>
                  </Route>   
              
                
                   
              
            </Routes>
        </BrowserRouter>
    );
}

const GuestRoute = () => {
   const { isAuth } = useSelector((state) => state.auth);
    
        
                return (isAuth ? <Navigate to='/rooms'/>
                 : <Outlet/>
          
    );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
   const { user, isAuth } = useSelector((state) => state.auth);
    
                return( !isAuth ? (
                    <Navigate to='/' />
                ) : isAuth && !user.activated ? (
                  <Outlet/>
                ) : (
                    <Navigate to='/rooms'/>
                        
                )
            
        
    );
};

const ProtectedRoute = () => {
    const { user, isAuth } = useSelector((state) => state.auth);
    
        
        
          
                return( !isAuth ? (
                    <Navigate to='/' />
                       
                ) : isAuth && !user.activated ? (
                    <Navigate to='/activate' />
                        
                ) : (
                     <Outlet/>
                )
            
        
    );
};

export default App;