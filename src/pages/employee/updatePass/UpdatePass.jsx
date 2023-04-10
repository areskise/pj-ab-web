import "./updatePass.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const UpdatePass = ({setUpdatePass, updatePass}) => {
    const [subMenu, setSubMenu] = useState(false);
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);

    return (
        <Modal dialogClassName="update-employee" show={updatePass} onHide={() => setUpdatePass(false)}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title className='title'>CẬP NHẬT MẬT KHẨU</Modal.Title>
            </Modal.Header>
            <Modal.Body className='w-100 m-auto text-center'>
                <form className='form-container'>
                    <div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Tên đăng nhập
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type="text" 
                                className='form-control'
                                value="anguyenanguyen" 
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
                                className='form-control' 
                                value="Nguyễn Văn A" 
                                disabled
                            />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Mật khẩu mới
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type={ visiblePass ? "text" : "password"} 
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Nhập mật khẩu mới"
                            />
                            <span toggle="#floatingPassword" 
                            className={ visiblePass ? 'toggle-password fa-regular fa-eye-slash' : 'toggle-password fa-regular fa-eye' } 
                            onClick={() => setVisiblePass(!visiblePass)}></span>
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Nhập lại mật khẩu mới
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type={ visibleRePass ? "text" : "password"} 
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Nhập lại mật khẩu mới"
                            />
                            <span toggle="#floatingPassword" 
                            className={ visibleRePass ? 'toggle-password fa-regular fa-eye-slash' : 'toggle-password fa-regular fa-eye' } 
                            onClick={() => setVisibleRePass(!visibleRePass)}></span>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <button className='mx-3 btn btn-cancle' onClick={() => setUpdatePass(false)}>
                    Đóng
                </button>
                <button className='mx-3 btn btn-continue'>
                    Cập nhật
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdatePass;