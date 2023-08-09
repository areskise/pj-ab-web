import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import Home from './pages/home/Home';
import Company from './pages/company/Company';
import Authority from './pages/authority/Authority';
import AddAuthority from './pages/authority/AddAuthority';
import UpdateAuthority from './pages/authority/UpdateAuthority';
import Employee from './pages/employee/Employee';
import Customer from './pages/customer/Customer';
import Hui from './pages/hui/Hui';
import Report from './pages/report/Report';
import HuiPoint from './pages/huiPoint/HuiPoint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/trang-chu' element={<Home />} />
        <Route path='/quan-ly-cong-ty' element={<Company />} />
        <Route path='/quan-ly-phan-quyen' element={<Authority />} />
        <Route path='/quan-ly-phan-quyen/them-moi' element={<AddAuthority />} />
        <Route path='/quan-ly-phan-quyen/cap-nhat' element={<UpdateAuthority />} />
        <Route path='/quan-ly-nguoi-dung/nhan-vien' element={<Employee />} />
        <Route path='/quan-ly-nguoi-dung/khach-hang' element={<Customer />} />
        <Route path='/quan-ly-hui' element={<Hui />} />
        <Route path='/quan-ly-hui/chi-tiet-hui/:id' element={<HuiPoint />} />
        <Route path='/bao-cao' element={<Report />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
