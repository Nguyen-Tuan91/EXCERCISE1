import React, { useState } from 'react';
import { Card, CardText, Button, Jumbotron, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderSalary=({staff, salary}) => {
    const formatDecimal=require("format-decimal");
    return(
        <Jumbotron>
            <h2 className="table-salary">{staff.name}</h2>
            <p>Mã nhân viên: {staff.id}</p>
            <p>Hệ số lương: {staff.salaryScale}</p>
            <p>Số giờ làm thêm: {staff.overTime}</p>
            <Card className="salary">
                <CardText>
                    Lương: {" "}
                    {formatDecimal(salary, {decimal: ".", thousands:",", precision:0,})} {" "}VNĐ
                </CardText>
            </Card>
        </Jumbotron>
    );
}
function SalaryTable(props) {
    const[staffList, setStaffList]=useState(props.staffList);
    function salaryCalc(salaryScale, overTime) {
        const basicSalary=3000000;
        const overTimeSalary=200000;
        return salaryScale * basicSalary + overTime * overTimeSalary;
    }

    function sortSalary(sorttype) {
        let sortedStaffList=[...staffList];
        let salaryA=0;
        let salaryB=0;

        if(sorttype==="increase") {
            sortedStaffList.sort(function(a, b) {
                salaryA=salaryCalc(a.salaryScale, a.overTime);
                salaryB=salaryCalc(b.salaryScale, b.overTime);
                return salaryA - salaryB;
            });
        }

        if(sorttype==="decrease") {
            sortedStaffList.sort(function(a, b) {
                salaryA=salaryCalc(a.salaryScale, a.overTime);
                salaryB=salaryCalc(b.salaryScale, b.overTime);
                return salaryB - salaryA;
            });
        }

        setStaffList(sortedStaffList);
    }
    const staff=staffList.map((staff) => {
        return(
            <div className="col-lg-4 col-md-6 col-12" key={staff.id}>
                <RenderSalary staff={staff}
                              salary={salaryCalc(staff.salaryScale, staff.overTime)}
                />
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/nhanvien">Nhân Viên</Link></BreadcrumbItem>
                <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12" id="sort">
                    <h5>Sắp xếp theo lương</h5>
                </div>
                <div className="col-12">
                    <Button onClick={() => sortSalary("increase")}>
                        <span class="fa fa-sort-amount-asc"></span> Lương Thấp
                    </Button>

                    <Button onClick={() => sortSalary("decrease")}>
                        <span class="fa fa-sort-amount-desc"></span> Lương Cao
                    </Button>
                </div>
            </div>
            <div className="row">
                {staff}
            </div>
        </div>
    );
}
export default SalaryTable;
