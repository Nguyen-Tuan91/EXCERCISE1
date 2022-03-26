import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { FadeTransform } from "react-animation-components";

// Presentational Component
function RenderDepartment({department}) {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Link to={`/departments/${department.id}`}>
          <Card>
            <CardTitle className="m-2">{department.name}</CardTitle>
            <CardBody>
              <CardText>
                Số lượng nhân viên: {department.numberOfStaff}
              </CardText>
            </CardBody>
          </Card>
        </Link>
      </FadeTransform>
    );
  }


//Container components
    const Department =(props) => {
      const departments = props.departments.map((department) => {
        return (
          <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={department.id}>
            <RenderDepartment
              department={department}
            />
          </div>
        );
      });
      return (
        <div className="container">
          <div className="row">{departments}</div>
        </div>
      );
    }

export default Department;
