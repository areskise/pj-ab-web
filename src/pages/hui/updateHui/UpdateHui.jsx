import "./updateHui.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useState, useEffect } from 'react';
import EmployeeAPI from "../../../API/EmployeeAPI";
import CompanyAPI from "../../../API/CompanyAPI";
import { useSelector } from "react-redux";
import { selectorUserCompanies } from "../../../redux/slice/companySlice";

const UpdateHui = ({selectCompany, setShowUpdate, showUpdate}) => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectRole, setSelectRole] = useState(null);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [roles, setRoles] = useState([]);
    const data = new FormData();
    const userCompanies = useSelector(selectorUserCompanies)

    useEffect(() => {
        const fetchCompany = async () => {
            if(showUpdate) {
                setSelectedCompany(showUpdate.organizationId)
                setSelectRole(showUpdate.roleId)
            } else {
                setSelectedCompany(null)
                setSelectRole(null)
            }
        }
        fetchCompany()
    },[showUpdate]);

    useEffect(() => {
        const fetchRole = async () => {
        if(selectedCompany?._id) {
            const resRoles = await CompanyAPI.getRoles(selectedCompany?._id);
            const rolesResult = resRoles.ResponseResult.Result
            if(selectedCompany?._id!==showUpdate.organizationId._id) {
                setSelectRole(null)
            } else {
                setSelectRole(showUpdate.roleId)
            }
            setRoles(rolesResult)
        } else {
            setRoles(null)
        }
        }
        fetchRole()
    },[selectedCompany]);

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            document.getElementById('submitBtn').click();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('_id', showUpdate.userId._id);
        data.append('organizationId', selectedCompany?._id);
        data.append('fullName', e.target.fullName.value);
        data.append('email', e.target.email.value);
        data.append('phoneNumber', e.target.phoneNumber.value);
        data.append('status', e.target.status.value);
        data.append('roleId', selectRole?._id);
        if( !e.target.fullName.value || !selectRole?._id || !selectedCompany?._id ) {
            setError(true)
            setMessErr(null)
        } else if(e.target.phoneNumber.value && e.target.phoneNumber.value.length !== 10) {
            setError(null)
            setMessErr('Số điện thoại phải gồm 10 chữ số')
        } else {
            try {
                const res = await EmployeeAPI.update(data);
                const resRole = await EmployeeAPI.updateRole(data);
                if(res.ResponseResult.ErrorCode === 0 && resRole.ResponseResult.ErrorCode === 0){
                    setShowUpdate(false)
                    setError(false)
                    setMessErr(null)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Cập nhật thành công!');
                } else {
                    if(res.ResponseResult.Result.code === 11000) {
                        setError(false)
                        setMessErr('Mã công ty đã tồn tại. Vui lòng nhập tên khác!')
                    } else {
                        console.error(res.ResponseResult.Message);
                        setError(false)
                        setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                    }
                }
            }
            catch(err) {
                console.error(err.message);
                setError(false)
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setShowUpdate(false)
        setMessErr(null)
    }

    const onHide = () => {
        setError(false)
        setShowUpdate(false)
        setMessErr(null)
    }

    return (
        <Modal dialogClassName="update-employee" show={showUpdate} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>CẬP NHẬT NHÂN VIÊN</Modal.Title>
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
                            {selectCompany==='all'?
                                // <select 
                                //     name="company" 
                                //     className='form-select select-company'
                                //     onChange={handleChange}
                                // >
                                //     <option value={defaultCompany?defaultCompany.organizationId?._id:null} hidden>{defaultCompany?defaultCompany.organizationId?.name:null}</option>
                                //     {company?.map((company, i) => (
                                //         <option key={i} value={company?company.organizationId._id:null}>{company?company.organizationId.name:null}</option>
                                //     ))}
                                // </select>
                                <div className="d-flex dropdown select-dropdown text-end">
                                    <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className='selected-company p-2'>{selectedCompany?selectedCompany?.name:'Loading...'}</span>
                                    </a>
                                    <ul className="p-0 my-1 dropdown-menu text-small">
                                        {userCompanies?.map((company, i) => (
                                            <li key={i}>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={selectedCompany?._id===company._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setSelectedCompany(company)}
                                                >
                                                    {company.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                :
                                <select 
                                    name="company" 
                                    className='form-select select-company'
                                    disabled
                                >
                                    <option value={selectedCompany?._id} >{selectedCompany?.name}</option>
                                </select>
                            }
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
                                placeholder='Nhập tên đăng nhập'
                                defaultValue={showUpdate.userId?.userName}
                                disabled
                            />
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
                                    placeholder='Nhập họ tên'
                                    defaultValue={showUpdate.userId?.fullName}
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
                                    defaultValue={showUpdate.userId?.email}
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
                                    defaultValue={showUpdate.userId?.phoneNumber}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Nhóm quyền
                                        <label style={{color: 'red'}}>*</label>
                                    </label>
                                </div>
                                {/* <select 
                                    name="role" 
                                    className='form-select select-company'
                                >
                                    {role ? 
                                    <option value={role.roleId} hidden>{role.name}</option> 
                                    : 
                                    <option value={showUpdate.roleId?._id} hidden>{showUpdate.roleId?.name}</option>
                                    }
                                    {roles && roles?.map((role, i) => (
                                        <option key={i} value={role._id}>{role.name}</option>
                                    ))}
                                </select> */}
                                <div className="d-flex dropdown select-dropdown text-end">
                                    <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className='selected-company p-2'>{selectRole?selectRole?.name:'Chọn nhóm quyền'}</span>
                                    </a>
                                    <ul className="p-0 my-1 dropdown-menu text-small">
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
                            </div>
                            <div className='d-flex m-3 align-items-center justify-content-between'>
                                <div className='d-flex mx-3 align-items-center justify-content-center'>
                                    <input 
                                        type="radio" 
                                        id="Active" 
                                        className='form-checkbox' 
                                        name='status' 
                                        value={true} 
                                        onKeyDown={handleKeyDown}
                                        defaultChecked
                                    />
                                    <div>
                                        <label htmlFor="Active" className='employee-active'>Hoạt động</label>
                                    </div>
                                </div>
                                <div className='d-flex mx-3 align-items-center justify-content-center'>
                                    <input 
                                        type="radio" 
                                        id='Disable' 
                                        className='form-checkbox' 
                                        name='status'
                                        value={false}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <div>
                                        <label htmlFor="Disable" className='employee-disable'>Không hoạt động</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='m-auto mt-3 text-center'>
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
                    <button className='mx-3 btn btn-continue' type="submit" id='submitBtn'>
                        Cập nhật
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default UpdateHui;