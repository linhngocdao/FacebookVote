import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface VotingCardProps {
  imageUrl: string;
  label: string;
  quote: string;
  votes: number;
  className?: string;
  onClick: () => void;
}

const VotingCard: React.FC<VotingCardProps> = ({ imageUrl, label, quote, votes, className, onClick }) => {
  return (
    <div
      className={`relative rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${className}`}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-blue-500 bg-opacity-5 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

      <div className="absolute top-5 right-5 z-10">
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md flex items-center transition duration-300 transform hover:scale-105 active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="mr-1">♥</span> {label}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pt-16">
        <div className="text-white transform transition-transform duration-300 group-hover:translate-y-[-5px]">
          <p className="text-sm font-bold mb-2">{quote}</p>
          <p className="text-xs">LƯỢT BÌNH CHỌN : {votes}</p>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-3"></div>
      <p className="text-gray-600">Đang tải thêm thí sinh...</p>
    </div>
  );
};

const VotingSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNoMoreMessage, setShowNoMoreMessage] = useState<boolean>(false);
  const [loadButtonVisible, setLoadButtonVisible] = useState<boolean>(true);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const votingData = [
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/1.png",
      label: "Vào Bình Chọn Lớp 12A1",
      quote: "ĐIỀU QUAN TRỌNG NHẤT ĐỂ TẠN HƯỞNG CUỘC SỐNG CỦA CHÚNG TA LÀ PHẢI HẠNH PHÚC",
      votes: 2378
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/2.png",
      label: "Vào Bình Chọn Lớp 12A2",
      quote: "NẾU TA THẤT BẠI HÃY NGHĨ ĐẾN ĐIỀU TA BẮT ĐẦU",
      votes: 2123
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/3.png",
      label: "Vào Bình Chọn Lớp 12A3",
      quote: "HÃY LUÔN MỈM CƯỜI NGAY CẢ KHI BẠN BUỒN, VÌ SẼ CÓ NGƯỜI YÊU BẠN VÌ CHÍNH NỤ CƯỜI ĐÓ",
      votes: 1989
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/4.png",
      label: "Vào Bình Chọn Lớp 12A4",
      quote: "ĐỪNG HẠ THẤP GIẤC MƠ CHỈ ĐỂ PHÙ HỢP VỚI HOÀN CẢNH,HÃY CÙNG CÓ NIỀM TIN ĐỂ LÀM NHỮNG ĐIỀU TUYỆT VỜI HƠN",
      votes: 1619
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/5.png",
      label: "Vào Bình Chọn Lớp 12B1",
      quote: "TA KHÔNG ĐƯỢC CHỌN NƠI MÌNH SINH RA NHƯNG TA ĐƯỢC CHỌN CÁCH MÌNH SẼ SỐNG",
      votes: 1481
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/6.png",
      label: "Vào Bình Chọn Lớp 12B2",
      quote: "MỖI THIÊN TÀI MỖI NGÀY ĐỀU CÓ 24 GIỜ, VÀ BẠN CŨNG VẬY",
      votes: 1238
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/7.png",
      label: "Vào Bình Chọn Lớp 12B3",
      quote: "ĐỪNG NGẠI THAY ĐỔI BẠN CÓ THỂ MẤT MỘT CÁI GÌ ĐÓ TỐT NHƯNG BẠN CÓ THỂ ĐẠT ĐƯỢC MỘT CÁI GÌ ĐÓ TỐT HƠN",
      votes: 1007
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/8.png",
      label: "Vào Bình Chọn Lớp 12B4",
      quote: "HÃY ĐỐI XỬ TỐT VỚI NGƯỜI KHÁC VÀ BẠN SẼ ĐƯỢC ĐỐI XỬ TỐT",
      votes: 921
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/9.png",
      label: "Vào Bình Chọn Lớp 12C1",
      quote: "NHỮNG NGƯỜI THÀNH CÔNG LUÔN TÌM KIẾM CƠ HỘI ĐỂ GIÚP ĐỠ NGƯỜI KHÁC",
      votes: 875
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/10.png",
      label: "Vào Bình Chọn Lớp 12C2",
      quote: "HỌC CÁCH YÊU THƯƠNG BẢN THÂN TRƯỚC KHI YÊU THƯƠNG NGƯỜI KHÁC",
      votes: 843
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/11.png",
      label: "Vào Bình Chọn Lớp 12C3",
      quote: "HẠNH PHÚC KHÔNG PHẢI LÀ ĐIỂM ĐẾN, MÀ LÀ MỘT HÀNH TRÌNH",
      votes: 791
    },
    {
      imageUrl: "https://thisinhthanhlich.com.vn/giaodiensc0m/hsthanhlich/images/12.png",
      label: "Vào Bình Chọn Lớp 12C4",
      quote: "ĐỪNG SO SÁNH BẢN THÂN VỚI NGƯỜI KHÁC, HÃY SO SÁNH VỚI CHÍNH MÌNH CỦA NGÀY HÔM QUA",
      votes: 756
    }
  ];

  const handleLoadMore = () => {
    setIsLoading(true);
    setLoadButtonVisible(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowNoMoreMessage(true);
    }, 5000);
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">BÌNH CHỌN HỌC SINH THANH LỊCH</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {votingData.map((item, index) => (
            <VotingCard
              key={index}
              imageUrl={item.imageUrl}
              label={item.label}
              quote={item.quote}
              votes={item.votes}
              className="h-96 md:h-80"
              onClick={navigateToLogin}
            />
          ))}
        </div>

        {isLoading && <LoadingSpinner />}

        {showNoMoreMessage && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-lg border border-yellow-200">
              <p className="font-medium">Đã hiển thị tất cả thí sinh!</p>
              <p className="text-sm mt-1">Không còn thí sinh nào khác trong hệ thống.</p>
            </div>
          </div>
        )}
        {loadButtonVisible && (
          <div className="flex justify-center mt-8">
            <button
              className="cursor-pointer bg-[#1c75bc] hover:bg-[#49667e] text-white py-2 px-6 rounded-md font-medium transition duration-300 active:scale-95 transform"
              onClick={handleLoadMore}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VotingSection;
