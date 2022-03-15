import React from 'react';
import { Card, CardImg, CardTitle, CardBody, Form, FormGroup, Label, Input, 
        Col, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';


    //Presentational Component dùng để render ra từng nhân viên
    function RenderStaff({staff}) {
        return(
            <Card>
                <Link to={`/staff/${staff.id}`}>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardBody>
                        <CardTitle>{staff.name}</CardTitle>
                    </CardBody>
                </Link>
            </Card>
            
        );
    }
        
        class StaffList extends Component {
                constructor(props) {
                    super(props);
                    this.state={
                                nameSearch: '',
                                id:'',
                                name:'',
                                doB:'',
                                salaryScale:1,
                                startDate:'',
                                department:'Sale',
                                annualLeave:0,
                                overTime:0,
                                salary:'',
                                isModalOpen:false,
                                touched: {
                                    name:false,
                                    doB:false,
                                    startDate:false
                                }
                            };
                    
                    this.handleSearch=this.handleSearch.bind(this);
                    this.toggleModal=this.toggleModal.bind(this);
                    this.handleSubmit=this.handleSubmit.bind(this);
                    this.handleInputChange=this.handleInputChange.bind(this);
                    this.handleBlur=this.handleBlur.bind(this);
                }

                handleInputChange(event) {
                    const target=event.targe;
                    const value=target.value;
                    const name=target.name;
                    this.setState({
                        [name]:value
                    });
                }

                handleSubmit(event) {
                    console.log('Current State is:' + JSON.stringify(this.state));
                    alert('Current State is:' + JSON.stringify(this.state));
                    event.preventDefault();
                    const newStaff={
                        name:this.state.name,
                        doB:this.state.doB,
                        salaryScale:this.state.salaryScale,
                        startDate:this.state.startDate,
                        department:this.state.department,
                        annualLeave:this.state.annualLeave,
                        overTime:this.state.overTime,
                        image:'/assets/images/pizzaro.png'
                    }
                    if(!this.state.name||!this.state.doB||!this.state.startDate)
                        this.setState({
                            touched:{name:true, doB:true, startDate:true}
                        });
                    else 
                    this.props.onAdd(newStaff);
                }

                handleBlur=(field) =>(evt) => {
                    this.setState({
                        touched:{...this.state.touched,[field]:true}
                    });
                }
                
                validate(name, doB, startDate) {
                   const errors={
                       name:'',
                       doB:'',
                       startDate:''
                   };

                if(this.state.touched.name&&name.length<3)
                   errors.name="Must be greater than >=3 characters";
                else if(this.state.touched && name.length>30)
                   errors.name="Must be 30 characters or less";
                
                if(this.state.touched.doB && doB.length<1)
                   errors.doB="Please write on";
                if(this.state.touched.startDate && startDate.length<1)
                   errors.startDate="Please write on";
                return errors;
                }

                /*Hàm bật tắt Modal*/
                toggleModal() {
                    this.setState({
                        isModalOpen: !this.state.isModalOpen
                    });
                }
                /*Hàm tìm kiếm tên nhân viên và render ra kết quả */
                handleSearch(event) {
                    const nameF=event.target.nameF.value;
                    event.preventDefault();
                    this.setState({nameSearch:nameF});
                }

            render() {
                const errors=this.validate(this.state.name, this.state.doB, this.state.startDate);

                const staffList=this.props.staffs
                .filter((val) => {
                    if(this.state.nameSearch ==="")
                    return val;
                    else if(val.name.toLowerCase().includes(this.state.nameSearch.toLowerCase()))
                    return val;
                    return 0;
                })
                .map((val) => {
                    return(
                        <div className="col-lg-2 col-md-4 col-6" key={val.id}>
                        <RenderStaff staff={val} />
                        </div>
                    );
                });

                //Render giao diện stafflist
                 return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h3>Nhân viên</h3>
                            <hr />
                        </div>
                        <div className="col-2 col-auto">
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-plus fa-lg"></span>
                            </Button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <form onSubmit={this.handleSearch} className="form-group row">
                            <div className="col-8 col-md-8">
                                <input type="text" name="nameF"
                                        placeholder="Tìm kiếm tên nhân viên"
                                />
                            </div>
                            <div className="col-4 col-md-4">
                                <button className="btn btn-success" type="submit" value="submit">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-12">
                        <hr />
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="name" md={2}>Tên</Label>
                                    <Col md={10}>
                                        <Input type="text" id="name" name="name"
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur("name")} />
                                        <FormFeedback>{errors.name}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="doB" md={2}>Ngày Sinh</Label>
                                    <Col md={10}>
                                        <Input type="date" id="doB" name="doB"
                                            value={this.state.doB}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur("doB")} />
                                        <FormFeedback>{errors.doB}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="startDate" md={2}>Ngày vào công ty</Label>
                                    <Col md={10}>
                                        <Input type="date" id="startDate" name="startDate"
                                            value={this.state.startDate}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur("startDate")} />
                                        <FormFeedback>{errors.startDate}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="salaryScale" md={2}>Hệ số lương</Label>
                                    <Col md={10}>
                                        <Input type="text" id="salaryScale" name="salaryScale"
                                            value={this.state.salaryScale}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="department" md={2}>Phòng ban</Label>
                                    <Col md={10}>
                                        <Input type="select" id="salaryScale" name="salaryScale"
                                            value={this.state.salaryScale}
                                            onChange={this.handleInputChange}>
                                            <option>Sale</option>
                                            <option>HR</option>
                                            <option>Marketing</option>
                                            <option>IT</option>
                                            <option>Finance</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="annualLeave" md={2}>Số ngày nghỉ còn lại</Label>
                                    <Col md={10}>
                                        <Input type="text" id="annualLeave" name="annualLeave"
                                            value={this.state.annualLeave}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="overTime" md={2}>Số ngày làm thêm</Label>
                                    <Col md={10}>
                                        <Input type="text" id="overTime" name="overTime"
                                            value={this.state.overTime}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size:10, offset:2}}>
                                        <Button type="submit" color="primary">Thêm</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>
                    <div className="row">
                        {staffList}
                    </div>
                </div>
            );
            } 
    }
        
        
    
        
export default StaffList;