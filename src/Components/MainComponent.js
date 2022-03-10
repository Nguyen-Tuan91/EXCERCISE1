import React, { Component } from 'react';
import StaffList from '../Components/StaffList';
import StaffDetail from '../Components/StaffdetailComponent';
import Department from '../Components/DepartmentComponent';
import { STAFFS, DEPARTMENTS} from '../shared/staffs';
import Footer from '../Components/FooterComponent';
import Header from '../Components/HeaderComponent';
import { Switch, Route } from 'react-router-dom';

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            staff: STAFFS,
            department: DEPARTMENTS
        };
    }
    
    render() {
        const StaffWithId=({match}) => {
            return(
                <StaffDetail staff={this.state.staffs.find((staff) => staff.id===parseInt(match.params.id,10))} />
            );
        };
    return(
        <div>
            <Header />
                <Switch>
                    <Route exact path="/staff" component={() => <StaffList staff={this.state.staffs} />} />
                    <Route exact path="/staff" component={() => <StaffWithId staff={this.state.staffs} />} />
                    <Route path="/staff/:id" component={StaffWithId} />
                    <Route exact path="/department" component={() => <Department department={this.state.departments} />} />
                    <Route path="/Salary" component={() => <SalaryTable staffList={this.state.staff} />} />
                </Switch>
            <Footer />
        </div>
    );
    }
}
export default Main;