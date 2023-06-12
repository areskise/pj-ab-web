import "./updateEmployee.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useState, useEffect } from 'react';
import EmployeeAPI from "../../../API/EmployeeAPI";
import CompanyAPI from "../../../API/CompanyAPI";
import RoleAPI from "../../../API/RoleAPI";

const UpdateEmployee = ({selectCompany, setShowUpdate, showUpdate}) => {
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [company, setCompany] = useState([]);
    const [defaultCompany, setDefaultCompany] = useState(null);
    const [role, setRole] = useState(null);
    const [roles, setRoles] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();

    useEffect(() => {
        const fetchCompany = async () => {
            if(showUpdate) {
                if(selectCompany==='all') {
                    const resCompany = await EmployeeAPI.getOrganizations(showUpdate.userId._id);
                    const companyResult = resCompany.ResponseResult.Result
                    setCompany(companyResult)
                    setDefaultCompany(companyResult[0])
                    const resRole = await RoleAPI.getById(showUpdate.roleId._id);
                    const roleResult = resRole.ResponseResult.Result
                    setRole(roleResult)
                } else {
                    const resCompany = await CompanyAPI.getById(selectCompany);
                    const companyResult = resCompany.ResponseResult.Result
                    setRole(null)
                    setCompany(companyResult)
                    setDefaultCompany(companyResult)
                }
            } else {
                setCompany(null)
                setRole(null)
            }
        }
        fetchCompany()
    },[showUpdate, formValues]);

    useEffect(() => {
        const fetchRole = async () => {
        if(company?._id) {
            const resRoles = await CompanyAPI.getRoles(company?._id);
            const rolesResult = resRoles.ResponseResult.Result
            setRoles(rolesResult)
        } else {
            setRoles(null)
        }
        }
        fetchRole()
    },[company, formValues]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('_id', showUpdate.userId._id);
        data.append('organizationId', e.target.company.value);
        data.append('fullName', e.target.fullName.value);
        data.append('email', e.target.email.value);
        data.append('phoneNumber', e.target.phoneNumber.value);
        data.append('status', e.target.status.value);
        data.append('roleId', e.target.role.value);
        if( !e.target.fullName.value ) {
            setError(true)
            setMessErr(null)
        } else if(e.target.phoneNumber.value && e.target.phoneNumber.value.length !== 10) {
            setError(null)
            setMessErr('Số điện thoại phải gồm 10 chữ số')
        } else {
            try {
                const res = await EmployeeAPI.update(data);
                if(res.ResponseResult.ErrorCode === 0){
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
                                    <select 
                                        name="company" 
                                        className='select-company'
                                        onChange={handleChange}
                                    >
                                        <option value={defaultCompany?defaultCompany.organizationId?._id:null} hidden>{defaultCompany?defaultCompany.organizationId?.name:null}</option>
                                        {company?.map((company, i) => (
                                            <option key={i} value={company?company.organizationId._id:null}>{company?company.organizationId.name:null}</option>
                                        ))}
                                    </select>
                                    :
                                    <select 
                                        name="company" 
                                        className='select-company'
                                        onChange={handleChange}
                                    >
                                        <option value={company?company._id:null} >{company?company.name:null}</option>
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
                                    {role ? 
                                    <option value={role.roleId} hidden>{role.name}</option> 
                                    : 
                                    <option value={showUpdate.roleId?._id} hidden>{showUpdate.roleId?.name}</option>
                                    }
                                    {roles && roles?.map((role, i) => (
                                        <option key={i} value={role._id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='d-flex m-3 align-items-center justify-content-center'>
                                <div className='d-flex mx-4 align-items-center justify-content-center'>
                                    <input type="radio" id="Active" className='form-checkbox' name='status' value={true} defaultChecked/>
                                    <div>
                                        <label htmlFor="Active" className='employee-active'>Hoạt động</label>
                                    </div>
                                </div>
                                <div className='d-flex mx-4 align-items-center justify-content-center'>
                                    <input type="radio" id='Disable' className='form-checkbox' name='status'value={false}/>
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
                    <button className='mx-3 btn btn-continue' type="submit">
                        Cập nhật
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default UpdateEmployee;