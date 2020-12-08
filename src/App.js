import React from "react";
import "./App.css";
import Home from "./components/home";
import Header from "./components/header";
import Search from "./components/search";
import Upload from "./components/upload";
import Qpaper from "./components/qpaper";
import Login from "./components/login";
import Profile from "./components/profile";
import Pdfviewer from "./components/pdfviewer";
import { Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user, userfirst }] = useStateValue();
  // console.log(user);
  return (
    <div className="app">
      <Header />
      {user ? (
        userfirst ? (
          <Profile />
        ) : (
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/upload" component={Upload} />
            <Route path="/" component={Home} exact />
            <Route path="/qp" component={Qpaper} />
            <Route path="/profile" component={Profile} />
            <Route path="/pdf" component={Pdfviewer} />
            {/* 
                <Home/>
                <Search/>
              <Upload/>
            */}
          </Switch>
        )
      ) : (
        <Login />
      )}
    </div>
  );
}
// function Signin(){
//   const signinwithgoogle = () =>{
//     auth.signInWithPopup(provider)
//   }
//   return(
//   <button onClick={signinwithgoogle}>google sign in!</button>
//   )
// }
export default App;
