import "./addEmployee.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useEffect, useState } from 'react';
import EmployeeAPI from "../../../API/EmployeeAPI";
import { useSelector } from "react-redux";
import { selectorUserCompanies } from "../../../redux/slice/companySlice";
import CompanyAPI from "../../../API/CompanyAPI";
import validator from "../../../helpers/valiadator";

const AddEmployee = ({setShowAdd, showAdd}) => {
    const [selectCompany, setSelectCompany] = useState(null);
    const [selectRole, setSelectRole] = useState(null);
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [roles, setRoles] = useState([]);
    const userCompanies = useSelector(selectorUserCompanies)
    
    useEffect(() => {
        if(selectCompany) {
            const fetchRoles = async () => {
                const res = await CompanyAPI.getRoles(selectCompany?._id);
                const result = res.ResponseResult.Result
                setRoles(result)
                setSelectRole(null)
            }
            fetchRoles();
        }
    },[selectCompany]);

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            document.getElementById('submitBtn').click();
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            organizationId: selectCompany?._id,
            userName: e.target.userName.value,
            password: e.target.password.value,
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            roleId: selectRole?._id,
        }
        const isValid = validator(data)
        console.log(isValid);
        if(
            !selectCompany?._id || 
            !e.target.userName.value || 
            !e.target.password.value || 
            !e.target.rePassword.value || 
            !e.target.fullName.value || 
            !selectRole?._id
        ) {
            setError(true)
            setMessErr(null)
        } else if(isValid) {
            console.log(isValid);
            setMessErr(isValid.message)
            setError(false)
        } else if(e.target.password.value !== e.target.rePassword.value) {
            setMessErr('Nhập lại mật khẩu không chính xác!')
            setError(false)
        } else if(e.target.phoneNumber.value && e.target.phoneNumber.value.length !== 10) {
            setError(null)
            setMessErr('Số điện thoại phải gồm 10 chữ số')
        } else {
            try {
                const res = await EmployeeAPI.create(data);
                if(res.ResponseResult.ErrorCode === 0){
                    setShowAdd(false)
                    setError(false)
                    setMessErr(null)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Thêm mới thành công!');
                } else {
                    if(res.ResponseResult.Result.code === 11000) {
                        setError(false)
                        setMessErr('Tên đăng nhập hoặc Email đã tồn tại!')
                    } else {
                        console.error(res.ResponseResult.Message);
                        setError(false)
                        setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                    }
                }
            }
            catch(err) {
                console.error(err.me);
                setError(false)
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setShowAdd(false)
        setMessErr(null)
        setSelectCompany(null)
        setSelectRole(null)
    }

    const onHide = () => {
        setError(false)
        setShowAdd(false)
        setMessErr(null)
        setSelectCompany(null)
        setSelectRole(null)
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
                                {/* <select 
                                    name="company" 
                                    className='form-select select-company' 
                                    onChange={(e) => setSelectCompany(e.target.value)}
                                >   
                                    <option value={null} hidden>Chọn công ty</option>
                                    {userCompanies?.map((company, i) => (
                                        <option key={i} value={company._id}>{company.name}</option>
                                    ))}
                                </select> */}
                                <div className="d-flex dropdown select-dropdown text-end">
                                    <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className='selected-company p-2'>{selectCompany?selectCompany?.name:'Chọn công ty'}</span>
                                    </a>
                                    <ul className="p-0 my-1 dropdown-menu selected-dropdown text-small">
                                        {userCompanies?.map((company, i) => (
                                            <li key={i}>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={selectCompany?._id===company._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setSelectCompany(company)}
                                                >
                                                    {company.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                                    onKeyDown={handleKeyDown}
                                    min={5}
                                    max={64}
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
                                    onKeyDown={handleKeyDown}
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
                                    onKeyDown={handleKeyDown}
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
                                    onKeyDown={handleKeyDown}
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
                                    onKeyDown={handleKeyDown}
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
                                    onKeyDown={handleKeyDown}
                                    minLength={10}
                                    maxLength={10}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Nhóm quyền
                                        <label style={{color: 'red'}}>*</label>
                                    </label>
                                </div>
                                {selectCompany?
                                    // <select 
                                    //     className='form-select select-company' name="role"
                                    // >
                                    //     <option value='' hidden>Chọn nhóm quyền</option>
                                    //     {roles && roles.map((role, i) => (
                                    //         <option key={i} value={role._id}>{role.name}</option>
                                    //     ))}
                                    // </select>
                                    <div className="d-flex select-dropdown dropdown text-end">
                                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className='selected-company p-2'>{selectRole?selectRole?.name:'Chọn nhóm quyền'}</span>
                                        </a>
                                        <ul className="p-0 my-1 dropdown-menu selected-dropdown text-small">
                                            {roles?.map((role, i) => (
                                                <li key={i}>
                                                    <button 
                                                        className='p-2 px-3 btn dropdown-item'
                                                        type='button'
                                                        style={selectRole?._id===role._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                        onClick={() => setSelectRole(role)}
                                                    >
                                                        {role.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                :
                                    <select 
                                        className='form-select select-company' name="role" 
                                        disabled
                                    >
                                        <option value='' hidden>Chọn công ty trước</option>
                                    </select>
                                }
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
                    <button className='mx-3 btn btn-continue'  id='submitBtn'>
                        Thêm mới
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddEmployee;