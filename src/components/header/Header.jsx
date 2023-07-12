import './header.css';
import img from '../../images/Image';
import { useEffect, useState } from 'react';
import { useNavigate, NavLink, Link, useRe } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { companyActions, selectorUserCompanies } from "../../redux/slice/companySlice";
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import CompanyAPI from '../../API/CompanyAPI';

const Header = ({reload}) => {
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [navUser, setNavUser] = useState(false);
    
	const cookies = new Cookies();
    const access_token = cookies.get('access_token');
    const userName = access_token?.userName;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userCompanies = useSelector(selectorUserCompanies);
    const [selectCompany, setSelectCompany] = useState(null);
    
    useEffect(() => {
        if (access_token) {
            const fetchUserCompanies = async () => {
                const res = await CompanyAPI.getAll()
                const result = res.ResponseResult.Result
                dispatch(companyActions.setUserCompanies(result))
                setSelectCompany(result[0])
            }
            fetchUserCompanies()
        } else {
            navigate('/')
        }
    }, [reload]);

    const handleLogout = () => {
        cookies.remove('access_token');
        navigate('/')
    }

    return (
        <header className="bg-light">
            <div className=" mx-lg-4 mx-md-3 mw-100">
                <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between" style={{height: '65px'}}>
                    <div className='d-flex p-2'>
                        <a href="/trang-chu" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                            <img src={img.logoBlack} alt='logo' width="32" height="32" className='logo-img'/>
                        </a>
                    <div className='d-flex mx-3'>
                        <div className="d-flex dropdown text-end">
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>{selectCompany?selectCompany?.name:'Loading...'}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                                {userCompanies && userCompanies?.map((company, i) => (
                                    <li key={i}>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
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
                    </div>

                    <div className='d-flex'>
                        {/* <i className="fa-regular fa-bell notify-icon"></i> */}
                        <div className="d-flex dropdown text-end">
                            <a href="#" className="d-flex align-items-center avatar link-dark text-decoration-none p-1 border rounded" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={img.avatar} alt="mdo" width="32" height="32" className="rounded-circle" />
                                <span className='p-1'>{userName}</span>
                                <i className="fa-solid fa-angle-down p-1 mt-1"></i>
                            </a>
                            <ul className="p-0 dropdown-menu text-small">
                                <li>
                                <button className='d-flex justify-content-center p-2 btn dropdown-item' onClick={() => setShowModal(true)}>
                                    Đăng xuất
                                </button>
                                </li>
                            </ul>
                            <a href="#" className="menu-avatar link-dark text-decoration-none p-1" onClick={() => setShowMenu(true)}>
                                <i className="menu-icon fa-solid fa-bars p-1"></i>
                            </a>
                        </div>
                    </div>

                    <Modal dialogClassName="modal-menu" show={showMenu} onHide={() => setShowMenu(false)}>
                        <Modal.Body>
                        <div className="h-100 d-flex flex-column flex-shrink-0 p-3 bg-light sibar-menu">
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <img src={img.avatar} alt="mdo" width="32" height="32" className="rounded-circle" />
                                    <span className='p-1'>{userName}</span>
                                </div>
                                <a href="#" className="link-dark text-decoration-none p-1" onClick={() => setShowMenu(false)}>
                                    <i className="close-icon fa-solid fa-xmark"></i>
                                </a>
                            </div>
                            <hr />
                            <ul className="nav nav-pills flex-column mb-auto">
                                <li
                                    className='nav-item'
                                >
                                    <NavLink 
                                    to={"/trang-chu"} 
                                    className="nav-link link-color"
                                    activeclassname="active"        
                                    >
                                    Trang chủ
                                    </NavLink>
                                </li>
                                <li
                                    className='nav-item'
                                >
                                    <NavLink 
                                    to={"/quan-ly-cong-ty"} 
                                    className="nav-link link-color"
                                    activeclassname="active"
                                    >
                                    Quản lý công ty
                                    </NavLink>
                                </li>
                                <li
                                    className='nav-item'
                                >
                                    <NavLink 
                                    to={"/quan-ly-phan-quyen"} 
                                    className="nav-link link-color"
                                    activeclassname="active"
                                    >
                                    Quảng lý phân quyền
                                    </NavLink>
                                </li>
                                <li
                                    className="nav-item nav-user"
                                    onClick={()=>setNavUser(!navUser)}
                                >
                                    <div className='link-color'>
                                        <NavLink 
                                        to={"/quan-ly-nguoi-dung"} 
                                        className="d-flex nav-link justify-content-between align-items-center disabled"
                                        >
                                        Quản lý người dùng
                                        <i className="fa-solid fa-angle-down"></i>
                                        </NavLink>
                                    </div>
                                </li>
                                    {navUser &&
                                    <ul>
                                    <li 
                                        className='nav-sub-item'
                                    >
                                        <NavLink 
                                        to={"/quan-ly-nguoi-dung/nhan-vien"} 
                                        className="nav-link link-color"
                                        activeclassname="subActive"
                                        >
                                        Nhân viên
                                        </NavLink>
                                    </li>
                                    <li 
                                        className='nav-sub-item'
                                    >
                                        <NavLink 
                                        to={"/quan-ly-nguoi-dung/khach-hang"} 
                                        className="nav-link link-color"
                                        activeclassname="subActive"
                                        >
                                        Khách hàng
                                        </NavLink>
                                    </li>
                                    </ul>
                                    }
                                <li
                                    className='nav-item'
                                >
                                    <NavLink 
                                    to={"/quan-ly-hui"} 
                                    className="nav-link link-color"
                                    activeclassname="active"
                                    >
                                    Quản lý hụi
                                    </NavLink>
                                </li>
                                <li
                                    className='nav-item'
                                >
                                    <NavLink 
                                    to={"/bao-cao"} 
                                    className="nav-link link-color"
                                    activeclassname="active"
                                    >
                                    Báo cáo
                                    </NavLink>
                                </li>
                                <li
                                    className='nav-item'
                                    onClick={() => {
                                        setShowModal(true)
                                        setShowMenu(false)
                                    }}
                                >
                                    <Link 
                                    to={"#"} 
                                    className="nav-link link-color"
                                    >
                                    Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        </Modal.Body>
                    </Modal>

                    <Modal dialogClassName="modal-logout" show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header className='justify-content-center'>
                            <Modal.Title className='title'>CẢNH BÁO</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='w-100 m-auto text-center'>
                            <div>Bạn đang thao tác đăng xuất.</div>
                            <div>Bạn có muốn tiếp tục?</div>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center'>
                            <button className='mx-3 btn btn-cancle' onClick={() => setShowModal(false)}>
                                Hủy
                            </button>
                            <button className='mx-3 btn btn-continue' onClick={handleLogout}>
                                Tiếp tục
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </header>
    )
}

export default Header;