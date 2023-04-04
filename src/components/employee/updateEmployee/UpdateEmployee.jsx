import "./updateEmployee.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const UpdateEmployee = ({setShowUpdate, showUpdate}) => {
    const [subMenu, setSubMenu] = useState(false);

    return (
        <Modal dialogClassName="update-employee" show={showUpdate} onHide={() => setShowUpdate(false)}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title className='title'>CẬP NHẬT NHÂN VIÊN</Modal.Title>
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
                                <input 
                                    type="text" 
                                    className='form-control' 
                                    value={'Công ty 1'} 
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
                                className='form-control'
                                placeholder='Nhập tên đăng nhập'
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
                                placeholder='Nhập họ tên'
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
                                <option>Nhóm quyền 1</option>
                                <option>Nhóm quyền 2</option>
                                <option>Nhóm quyền 3</option>
                            </select>
                        </div>
                        <div className='d-flex m-3 align-items-center justify-content-center'>
                            <div className='d-flex mx-4 align-items-center justify-content-center'>
                                <input type="radio" className='form-checkbox' name='employee' checked/>
                                <div>
                                    <label htmlFor="" className='employee-active'>Hoạt động</label>
                                </div>
                            </div>
                            <div className='d-flex mx-4 align-items-center justify-content-center'>
                                <input type="radio" className='form-checkbox' name='employee'/>
                                <div>
                                    <label htmlFor="" className='employee-disable'>Không hoạt động</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <button className='mx-3 btn btn-cancle' onClick={() => setShowUpdate(false)}>
                    Đóng
                </button>
                <button className='mx-3 btn btn-continue'>
                    Cập nhật
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateEmployee;