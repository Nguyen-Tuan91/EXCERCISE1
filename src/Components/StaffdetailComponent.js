import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import dateFormat from 'dateformat';

class Staffdetail extends Component {
   render(props) {
     var staff=this.props.staff;

     return(
         <div className="staff-detail">
             <Card>
                 <CardImg top src={staff.image} alt={staff.name} />
                 <CardTitle>Họ và tên:{staff.name}</CardTitle>
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
     )
   }
}
export default Staffdetail;