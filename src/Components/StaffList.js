import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, Label, Col, Modal, ModalBody, ModalHeader, Button, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from '../Components/LoadingComponent';
import { FadeTransform } from "react-animation-components";



    const required=(val) => (val) && val.length;
    const maxLength=(len) => (val) => !(val) || (val.length<=len);
    const minLength=(len) => (val) => (val) && (val.length >=len);


    //Presentational Component dùng để render ra từng nhân viên
    function RenderStaff({staff, isLoading, errMess, onDeleteStaff }) {
        if(isLoading) {
            return(
                <Loading />
            )
        } else if(errMess) {
            return(
                <h4>{errMess}</h4>
            )
        } else
            return(
                <FadeTransform
                      in 
                      transFromProps={{
                        exitTransFrom:'scale(0.5)+ translateY(-50%)'
                      }}>
                    <div>
                    <Link to={`/staff/${staff.id}`}>
                     <Card>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardBody>
                            <CardTitle>{staff.name}</CardTitle>
                        </CardBody>
                     </Card>
                    </Link>
                    <Button color="danger" onClick={() => onDeleteStaff(staff.id)}>
                        Delete
                    </Button>
                     </div>
                </FadeTransform>
            );
    }
        
        class StaffList extends Component {
                constructor(props) {
                    super(props);
                    this.state={
                                nameSearch: ''
                            };
                    
                    this.handleSearch=this.handleSearch.bind(this);
                   
                }

                /*Hàm tìm kiếm tên nhân viên và render ra kết quả */
                handleSearch(event) {
                    const nameF=event.target.nameF.value;
                    event.preventDefault();
                    this.setState({nameSearch:nameF});
                }

            render() {

                const staffList = this.props.staffs
                .filter((val) => {
                  if (this.state.nameSearch === "") 
                  return val;
                  else if (
                    val.name.toLowerCase().includes(this.state.nameSearch.toLowerCase())
                  )
                    return val;
                  return 0;
                })
                .map((val) => {
                  return (
                    <div className="col-6 col-md-4 col-lg-2" key={val.id}>
                      <RenderStaff staff={val}
                                   onDeleteStaff={this.props.onDeleteStaff}/>
                    </div>
                  );
                });

                //Render giao diện stafflist
                 return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 add-staff">
                            <div className="row">
                                <div className="col-10 col-md-10">
                                    <h3>Nhân viên</h3>
                                </div>
                            <AddStaffForm onAdd={this.props.onAddStaff}/>
                            </div>
                </div>
                    <div className="col-12 col-md-6 search-staff">
                        <form onSubmit={this.handleSearch} className="form-group row">
                            <div className="col-8 col-md-8">
                                <input type="text" 
                                        name="nameF"
                                        placeholder="Tìm kiếm tên nhân viên"
                                />
                            </div>
                            <div className="col-4 col-md-4">
                                <button className="btn btn-success" type="submit" value="submit">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                    </div>
                    <div className="col-12">
                        <hr />
                    </div>
                    <div className="row">
                        {staffList}
                    </div>
                </div>
            );
            } 
    }
    
    class AddStaffForm extends Component {
        constructor(props) {
            super(props);
            this.state={
                id:'',
                name:'',
                doB:'',
                salaryScale:1,
                startDate:'',
                departmentId:'Dept01',
                annualLeave:0,
                overTime:0,
                salary:'',
                image:'/assets/images/pizzaro.png',
                isModalOpen:false
            };
            /*Ràng buộc 2 chiều đối với các hàm dưới đây */
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
        };
         /*Sự kiện handleSubmit khi người dùng thêm nhân viên */
         handleSubmit(value) {
            const newStaff={
                name: value.name,
                doB: this.state.doB,
                salaryScale: parseInt(value.salaryScale, 10),
                startDate: this.state.startDate,
                image: "/asset/images/alberto.png",
                departmentId: this.state.departmentId,
                annualLeave: parseInt(value.annualLeave, 10),
                overTime: parseInt(value.overTime, 10),
            }
            this.props.onAdd(newStaff);
        }

        /*Hàm bật tắt Modal*/
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        render() {
            return(
                <React.Fragment>
                     <div className="col-2 col-auto">
                        <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-plus fa-lg"></span>
                        </Button>
                    </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                <Control.text model=".name" id="name" name="name"
                                     className="form-control"
                                     validators={{
                                         required, minLength:minLength(3), maxLength:maxLength(30)
                                     }} />
                                 <Errors
                                     className="text-danger"
                                     model=".name"
                                     show="touched"
                                     messages={{
                                         required:"Yêu cầu nhập",
                                         minLength: "Nhập nhiều hơn 2 ký tự",
                                         maxLength: "Nhập ít hơn 30 ký tự"
                                     }}>
                                 </Errors>  
                                </Col>
                                </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={5}>Ngày Sinh</Label>
                                <Col md={7}>
                                 <Control type="date" model=".doB" id="doB" name="doB"
                                    className="form-control"
                                    validators={{required}} />
                                 <Errors
                                      className="text-danger"
                                      model=".doB"
                                      show="touched"
                                      messages={{
                                          required:"Yêu cầu nhập"
                                      }}>
                                 </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                 <Control type="date" model=".startDate" id="startDate" name="startDate"
                                     className="form-control"
                                     validators={{required}} 
                                 />
                                 <Errors
                                      className="text-danger"
                                      model=".startDate"
                                      show="touched"
                                      messages={{
                                          required:"Yêu cầu nhập"
                                      }}>
                                 </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                <Col md={7}>
                                 <Control.select model=".department" id="department" name="department">
                                     <option>Sale</option>
                                     <option>HR</option>
                                     <option>Marketing</option>
                                     <option>IT</option>
                                     <option>Finance</option>
                                 </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                                    placeholder="1.0 -->3.0"
                                                    className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                                className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={5}>Số ngày làm thêm</Label>
                                <Col md={7}>
                                    <Control.text model=".overTime" id="overTime" name="overTime"
                                                className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">Thêm</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </React.Fragment>
            );
        }
    }     
export default StaffList;