import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1c75bc] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-500 pb-2">THÔNG TIN LIÊN HỆ</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                <p className="text-sm">136 Đường Xuân Thủy, Cầu Giấy, Hà Nội</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">024.3754.7292 - 024.3754.8287</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">c3nguyentatthanh@hanoiedu.vn</p>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                <p className="text-sm">Thời gian làm việc: Thứ 2 - Thứ 6<br />Sáng: 7h30 - 11h30 / Chiều: 13h30 - 17h00</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-500 pb-2">LIÊN KẾT NHANH</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Trang chủ</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Tuyển sinh</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Hoạt động</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Tin tức - Sự kiện</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Thư viện ảnh</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition-colors">Bình chọn học sinh thanh lịch</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-500 pb-2">KẾT NỐI VỚI CHÚNG TÔI</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white text-pink-600 p-2 rounded-full hover:bg-pink-100 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <h3 className="text-lg font-bold mb-4 border-b border-blue-500 pb-2">BẢN ĐỒ</h3>
            <div className="text-center">
              <div className="w-full h-48 overflow-hidden rounded">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.885816826763!2d105.78213617508108!3d21.037254280614256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab35616ba5f3%3A0x4bcccdd4a212fa21!2zVHLGsOG7nW5nIFRIQ1MgJiBUSFBUIE5ndXnhu4VuIFThuqV0IFRow6BuaA!5e0!3m2!1svi!2s!4v1742403821803!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer - Copyright */}
      <div className="bg-blue-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} Bản quyền thuộc về Trường THCS và THPT Nguyễn Tất Thành - Hà Nội
            </p>
            <p className="text-xs mt-2 md:mt-0 text-blue-200">
              Thiết kế bởi <a href="#" className="hover:text-white">Học sinh Thanh Lịch Team</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
