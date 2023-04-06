import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import Home from './pages/home/Home';
import Company from './pages/company/Company';
import Authority from './pages/authority/Authority';
import Employee from './pages/employee/Employee';
import Customer from './pages/customer/Customer';
import Hui from './pages/hui/Hui';
import Report from './pages/report/Report';
import Cookies from 'universal-cookie';

function App() {
	const cookies = new Cookies();
  const user = cookies.get('user');
  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/trang-chu' element={<Home />} />
        <Route path='/quan-ly-cong-ty' element={<Company user={user} />} />
        <Route path='/quan-ly-phan-quyen' element={<Authority />} />
        <Route path='/quan-ly-nguoi-dung/nhan-vien' element={<Employee user={user} />} />
        <Route path='/quan-ly-nguoi-dung/khach-hang' element={<Customer />} />
        <Route path='/quan-ly-hui' element={<Hui />} />
        <Route path='/bao-cao' element={<Report />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
