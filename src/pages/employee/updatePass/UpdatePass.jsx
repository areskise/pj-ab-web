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
console.log(updatePass);
    useEffect(() => {
    },[formValues.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        data.append('userName', e.target.userName.value);
        data.append('newPassword', e.target.rePassword.value);
        console.log(data);

        if(!e.target.rePassword.value || !e.target.password.value) {
            setError(true)
            setMessErr(null)
        } else if (e.target.rePassword.value !== e.target.password.value) {
            setError(false)
            setMessErr("Nhập lại mật khẩu mới không trùng khớp!")
        }
        else {
            setError(false)
            setMessErr(null)

            // try {
            //     console.log();
            //     const res = await CompanyAPI.update(data);
            //     console.log(res);
            //     alertify.set('notifier', 'position', 'top-right');
            //     alertify.success(res.data);
            //     setShowUpdate(false)
            // }
            // catch(err) {
            //     console.log(err);
            //     setMessErr(err.response.data)
            // }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setMessErr(null)
        setUpdatePass(false)
    }

    const onHide = () => {
        setError(false)
        setMessErr(null)
        setUpdatePass(false)
    }

    return (
        <Modal dialogClassName="update-employee" show={updatePass} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>CẬP NHẬT MẬT KHẨU</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 m-auto text-center'>
                    <div className='form-container'>
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
                                    id="floatingRePassword" 
                                    placeholder="Nhập lại mật khẩu mới"
                                />
                                <span toggle="#floatingRePassword" 
                                className={ visibleRePass ? 'toggle-password fa-regular fa-eye-slash' : 'toggle-password fa-regular fa-eye' } 
                                onClick={() => setVisibleRePass(!visibleRePass)}></span>
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
                    <button className='mx-3 btn btn-continue' type="submit">
                        Cập nhật
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default UpdatePass;