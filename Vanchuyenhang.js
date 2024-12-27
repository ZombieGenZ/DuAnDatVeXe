let menuVisible = false;

function toggleMenu() {
    const menu = document.getElementById('menuItems');
    
    if (!menuVisible) {
        menu.classList.remove('hidden');
        menu.classList.add('active'); // Thêm hiệu ứng slideIn
    } else {
        menu.classList.remove('active');
        menu.classList.add('hidden'); // Thêm hiệu ứng slideOut
    }
    
    menuVisible = !menuVisible;
}

function isValidPhoneNumber(phoneNumber) {
    const cleanedNumber = phoneNumber.trim();
    const phoneRegex = /^(0|\+84)(\d{9}|\d{8})$/;
    return phoneRegex.test(cleanedNumber);
}

document.getElementById("dataform").addEventListener('submit', (event) => {
    try {
        event.preventDefault();

        const TenHang = document.getElementById("Goodsname").value;
        const KhoiLuong = document.getElementById("Weight").value;
        const SoLuong = document.getElementById("quanlity").value;
        const DonViTinh = document.getElementById("DonViTinh").value;
        const HoVaTen = document.getElementById("fullname").value;
        const SoDienThoai = document.getElementById("phone").value;
        const NgayNhan = document.getElementById("DetailDay").value;
        const NoiNhan = document.getElementById("PlaceGo").value;
        const NoiGiao = document.getElementById("PlaceTo").value;
        const ChiTiet = document.getElementById("Detailmore").value;

        const BangGiaXeMay = [
            { name: "xe máy", price: 750000 },
        ];

        if(!isValidPhoneNumber(SoDienThoai)) {
            alert("Số điện thoại không hợp lệ !");
        } else if (TenHang.toString().toLowerCase() == BangGiaXeMay[0].name) {
            document.getElementById("Weight").readOnLy = true;
            const DonVanChuyen = {
                TenHang: TenHang,
                SoLuong: SoLuong,
                DonViTinh: DonViTinh,
                HoVaTen: HoVaTen,
                SoDienThoai: SoDienThoai,
                NgayNhan: NgayNhan,
                NoiNhan: NoiNhan,
                NoiGiao: NoiGiao,
                ChiTiet: ChiTiet,
                title: "Vận chuyển hàng hoá",
                price: BangGiaXeMay[0].price,
                status: false,
            };

            console.log(DonVanChuyen);
            localStorage.setItem('DatVe', JSON.stringify(DonVanChuyen));
            window.location.href = "ThanhToan.html";
        } else {
            let GiaTien;
            let TongKhoiLuong = KhoiLuong * SoLuong;
            if(TongKhoiLuong <= 10) {
                GiaTien = 100000;
            } else if(TongKhoiLuong > 10 && TongKhoiLuong <= 100) {
                GiaTien = 200000;
            } else if(TongKhoiLuong > 100 && TongKhoiLuong <= 1000) {
                GiaTien = 500000;
            } else if(TongKhoiLuong > 1000) {
                GiaTien = 1000000;
            }
            const DonVanChuyen = {
                TenHang: TenHang,
                KhoiLuong: KhoiLuong || "Không nhập",
                SoLuong: SoLuong,
                DonViTinh: DonViTinh,
                HoVaTen: HoVaTen,
                SoDienThoai: SoDienThoai,
                NgayNhan: NgayNhan,
                NoiNhan: NoiNhan,
                NoiGiao: NoiGiao,
                ChiTiet: ChiTiet,
                title: "Vận chuyển hàng hoá",
                price: GiaTien,
                status: false,
            };

            console.log(DonVanChuyen);
            localStorage.setItem('DatVe', JSON.stringify(DonVanChuyen));
            window.location.href = "ThanhToan.html";
        }
    }
    catch (error) {
        console.log(`Lỗi khi gửi dữ liệu: ${error}`);
    }
});