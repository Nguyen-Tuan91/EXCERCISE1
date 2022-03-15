import React from 'react';
import { Card, CardImg, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderStaff({staff}) {
        return(
            <Card>
                <Link to={`/staff/${staff.id}`}>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardBody>
                        <CardTitle>{staff.name}</CardTitle>
                    </CardBody>
                </Link>
            </Card>
            
        );
    }
        const StaffList=(props) => {
            const staffList=props.staffs.map((staff) => {
                console.log(props.staff);
                return(
                    <div className="col-lg-2 col-md-4 col-6" key={staff.id}>
                    <RenderStaff staff={staff} />
                    </div>
                );
            });
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Nhân viên</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {staffList}
                </div>
            </div>
        );
        }
    
        
export default StaffList;