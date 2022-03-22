import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Loading } from '../Components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderStaffdetail({ staff}) {
    if(staff !=null)
     return(
         <div className="row">
             <div className="col-lg-3 col-md-4 col-12">
                <Card>
                <CardImg src={staff.image} alt={staff.name} width="100%" />
                </Card>
             </div>
             <div className="col-lg-9 col-md-8 col-12" key={staff.id}>
                 <Card>
                    <CardTitle className="name-staff">Họ và tên:{staff.name}</CardTitle>
                    <CardBody>
                        <CardText>
                        Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
                        </CardText>
                        <CardText>
                        Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                        </CardText>
                        <CardText>
                        Phòng ban: {staff.department.name}
                        </CardText>
                        <CardText>
                        Số ngày nghỉ còn lại: {staff.annualLeave}
                        </CardText>
                        <CardText>
                        Số ngày đã làm thêm: {staff.overTime}
                        </CardText>
                    </CardBody>
                </Card>
             </div>
        </div>
     );
     else
     return <div></div>
   }

   const StaffDetail=(props) => {
       if(props.isLoading) {
           return(
               <div className="container">
                   <div className="row">
                       <Loading />
                   </div>
               </div>
           );
       } else if(props.errMess) {
           return(
               <div className="container">
                   <div className="row">
                       <h4>{props.errMess}</h4>
                   </div>
               </div>
           );
       }
        else if(props.staff !=null)
       return(
           <div className="container">
               <div className="row">
                   <Breadcrumb>
                   <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                   <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                   </Breadcrumb>
                   <div className="col-12">
                       <h3>{props.staff.name}</h3>
                       <br />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9 col-md-8 col-12">
                        <RenderStaffdetail staff={props.staff}/>
                    </div>
                </div>
            </div>
       );
        else
        return <div></div>
   }
export default StaffDetail;