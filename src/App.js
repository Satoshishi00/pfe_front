import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  CookiesProvider
} from 'react-cookie';

import {
  ToastContainer
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopBar from "components/TopBar";
import Footer from "components/Footer";

import MyRoute from "./components/MyRoute";
import Connection from "./modules/Accounts/Connection";
import Inscription from "modules/Accounts/Inscription";
import Missing from "modules/Accounts/Missing";
import Ajax from "modules/Ajax";
import Home from "modules/Home";
import Qcm from "modules/Qcm";
import TakeQcm from "modules/TakeQcm";
import FlashCards from "modules/FlashCards";
import TakeFlashCards from "modules/TakeFlashCards";
import Profil from "modules/Accounts/Profil";
import Landing from "modules/Landing";


const App = () => (
     <Router>
      <TopBar/>
      <ToastContainer/>
      <CookiesProvider>
        <Switch>
          <MyRoute path="/signin" component={Connection} />
          <MyRoute path="/signup" component={Inscription} />
          <MyRoute path="/missing_pwd" component={Missing}/>
          <MyRoute path="/testAjax" component={Ajax}/>
          <MyRoute path="/home" component={Home} />
          <MyRoute path="/qcm/:id?" component={TakeQcm} />
          <MyRoute path="/qcmList" component={Qcm} />
          <MyRoute path="/flashcards/:id?" component={TakeFlashCards} />
          <MyRoute path="/flashcardsList" component={FlashCards} />
          <MyRoute path="/profil" component={Profil} />
          <MyRoute path="/" component={Landing} />
        </Switch>
      </CookiesProvider>
      <Footer/>
    </Router>
);
export default App;
