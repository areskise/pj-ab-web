import "./detailEmployee.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const DetailEmployee = ({employeeId, setShowDetail, showDetail}) => {
    console.log(showDetail);

    return (
        <Modal dialogClassName="modal-detail" show={showDetail} onHide={() => setShowDetail(false)}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title className='title'>THÔNG TIN NHÂN VIÊN</Modal.Title>
            </Modal.Header>
            <Modal.Body className='w-100 m-auto text-center'>
                <form >
                    <div>
                        <div className="d-flex mx-4">
                            <h5 className='title m-1'>Thông tin cá nhân</h5>
                            <hr />
                        </div>
                        <div className='form-container'>
                            <div className="mx-3">
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Tên đăng nhập</label>
                                    </div>
                                    <input type="text" className='form-control' value={showDetail?.userId?.userName} disabled/>
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Mã TC</label>
                                    </div>
                                    <input type="email" className='form-control' value={showDetail?.userId?.email} disabled />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Trạng thái</label>
                                    </div>
                                    <input type="text" className='form-control' value={showDetail?.userId?.status?'Hoạt động':'Không hoạt động'} disabled/>
                                </div>
                            </div>
                            <div className="mx-3">
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Họ tên</label>
                                    </div>
                                    <input type="text" className='form-control' value={showDetail?.userId?.fullName} disabled/>
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Số điện thoại</label>
                                    </div>
                                    <input type="number" className='form-control' value={showDetail?.userId?.phoneNumber} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex mx-4">
                            <h5 className='title m-1'>Thông tin phân quyền</h5>
                        </div>
                        <div className='form-container'>
                            <div className="mx-3">
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Nhóm quyền</label>
                                    </div>
                                    <input type="text" className='form-control' value={showDetail?.roleId?.name} disabled/>
                                </div>
                            </div>
                            <div className="mx-3">
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Công ty</label>
                                    </div>
                                    <input type="text" className='form-control' value={showDetail?.organizationId?.name} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <button className='mx-3 btn btn-cancle' onClick={() => setShowDetail(false)}>
                    Đóng
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailEmployee;