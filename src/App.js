import React from "react";
import "./App.css";
import Home from './components/home';
import Header from "./components/header";
import Search from './components/search';
import Upload from './components/upload';
import Qpaper from './components/qpaper';
import { Switch,Route,} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
    <Switch>
    <Route path="/search" component={Search}/>
     
    <Route path="/upload" component={Upload}/>
     
    <Route path="/" component={Home} exact/>
    <Route path="/qp" component={Qpaper} />
    
     {/* 
      
      <Home/>
      <Search/>
     <Upload/>
     */}
  </Switch>
  </div>
    
 
   

 

  );
}

export default App;
