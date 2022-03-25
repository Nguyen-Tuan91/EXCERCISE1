import React, { Component } from 'react';
import StaffList from '../Components/StaffList';
import StaffDetail from '../Components/StaffdetailComponent';
import Department from '../Components/DepartmentComponent';
import StaffInDept from '../Components/StaffInDeptComponent';
import Salary from '../Components/SalaryComponent';
import Footer from '../Components/FooterComponent';
import Header from '../Components/HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { postStaff, fetchStaffs, fetchDepartments, fetchStaffsSalary, deleteStaff} from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps=state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalary: state.staffsSalary,
    }
}

const mapDispatchToProps= dispatch => ({
    postStaff: (staff) => {dispatch(postStaff(staff))},
    fetchStaffs: () => {dispatch(fetchStaffs())},
    fetchDepartments: () => {dispatch(fetchDepartments())},
    fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},
    deleteStaff: (id) => {dispatch(deleteStaff(id))}   
});

class Main extends Component {
   
    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchStaffsSalary();
    }
    render() {
        const StaffWithId=({match}) => {
            return(
                <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id===parseInt(match.params.staffId,10))[0]}
                             isLoading={this.props.staffs.isLoading}
                             errMess={this.props.staffs.errMess}
                             dept={this.props.departments.departments}
                           
                />
            );
        };
      const StaffWithDept=({match}) => {
          return(
              <StaffInDept  dept={this.props.departments.departments.filter((dept) => dept.id===match.params.deptId)[0]}
                            staff={this.props.staffs.staffs.filter((staff) => staff.id===match.params.staffId)}
               />
            );
      };

    return(
        <div>
            <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timout={300}>
                        <Switch location={this.props.location}>
                        <Route exact path="/staff" component={() => <StaffList staffs={this.props.staffs.staffs}
                                                                            onAddStaff={this.props.postStaff}
                                                                            isLoading={this.props.staffs.isLoading}
                                                                            errMess={this.props.staffs.erMess}
                                                                            onDeleteStaff={this.props.deleteStaff} />}
                        />
                        <Route path="/staff/:staffId" component={StaffWithId} />
                        <Route path="/department/:departmentId" component={StaffWithDept} />
                        <Route path="/department" component={() => <Department departments={this.props.departments.departments}
                                                                                staffs={this.props.staffs.staffs} />} />
                        <Route path="/salary" component={() => <Salary salary={this.props.staffsSalary.staffsSalary} />} />
                        <Redirect to="/staff" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            <Footer />
        </div>
    );
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));