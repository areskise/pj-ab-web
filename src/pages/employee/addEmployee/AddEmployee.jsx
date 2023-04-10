import "./addEmployee.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
import EmployeeAPI from "../../../API/EmployeeAPI";
import { useSelector } from "react-redux";
import { selectorCompanies } from "../../../redux/slice/companySlice";

const AddEmployee = ({setShowAdd, showAdd}) => {
    const [selectComany, setSelectCompany] = useState('');
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();
    
    const companies = useSelector(selectorCompanies)
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('company', e.target.company.value);
        data.append('userName', e.target.userName.value);
        data.append('password', e.target.password.value);
        data.append('rePassword', e.target.rePassword.value);
        data.append('fullName', e.target.fullName.value);
        data.append('email', e.target.email.value);
        data.append('phoneName', e.target.phoneName.value);
        data.append('role', e.target.role.value);
        if(!e.target.company.value || !e.target.userName.value || !e.target.password.value || !e.target.rePassword.value || !e.target.fullName.value || !e.target.role.value) {
            setError(true)
        } else {
            try {
                const res = await EmployeeAPI.create(data);
                alertify.set('notifier', 'position', 'top-right');
                alertify.success(res.data);
                setShowAdd(false)
            }
            catch(err) {
                console.log(err);
                setMessErr(err.response.data)
            }
        }
    };

    return (
        <Modal dialogClassName="add-employee" show={showAdd} onHide={() => setShowAdd(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>THÊM NHÂN VIÊN</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 m-auto text-center'>
                    <div className='form-container'>
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
                                    {companies?.map((company, i) => (
                                        <option key={i} value={company.name}>{company.name}</option>
                                    ))}
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
                                    name="phoneName"
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
                    </div>
                    <div className='m-auto mb-3 text-center'>
                    {error && 
                        <div className="error-text">Vui lòng nhập đầy đủ thông tin.</div>
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
                    <button className='mx-3 btn btn-continue' type="submit">
                        Thêm mới
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddEmployee;