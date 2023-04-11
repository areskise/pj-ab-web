import "./updateEmployee.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { selectorCompanies } from "../../../redux/slice/companySlice";
import { useSelector } from "react-redux";

const UpdateEmployee = ({setShowUpdate, showUpdate}) => {
    const [subMenu, setSubMenu] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();
    const navigate = useNavigate();

    useEffect(() => {
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
        data.append('date', e.target.date.value);
        console.log(data);

        // if(!e.target.name.value || !e.target.code.value || !e.target.phone.value || !e.target.money.value || !e.target.date.value) {
        //     setError(true)
        // } else {
        //     try {
        //         console.log();
        //         const res = await CompanyAPI.update(data);
        //         console.log(res);
        //         alertify.set('notifier', 'position', 'top-right');
        //         alertify.success(res.data);
        //         setShowUpdate(false)
        //     }
        //     catch(err) {
        //         console.log(err);
        //         setMessErr(err.response.data)
        //     }
        // }
    };

    return (
        <Modal dialogClassName="update-employee" show={showUpdate} onHide={() => setShowUpdate(false)}>
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
                                <select className='select-company'>
                                    <option>Nhóm quyền 1</option>
                                    <option>Nhóm quyền 2</option>
                                    <option>Nhóm quyền 3</option>
                                </select>
                            </div>
                            <div className='d-flex m-3 align-items-center justify-content-center'>
                                <div className='d-flex mx-4 align-items-center justify-content-center'>
                                    <input type="radio" id="Active" className='form-checkbox' name='employee' checked/>
                                    <div>
                                        <label htmlFor="Active" className='employee-active'>Hoạt động</label>
                                    </div>
                                </div>
                                <div className='d-flex mx-4 align-items-center justify-content-center'>
                                    <input type="radio" id='Disable' className='form-checkbox' name='employee'/>
                                    <div>
                                        <label htmlFor="Disable" className='employee-disable'>Không hoạt động</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <button className='mx-3 btn btn-cancle' onClick={() => setShowUpdate(false)}>
                        Đóng
                    </button>
                    <button className='mx-3 btn btn-continue'>
                        Cập nhật
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default UpdateEmployee;