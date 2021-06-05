function DanhSachNhanVien() {
    this.list = [];

    this.themNhanVien = function (nv) {
        this.list.push(nv);
    };

    this._timViTri = function (taiKhoan) {

        var index = -1;
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].taiKhoan == taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    };

    this.xoaNhanVien = function (taiKhoan) {
        var index = this._timViTri(taiKhoan);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    };

    this.layThongTinNhanVien = function (taiKhoan) {

        var index = this._timViTri(taiKhoan);

        if (index !== -1) {
            return this.list[index];
        }
    };

    this.capNhatNhanVien = function (nhanVien) {

        var index = this._timViTri(nhanVien.taiKhoan);

        if (index !== -1) {
            this.list[index] = nhanVien;
        }
    };


    DanhSachNhanVien.prototype.timKiemNhanVien = function (keyword) {

        var mangTimKiem = [];
        for (var i = 0; i < this.list.length; i++) {
            if (
                this.list[i].xepLoai.toLowerCase().indexOf(keyword.toLowerCase()) !==
                -1
            ) {
                mangTimKiem.push(this.list[i]);
            }
        }
        return mangTimKiem;
    };
}
