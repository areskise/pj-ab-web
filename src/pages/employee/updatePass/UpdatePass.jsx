import "./updatePass.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const UpdatePass = ({setUpdatePass, updatePass}) => {
    const [subMenu, setSubMenu] = useState(false);
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleRePass, setVisibleRePass] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();

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
        <Modal dialogClassName="update-employee" show={updatePass} onHide={() => setUpdatePass(false)}>
            <form onSubmit={handleSubmit}>
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
                                    name="userName"
                                    className='form-control'
                                    defaultValue={updatePass.userName} 
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
                                    name="fullName"
                                    className='form-control' 
                                    defaultValue={updatePass.fullName}
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
                                    name="password" 
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
                                    name="rePassword" 
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
            </form>
        </Modal>
    )
}

export default UpdatePass;