import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import Staffdetail from './StaffdetailComponent';

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state={ 
        selectedStaff: null};
    }

    onStaffselect(staff) {
        this.setState({ selectedStaff: staff });
    }

    renderStaff(staff) {
        if(staff!=null) {
            return (
                <Card>
                    <CardImg top src={staff.image} alt={staff.name} />
                <CardBody>
                    <CardTitle>{staff.name}</CardTitle>
                </CardBody>
                </Card>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }

    render() {
        const staff1=this.props.staffs.map((staff) => {
            return(
                <div className="col-lg-4 col-md-6">
                <Card key={staff.id} onClick={() => this.onStaffselect(staff)}>
                    <CardImg src={staff.image} alt={staff.name} />
                    <CardTitle>{staff.name}</CardTitle>
                </Card>
                </div>
            );
        });
    return(
        <div className="container">
            <div className="row">
                {staff1}
            </div>
           <Staffdetail staff={this.state.selectedStaff} />
        </div>
    )
    }

}
export default Staff;