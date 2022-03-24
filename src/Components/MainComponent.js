import React, { Component } from 'react';
import StaffList from '../Components/StaffList';
import StaffDetail from '../Components/StaffdetailComponent';
import Department from '../Components/DepartmentComponent';
import StaffInDept from '../Components/StaffInDeptComponent';
import Salary from '../Components/SalaryComponent';
import Footer from '../Components/FooterComponent';
import Header from '../Components/HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchStaffs, fetchDepartments, fetchSalary, fetchStaffInDept } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps=state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        salary: state.salary,
    }
}

const mapDispatchToProps= dispatch => ({
    fetchStaffs: () => {dispatch(fetchStaffs())},
    fetchDepartments: () => {dispatch(fetchDepartments())},
    fetchSalary: () => {dispatch(fetchSalary())},
    
})
class Main extends Component {
   
    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchSalary();
    }
    
    render() {
        const StaffWithId=({match}) => {
            return(
                <StaffDetail staffs={this.props.staffs.staffs.filter((staff) => staff.id===parseInt(match.params.staffId,10))[0]}
                             isLoading={this.props.staffs.isLoading}
                             errMess={this.props.staffs.errMess}
                             departments={this.props.departments.departments}
                />
            );
        };
      const StaffWithDept=({match}) => {
          return(
              <StaffInDept  departments={this.props.departments.departments.filter((department) => department.id===match.params.departmentId)[0]}
                            staffs={this.props.staffs.staffs.filter((staff) => staff.id===match.params.staffId)}
               />
            );
      };

    return(
        <div>
            <Header />
                <Switch>
                    <Route exact path="/staff" component={() => <StaffList staffs={this.props.staffs.staffs}
                                                                           onAddStaff={this.props.postStaff}
                                                                           isLoading={this.props.staffs.isLoading}
                                                                           errMess={this.props.staffs.erMess} />} 
                    />
                    <Route path="/staff/:staffId" component={StaffWithId} />
                    <Route path="/department/:departmentId" component={StaffWithDept} />
                    <Route path="/department" component={() => <Department departments={this.props.departments.departments}
                                                                            staffs={this.props.staffs.staffs} />} />
                    <Route path="/salary" component={() => <Salary salary={this.props.salary.salary} />} />
                    <Redirect to="/staff" />
                </Switch>
            <Footer />
        </div>
    );
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));