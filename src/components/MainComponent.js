import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state={
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }
  render() {
    const Homepage=() => {
      return(
        <Home 
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId=({match}) => {
      return(
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id=== parseInt(match.params.dishId,10))[0]}
                comments={this.state.comments.filter((comment) => comment.dishId=== parseInt(match.params.dishId,10))} />

      );
    };
  return (
      <div>
      <Header />
      <Switch>
        <Route path="/Home" component={Homepage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
        <Route exact path="/contactus" component={Contact} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
        <Redirect to="/Home" />
      </Switch>
      <Footer />
    </div>
  );
}
}

export default Main;
