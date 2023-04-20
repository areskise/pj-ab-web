import "./addEmployee.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useEffect, useState } from 'react';
import EmployeeAPI from "../../../API/EmployeeAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectorUserCompanies } from "../../../redux/slice/companySlice";
import CompanyAPI from "../../../API/CompanyAPI";

const AddEmployee = ({setShowAdd, showAdd}) => {
    // const [selectComany, setSelectCompany] = useState('');
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [roles, setRoles] = useState([]);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();
    
    const userCompanies = useSelector(selectorUserCompanies)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchRoles = async () => {
            const res = await CompanyAPI.getRoles(formValues.company);
            const result = res.ResponseResult.Result
            console.log(res);
            setRoles(result)
        }
        if(formValues.company) {
            fetchRoles();
        }
    },[formValues]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('organizationId', e.target.company.value);
        data.append('userName', e.target.userName.value);
        data.append('password', e.target.password.value);
        data.append('fullName', e.target.fullName.value);
        data.append('email', e.target.email.value);
        data.append('phoneNumber', e.target.phoneNumber.value);
        data.append('roleId', e.target.role.value);
        if(
            !e.target.company.value || 
            !e.target.userName.value || 
            !e.target.password.value || 
            !e.target.rePassword.value || 
            !e.target.fullName.value || 
            !e.target.role.value
        ) {
            setError(true)
        } else if(e.target.password.value !== e.target.rePassword.value) {
            setMessErr('Nhập lại mật khẩu không chính xác!')
            setError(false)
        } else {
            try {
                const res = await EmployeeAPI.create(data);
                // console.log(res.ResponseResult.Result.keyValue[0]);
                if(res.ResponseResult.ErrorCode === 0){
                    setShowAdd(false)
                    setError(false)
                    setMessErr(null)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Thêm nhân viên mới thành công!');
                } else {
                    if(res.ResponseResult.Result.code === 11000) {
                        setError(false)
                        setMessErr('Tên đăng nhập hoặc Email đã tồn tại!')
                    } else {
                        console.log(res.ResponseResult.Message);
                        setError(false)
                        setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                    }
                }
            }
            catch(err) {
                console.log(err);
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setShowAdd(false)
        setMessErr(null)
    }

    const onHide = () => {
        setError(false)
        setShowAdd(false)
        setMessErr(null)
    }

    return (
        <Modal dialogClassName="add-employee" show={showAdd} onHide={onHide}>
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
                                    <option value={null} hidden>Chọn công ty</option>
                                    {userCompanies?.map((company, i) => (
                                        <option key={i} value={company._id}>{company.name}</option>
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
                                    id="floatingRePassword" 
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <span toggle="#loatingRePassword" 
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
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">Số điện thoại</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="phoneNumber"
                                    className='form-control' 
                                    placeholder='Nhập SĐT' 
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
                                >
                                    <option value='' hidden>Chọn nhóm quyền</option>
                                    {roles && roles.map((role, i) => (
                                        <option key={i} value={role._id}>{role.name}</option>
                                    ))}
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
                    <button className='mx-3 btn btn-cancle' onClick={handleClose}>
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