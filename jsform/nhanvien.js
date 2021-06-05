function NhanVien(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam,
) {

    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.chucVu = _chucVu;
    this.luongCB = _luongCB;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai;

    this.tinhLuong = function () {
        switch (this.chucVu) {
            case "Sếp":
               this.tongLuong = parseFloat(this.luongCB) * 3;
                break;
            case "Trưởng phòng":
               this.tongLuong = parseFloat(this.luongCB) * 2;
                break;
            default:this.tongLuong = parseFloat(this.luongCB);
                break;
        }


        return this.tongLuong;
    };
    this.loaiNV = function () {
      if (this.gioLam < 160) {
        this.xepLoai = "Nhân Viên Trung Bình";
      } else if (this.gioLam < 176) {
        this.xepLoai = "Nhân Viên Khá";
      } else if (this.gioLam < 192) {
        this.xepLoai = "Nhân Viên Giỏi";
      } else {
        this.xepLoai = "Nhân Viên Xuất Sắc";
      }
      return this.xepLoai;
    }
}
