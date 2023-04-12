import './sign-in.css';
import img from '../../images/Image';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import AuthAPI from '../../API/AuthAPI';

const SignIn = () => {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  
	const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    if(!userName || !password) {
      setError(true);
    } else {
      setError(false);
      const data = {
        userName: userName,
        password: password,
      }
      try {
        const res = await AuthAPI.login(data);
        const result = res.ResponseResult.Result
        if(result) {
          if(remember) {
            cookies.set('access_token', result, {maxAge: 604800})
            navigate('/trang-chu');
          } else {
            cookies.set('access_token', result)
            navigate('/trang-chu');
          }
        } else {
          setError(true);
        }
      } 
      catch(err) {
        console.log(err);
        setError(true);
      }
    }
  }

  return(
    <div className="body-signin" style={{ backgroundImage: `url(${img.background})` }}>
      <div className="mask" style={{ backgroundImage: `url(${img.mask})` }}>
        <div className="m-auto text-center">
          <img className="mb-4" src={img.logoWhite} alt="" width="181" height="181" />
          <form 
            className='form-signin m-auto text-center' 
            onSubmit={handleSignin}
          >
            <h3 className="mb-3 fw-normal">ĐĂNG NHẬP</h3>
            <hr/>
            <div className="d-flex form-floating">
              <input 
                type="text" 
                className="form-control" 
                id="floatingInput" 
                placeholder="Tên đăng nhập" 
                onChange={(e) => setUserName(e.target.value.trim())}
              />
              <label htmlFor="floatingInput">Tên đăng nhập</label>
            </div>
            <div className="d-flex form-floating align-items-center justify-content-end">
              <input 
                type={ visible ? "text" : "password"} 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Mật khẩu" 
                onChange={(e) => setPassword(e.target.value.trim())}
              />
              <label htmlFor="floatingPassword">Mật khẩu</label>
              <span 
                toggle="#floatingPassword" 
                className={ visible ? 'toggle-password fa-regular fa-eye-slash' : 'toggle-password fa-regular fa-eye' } 
                onClick={() => setVisible(!visible)}
              >
              </span>
            </div>

            <div className="d-flex justify-content-between checkbox mb-3 mt-2 w-100">
              <label className='remember-me'>
                <input 
                  type="checkbox" 
                  className='remember-me'
                  onClick={() => setRemember(!remember)}
                /> Ghi nhớ đăng nhập
              </label>
              <label>
                <a className='forgot' href='#'>Quên mật khẩu?</a>
              </label>
            </div>
            {error && 
            <div className='m-auto mb-3 text-center'>
              <div className="error-text">Thông tin đăng nhập không hợp lệ.</div>
              <div className="error-text">Vui lòng kiểm tra lại.</div>
            </div>
            }
            <button 
              className="btn btn-lg btn-continue"
              type='submit'
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn;