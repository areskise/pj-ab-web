import "./updateCompany.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import alertify from 'alertifyjs';
import CompanyAPI from "../../../API/CompanyAPI";

const UpdateCompany = ({setShowUpdate, showUpdate}) => {
    const [subMenu, setSubMenu] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();
    
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(!admin) {
    //         navigate('/');
    //     }
    // },[admin, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('name', formValues.name);
        data.append('code', formValues.code);
        data.append('phone', formValues.phone);
        data.append('money', formValues.money);
        data.append('date', formValues.date);
        if(!formValues.name || !formValues.code || !formValues.phone || !formValues.money || !formValues.date) {
            setError(true)
        } else {
            try {
                const res = await CompanyAPI.create(data);
                console.log(res);
                alertify.set('notifier', 'position', 'top-right');
                alertify.success(res.data);
            }
            catch(err) {
                console.log(err);
                setMessErr(err.response.data)
            }
        }
    };

    return (
        <Modal dialogClassName="modal-update" show={showUpdate} onHide={() => setShowUpdate(false)}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title className='title'>CẬP NHẬT CÔNG TY</Modal.Title>
            </Modal.Header>
            <Modal.Body className='w-100 m-auto text-center'>
                <form className='form-container'>
                    <div>
                        <h5 className='title'>THÔNG TIN CÔNG TY</h5>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">Tên công ty</label>
                                </div>
                                <input type="text" className='form-control' placeholder='Nhập từ khóa tìm kiếm' value={'Công ty 1'}/>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">Mã TC</label>
                                </div>
                                <input type="text" className='form-control' placeholder='Nhập từ khóa tìm kiếm' value={'CT1'}/>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">Số điện thoại</label>
                                </div>
                                <input type="number" className='form-control' placeholder='Nhập từ khóa tìm kiếm' value={'0123456789'}/>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">Số vốn</label>
                                </div>
                                <input type="number" className='form-control form-money' value={'100000000000'}/>
                                <span className='money'>VND</span>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                <div className='label'>
                                    <label htmlFor="">Ngày hoạt động</label>
                                </div>
                                <input type="date" className='form-control' placeholder='Nhập từ khóa tìm kiếm' value={'2023-03-24'}/>
                            </div>
                            <div className='d-flex m-3 align-items-center justify-content-center'>
                                <div className='d-flex mx-4 align-items-center justify-content-center'>
                                    <input type="radio" className='form-checkbox' name='company' checked/>
                                    <div>
                                        <label htmlFor="" className='company-active'>Hoạt động</label>
                                    </div>
                                </div>
                                <div className='d-flex mx-4 align-items-center justify-content-center'>
                                    <input type="radio" className='form-checkbox' name='company'/>
                                    <div>
                                        <label htmlFor="" className='company-disable'>Không hoạt động</label>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div>
                        <h5 className='title'>THÊM CHỨC NĂNG</h5>
                        <div className='form-check'>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                <input type="text" className='form-control' placeholder='Nhập từ khóa tìm kiếm'/>
                            </div>
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input type="checkbox" className='form-checkbox' />
                                <div>
                                    <label htmlFor="">Tất cả</label>
                                </div>
                            </div>
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input type="checkbox" className='form-checkbox' />
                                <div>
                                    <label htmlFor="">Trang chủ</label>
                                </div>
                            </div>
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input type="checkbox" className='form-checkbox' />
                                <div>
                                    <label htmlFor="">Quản lý công ty</label>
                                </div>
                            </div>
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input type="checkbox" className='form-checkbox' />
                                <div onClick={()=>setSubMenu(!subMenu)}>
                                    <label htmlFor="">
                                        Quản lý người dùng
                                        <i className="mx-3 fa-solid fa-chevron-down"></i>
                                    </label>
                                </div>
                            </div>
                            {subMenu &&
                                <ul>
                                    <li className='nav-sub-item p-2'>
                                        <div className='d-flex mx-4 align-items-center justify-content-start'>
                                            <input type="checkbox" className='form-checkbox' />
                                            <div>
                                                <label htmlFor="">Nhân viên</label>
                                            </div>
                                        </div>
                                        <ul className='mt-2'>
                                            <li className='nav-sub-item p-2'>
                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                    <input type="checkbox" className='form-checkbox' />
                                                    <div>
                                                        <label htmlFor="">Thêm</label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='nav-sub-item p-2'>
                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                    <input type="checkbox" className='form-checkbox' />
                                                    <div>
                                                        <label htmlFor="">Cập nhập</label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='nav-sub-item px-2'>
                                        <div className='d-flex mx-4 align-items-center justify-content-start'>
                                            <input type="checkbox" className='form-checkbox' />
                                            <div>
                                                <label htmlFor="">Khách hàng</label>
                                            </div>
                                        </div>
                                        <ul className='mt-2'>
                                            <li className='nav-sub-item p-2'>
                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                    <input type="checkbox" className='form-checkbox' />
                                                    <div>
                                                        <label htmlFor="">Thêm</label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='nav-sub-item p-2'>
                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                    <input type="checkbox" className='form-checkbox' />
                                                    <div>
                                                        <label htmlFor="">Cập nhật</label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            }
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input type="checkbox" className='form-checkbox' />
                                <div>
                                    <label htmlFor="">Quản lý hụi</label>
                                </div>
                            </div>
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input type="checkbox" className='form-checkbox' />
                                <div>
                                    <label htmlFor="">Báo cáo</label>
                                </div>
                            </div>
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input type="checkbox" className='form-checkbox' />
                                <div>
                                    <label htmlFor="">Ngày hoạt động</label>
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

export default UpdateCompany;