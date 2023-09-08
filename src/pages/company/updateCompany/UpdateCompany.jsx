import "./updateCompany.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useState, useEffect, memo } from 'react';
import { format } from 'date-fns';
import CompanyAPI from "../../../API/CompanyAPI";
import companyCode from "../../../helpers/companyCode";
import { selectorApplications } from "../../../redux/slice/applicationSlice";
import { useSelector } from "react-redux";
import { InputNumber } from "antd";

const UpdateCompany = ({setShowUpdate, showUpdate, setReload, reload}) => {
    const [error, setError] = useState(false);
    const [selectHui, setSelectHui] = useState(false);
    const [code, setCode] = useState(null);
    const [messErr, setMessErr] = useState(null);
    const [formValues, setFormValues] = useState({});
    const applications = useSelector(selectorApplications)

    useEffect(() => {
        if(showUpdate && applications) {
            const huiApp = applications.find(app => app.title === 'hui')
            const hui = showUpdate.applicationId.includes(huiApp._id)
            setSelectHui(hui)
        }
    },[showUpdate, applications]);

    useEffect(() => {
        setCode(companyCode(formValues.name))
    },[formValues]);

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            document.getElementById('submitBtn').click();
        }
    }
    
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
            _id: showUpdate._id,
            name: e.target.name.value,
            title: e.target.code.value,
            phone: e.target.phone.value,
            money: +e.target.money.ariaValueNow,
            startDate: e.target.startDate.value,
            status: e.target.status.value,
            applicationId: app
        }
        if(!e.target.name.value || !e.target.phone.value || !e.target.money.value || !e.target.startDate.value) {
            setError(true)
            setMessErr(null)
        } else if(e.target.phone.value && e.target.phone.value.length !== 10) {
            setError(null)
            setMessErr('Số điện thoại phải gồm 10 chữ số')
        } else {
            try {
                const res = await CompanyAPI.update(data);
                if(res.ResponseResult.ErrorCode === 0){
                    setShowUpdate(false)
                    setCode(null)
                    setError(false)
                    setMessErr(null)
                    setReload(!reload)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Cập nhật thành công!');
                } else {
                    if(res.ResponseResult.Result.code === 11000) {
                        setError(false)
                        setMessErr('Mã công ty đã tồn tại. Vui lòng nhập tên khác!')
                    } else {
                        console.error(res.ResponseResult.Message);
                        setError(false)
                        setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                    }
                }
            }
            catch(err) {
                console.error(err)
                setError(false)
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setCode(null)
        setShowUpdate(false)
        setSelectHui(false)
        setMessErr(null)
    }

    const onHide = () => {
        setError(false)
        setCode(null)
        setShowUpdate(false)
        setSelectHui(false)
        setMessErr(null)
    }

    return (
        <Modal dialogClassName="modal-update" show={showUpdate} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>CẬP NHẬT CÔNG TY</Modal.Title>
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
                                        defaultValue={showUpdate.name}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Mã CT</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="code"
                                        className='form-control' 
                                        defaultValue={showUpdate.title}
                                        value={code}
                                        onChange={handleChange}
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
                                        placeholder='Nhập số điện thoại' 
                                        defaultValue={showUpdate.phone}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center justify-content-end'>
                                    <div className='label'>
                                        <label htmlFor="">Số vốn</label>
                                    </div>
                                    {/* <input 
                                        type="number" 
                                        name="money"
                                        className='form-control form-money' 
                                        defaultValue={showUpdate.money}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    /> */}
                                    <InputNumber
                                        name="money"
                                        className='form-control form-money form-number'
                                        defaultValue={showUpdate.money}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        placeholder='Nhập số vốn'
                                        onKeyDown={handleKeyDown}
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
                                        placeholder='Nhập từ khóa tìm kiếm' 
                                        defaultValue={showUpdate.startDate?format(new Date(showUpdate.startDate), 'yyyy-MM-dd'):format(new Date(), 'yyyy-MM-dd')}
                                        min={showUpdate.startDate?format((new Date(showUpdate.startDate)<new Date())?new Date(showUpdate.startDate):new Date(), 'yyyy-MM-dd'):format(new Date(), 'yyyy-MM-dd')}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                {showUpdate.status?
                                <div className='d-flex m-3 align-items-center justify-content-center'>
                                    <div className='d-flex mx-4 align-items-center justify-content-center'>
                                        <input 
                                            type="radio" 
                                            id="Active" 
                                            className='form-checkbox' 
                                            name='status' 
                                            value={true} 
                                            onKeyDown={handleKeyDown}
                                            defaultChecked
                                        />
                                        <div>
                                            <label htmlFor="Active" className='company-active'>Hoạt động</label>
                                        </div>
                                    </div>
                                    <div className='d-flex mx-4 align-items-center justify-content-center'>
                                        <input 
                                            type="radio" 
                                            id="Disable" 
                                            className='form-checkbox' 
                                            name='status' 
                                            value={false}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <div>
                                            <label htmlFor="Disable" className='company-disable'>Không hoạt động</label>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='d-flex m-3 align-items-center justify-content-center'>
                                    <div className='d-flex mx-4 align-items-center justify-content-center'>
                                        <input 
                                            type="radio" 
                                            id="Active" 
                                            className='form-checkbox' 
                                            name='status' 
                                            value={true}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <div>
                                            <label htmlFor="Active" className='company-active'>Hoạt động</label>
                                        </div>
                                    </div>
                                    <div className='d-flex mx-4 align-items-center justify-content-center'>
                                        <input 
                                            type="radio" 
                                            id="Disable" 
                                            className='form-checkbox' 
                                            name='status' 
                                            value={false} 
                                            onKeyDown={handleKeyDown}
                                            defaultChecked
                                        />
                                        <div>
                                            <label htmlFor="Disable" className='company-disable'>Không hoạt động</label>
                                        </div>
                                    </div>
                                </div>
                                }
                        </div>
                        <div>
                            <h5 className='title'>THÊM CHỨC NĂNG</h5>
                            <div className='form-check'>
                                <div className='d-flex my-3 align-items-center justify-content-start'>
                                    <input 
                                        type="text" 
                                        className='form-control' 
                                        placeholder='Nhập từ khóa tìm kiếm'
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                {selectHui ? 
                                    <div className='d-flex m-2 align-items-center justify-content-start'>
                                        <input 
                                            type="checkbox" 
                                            id='hui' 
                                            name="hui"
                                            className='form-checkbox'
                                            onKeyDown={handleKeyDown} 
                                            defaultChecked
                                        />
                                        <div>
                                            <label htmlFor="hui">Quản lý hụi</label>
                                        </div>
                                    </div> 
                                :   <div className='d-flex m-2 align-items-center justify-content-start'>
                                        <input 
                                            type="checkbox" 
                                            className='form-checkbox'
                                            id='hui' 
                                            name="hui"
                                            onKeyDown={handleKeyDown}
                                        />
                                        <div>
                                            <label htmlFor="hui">Quản lý hụi</label>
                                        </div>
                                    </div>                        
                                }
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
                    <button className='mx-3 btn btn-continue' type="submit" id='submitBtn'>
                        Cập nhật
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default memo(UpdateCompany);