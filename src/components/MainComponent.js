import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  }
};

const mapDispatchToProps= dispatch => ({
  postComment: (dishId, comment, author, rating) => dispatch(postComment(dishId, comment, author, rating)),
  postFeedback: (firstname, lastname, email, telnum, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, email, telnum, agree, contactType, message)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {
 
 

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render() {
    const Homepage=() => {
      return(
        <Home 
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWithId=({match}) => {
      return(
        <Dishdetail dishes={this.props.dishes.dishes.filter((dish) => dish.id=== parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId=== parseInt(match.params.dishId,10))} 
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
        />
      );
    };
  return (
      <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch location={this.props.location}>
        <Route path="/Home" component={Homepage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
        <Route exact path="/contactus" component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
        <Redirect to="/Home" />
        </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
