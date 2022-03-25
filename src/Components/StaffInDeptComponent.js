import React from 'react';
import { Card, CardImg, CardBody, CardSubtitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FadeTransform} from 'react-animation-components';

function RenderStaffItem({staff}) {
    return(
        <FadeTransform
            in 
            transformProps={{
                exitTransform:'Scale(0.5) translateY(-50%)'
            }}>
        <Card>
            <Link to={`/staff/${staff.id}`}>
                <CardImg src={staff.image} alt={staff.name} />
                <CardBody>
                    <CardSubtitle>{staff.name}</CardSubtitle>
                </CardBody>
            </Link>
        </Card>
        </FadeTransform>
    );
};

const StaffInDept= (props) => {
    const staffs=props.staff.map((val) => {
        return (
            <div className="col-6 col-md-4 col-lg-2" key={val.id}>
            <RenderStaffItem staff={val} />
        </div>
        );
    });

    if(props.staff !=null & props.department !=null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/departments">Phòng ban</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.department.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {staffs}
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
};
export default StaffInDept;