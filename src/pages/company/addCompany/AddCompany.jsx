import "./addCompany.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import companyCode from '../../../helpers/companyCode';
import CompanyAPI from "../../../API/CompanyAPI";
import { useSelector } from "react-redux";
import { selectorApplications } from "../../../redux/slice/applicationSlice";

const AddCompany = ({setShowAdd, showAdd}) => {
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [code, setCode] = useState(null);
    const [formValues, setFormValues] = useState({});
    const applications = useSelector(selectorApplications)

    useEffect(() => {
        setCode(companyCode(formValues.name))
    },[formValues]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const defaultApp = applications.find(app => app.title === 'default')
        const huiApp = applications.find(app => app.title === 'hui')
        const app = [defaultApp._id]

        if(e.target.hui.checked) {
            app.push(huiApp._id)
        }

        const data = {
            name: e.target.name.value,
            title: e.target.code.value,
            phone: e.target.phone.value,
            money: e.target.money.value,
            startDate: e.target.startDate.value,
            applicationId: app
        }
        
        if(!e.target.name.value || !e.target.phone.value || !e.target.money.value || !e.target.startDate.value) {
            setError(true)
            setMessErr(null)
        } else {
            try {
                const res = await CompanyAPI.create(data);
                if(res.ResponseResult.ErrorCode === 0){
                    setShowAdd(false)
                    setCode(null)
                    setError(false)
                    setMessErr(null)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Thêm mới thành công!');
                } else if(res.ResponseResult.Result.code === 11000) {
                    setError(false)
                    setMessErr('Mã công ty đã tồn tại. Vui lòng nhập tên khác!')
                } else {
                    console.log(res.ResponseResult.Message);
                    setError(false)
                    setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                }
            }
            catch(err) {
                console.log(err);
                setError(false)
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setCode(null)
        setShowAdd(false)
        setMessErr(null)
    }

    const onHide = () => {
        setError(false)
        setCode(null)
        setShowAdd(false)
        setMessErr(null)
    }

    return (
        <Modal dialogClassName="modal-add" show={showAdd} onHide={onHide}>
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
                                    />
                                    <span className='money'>VND</span>
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Ngày hoạt động</label>
                                    </div>
                                    <input 
                                        type="date" 
                                        name="startDate"
                                        className='form-control' 
                                        defaultValue={format(new Date(), 'yyyy-MM-dd')} 
                                        min={format(new Date(), 'yyyy-MM-dd')}
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
                                    <input 
                                        type="checkbox" 
                                        className='form-checkbox' 
                                        id='hui' 
                                        name="hui"
                                    />
                                    <div>
                                        <label htmlFor="hui">Quản lý hụi</label>
                                    </div>
                                </div>
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
                    <button className='mx-3 btn btn-continue' type="submit">
                        Thêm mới
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddCompany;