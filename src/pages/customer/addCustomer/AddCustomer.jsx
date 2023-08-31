import "./addCustomer.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useEffect, useState } from 'react';
import CustomerAPI from "../../../API/CustomerAPI";
import { useSelector } from "react-redux";
import { selectorUserCompanies } from "../../../redux/slice/companySlice";
import CompanyAPI from "../../../API/CompanyAPI";

const AddCustomer = ({setShowAdd, showAdd}) => {
    const [selectCompany, setSelectCompany] = useState(null);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [code, setCode] = useState(null);
    const userCompanies = useSelector(selectorUserCompanies)
    
    useEffect(() => {
        if(selectCompany) {
            const fetchCode = async () => {
                const resCount = await CustomerAPI.getCount(selectCompany?._id)
                const count = resCount.ResponseResult.Result.count+1
                setCode('KH'+count+(selectCompany.title))
            }
            fetchCode();
        }
    },[selectCompany,showAdd]);

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
            code: e.target.code.value,
            fullName: e.target.fullName.value,
            phoneNumber: e.target.phoneNumber.value,
            cccd: e.target.cccd.value,
            idChanel: e.target.idChanel.value,
            address: e.target.address.value,
        }
        if(
            !selectCompany?._id || 
            !e.target.code.value || 
            !e.target.fullName.value || 
            !e.target.phoneNumber.value || 
            !e.target.cccd.value || 
            !e.target.idChanel.value || 
            !e.target.address.value
        ) {
            setError(true)
            setMessErr(null)
        } else if(e.target.phoneNumber.value && e.target.phoneNumber.value.length !== 10) {
            setError(null)
            setMessErr('Số điện thoại phải gồm 10 chữ số')
        } else {
            try {
                const res = await CustomerAPI.create(data);
                if(res.ResponseResult.ErrorCode === 0){
                    setShowAdd(false)
                    setError(false)
                    setMessErr(null)
                    setSelectCompany(null)
                    setCode(null)
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
        setCode(null)
    }

    const onHide = () => {
        setError(false)
        setShowAdd(false)
        setMessErr(null)
        setSelectCompany(null)
        setCode(null)
    }

    return (
        <Modal dialogClassName="add-customer" show={showAdd} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>THÊM KHÁCH HÀNG</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 m-auto text-center'>
                    <div className='form-container'>
                        <div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Công ty
                                    </label>
                                </div>
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
                                        Mã KH
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="code"
                                    className='form-control'
                                    onKeyDown={handleKeyDown}
                                    value={code}
                                    disabled
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Tên KH
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    className='form-control'
                                    placeholder="Nhập tên KH"
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
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">CMND/CCCD</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="cccd"
                                    className='form-control' 
                                    placeholder='Nhập CMND/CCCD' 
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">ID Telegram</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="idChanel"
                                    className='form-control' 
                                    placeholder='Nhập ID Telegram' 
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">Địa chỉ</label>
                                </div>
                                <textarea 
                                    rows="4"
                                    name="address"
                                    className='form-control form-textarea' 
                                    placeholder='Nhập địa chỉ' 
                                    onKeyDown={handleKeyDown}
                                />
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

export default AddCustomer;