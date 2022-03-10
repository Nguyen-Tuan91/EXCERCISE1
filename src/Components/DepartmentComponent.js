import React from "react";
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

//Presentation Component
function RenderDepartment({department}) {
    return(
        <Card>
                <CardTitle className="c-2">{department.name}</CardTitle>
            <CardBody>
                <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </CardBody>
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
    return(
        <div className="row">
            {department}
        </div>
    );
}

export default Department;