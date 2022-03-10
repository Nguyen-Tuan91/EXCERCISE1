import React from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderStaff({staff, onClick}) {
        return(
            <Card>
                <Link to={`/staff/${staff.id}`}>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <div>
                        <CardTitle>{staff.name}</CardTitle>
                    </div>
                </Link>
            </Card>
            
        );
    }
        const StaffList=(props) => {
            const stafflist=props.staffs.map((staff) => {
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
                        <br />
                    </div>
                </div>
                <div className="row">
                    {stafflist}
                </div>
            </div>
        );
        }
    
        
export default StaffList;