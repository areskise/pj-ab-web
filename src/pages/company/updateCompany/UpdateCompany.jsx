import "./updateCompany.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CompanyAPI from "../../../API/CompanyAPI";
import companyCode from "../../../helpers/companyCode";
import { selectorApplications } from "../../../redux/slice/applicationSlice";
import { useSelector } from "react-redux";

const UpdateCompany = ({setShowUpdate, showUpdate}) => {
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
    },[showUpdate]);

    useEffect(() => {
        setCode(companyCode(formValues.name))
    },[formValues.name]);
    
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
            phone: +e.target.phone.value,
            money: +e.target.money.value,
            date: e.target.date.value,
            status: e.target.status.value,
            applicationId: app
        }
        if(!e.target.name.value || !e.target.phone.value || !e.target.money.value || !e.target.date.value) {
            setError(true)
        } else {
            try {
                const res = await CompanyAPI.update(data);
                console.log(res);
                setShowUpdate(false)
                setCode(null)
                setSelectHui(false)
                setError(false)                
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Cập nhật thành công!');
            }
            catch(err) {
                console.log(err);
                setMessErr(err.response.data)
            }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setCode(null)
        setShowUpdate(false)
        setSelectHui(false)
    }

    const onHide = () => {
        setError(false)
        setCode(null)
        setShowUpdate(false)
        setSelectHui(false)
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
                                        defaultValue={showUpdate.money}
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
                                        placeholder='Nhập từ khóa tìm kiếm' 
                                        defaultValue={showUpdate.createdAt?format(new Date(showUpdate.createdAt), 'yyyy-MM-dd'):format(new Date(), 'yyyy-MM-dd')}
                                        min={showUpdate.createdAt?format(new Date(showUpdate.createdAt), 'yyyy-MM-dd'):format(new Date(), 'yyyy-MM-dd')}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex m-3 align-items-center justify-content-center'>
                                    <div className='d-flex mx-4 align-items-center justify-content-center'>
                                        <input type="radio" id="Active" className='form-checkbox' name='status' value={true} defaultChecked/>
                                        <div>
                                            <label htmlFor="Active" className='company-active'>Hoạt động</label>
                                        </div>
                                    </div>
                                    <div className='d-flex mx-4 align-items-center justify-content-center'>
                                        <input type="radio" id="Disable" className='form-checkbox' name='status' value={false}/>
                                        <div>
                                            <label htmlFor="Disable" className='company-disable'>Không hoạt động</label>
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
                                {selectHui ? 
                                    <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                        <input 
                                            type="checkbox" 
                                            id='hui' 
                                            name="hui"
                                            className='form-checkbox' 
                                            defaultChecked
                                        />
                                        <div>
                                            <label htmlFor="hui">Quản lý hụi</label>
                                        </div>
                                    </div> 
                                :   <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
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
                    <button className='mx-3 btn btn-continue' type="submit">
                        Cập nhật
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default UpdateCompany;