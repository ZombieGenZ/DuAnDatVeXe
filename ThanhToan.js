document.addEventListener('DOMContentLoaded', () => {
    const HinhThuc = document.getElementById("dataform");
    const VeXe = JSON.parse(localStorage.getItem("DatVe"));

    if(VeXe) {
        if(VeXe.title == "Đặt vé xe ngày tết" || VeXe.title == "Đặt vé xe ngày thường") {
            const query = `<h1 id="TieuDe1">Hoá đơn thanh toán</h1>
                            <div class="formhoadon">
                                <div class="HinhThuc">
                                    <label>Hình thức: </label>
                                    <p>${VeXe.title}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Khách hàng: </label>
                                    <p>${VeXe.fullname}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Số điện thoại: </label>
                                    <p>${VeXe.PhoneNumber}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Ngày đi: </label>
                                    <p>${VeXe.detailday}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Nơi đi: </label>
                                    <p>${VeXe.placeGo}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Nơi đến: </label>
                                    <p>${VeXe.placeTo}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Địa chỉ cụ thể: </label>
                                    <p>${VeXe.detaillocal}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Số vé đặt trước: </label>
                                    <p>${VeXe.countTicket} </p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Số hiệu giường mong muốn: </label>
                                    <p>${VeXe.countCustomer}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Giá tiền: </label>
                                    <p>${VeXe.price.toLocaleString()} VNĐ / 1 vé</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Tổng tiền: </label>
                                    <p>${(VeXe.price * VeXe.countTicket).toLocaleString()} VNĐ</p>
                                </div>
                            </div>
                            <input type="submit" id="Submit" value="Xác nhận">
                            <div class="note">
                                ⚠️ Lưu ý: Vui lòng xác minh tất cả thông tin trước khi xác nhận đặt vé.
                            </div>`;
            HinhThuc.innerHTML = query;
        } else if(VeXe.title == "Vận chuyển hàng hoá" && VeXe.TenHang == "xe máy") {
            const query = `<h1 id="TieuDe1">Hoá đơn thanh toán</h1>
                            <div class="formhoadon">
                                <div class="HinhThuc">
                                    <label>Hình thức: </label>
                                    <p>${VeXe.title}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Tên hàng: </label>
                                    <p>${VeXe.TenHang}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Số lượng: </label>
                                    <p>${VeXe.SoLuong}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Đơn vị tính: </label>
                                    <p>${VeXe.DonViTinh}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Họ và tên: </label>
                                    <p>${VeXe.HoVaTen}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Số điện thoại: </label>
                                    <p>${VeXe.SoDienThoai}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Nơi nhận: </label>
                                    <p>${VeXe.NoiNhan}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Nơi giao: </label>
                                    <p>${VeXe.NoiGiao}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Địa chỉ cụ thể: </label>
                                    <p>${VeXe.ChiTiet}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Giá tiền: </label>
                                    <p>${VeXe.price.toLocaleString()} VNĐ / 1 xe</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Tổng tiền: </label>
                                    <p>${(VeXe.price * VeXe.SoLuong).toLocaleString()} VNĐ</p>
                                </div>
                            </div>
                            <input type="submit" id="Submit" value="Xác nhận">
                            <div class="note">
                                ⚠️ Lưu ý: Vui lòng xác minh tất cả thông tin trước khi xác nhận đặt vé.
                            </div>`;
            HinhThuc.innerHTML = query;
        } else if(VeXe.title == "Vận chuyển hàng hoá") {
            const query = `<h1 id="TieuDe1">Hoá đơn thanh toán</h1>
                            <div class="formhoadon">
                                <div class="HinhThuc">
                                    <label>Hình thức: </label>
                                    <p>${VeXe.title}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Tên hàng: </label>
                                    <p>${VeXe.TenHang}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Khối lượng: </label>
                                    <p>${VeXe.KhoiLuong} Kg</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Số lượng: </label>
                                    <p>${VeXe.SoLuong}  ${VeXe.DonViTinh}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Tổng khối lượng: </label>
                                    <p>${VeXe.SoLuong * VeXe.KhoiLuong} Kg</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Họ và tên: </label>
                                    <p>${VeXe.HoVaTen}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Số điện thoại: </label>
                                    <p>${VeXe.SoDienThoai}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Nơi nhận: </label>
                                    <p>${VeXe.NoiNhan}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Nơi giao: </label>
                                    <p>${VeXe.NoiGiao}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Địa chỉ cụ thể: </label>
                                    <p>${VeXe.ChiTiet}</p>
                                </div>
                                <div class="HinhThuc">
                                    <label>Tổng tiền: </label>
                                    <p>${VeXe.price.toLocaleString()} VNĐ</p>
                                </div>
                            </div>
                            <input type="submit" id="Submit" value="Xác nhận">
                            <div class="note">
                                ⚠️ Lưu ý: Vui lòng xác minh tất cả thông tin trước khi xác nhận đặt vé.
                            </div>`;
            HinhThuc.innerHTML = query;
        }
    } else {
        const query = `<h1 id="TieuDe">Không có hóa đơn được nhận</h1>
                        <div class="note">
                            ⚠️ Lưu ý: Vui lòng nhập đầy đủ thông tin từ khi đặt vé.
                        </div>`;
        HinhThuc.innerHTML = query;
    }
});


let menuVisible = false;

function toggleMenu() {
    const menu = document.getElementById('menuItems');
    
    if (!menuVisible) {
        menu.classList.remove('hidden');
        menu.classList.add('active');
    } else {
        menu.classList.remove('active');
        menu.classList.add('hidden');
    }
    
    menuVisible = !menuVisible;
}

document.getElementById("dataform").addEventListener('submit', (event) => {
    try {
        event.preventDefault();
        localStorage.remove("DatVe");
        window.location.href = "index.html";
        alert("Thanh toán thành công !");
    }
    catch (error) {
        console.log(`Lỗi khi gửi dữ liệu: ${error}`);
    }
});