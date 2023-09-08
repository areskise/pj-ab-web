import "./addHui.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import { memo, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { selectorUserCompanies } from "../../../redux/slice/companySlice";
import CompanyAPI from "../../../API/CompanyAPI";
import CustomerAPI from "../../../API/CustomerAPI";
import HuiAPI from "../../../API/HuiAPI";
import { dayKhui } from "../../../helpers/dayKhui";
import customerList from "../../../helpers/customerList";
import { InputNumber } from "antd";

const AddHui = ({setShowAdd, showAdd}) => {
    const [loading, setLoading] = useState(false);
    const [selectCompany, setSelectCompany] = useState(null);
    const [selectDayKhui, setSelectDayKhui] = useState(null);
    const [selectCustomer, setSelectCustomer] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [typeKhui, setTypeKhui] = useState('1');
    const [numPart, setNumPart] = useState(null);
    const [inputStaffs, setInputStaffs] = useState([
        {
            userId: '',
            name: '',
            insureNum: '',
        },
    ]);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [staffs, setStaffs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [code, setCode] = useState(null);
    const userCompanies = useSelector(selectorUserCompanies)
    
    useEffect(() => {
        if(selectCompany) {
            const fetchData = async () => {
                setLoading(true)
                const dataStaff = {
                    limit: 9999,
                    page: 1,
                    id: selectCompany?._id,
                    status: '',
                }
                const dataCus = {
                    limit: 9999,
                    page: 1,
                    organizationId: selectCompany?._id,
                }
                const resStaff = await CompanyAPI.getUsers(dataStaff);
                const resultStaff = resStaff.ResponseResult.Result
                setStaffs(resultStaff)
                const resCus = await CustomerAPI.getList(dataCus);
                const resultCus = resCus.ResponseResult.Result
                setCustomers(resultCus)
                const resCount = await HuiAPI.getCount()
                const count = resCount.ResponseResult.Result.count+1
                setCode('H'+count)
                setInputStaffs([{
                    userId: '',
                    name: '',
                    insureNum: '',
                },])
                setSelectCustomer([])
                setLoading(false)
            }
            fetchData();
        }
    },[selectCompany]);

    useEffect(() => {
        const date = new Date(startDate)
        let endDate
        switch(typeKhui) {
            case '1':
                endDate = date.setMonth(date.getMonth() + numPart)
                break
            case '2':
                endDate = date.setDate(date.getDate() + 7*numPart)
                break
            case '3':
                endDate = numPart?date.setDate(date.getDate() + numPart):(new Date(startDate))
                break
        }
        setEndDate(endDate);
    },[numPart, typeKhui, startDate]);

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            document.getElementById('submitBtn').click();
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let typeName
        switch(typeKhui) {
            case '1':
                typeName = 'Tháng'
                break
            case '2':
                typeName = 'Tuần'
                break
            case '3':
                typeName = 'Ngày'
                break
        }
        const cusAdd = customerList(selectCustomer, 'Add')
        const data = {
            organizationId: selectCompany?._id,
            code: e.target.code.value,
            name: e.target.name.value,
            // idChanel: e.target.idChanel.value,
            type: {
                type: +typeKhui,
                name: typeName,
                num: typeKhui==='2'?selectDayKhui.num:+e.target.numKhui.value
            },
            partNum: +e.target.partNum.value,
            money: +e.target.money.ariaValueNow,
            insureNum: +e.target.insureNum.value,
            staffInsures: inputStaffs,
            customers: cusAdd,
            startDate: e.target.startDate.value,
            endDate: e.target.endDate.value,
        }
        if(
            !selectCompany?._id || 
            !data.code || 
            !data.name || 
            // !data.idChanel || 
            !data.partNum || 
            !data.money || 
            !data.insureNum || 
            !selectCustomer
        ) {
            setError(true)
            setMessErr(null)
        } 
        // else if(!inputStaffs[0].userId || !inputStaffs[0].insureNum) {
        //     setMessErr('Vui lòng hoàn tất nhập liệu thông tin nhân viên tham gia.')
        //     setError(false)
        // } 
        else if(data.partNum !== cusAdd.length) {
            setMessErr('Tổng số chân hụi viên tham gia không hợp lệ. Vui lòng kiểm tra lại.')
            setError(false)
        } else {
            try {
                const res = await HuiAPI.create(data);
                if(res.ResponseResult.ErrorCode === 0){
                    setError(false)
                    setShowAdd(false)
                    setMessErr(null)
                    setSelectCompany(null)
                    setCode(null)
                    setSelectCustomer([])
                    setInputStaffs([{
                        userId: '',
                        name: '',
                        insureNum: '',
                    },])
                    setEndDate(new Date());
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Thêm mới thành công!');
                } else {
                    if(res.ResponseResult.Result.code === 11000) {
                        setError(false)
                        setMessErr('Tên đăng nhập hoặc Email đã tồn tại!')
                    } else {
                        console.error(res.ResponseResult.Message);
                        setError(false)
                        setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                    }
                }
            }
            catch(err) {
                console.error(err);
                setError(false)
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };

    const addInput = () => {
        setInputStaffs([...inputStaffs, {
            userId: '',
            name: '',
            insureNum: '',
        }])
    }

    const removeInput = (iInput) => {
        inputStaffs.splice(iInput, 1);
        setInputStaffs([...inputStaffs])
    }

    const selectedStaff = (iInput, staff) => {
        inputStaffs[iInput].userId = staff?.userId._id
        inputStaffs[iInput].name = staff?.userId.userName
        setInputStaffs([...inputStaffs])
    }

    const inputedStaff = (iInput, e) => {
        inputStaffs[iInput].insureNum = +e.target.value
        setInputStaffs([...inputStaffs])
    }

    const selectedCustomer = (e, customer) => {
        const checked = e.target.checked
        if(checked) {
            selectCustomer.push({
                customerId: customer._id,
                name: customer.fullName,
                num: 1
            })
            setSelectCustomer([...selectCustomer])            
        } else {
            const filterCus = selectCustomer.filter(cus => cus.customerId !== customer._id)
            setSelectCustomer([...filterCus])            
        }
    }

    const changeNumHui = (e, i) => {
        selectCustomer[i].num = +e.target.value
        setSelectCustomer([...selectCustomer])
    }

    const removeCustomer = (i) => {
        selectCustomer?.splice(i, 1);
        setSelectCustomer([...selectCustomer])
    }

    const handleClose = (e) => {
        e.preventDefault();
        setError(false)
        setShowAdd(false)
        setMessErr(null)
        setSelectCompany(null)
        setCode(null)
        setSelectCustomer([])
        setInputStaffs([{
            userId: '',
            name: '',
            insureNum: '',
        },])
        setEndDate(new Date());
    }

    const onHide = () => {
        setError(false)
        setShowAdd(false)
        setMessErr(null)
        setSelectCompany(null)
        setCode(null)
        setSelectCustomer([])
        setInputStaffs([{
            userId: '',
            name: '',
            insureNum: '',
        },])
        setEndDate(new Date());
    }

    return (
        <Modal dialogClassName="add-hui" show={showAdd} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>THÊM HỤI</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 m-auto text-center'>
                    <div className='form-container'>
                        <div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Công ty
                                    </label>
                                </div>
                                <div className="d-flex dropdown select-dropdown text-end">
                                    <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className='selected-company p-2'>{selectCompany?selectCompany?.name:'Chọn công ty'}</span>
                                    </a>
                                    <ul className="p-0 my-1 dropdown-menu text-small">
                                        {userCompanies?.map((company, i) => (
                                            <li key={i}>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={selectCompany?._id===company._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setSelectCompany(company)}
                                                >
                                                    {company.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Mã hụi
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="code"
                                    className='form-control'
                                    placeholder="Mã hụi"
                                    onKeyDown={handleKeyDown}
                                    value={code}
                                    disabled
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Tên hụi
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="name"
                                    className='form-control'
                                    placeholder="Nhập tên hụi"
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            {/* <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Group nhắc hụi
                                    </label>
                                </div>
                                <input 
                                    type="text" 
                                    name="idChanel"
                                    className='form-control'
                                    placeholder="Nhập ID group nhắc hụi"
                                    onKeyDown={handleKeyDown}
                                />
                            </div> */}
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Khui
                                    </label>
                                </div>
                                <div className="d-flex select-dropdown">
                                    <div className="d-flex mr-2 select-dropdown dropdown text-end form-khui">
                                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company form-khui" data-bs-toggle="dropdown" aria-expanded="false">
                                            {typeKhui==='1' && (<>
                                                <span className='selected-company p-2'>Tháng</span>
                                            </>)}
                                            {typeKhui==='2' && (<>
                                                <span className='selected-company p-2'>Tuần</span>
                                            </>)}
                                            {typeKhui==='3' && (<>
                                                <span className='selected-company p-2'>Ngày</span>
                                            </>)}
                                        </a>
                                        <ul className="p-0 my-1 dropdown-menu text-small">
                                            <li key={1}>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={typeKhui==='1'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setTypeKhui('1')}
                                                >
                                                    Tháng
                                                </button>
                                            </li>
                                            <li key={2}>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={typeKhui==='2'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setTypeKhui('2')}
                                                >
                                                    Tuần
                                                </button>
                                            </li>
                                            <li key={3}>
                                                <button 
                                                    className='p-2 px-3 btn dropdown-item'
                                                    type='button'
                                                    style={typeKhui==='3'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                    onClick={() => setTypeKhui('3')}
                                                >
                                                    Ngày
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    {typeKhui==='1' && (
                                        <input 
                                            type="number" 
                                            name="numKhui"
                                            className='form-control form-khui'
                                            placeholder="Thời gian"
                                            min={1}
                                            max={31}
                                            onKeyDown={handleKeyDown}
                                        />
                                    )}
                                    {typeKhui==='2' && (
                                        <div className="d-flex dropdown select-dropdown text-end form-khui">
                                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company form-khui" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className='selected-company p-2'>{selectDayKhui?selectDayKhui?.name:'Thời gian'}</span>
                                            </a>
                                            <ul className="p-0 my-1 dropdown-menu text-small form-khui">
                                                {dayKhui?.map((day, i) => (
                                                    <li key={i}>
                                                        <button 
                                                            className='p-2 px-3 btn dropdown-item'
                                                            type='button'
                                                            style={selectDayKhui?.num===day.num?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                            onClick={() => setSelectDayKhui(day)}
                                                        >
                                                            {day.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {typeKhui==='3' && (
                                        <input 
                                            type="number" 
                                            name="numKhui"
                                            className='form-control form-khui'
                                            value={8}
                                            onKeyDown={handleKeyDown}
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">Số phần</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="partNum"
                                    className='form-control' 
                                    placeholder='Nhập số phần hụi' 
                                    onChange={(e)=>setNumPart(+e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">Dây</label>
                                </div>
                                <div className="d-flex align-items-center select-dropdown">
                                    {/* <input 
                                        type="number" 
                                        name="money"
                                        className='form-control mr-2 form-money' 
                                        placeholder='Nhập số tiền' 
                                        onKeyDown={handleKeyDown}
                                    /> */}
                                    <InputNumber
                                        name="money"
                                        className='form-control mr-2 form-money form-number'
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        placeholder='Nhập số tiền' 
                                        onKeyDown={handleKeyDown}
                                    />
                                    VND
                                </div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">Bảo hiểm (tiền thảo)</label>
                                </div>
                                <div className="d-flex align-items-center select-dropdown">
                                    <input 
                                        type="number" 
                                        name="insureNum"
                                        className='form-control mr-2 form-sure' 
                                        placeholder='Nhập % bảo hiểm' 
                                        onKeyDown={handleKeyDown}
                                    />
                                    %
                                </div>
                            </div>
                            <div className='m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label d-block'>
                                    <label htmlFor="">Nhân viên</label>
                                </div>
                                {inputStaffs?.map((inputStaff, iInput) => (
                                    <div className="d-flex align-items-center my-2">
                                        {selectCompany && !loading?
                                            <div className="d-flex mr-2 select-dropdown dropdown text-end form-staff">
                                                <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company form-staff" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span className='selected-company p-2'>{inputStaff.name?inputStaff?.name:'Chọn nhân viên'}</span>
                                                </a>
                                                <ul className="p-0 my-1 dropdown-menu text-small form-staff">
                                                    {staffs.docs?.map((staff, iStaff) => (
                                                        <li key={iStaff}>
                                                            <button 
                                                                className='p-2 px-3 btn dropdown-item'
                                                                type='button'
                                                                style={inputStaff?.userId===staff.userId._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                                                onClick={() => selectedStaff(iInput, staff)}
                                                            >
                                                                {staff.userId.userName}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        :
                                            <select 
                                                className='form-select mr-2 select-company form-staff' name="role" 
                                                disabled
                                            >
                                                <option value='' hidden>{loading?'Loading...':'Chọn nhân viên'}</option>
                                            </select>
                                        }
                                        <input 
                                            type="number" 
                                            name="insureNumStaff"
                                            className='form-control mr-2 form-staff' 
                                            placeholder='Nhập % bảo hiểm' 
                                            onChange={(e) => inputedStaff(iInput, e)}
                                            onKeyDown={handleKeyDown}
                                            value={inputStaffs[iInput].insureNum}
                                        />
                                        %
                                        <i 
                                            className="fa-regular fa-rectangle-xmark p-1 m-1" 
                                            style={{color: '#FF5F5F'}}
                                            onClick={() =>removeInput(iInput)}
                                        ></i>
                                    </div>
                                ))}
                                <div><a href="#" onClick={addInput}>Thêm nhân viên</a></div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center text-align-center justify-content-between'>
                                    <div className='label'>
                                        <label htmlFor="">Ngày mở</label>
                                    </div>
                                    <input 
                                        type="date" 
                                        name="startDate"
                                        className='form-control' 
                                        defaultValue={format(new Date(startDate), 'yyyy-MM-dd')} 
                                        onChange={(e)=>setStartDate(e.target.value)}
                                        min={format(new Date(), 'yyyy-MM-dd')}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className='d-flex m-md-3 my-3 align-items-center text-align-center justify-content-between'>
                                    <div className='label'>
                                        <label htmlFor="">Ngày kết thúc</label>
                                    </div>
                                    <input 
                                        type="date" 
                                        name="endDate"
                                        className='form-control' 
                                        value={format(new Date(endDate), 'yyyy-MM-dd')} 
                                        onKeyDown={handleKeyDown}
                                        disabled
                                    />
                                </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Hụi viên
                                    </label>
                                </div>
                                {selectCompany && !loading?
                                    <div className="d-flex select-dropdown dropdown text-end">
                                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className='selected-company p-2'>{selectCustomer[0]?selectCustomer.map(cus=>`${cus.name}, `):'Chọn hụi viên'}</span>
                                        </a>
                                        <ul className="p-0 my-1 dropdown-menu text-small">
                                            {customers.docs?.map((customer, i) => (
                                                <li 
                                                    key={i} 
                                                    className='d-flex align-items-center justify-content-start dropdown-item p-2 px-3 btn'
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        className='form-checkbox' 
                                                        id={`hui${i}`} 
                                                        name={`hui${i}`}
                                                        onChange={(e)=> {
                                                            selectedCustomer(e, customer)
                                                        }}
                                                        onKeyDown={handleKeyDown}
                                                        checked={selectCustomer.map(cus=>cus.customerId).includes(customer._id)}
                                                    />
                                                    <div className="w-100">
                                                        <label htmlFor={`hui${i}`} className="w-100">{customer.fullName}</label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                :
                                    <select 
                                        className='form-select select-company' name="role" 
                                        disabled
                                    >
                                        <option value='' hidden>{loading?'Loading...':'Chọn hụi viên'}</option>
                                    </select>
                                }
                            </div>
                        </div>
                        <div>
                            <h6 className="d-flex m-md-3">Danh sách hụi viên</h6>
                            <div className='form-check'>
                                {selectCustomer[0]? 
                                    <div className='py-2'>
                                    {selectCustomer?.map((cus, i)=>(
                                        <div className="d-flex my-2 align-items-center justify-content-between">
                                            <div className='labelHui'>
                                                <label htmlFor="">{cus.name}</label>
                                            </div>
                                            <input 
                                                type="number" 
                                                name="cusNum"
                                                className='form-control mr-2' 
                                                style={{maxWidth: '116px'}}
                                                placeholder='Số chân hụi' 
                                                onChange={(e)=>changeNumHui(e, i)}
                                                onKeyDown={handleKeyDown}
                                                defaultValue={cus.num}
                                            />
                                            <i 
                                                className="fa-regular fa-rectangle-xmark p-1 m-1" 
                                                style={{color: '#FF5F5F'}}
                                                onClick={() =>removeCustomer(i)}
                                            ></i>
                                        </div>
                                    ))}
                                    </div>
                                :
                                <div className="d-flex h-100 justify-content-center align-items-center" style={{minHeight: '82px'}}>Vui lòng chọn hụi viên</div>
                                }
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
                    <button className='mx-3 btn btn-continue'  id='submitBtn'>
                        Thêm mới
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default memo(AddHui);