import React, { Component } from 'react';
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
        const staffList=this.props.staffs.map((staff) => {
            return(
                <div className="col-lg-4 col-md-6">
                <div key={staff.id} onClick={() => this.onStaffselect(staff)}>
                    <div className='card-name'>
                    <img className='image-name' src={staff.image} alt={staff.name} />
                    <h5 className='name'>{staff.name}</h5>
                </div>
                </div>
                </div>
            );
        });
    return(
        <div className="container">
            <div className="row">
                {staffList}
            </div>
          <div>
              {this.renderStaff(this.state.selectedStaff)}
          </div>
        </div>
    )
    }

}
export default Staff;