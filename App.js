import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from './components/layouts/sidebar';
import Navbar from './components/layouts/navbar'
// import Footer from './components/layouts/footer';
import addFaqs from './components/Faq/addFaq';
import Dashboard from './components/layouts/dashboard';
import ListFaq from './components/Faq/listFaq';
import addPages from './components/Pages/addPages';
import listPages from './components/Pages/listPages';
import listCountry from './components/country/listCountry';
import addCountry from './components/country/addCountry';
import BreadCrumb from './components/breadcrumbs/Breadcrumbs';
function App() {
  return (
    <Router>
    <div class="container-scroller">
      <Navbar/>
      <div class="container-fluid page-body-wrapper">
  
      <Sidebar/>
      <BreadCrumb/>
      <Switch>
     
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/add-faq" component={addFaqs}/>
      <Route exact path="/list-faq" component={ListFaq}/>
      <Route exact path="/add-page" component={addPages}/>
      <Route exact path="/list-page" component={listPages}/>
      <Route exact path="/add-country" component={addCountry}/>
      <Route exact path="/list-country" component={listCountry}/>
      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
