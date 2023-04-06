import "./addEmployee.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
import EmployeeAPI from "../../../API/EmployeeAPI";

const AddEmployee = ({setShowAdd, showAdd}) => {
    const [selectComany, setSelectCompany] = useState('');
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [subMenu, setSubMenu] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();
    
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(!admin) {
    //         navigate('/');
    //     }
    // },[admin, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }
    console.log(formValues);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('company', formValues.company);
        data.append('userName', formValues.userName);
        data.append('password', formValues.password);
        data.append('rePassword', formValues.rePassword);
        data.append('fullName', formValues.fullName);
        data.append('email', formValues.email);
        data.append('phone', formValues.phone);
        data.append('role', formValues.role);
        if(!formValues.company || !formValues.userName || !formValues.password || !formValues.rePassword || !formValues.fullName || !formValues.role) {
            setError(true)
        } else {
            try {
                const res = await EmployeeAPI.create(data);
                console.log(res);
                alertify.set('notifier', 'position', 'top-right');
                alertify.success(res.data);
            }
            catch(err) {
                console.log(err);
                setMessErr(err.response.data)
            }
        }
    };

    return (
        <Modal dialogClassName="add-employee" show={showAdd} onHide={() => setShowAdd(false)}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title className='title'>THÊM NHÂN VIÊN</Modal.Title>
            </Modal.Header>
            <Modal.Body className='w-100 m-auto text-center'>
                <form className='form-container'>
                    <div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Công ty
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <select 
                                name="company" 
                                className='select-company' 
                                onChange={handleChange}
                            >
                                <option hidden>Chọn công ty</option>
                                <option>Công ty 1</option>
                                <option>Công ty 2</option>
                                <option>Công ty 3</option>
                            </select>
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Tên đăng nhập
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type="text" 
                                name="userName"
                                className='form-control'
                                placeholder="Nhập tên đăng nhập"
                                onChange={handleChange}
                            />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Mật khẩu
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type={ visiblePass ? "text" : "password"} 
                                name="password"
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Nhập mật khẩu"
                                onChange={handleChange}
                            />
                            <span toggle="#floatingPassword" 
                            className={ visiblePass ? 'toggle-password fa-regular fa-eye-slash' : 'toggle-password fa-regular fa-eye' } 
                            onClick={() => setVisiblePass(!visiblePass)}></span>
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Nhập lại mật khẩu
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type={ visibleRePass ? "text" : "password"} 
                                name="rePassword"
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Nhập lại mật khẩu"
                                onChange={handleChange}
                            />
                            <span toggle="#floatingPassword" 
                            className={ visibleRePass ? 'toggle-password fa-regular fa-eye-slash' : 'toggle-password fa-regular fa-eye' } 
                            onClick={() => setVisibleRePass(!visibleRePass)}></span>
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Họ tên
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type="text" 
                                name="fullName"
                                className='form-control'
                                placeholder="Nhập họ tên"
                                onChange={handleChange}
                            />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">Email</label>
                            </div>
                            <input 
                                type="email" 
                                name="email"
                                className='form-control' 
                                placeholder='Nhập Email' 
                                onChange={handleChange}
                            />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">Số điện thoại</label>
                            </div>
                            <input 
                                type="number" 
                                name="phone"
                                className='form-control' 
                                placeholder='Nhập SĐT' 
                                onChange={handleChange}
                            />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Nhóm quyền
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <select 
                                name="role" 
                                className='select-company'
                                onChange={handleChange}
                            >
                                <option hidden>Chọn nhóm quyền</option>
                                <option>Nhóm quyền 1</option>
                                <option>Nhóm quyền 2</option>
                                <option>Nhóm quyền 3</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div className='m-auto mb-3 text-center'>
                {error && 
                    <div className="error-text">Vui lòng nhập đầy đủ thông tin có dấu *.</div>
                }
                {messErr &&
                    <div className="error-text">{messErr}</div>
                }
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <button className='mx-3 btn btn-cancle' onClick={() => setShowAdd(false)}>
                    Đóng
                </button>
                <button className='mx-3 btn btn-continue' onClick={handleSubmit}>
                    Thêm mới
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEmployee;