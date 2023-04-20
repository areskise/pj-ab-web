import "./updateEmployee.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { selectorCompanies } from "../../../redux/slice/companySlice";
import { useSelector } from "react-redux";
import EmployeeAPI from "../../../API/EmployeeAPI";
import CompanyAPI from "../../../API/CompanyAPI";
import RoleAPI from "../../../API/RoleAPI";

const UpdateEmployee = ({setShowUpdate, showUpdate}) => {
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [company, setCompany] = useState(null);
    const [role, setRole] = useState(null);
    const [roles, setRoles] = useState(null);
    const [formValues, setFormValues] = useState({});
    
    useEffect(() => {
        const fetchCompany = async () => {
            if(showUpdate) {
                const resCompany = await EmployeeAPI.getOrganizations(showUpdate._id);
                const companyResult = resCompany.ResponseResult.Result
                setCompany(companyResult[0])
                const resRole = await RoleAPI.getById(showUpdate.roleId);
                const roleResult = resRole.ResponseResult.Result
                setRole(roleResult)
            } else {
                setCompany(null)
                setRole(null)
            }
        }
        fetchCompany()
    },[showUpdate]);

    useEffect(() => {
        const fetchCompany = async () => {
           
        if(company) {
            const resRoles = await CompanyAPI.getRoles(company.organizationId._id);
            const rolesResult = resRoles.ResponseResult.Result
            setRoles(rolesResult)
        } else {
            setRoles(null)
        }
        }
        fetchCompany()
    },[company]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            userName: e.target.userName.value,
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            status: e.target.status.value,
            roleId: e.target.role.value
        }
        if(!e.target.userName.value || !e.target.fullName.value || !e.target.role.value) {
            setError(true)
        } else {
            try {
                const res = await EmployeeAPI.update(data);
                console.log(res);
                setShowUpdate(false)
                setError(false)
            }
            catch(err) {
                console.log(err);
                setMessErr(err.response.data)
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
                                    <input 
                                        type="text" 
                                        className='form-control' 
                                        value={company?company.organizationId.name:null} 
                                        disabled
                                    />
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
                                    defaultValue={showUpdate.userName}
                                    onChange={handleChange}
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
                                    defaultValue={showUpdate.fullName}
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
                                    defaultValue={showUpdate.email}
                                    onChange={handleChange}
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
                                    defaultValue={showUpdate.phoneNumber}
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
                                    {role ? 
                                    <option value={role.roleId} hidden>{role.name}</option> 
                                    : 
                                    <option value={null} hidden>Chọn nhóm quyền</option>
                                    }
                                    {roles && roles.map((role, i) => (
                                        <option key={i} value={role._id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='d-flex m-3 align-items-center justify-content-center'>
                                <div className='d-flex mx-4 align-items-center justify-content-center'>
                                    <input type="radio" id="Active" className='form-checkbox' name='status' value={true} checked/>
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