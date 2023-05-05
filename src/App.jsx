import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from './components/Login'
import Signup from "./components/Signup";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import {login, logout} from "./store/user/user.slice"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log(user);
        const pickedUser =
        user && (({ accessToken, email, uid, photoUrl, displayName}) => ({ accessToken, email, uid, photoUrl, displayName }))(user);
      
        dispatch(login(pickedUser));
      }else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute >
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;