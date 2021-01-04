import React, {useEffect} from "react";
import "./App.css";
import Home from "./components/home";
import Header from "./components/header";
import Footer from "./components/footer";
import Search from "./components/search";
import Upload from "./components/upload";
import Qpaper from "./components/qpaper";
import Verify from "./components/verify";
import Login from "./components/login";
import Profile from "./components/profile";
import Admin from "./components/admin";
import DownloadFile from "./components/download";
import { Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user, userfirst }] = useStateValue();
  var Tesseract = window.Tesseract;
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
            <Route path="/admin" component={Admin} />
            <Route path="/verify" component={Verify} />
            <Route path="/download" component={DownloadFile} />
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
      <Footer/>
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
