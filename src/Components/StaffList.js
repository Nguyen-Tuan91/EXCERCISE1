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
                                nameSearch:''
                    };
                
                    this.handleSearch=this.handleSearch.bind(this);
                }

                handleSearch(event) {
                    const nameF=event.target.nameF.value;
                    event.preventDefault();
                    this.setState({nameSearch:nameF});
                }

            render() {
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
                    <div className="row">
                        {staffList}
                    </div>
                </div>
            );
            } 
    }
        
        
    
        
export default StaffList;