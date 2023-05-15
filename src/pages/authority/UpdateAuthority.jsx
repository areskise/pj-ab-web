import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import alertify from 'alertifyjs';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import { selectorPermissions } from '../../redux/slice/permissionSlice';
import PermissionAPI from '../../API/PermissionAPI';
import CompanyAPI from '../../API/CompanyAPI';
import RoleAPI from '../../API/RoleAPI';

const UpdateAuthority = () => {
    const [loading, setLoading] = useState(false);
    const [selectCompany, setSelectCompany] = useState(null);
    const [selectRole, setSelectRole] = useState(null);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [menuUser, setMenuUser] = useState(false);
    const [menuHui, setMenuHui] = useState(false);
    const userCompanies = useSelector(selectorUserCompanies)
    const permissions = useSelector(selectorPermissions)
    console.log(roles);

    useEffect(()=> {
        const fetchRoles = async () => {
            const res = await CompanyAPI.getRoles(selectCompany)
            const result = res.ResponseResult.Result;
            setRoles(result)
        }
        if(selectCompany) {
            fetchRoles()
        }
    },[selectCompany,loading])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            _id: e.target.role.value,
            name: e.target.name.value
        }
        
        if(!e.target.name.value) {
            setError(true)
        } else {
            try {
                const res = await RoleAPI.update(data);
                console.log(res);
                if(res.ResponseResult.ErrorCode === 0){
                    setError(false)
                    setMessErr(null)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Cập nhật thành công!');
                    setLoading(!loading)
                } else if(res.ResponseResult.Result.code === 11000) {
                    setError(false)
                    setMessErr('Tên nhóm quyền đã tồn tại!')
                } else {
                    console.log(res.ResponseResult.Message);
                    setError(false)
                    setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
                }
            }
            catch(err) {
                console.log(err);
                setMessErr('Lỗi do hệ thống vui lòng liên hệ với admin!')
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-container'>
                <div className="w-100">
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                            <div className='label'>
                                <label htmlFor="">Công ty:</label>
                            </div>
                            <select className='select-company' name="company" onChange={(e) => setSelectCompany(e.target.value)}>
                                <option value={null} hidden>Chọn công ty</option>
                                {userCompanies?.map((company, i) => (
                                    <option key={i} value={company._id}>{company.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                            <div className='label'>
                                <label htmlFor="">Tên nhóm quyền:</label>
                            </div>
                            <select className='select-company' name="role" onChange={(e) => setSelectRole(e.target.value)}>
                                    <option value='' hidden>Chọn nhóm quyền</option>
                                    {roles && roles.map((role, i) => (
                                        <option key={i} value={role._id}>{role.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                            <div className='label'>
                                <label htmlFor="">Tên mới:</label>
                            </div>
                            <input 
                                type="text" 
                                name="name"
                                className='form-control' 
                                placeholder='Nhập tên mới'
                            />
                        </div>
                </div>
                <div className="w-100">
                    <div className='title'>
                        Danh sách chức năng
                    </div>
                    <div className='form-check'>
                        <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                            <input type="select" className='form-control' placeholder='Nhập từ khóa tìm kiếm' />
                        </div>
                        <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                            <input 
                                type="checkbox" 
                                name='checkAll'
                                id='checkAll'
                                className='form-checkbox' 
                            />
                            <div>
                                <label htmlFor="checkAll">Tất cả</label>
                            </div>
                        </div>
                        <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                            <input 
                                type="checkbox" 
                                name='checkHome'
                                id='checkHome'
                                className='form-checkbox' 
                            />
                            <div>
                                <label htmlFor="checkHome">Trang chủ</label>
                            </div>
                        </div>
                        <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                            <input 
                                type="checkbox" 
                                name='checkCompany'
                                id='checkCompany'
                                className='form-checkbox' 
                            />
                            <div>
                                <label htmlFor="checkCompany">Quản lý công ty</label>
                            </div>
                        </div>
                        <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                            <input 
                                type="checkbox" 
                                name='checkUser'
                                id='checkUser'
                                className='form-checkbox'
                            />
                            <div className='w-75' >
                                <label htmlFor="" className='d-flex align-items-center justify-content-between' onClick={()=>setMenuUser(!menuUser)}>
                                    Quản lý người dùng
                                    <i className="mx-3 fa-solid fa-chevron-down"></i>
                                </label>
                            </div>
                        </div>
                        {menuUser &&
                            <ul>
                                <li className='nav-sub-item p-2'>
                                    <div className='d-flex mx-4 align-items-center justify-content-start'>
                                        <input 
                                            type="checkbox" 
                                            name='checkEmployee'
                                            id='checkEmployee'
                                            className='form-checkbox' 
                                        />
                                        <div>
                                            <label htmlFor="checkEmployee">Nhân viên</label>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        <li className='nav-sub-item p-2'>
                                            <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                <input 
                                                    type="checkbox" 
                                                    name='addEmployee'
                                                    id='addEmployee'
                                                    className='form-checkbox' 
                                                />
                                                <div>
                                                    <label htmlFor="addEmployee">Thêm</label>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='nav-sub-item p-2'>
                                            <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                <input 
                                                    type="checkbox" 
                                                    name='updateEmployee'
                                                    id='updateEmployee'
                                                    className='form-checkbox' 
                                                />
                                                <div>
                                                    <label htmlFor="updateEmployee">Cập nhập</label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className='nav-sub-item px-2'>
                                    <div className='d-flex mx-4 align-items-center justify-content-start'>
                                        <input 
                                            type="checkbox" 
                                            name='checkCustomer'
                                            id='checkCustomer'
                                            className='form-checkbox' 
                                        />
                                        <div>
                                            <label htmlFor="checkCustomer">Khách hàng</label>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        <li className='nav-sub-item p-2'>
                                            <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                <input 
                                                    type="checkbox" 
                                                    name='addCustomer'
                                                    id='addCustomer'
                                                    className='form-checkbox' 
                                                />
                                                <div>
                                                    <label htmlFor="addCustomer">Thêm</label>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='nav-sub-item p-2'>
                                            <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                <input 
                                                    type="checkbox" 
                                                    name='updateCustomer'
                                                    id='updateCustomer'
                                                    className='form-checkbox' 
                                                />
                                                <div>
                                                    <label htmlFor="updateCustomer">Cập nhật</label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        }
                        <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                            <input 
                                type="checkbox" 
                                id='checkAllHui' 
                                name="checkAllHui"
                                className='form-checkbox' 
                            />
                            <div className='w-75'>
                                <label htmlFor="" className='d-flex align-items-center justify-content-between' onClick={()=>setMenuHui(!menuHui)}>
                                    Quản lý hụi
                                    <i className="mx-3 fa-solid fa-chevron-down"></i>
                                </label>
                            </div>
                        </div>
                        {menuHui &&
                            <ul>
                                <li className='nav-sub-item p-2'>
                                    <div className='d-flex mx-4 align-items-center justify-content-start'>
                                        <input 
                                            type="checkbox" 
                                            name='checkHui'
                                            id='checkHui'
                                            className='form-checkbox' 
                                        />
                                        <div>
                                            <label htmlFor="checkHui">Quản lý hụi</label>
                                        </div>
                                    </div>
                                </li>
                                <li className='nav-sub-item px-2'>
                                    <div className='d-flex mx-4 align-items-center justify-content-start'>
                                        <input 
                                            type="checkbox" 
                                            name='checkReport'
                                            id='checkReport'
                                            className='form-checkbox' 
                                        />
                                        <div>
                                            <label htmlFor="checkReport">Báo cáo</label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center m-4">
            <button className="btn btn-continue" type="submit">Cập nhật</button>
            </div>
        </form>
    )
}

export default UpdateAuthority;