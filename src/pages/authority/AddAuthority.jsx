import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import alertify from 'alertifyjs';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import { selectorPermissions } from '../../redux/slice/permissionSlice';
import RoleAPI from '../../API/RoleAPI';
import { selectorMenuDefault } from '../../redux/slice/menuSlice';

const AddAuthority = () => {
    const [selectCompany, setSelectCompany] = useState('');
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState(null);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState(['all', '646f8a5a4e4fb00d95ee26aa', '646f8a924e4fb00d95ee26ac', '646f8ad04e4fb00d95ee26ae', '6478a3238cf76c1e8a41e7fe']);
    const [filterText, setFilterText] = useState('');
    const userCompanies = useSelector(selectorUserCompanies)
    const menuDefault = useSelector(selectorMenuDefault)
    const nodes = [{
        value: 'all',
        label: 'Tất cả',
        className: 'check-all',
        children: menuDefault,
    }]
    const [filteredNodes, setFilteredNodes] = useState(nodes);

    useEffect(() => {
        filterTree();
    }, [filterText])

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
        console.log(filterText);
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
        const data = {
            organizationId: selectCompany,
            title: e.target.name.value,
            name: e.target.name.value,
            permissionId: perIds,
        }
        
        if(!e.target.name.value) {
            setError(true)
        } else {
            try {
                const res = await RoleAPI.create(data);
                if(res.ResponseResult.ErrorCode === 0){
                    setError(false)
                    setMessErr(null)
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success('Thêm mới thành công!');
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
                            <select className='select-company' onChange={(e) => setSelectCompany(e.target.value)}>
                                <option value='' hidden>Chọn công ty</option>
                                {userCompanies?.map((company, i) => (
                                    <option key={i} value={company._id}>{company.name}</option>
                                ))}
                            </select>
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
                            className="filter-text form-control mt-1 mb-2"
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
            <div className="d-flex justify-content-center m-4">
                <button className="btn btn-continue" type="submit">Thêm mới</button>
            </div>
        </form>
    )
}

export default AddAuthority;