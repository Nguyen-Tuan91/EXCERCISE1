import React from "react";
import { Card, CardBody, CardTitle, CardText, CardOverlay } from 'reactstrap';

function RenderDepartment({department}) {
    return(
        <Card>
            <CardOverlay>
                <CardTitle>{department.name}</CardTitle>
            </CardOverlay>
            <CardBody>
                <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </CardBody>
        </Card>
    );
}

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