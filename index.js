
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

document.getElementById("dataform").addEventListener("submit", function(event) {
    try {
      event.preventDefault();
      const fullname = document.getElementById("Fullname").value;
      const phone = document.getElementById("PhoneName").value;
      const placeGo = document.getElementById("PlaceGo").value;
      const placeTo = document.getElementById("PlaceTo").value;
      const detaillocal = document.getElementById("DetailLocal").value;
      const countTicket = document.getElementById("CountTicket").value;
      const countCustomer = document.getElementById("CountCustomer").value;
      if(!isValidPhoneNumber(phone)) {

        alert("Số điện thoại không hợp lệ !");

      } else {
          const ThongtinNguoiDung = {
              fullname: fullname,
              PhoneNumber: phone,
              placeGo: placeGo,
              placeTo: placeTo,
              detaillocal: detaillocal,
              countTicket: countTicket,
              countCustomer: countCustomer || "Không nhập",
              title: "Đặt vé xe ngày tết",
              price: 1600000,
              status: false,
          };
          document.getElementById("Fullname").value = '';
          document.getElementById("PhoneName").value = '';
          document.getElementById("PlaceGo").value = '';
          document.getElementById("PlaceTo").value = '';
          document.getElementById("DetailLocal").value = '';
          document.getElementById("CountTicket").value = '';
          document.getElementById("CountCustomer").value = '';
  
          console.log(ThongtinNguoiDung);
          localStorage.setItem('DatVe', JSON.stringify(ThongtinNguoiDung));
          window.location.href = "ThanhToan.html";
        }
      }
    catch (error) {
      console.log(`Lỗi khi gửi dữ liệu: ${error}`);
    }
});


