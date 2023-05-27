import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import CheckboxTree from 'react-checkbox-tree';
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
    console.log(permissions);

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
                        {permissions?.filter(per => per.title === 'main-page').map(per => (
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input 
                                    type="checkbox" 
                                    name={per.title}
                                    id={per.title}
                                    className='form-checkbox' 
                                    value={per.id}
                                />
                                <div>
                                    <label htmlFor={per.title}>{per.name}</label>
                                </div>
                            </div>
                        ))}
                        {permissions?.filter(per => per.title.split('/')[0] === 'manage-user').map(per => (
                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                <input 
                                    type="checkbox" 
                                    name={per.title}
                                    id={per.title}
                                    className='form-checkbox' 
                                    value={per.id}
                                />
                                <div>
                                    <label htmlFor={per.title}>{per.name}</label>
                                </div>
                            </div>
                        ))}
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