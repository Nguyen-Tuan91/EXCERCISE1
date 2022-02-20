import React, { Component } from 'react';
import { Card, CardImg, CardOverlay, CardTitle } from 'reactstrap';
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
                <Staffdetail staff={staff} />
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
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardOverlay>
                    <CardTitle>{staff.name}</CardTitle>
                </CardOverlay>
                </Card>
                </div>
            );
        });
    return(
        <div className="container">
            <div className="row">
                {staff1}
            </div>
            <div>
                {this.renderStaff(this.state.selectedStaff)}
            </div>
        </div>
    )
    }

}
export default Staff;