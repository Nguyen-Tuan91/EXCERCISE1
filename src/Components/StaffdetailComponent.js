import React from "react";
import { CardImg, CardText,CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { FadeTransform } from "react-animation-components";

function RenderStaff({ staff, department }) {
  if (staff != null && department != null) {
    return (
      <div className="col-12">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <div className="row">
            <div className="col-3">
              <CardImg width="100%" src={staff.image} alt={staff.name} />
            </div>
            <div className="col-9">
              <CardTitle>Họ và tên: {staff.name}</CardTitle>
              <CardText>
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng ban: {department.name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </div>
          </div>
        </FadeTransform>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail=(props) => {
    if (props.staff != null) {
        return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/staff">Nhân viên</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.staff.name}</h3>
                <hr />
              </div>
            </div>
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)"}}>
                <div className="row mb-3">
                  <RenderStaff staff={props.staff}
                              department={props.dept.filter(
                              (dept) => dept.id === props.staff.departmentId)[0]}
                  />
                </div>
              </FadeTransform>
              </div>
        );
    } else {
        return <div></div>
    }
}
export default StaffDetail;
