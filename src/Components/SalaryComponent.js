import React, { useState } from 'react';
import { Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../Components/LoadingComponent';
import { FadeTransform } from 'react-animation-components';


const luongCB=3000000;
const luongNgay=200000;

const RenderSalary=({salary, isLoading, errMess}) => {
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
            <FadeTransform
                in 
                transformProps={{
                    exitTransForm: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                <CardTitle className="table-salary">{salary.name}</CardTitle>
                <CardBody>
                    <CardText>Mã nhân viên: {salary.id}</CardText>
                    <CardText>Hệ số lương: {salary.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {salary.overTime}</CardText>
                    <CardText className="bg-light p-2 shadow">Lương:{(salary.salaryScale * luongCB + salary.overTime * luongNgay).toFixed(0)}</CardText>
                </CardBody>
                </Card>
            </FadeTransform>
            );
    }
const Salary=(props) => {
    const [sortSalary, setSortSalary]=useState(false);
    
    const salary=props.salary
    .sort((a, b) => sortSalary? a.salaryScale - b.salaryScale : b.salaryScale-a.salaryScale)
    .map((staff) => {
        return(
            <div className="col-lg-4 col-md-6 col-12" key={staff.id}>
                <RenderSalary salary={staff} />
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
                {salary}
            </div>
        </div>
    );
}
export default Salary;
