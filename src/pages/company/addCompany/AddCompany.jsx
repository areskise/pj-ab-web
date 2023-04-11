import "./addCompany.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import companyCode from '../../../helpers/companyCode';
import CompanyAPI from "../../../API/CompanyAPI";

const AddCompany = ({setShowAdd, showAdd}) => {
    const [subMenu, setSubMenu] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [code, setCode] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();
    
    useEffect(() => {
        setCode(companyCode(formValues.name))
    },[formValues.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('name', e.target.name.value);
        data.append('title', e.target.code.value);
        data.append('phone', e.target.phone.value);
        data.append('money', e.target.money.value);
        data.append('createAt', e.target.date.value);
        if(!e.target.name.value || !e.target.phone.value || !e.target.money.value || !e.target.date.value) {
            setError(true)
        } else {
            try {
                const res = await CompanyAPI.create(data);
                console.log(res);
                
                // alertify.set('notifier', 'position', 'top-right');
                // alertify.success(res.data);
                setShowAdd(false)
                setError(false)
            }
            catch(err) {
                console.log(err);
                setMessErr(err.response.data)
            }
        }
    };

    return (
        <Modal dialogClassName="modal-add" show={showAdd} onHide={() => setShowAdd(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>THÊM CÔNG TY</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 m-auto text-center'>
                    <div className='form-container'>
                        <div>
                            <h5 className='title'>THÔNG TIN CÔNG TY</h5>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Tên công ty</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="name"
                                        className='form-control' 
                                        placeholder='Nhập tên công ty'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Mã TC</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="code"
                                        className='form-control' 
                                        defaultValue={code}
                                        disabled 
                                    />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Số điện thoại</label>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="phone"
                                        className='form-control' 
                                        placeholder='Nhập SĐT' 
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Số vốn</label>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="money"
                                        className='form-control form-money' 
                                        placeholder='Nhập số vốn'
                                        onChange={handleChange}
                                        
                                    />
                                    <span className='money'>VND</span>
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Ngày hoạt động</label>
                                    </div>
                                    <input 
                                        type="date" 
                                        name="date"
                                        className='form-control' 
                                        defaultValue={format(new Date(), 'yyyy-MM-dd')} 
                                        min={format(new Date(), 'yyyy-MM-dd')}
                                        onChange={handleChange}
                                    />
                                </div>
                        </div>
                        <div>
                            <h5 className='title'>THÊM CHỨC NĂNG</h5>
                            <div className='form-check'>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                    <input type="text" className='form-control' placeholder='Nhập từ khóa tìm kiếm' />
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
                    <button 
                        className='mx-3 btn btn-cancle' 
                        onClick={() => {
                            setShowAdd(false)
                            setError(false)
                        }}
                    >
                        Đóng
                    </button>
                    <button className='mx-3 btn btn-continue' type="submit">
                        Thêm mới
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddCompany;