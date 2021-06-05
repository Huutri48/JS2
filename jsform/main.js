
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

getLocalStorage()
function layDuLieuDauVao(isAdd) {
    var _taiKhoan = getEle("taiKhoan").value;
    var _hoTen = getEle("hoTen").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("matKhau").value;
    var _ngayLam = getEle("ngayLam").value;
    var _luongCB = getEle("luongCB").value;
    var _chucVu = getEle("chucVu").value;
    var _gioLam = getEle("gioLam").value;
    var isValid = true;
    var isValid = true;
    if (isAdd) {
        isValid &=
            validation.kiemTraRong(_taiKhoan, "tbTKNV", "(*) Tài Khoản Không Được Rỗng") &&
            validation.kiemTraDoDaiKyTu(
                _taiKhoan,
                "tbTKNV",
                "(*) Độ dài ký tự từ 4 - 6",
                4,
                6
            ) &&
            validation.kiemTraTaiKhoanTrung(
                _taiKhoan,
                "tbTKNV",
                "(*) Tài Khoản đã tồn tại!",
                dsnv.list
            );
    }

    isValid &=
        validation.kiemTraRong(_hoTen, "tbTen", "(*) Tên Nhân Viên Không Được Rỗng") &&
        validation.kiemTraKyTuChuoi(
            _hoTen,
            "tbTen",
            "(*) Tên Nhân Viên Phải Là Chữ"
        );

    isValid &=
        validation.kiemTraRong(_email, "tbEmail", "(*) Email Không Được Rỗng") &&
        validation.kiemTraEmail(
            _email,
            "tbEmail",
            "Email Không đúng định dạng!"
        );

    isValid &=
        validation.kiemTraRong(
            _matKhau,
            "tbMatKhau",
            "(*) Mật khẩu  Không Được Rỗng"
        ) &&
        validation.kiemTraMatKhau(
            _matKhau,
            "tbMatKhau",
            "(*) Mật khẩu chưa đúng định dạng!"
        ) && validation.kiemTraDoDaiKyTu(
            _matKhau,
            "tbMatKhau",
            "(*) Mật khẩu Có Độ Dài Từ 6 Đến 10 Kí Tự!",
            6,
            10
        );

    isValid &=
        validation.kiemTraRong(
            _ngayLam,
            "tbNgay",
            "(*) Ngày Làm Không Được Rỗng"
        ) &&
        validation.kiemTraNgayLam(
            _ngayLam,
            "tbNgay",
            "(*) Ngày Làm Chưa Đúng Định Dạng"
        );
    isValid &=
        validation.kiemTraRong(_luongCB, "tbLuongCB", "(*) Lương Cơ Bản Không Được Rỗng") &&
        validation.kiemTraLuongCB(_luongCB, "tbLuongCB", "(*) Vui lòng nhập Từ 1,000,000 - 20,000,000VNĐ");
    isValid &= validation.kiemTraChucVu(
        "chucVu",
        "tbChucVu",
        "(*) Vui Lòng Chọn Chức Vụ"
    );
    isValid &=
        validation.kiemTraRong(_gioLam, "tbGiolam", "(*) Giờ Làm Không Được Rỗng") &&
        validation.kiemTraGioLam(_gioLam, "tbGiolam", "(*) Vui Lòng Nhập Giờ Làm Từ 80-200 Giờ");
    if (isValid) {
        var nhanVien = new NhanVien(
            _taiKhoan,
            _hoTen,
            _email,
            _matKhau,
            _ngayLam,
            _luongCB,
            _chucVu,
            _gioLam,

        );
        return nhanVien;
    }
    return null;
}
getEle("btnThemNV").addEventListener("click", function (event) {
    event.preventDefault();

    var nhanVien = layDuLieuDauVao(true);
    if (nhanVien) {
        nhanVien.tinhLuong();
        nhanVien.loaiNV();
        dsnv.themNhanVien(nhanVien);
        taoBang(dsnv.list);
        setLocalStorage();
    }
});
function taoBang(arr) {

    getEle("tableDanhSach").innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var tagTR = document.createElement("tr");
        var tagTD_TaiKhoan = document.createElement("td");
        var tagTD_HoTen = document.createElement("td");
        var tagTD_Email = document.createElement("td");
        var tagTD_NgayLam = document.createElement("td");
        var tagTD_ChucVu = document.createElement("td");
        var tagTD_tongLuong = document.createElement("td");
        var tagTD_LoaiNV = document.createElement("td");
        var tagTD_Button = document.createElement("td");

        tagTD_TaiKhoan.innerHTML = arr[i].taiKhoan;
        tagTD_HoTen.innerHTML = arr[i].hoTen;
        tagTD_Email.innerHTML = arr[i].email;
        tagTD_NgayLam.innerHTML = arr[i].ngayLam;
        tagTD_ChucVu.innerHTML = arr[i].chucVu;
        tagTD_tongLuong.innerHTML = arr[i].tongLuong;
        tagTD_LoaiNV.innerHTML = arr[i].xepLoai;

        tagTD_Button.innerHTML =
            '<button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="suaNV(\'' +
            arr[i].taiKhoan +
            "')\">Sửa</button>" + '<button class="btn btn-danger" onclick="xoaNV(\'' +
            arr[i].taiKhoan +
            "')\">Xóa</button>";

        tagTR.appendChild(tagTD_TaiKhoan);
        tagTR.appendChild(tagTD_HoTen);
        tagTR.appendChild(tagTD_Email);
        tagTR.appendChild(tagTD_NgayLam);
        tagTR.appendChild(tagTD_ChucVu);
        tagTR.appendChild(tagTD_tongLuong);
        tagTR.appendChild(tagTD_LoaiNV);
        tagTR.appendChild(tagTD_Button);


        getEle("tableDanhSach").appendChild(tagTR);
    }
};
function xoaNV(taiKhoan) {
    dsnv.xoaNhanVien(taiKhoan);
    taoBang(dsnv.list);
    setLocalStorage();
}


function suaNV(taiKhoan) {
    var nhanVien = dsnv.layThongTinNhanVien(taiKhoan);
    getEle("taiKhoan").value = nhanVien.taiKhoan;
    getEle("taiKhoan").disabled = true;
    getEle("hoTen").value = nhanVien.hoTen;
    getEle("email").value = nhanVien.email;
    getEle("matKhau").value = nhanVien.matKhau;
    getEle("ngayLam").value = nhanVien.ngayLam;
    getEle("luongCB").value = nhanVien.luongCB;
    getEle("chucVu").value = nhanVien.chucVu;
    getEle("gioLam").value = nhanVien.gioLam;
    getEle("btnThemNV").style.display = "none";
    resetTB()
}
getEle("btnCapNhat").addEventListener("click", function () {
    var nhanVien = layDuLieuDauVao(false);
    nhanVien.tinhLuong();
    nhanVien.loaiNV();
    dsnv.capNhatNhanVien(nhanVien);
    taoBang(dsnv.list);
    setLocalStorage();
});
function resetTB() {
    getEle("tbTKNV").style.display = "none";
    getEle("tbTen").style.display = "none";
    getEle("tbEmail").style.display = "none";
    getEle("tbMatKhau").style.display = "none";
    getEle("tbNgay").style.display = "none";
    getEle("tbLuongCB").style.display = "none";
    getEle("tbChucVu").style.display = "none";
    getEle("tbGiolam").style.display = "none";
}
getEle("btnThem").addEventListener("click", function (event) {
    getEle("btnThemNV").style.display = "inline-block";
    getEle("formNV").reset();
    getEle("taiKhoan").disabled = false;
    resetTB()
})

getEle("searchName").addEventListener("keyup", function () {
    var keyWord = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNhanVien(keyWord);
    taoBang(mangTimKiem);
});

function setLocalStorage() {
    var arrString = JSON.stringify(dsnv.list);
    localStorage.setItem("DSNV", arrString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var data = localStorage.getItem("DSNV");
        dsnv.list = JSON.parse(data);
        taoBang(dsnv.list);
    }
}


