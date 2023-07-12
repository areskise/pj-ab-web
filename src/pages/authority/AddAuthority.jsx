import "./authority.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import alertify from 'alertifyjs';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import RoleAPI from '../../API/RoleAPI';
import { menuActions, selectorMenuDefault } from '../../redux/slice/menuSlice';
import { NavLink } from "react-router-dom";
import MenuAPI from "../../API/MenuAPI";
import { permissionActions, selectorPermissions } from "../../redux/slice/permissionSlice";
import menuApp from "../../helpers/menuApp";

const AddAuthority = () => {
    const [loading, setLoading] = useState(false);
    const [selectCompany, setSelectCompany] = useState('');
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState(['all', '646f8a5a4e4fb00d95ee26aa', '646f8a924e4fb00d95ee26ac', '646f8ad04e4fb00d95ee26ae', '6478a3238cf76c1e8a41e7fe']);
    const [filterText, setFilterText] = useState('');
    const userCompanies = useSelector(selectorUserCompanies)
    const permissions = useSelector(selectorPermissions)
    const menuDefault = useSelector(selectorMenuDefault)
    const nodes = [{
        value: 'all',
        label: 'Tất cả',
        className: 'check-all',
        children: menuDefault,
    }]
    const [filteredNodes, setFilteredNodes] = useState(nodes);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true)
            const res = await MenuAPI.getDefault()
            const result = res.ResponseResult.Result[0]?.menu
            dispatch(menuActions.setDefault(result))
            dispatch(permissionActions.setPermissions())
            setLoading(false)
        }
        fetchMenu();
    }, []);

    useEffect(() => {
        filterTree();
    }, [filterText, menuDefault])

    const onCheck = (value) => {
        setChecked(value);
    };

    const onExpand = (value) => {
        setExpanded(value);
    };

    const filterNodes = (filtered, node) => {
        const children = (node.children || []).reduce(filterNodes, []);

        if (
            // Node's label matches the search string
            node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
            // Or a children has a matching node
            children.length
        ) {
            filtered.push({ ...node, children });
        }

        return filtered;
    }

    const filterTree = () => {
        // Reset nodes back to unfiltered state
        if (!filterText) {
            setFilteredNodes(nodes);
            return;
        }

        setFilteredNodes(nodes.reduce(filterNodes, []));
    }

    const onFilterChange = (e) => {
        setFilterText(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const perIds = checked.filter(perId => perId !== 'all');
        const aa = [...menuDefault]
        console.log(aa);
        
        const menu = menuApp(menuDefault,perIds)
        const data = {
            role: {
                organizationId: selectCompany?._id,
                title: selectCompany?.title + '-' + e.target.name.value,
                name: e.target.name.value,
                permissionId: perIds,
            },
            menu: {
                "menu_type": "web",
                "status": e.target.name.value,
                "name": e.target.name.value,
                "menu": menu,
            }
        }
        if(!e.target.name.value || !selectCompany?._id) {
            setError(true)
            setMessErr(null)
        } else {
            try {
                setLoading(true);
                const res = await RoleAPI.create(data);
                setLoading(false);
                if(res.ResponseResult.ErrorCode === 0){
                    setError(false)
                    setMessErr(null)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Thêm mới thành công!');
                } else if(res.ResponseResult.Result.code === 11000) {
                    setError(false)
                    setMessErr('Tên nhóm quyền đã tồn tại!')
                } else {
                    console.error(res.ResponseResult.Message);
                    setError(false)
                    setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                }
            }
            catch(err) {
                console.error(err);
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };

    return (
        <div className="body-container bg-light">
            <Header/>
            <SideBar/>
            <div className="main-container bg-light">
                <h5 className="m-4">Quản lý phân quyền</h5>
                <div className="bg-white content">
                {loading ? 
                <div className="bg-white content">
                    <div className="loading-container">
                        <div>
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                        </div>
                    </div>
                </div>
                :
                <div className="authority-container">
                    <div className="d-flex justify-content-center align-items-center">
                    <NavLink
                        to={"/quan-ly-phan-quyen/them-moi"} 
                        className='btn btn-control nav-link link-color active'
                        style={{marginRight: '6px'}}
                        activeclassname="active"
                    >Thêm mới</NavLink>
                    <NavLink
                        to={"/quan-ly-phan-quyen/cap-nhat"} 
                        className='btn btn-control nav-link link-color'
                        style={{marginLeft: '6px'}}
                        activeclassname="active" 
                    >Cập nhật</NavLink>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-container'>
                            <div className="w-100">
                                    <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                        <div className='label'>
                                            <label htmlFor="">Công ty:</label>
                                        </div>
                                        {/* <select className='form-select select-company' onChange={(e) => setSelectCompany(e.target.value)}>
                                            <option value='' hidden>Chọn công ty</option>
                                            {userCompanies?.map((company, i) => (
                                                <option key={i} value={company._id}>{company.name}</option>
                                            ))}
                                        </select> */}
                                        <div className="d-flex w-100 dropdown text-end">
                                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className='selected-company p-2'>{selectCompany?selectCompany?.name:'Chọn công ty'}</span>
                                            </a>
                                            <ul className="p-0 my-1 dropdown-menu text-small">
                                                {userCompanies && 
                                                userCompanies?.map((company, i) => (
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
                                    <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                        <div className='label'>
                                            <label htmlFor="">Tên nhóm quyền:</label>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="name"
                                            className='form-control' 
                                            placeholder='Nhập tên nhóm quyền'
                                        />
                                    </div>
                            </div>
                            <div className="w-100">
                                <div className='title'>
                                    Danh sách chức năng
                                </div>
                                <div className='form-check filter-container'>
                                    <input
                                        className="filter-text form-control mb-2"
                                        placeholder="Nhập từ khóa tìm kiếm"
                                        type="text"
                                        value={filterText}
                                        onChange={onFilterChange}
                                    />
                                    <CheckboxTree
                                        checked={checked}
                                        expanded={expanded}
                                        nodes={filteredNodes}
                                        onCheck={onCheck}
                                        onExpand={onExpand}
                                        showNodeIcon={false}
                                        checkModel={'all'}
                                    />
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
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-continue" type="submit">Thêm mới</button>
                        </div>
                    </form>
                </div>
                }
                </div>
            </div>
        </div>
    )
}

export default AddAuthority;