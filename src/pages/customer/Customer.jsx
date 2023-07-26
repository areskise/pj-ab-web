import './customer.css';
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddCustomer from "./addCustomer/AddCustomer";
import UpdateCustomer from "./updateCustomer/UpdateCustomer";
import { customerActions, selectorCustomers } from '../../redux/slice/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import CustomerAPI from '../../API/CustomerAPI';

const Customer = () => {
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectCompany, setSelectCompany] = useState('all');
    const [search, setSearch] = useState('sdt');
    const [keyword, setKeyword] = useState(null);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [iconStatus, setIcontStatus] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const limit = 5;
    const dispatch = useDispatch();
    const customers = useSelector(selectorCustomers)
    const userCompanies = useSelector(selectorUserCompanies)
    console.log(userCompanies);
    const list = keyword?customers.docs.filter(doc => {
        let hasDoc
        if(search==='sdt') {
            hasDoc = doc.phoneNumber.includes(keyword)
        }
        if(search==='cccd') {
            hasDoc = doc.cccd.includes(keyword)
        }
        if(hasDoc) {
            return doc
        }
    }):customers.docs
    
    useEffect(() => {
        const data = {
            limit: limit,
            page: page,
            status: sortStatus,
            organizationId: selectCompany?._id
        }

        const fetchCustomer = async () => {
            try {
                setLoading(true);
                const res = await CustomerAPI.getList(data);
                const result = res.ResponseResult.Result;
                console.log(result);
                dispatch(customerActions.setCustomers(result));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchCustomer();
    }, [page, limit, selectCompany, showAdd, showUpdate]);

    const nextPage = () => {
        if(customers.hasNextPage) {
            setPage(customers.nextPage)
        } else {
            setPage(1)
        }
    }
    
    const prevPage = () => {
        if(customers.hasPrevPage) {
            setPage(customers.prevPage)
        } else {
            setPage(customers.totalPages)
        }
    }

    return(
        <div className="customer body-container bg-light">
            <Header/>
            <SideBar/>
            <AddCustomer selectCompany={selectCompany} showAdd={showAdd} setShowAdd={setShowAdd} setLoading={setLoading}/>
            <UpdateCustomer selectCompany={selectCompany} showUpdate={showUpdate} setShowUpdate={setShowUpdate} setLoading={setLoading}/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý người dùng 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Khách hàng
                </h5>
                {loading && !list ?
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH KHÁCH HÀNG</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    <div className="loading-container">
                        <div>
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                        </div>
                    </div>
                </div>
                :
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH KHÁCH HÀNG</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    
                    <div className="p-2 select-company-container"> 
                        <div className='label'>
                            <label htmlFor="">Công ty:</label>
                        </div>
                        <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>{selectCompany?.name?selectCompany?.name:'Tất cả'}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small selected-dropdown">
                                <li key={'all'}>
                                    <button 
                                        className='p-2 px-3 btn dropdown-item'
                                        type='button'
                                        style={selectCompany==='all'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                        onClick={() => setSelectCompany('all')}
                                    >
                                        Tất cả
                                    </button>
                                </li>
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
                    <div className="pt-4 select-company-container"> 
                        <div className='label'>
                            <input 
                                type="text" 
                                name="keyword"
                                className='form-control'
                                placeholder='Nhập nội dung tìm kiếm'
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '140px'}}>
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>{search==='sdt'?'Số điện thoại':'CMND/CCCD'}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small">
                                <li>
                                    <button 
                                        className='p-2 px-3 btn dropdown-item'
                                        type='button'
                                        style={search==='sdt'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                        onClick={() => setSearch('sdt')}
                                    >
                                        Số điện thoại
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className='p-2 px-3 btn dropdown-item'
                                        type='button'
                                        style={search==='cccd'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                        onClick={() => setSearch('cccd')}
                                    >
                                        CMND/CCCD
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {!list ? 
                        <div className="loading-container">
                            <div>
                                <img src={img.empty} alt='logo' width="200" height="170" className='empty-img'/>
                                <p>Chức năng chưa có dữ liệu</p>
                                <p>Vui lòng thêm dữ liệu</p>
                            </div>
                        </div>
                    :
                    <div className="customer-container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Mã KH</th>
                                <th scope="col">Tên khách hàng</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Số CMND/CCCD</th>
                                <th scope="col">Telegram</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col" className="customer-center">Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                                {list?.map((customer, i) => (
                                    <tr key={i}>
                                        <td scope="row" data-label="Mã KH:">
                                            {customer.code}
                                        </td>
                                        <td data-label="Tên khách hàng:">
                                            {customer.fullName}
                                        </td>
                                        <td data-label="Số điện thoại:">{customer.phoneNumber}</td>
                                        <td data-label="Số CMND/CCCD:">{customer.cccd}</td>
                                        <td data-label="Telegram:">{customer.idChanel}</td>
                                        <td data-label="Địa chỉ:">{customer.address}</td>
                                        <td data-label="Chức năng:" className="customer-center">
                                            <div className='func-icon'>
                                                <i 
                                                    className="fa-solid fa-pen-to-square p-1 m-1"  
                                                    style={{color: '#6280EB'}}
                                                    onClick={() => setShowUpdate(customer._id)}
                                                ></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: {list.length} khách hàng</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i className="fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" value={customers?.page} onChange={(e)=>setPage(e.target.value)}></input>
                                    <div>/ {customers?.totalPages?customers?.totalPages:1}</div>
                                </div>
                                <i className="fa-solid fa-chevron-right" onClick={() => nextPage()}></i>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default Customer;