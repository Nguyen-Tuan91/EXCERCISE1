import React from "react";
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../Components/LoadingComponent';

//Presentation Component
function RenderDepartment({department}) {
    return(
        <Card className="c-2">
            <Link to={`/department/${department.id}`}>
                <CardTitle className="c-3">{department.name}</CardTitle>
                <CardBody>
                    <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}

//Container Component
function Department(props) {
    const department=props.departments.map((department) => {
        return(
            <div className="col-lg-4 col-md-6 col-12" key={department.id}>
                <RenderDepartment department={department} />
            </div>
        );
    });
    if(props.departments.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.departments.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.departments.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return(
            <div className="container">
                 <div className="row">
                    {department}
                </div>
            </div>
        );
}

export default Department;