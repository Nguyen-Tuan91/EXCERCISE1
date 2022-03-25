import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { FadeTransform } from "react-animation-components";

// Presentational Component
class RenderDept extends Component {
  render() {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Link to={`/departments/${this.props.department.id}`}>
          <Card>
            <CardTitle className="m-2">{this.props.department.name}</CardTitle>
            <CardBody>
              <CardText>
                Số lượng nhân viên: {this.props.staffNo.length}
              </CardText>
            </CardBody>
          </Card>
        </Link>
      </FadeTransform>
    );
  }
}

//Container components
class Department extends Component {
  render() {
    console.log(this.props.departments)

    return (
      <div className="container">
        <div className="row">
            {this.props.departments.map((department) => (
        <div className="col-12 col-md-6 col-lg-4" key={department.id}>
          <RenderDept department={department}
                      staffNo={this.props.staffs.filter((staff) => staff.departmentId === department.id)}
          />
        </div>
            ))
    }
        </div>
      </div>
    );
  }
}

export default Department;