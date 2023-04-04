import "./addEmployee.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const AddEmployee = ({setShowAdd, showAdd}) => {
    const [selectComany, setSelectCompany] = useState('');
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [subMenu, setSubMenu] = useState(false);

    return (
        <Modal dialogClassName="add-employee" show={showAdd} onHide={() => setShowAdd(false)}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title className='title'>THÊM NHÂN VIÊN</Modal.Title>
            </Modal.Header>
            <Modal.Body className='w-100 m-auto text-center'>
                <form className='form-container'>
                    <div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Công ty
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <select className='select-company' onChange={(e) => setSelectCompany(e.target.value)}>
                                <option>Công ty 1</option>
                                <option>Công ty 2</option>
                                <option>Công ty 3</option>
                            </select>
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Nhập tên đăng nhập
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <input 
                                type="text" 
                                className='form-control'
                                placeholder="Tên đăng nhập"
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
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Nhập lại mật khẩu"
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
                                className='form-control'
                                placeholder="Nhập họ tên"
                            />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">Email</label>
                            </div>
                            <input type="email" className='form-control' placeholder='Nhập Email' />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">Số điện thoại</label>
                            </div>
                            <input type="number" className='form-control' placeholder='Nhập SĐT' />
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                            <div className='label'>
                                <label htmlFor="">
                                    Nhóm quyền
                                    <label style={{color: 'red'}}>*</label>
                                </label>
                            </div>
                            <select className='select-company'>
                                <option disabled>Chọn nhóm quyền</option>
                                <option>Nhóm quyền 1</option>
                                <option>Nhóm quyền 2</option>
                                <option>Nhóm quyền 3</option>
                            </select>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <button className='mx-3 btn btn-cancle' onClick={() => setShowAdd(false)}>
                    Đóng
                </button>
                <button className='mx-3 btn btn-continue'>
                    Thêm mới
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEmployee;