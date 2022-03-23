import React, { useState } from 'react';
import { Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../Components/LoadingComponent';


const luongCB=3000000;
const luongNgay=200000;
const RenderSalary=({staff, isLoading, errMess}) => {
    if(isLoading) {
        return(
            <Loading />
        );
    } else if (errMess) {
        return(
            <h4>{errMess}</h4>
        )
    } else
        return(
            <Card>
                <CardTitle className="table-salary">{staff.name}</CardTitle>
                <CardBody>
                    <CardText>Mã nhân viên: {staff.id}</CardText>
                    <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
                    <CardText className="bg-light p-2 shadow">Lương:{(staff.salaryScale * luongCB + staff.overTime * luongNgay).toFixed(0)}</CardText>
                </CardBody>
            </Card>
            );
    }
function Salary(props) {
    const [sortSalary, setSortSalary]=useState(false);
    
    const staff=props.staffs.sort((a, b) => sortSalary?a.salaryScale - b.salaryScale : b.salaryScale-a.salaryScale).map((staff) => {
        return(
            <div className="col-lg-4 col-md-6 col-12" key={staff.id}>
                <RenderSalary staff={staff} />
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <button className="btn btn-danger" onClick={() => setSortSalary(!sortSalary)}>Sắp xếp theo hệ số lương</button>
            <div className="row">
                {staff}
            </div>
        </div>
    );
}
export default Salary;