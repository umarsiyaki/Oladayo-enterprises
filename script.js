
// script.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Calculator from './components/Calculator';
import Blog from './components/Blog';
import Admin from './components/Admin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={AddProduct} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/blog" component={Blog} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));