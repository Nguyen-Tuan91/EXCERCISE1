import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state={
      dish: DISHES
    };
  }
  render() {
    const Homepage=() => {
      return(
        <Home />
      );
    }
  return (
      <div>
      <Header />
      <Switch>
        <Route path="/Home" component={Homepage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
        <Redirect to="/Home" />
      </Switch>
      <Footer />
    </div>
  );
}
}

export default Main;
