import "./updateCustomer.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useState, useEffect, memo } from 'react';
import CustomerAPI from "../../../API/CustomerAPI";

const UpdateCustomer = ({selectCompany, setShowUpdate, showUpdate}) => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            if(showUpdate) {
                const res = await CustomerAPI.get(showUpdate);
                const result = res.ResponseResult.Result
                setSelectedCompany(result.organizationId)
                setCustomer(result)
            } else {
                setSelectedCompany(null)
                setCustomer(null)
            }
        }
        fetchCompany()
    },[showUpdate]);

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            document.getElementById('submitBtn').click();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            _id: customer?._id,
            organizationId: selectedCompany?._id,
            code: e.target.code.value,
            fullName: e.target.fullName.value,
            phoneNumber: e.target.phoneNumber.value,
            cccd: e.target.cccd.value,
            idChanel: e.target.idChanel.value,
            address: e.target.address.value,
        }
        if( 
            !selectedCompany?._id || 
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
                const res = await CustomerAPI.update(data);
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
        <Modal dialogClassName="update-customer" show={showUpdate} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>CẬP NHẬT KHÁCH HÀNG</Modal.Title>
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
                                <select 
                                    name="company" 
                                    className='form-select select-company'
                                    disabled
                                >
                                    <option value={selectedCompany?._id} >{selectedCompany?.name}</option>
                                </select>
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
                                value={customer?.code}
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
                                    placeholder='Nhập tên KH'
                                    defaultValue={customer?.fullName}
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
                                    defaultValue={customer?.phoneNumber}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">CMND/CCCD</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="cccd"
                                    className='form-control' 
                                    placeholder='Nhập CMND/CCCD' 
                                    defaultValue={customer?.cccd}
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
                                    defaultValue={customer?.idChanel}
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
                                    defaultValue={customer?.address}
                                    onKeyDown={handleKeyDown}
                                />
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

export default memo(UpdateCustomer);