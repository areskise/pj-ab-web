import "./addHui.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import EmployeeAPI from "../../../API/EmployeeAPI";
import { useSelector } from "react-redux";
import { selectorUserCompanies } from "../../../redux/slice/companySlice";
import CompanyAPI from "../../../API/CompanyAPI";

const AddHui = ({setShowAdd, showAdd}) => {
    const [selectCompany, setSelectCompany] = useState(null);
    const [selectRole, setSelectRole] = useState(null);
    const [typeKhui, setTypeKhui] = useState('1');
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [roles, setRoles] = useState([]);
    const data = new FormData();
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
        data.append('organizationId', selectCompany?._id);
        data.append('userName', e.target.userName.value);
        data.append('password', e.target.password.value);
        data.append('fullName', e.target.fullName.value);
        data.append('email', e.target.email.value);
        data.append('phoneNumber', e.target.phoneNumber.value);
        data.append('roleId', selectRole?._id);
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
        <Modal dialogClassName="add-hui" show={showAdd} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>THÊM HỤI</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 m-auto text-center'>
                    <div className='form-container'>
                        <div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Công ty
                                    </label>
                                </div>
                                <div className="d-flex dropdown select-dropdown text-end">
                                    <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className='selected-company p-2'>{selectCompany?selectCompany?.name:'Chọn công ty'}</span>
                                    </a>
                                    <ul className="p-0 my-1 dropdown-menu text-small">
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
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Mã hụi
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="code"
                                    className='form-control'
                                    placeholder="Nhập mã hụi"
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Tên hụi
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="name"
                                    className='form-control'
                                    placeholder="Nhập tên hụi"
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Group nhắc hụi
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="idChanel"
                                    className='form-control'
                                    placeholder="Nhập ID group nhắc hụi"
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Khui
                                    </label>
                                </div>
                                <div className="d-flex w-100">
                                    <div className="d-flex mr-2 select-dropdown dropdown text-end">
                                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                            {typeKhui==='1' && (<>
                                                <span className='selected-company p-2'>Tháng</span>
                                            </>)}
                                            {typeKhui==='2' && (<>
                                                <span className='selected-company p-2'>Tuần</span>
                                            </>)}
                                            {typeKhui==='3' && (<>
                                                <span className='selected-company p-2'>Ngày</span>
                                            </>)}

                                        </a>
                                        <ul className="p-0 my-1 dropdown-menu text-small">
                                            <li>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={typeKhui==='1'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setTypeKhui('1')}
                                                >
                                                    Tháng
                                                </button>
                                            </li>
                                            <li>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={typeKhui==='2'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setTypeKhui('2')}
                                                >
                                                    Tuần
                                                </button>
                                            </li>
                                            <li>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={typeKhui==='3'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setTypeKhui('3')}
                                                >
                                                    Ngày
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="numKhui"
                                        className='form-control'
                                        placeholder="Thời gian"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">Số phần</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="partNum"
                                    className='form-control' 
                                    placeholder='Nhập số phần hụi' 
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">Dây</label>
                                </div>
                                <div className="d-flex w-100 align-items-center">
                                    <input 
                                        type="number" 
                                        name="money"
                                        className='form-control mr-2' 
                                        placeholder='Nhập số tiền' 
                                        onKeyDown={handleKeyDown}
                                    />
                                    VND
                                </div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">Bảo hiểm (tiền thảo)</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="insureNum"
                                    className='form-control mr-2' 
                                    placeholder='Nhập % bảo hiểm' 
                                    onKeyDown={handleKeyDown}
                                />
                                %
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">Nhân viên</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    {selectCompany?
                                        <div className="d-flex mr-2 select-dropdown dropdown text-end">
                                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className='selected-company p-2'>{selectRole?selectRole?.name:'Chọn nhân viên'}</span>
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
                                    :
                                        <select 
                                            className='form-select mr-2 select-company' name="role" 
                                            disabled
                                        >
                                            <option value='' hidden>Chọn công ty trước</option>
                                        </select>
                                    }
                                    <input 
                                        type="number" 
                                        name="insureNum"
                                        className='form-control mr-2' 
                                        placeholder='Nhập % bảo hiểm' 
                                        onKeyDown={handleKeyDown}
                                    />
                                    %
                                </div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center text-align-center justify-content-between'>
                                    <div className='label'>
                                        <label htmlFor="">Ngày mở</label>
                                    </div>
                                    <input 
                                        type="date" 
                                        name="startDate"
                                        className='form-control mr-2' 
                                        defaultValue={format(new Date(), 'yyyy-MM-dd')} 
                                        min={format(new Date(), 'yyyy-MM-dd')}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center text-align-center justify-content-between'>
                                    <div className='label'>
                                        <label htmlFor="">Ngày kết thúc</label>
                                    </div>
                                    <input 
                                        type="date" 
                                        name="endDate"
                                        className='form-control' 
                                        defaultValue={format(new Date(), 'yyyy-MM-dd')} 
                                        min={format(new Date(), 'yyyy-MM-dd')}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Hụi viên
                                    </label>
                                </div>
                                {selectCompany?
                                    <div className="d-flex select-dropdown dropdown text-end">
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
                        <div>
                            <h6 className="d-flex m-md-3">Danh sách hụi viên</h6>
                            <div className='form-check'>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                    <div className='label'>
                                        <label htmlFor="">Bảo hiểm</label>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="insureNum"
                                        className='form-control mr-2' 
                                        style={{width: '116px'}}
                                        placeholder='Số chân hụi' 
                                        onKeyDown={handleKeyDown}
                                    />
                                    %
                                </div>
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

export default AddHui;