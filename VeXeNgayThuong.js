
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

        const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        
        function jdFromDate(dd, mm, yy) {
            var a = Math.floor((14 - mm) / 12);
            var y = yy + 4800 - a;
            var m = mm + 12 * a - 3;
            var jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
            return jd;
        }

        function getNewMoonDay(k, timeZone) {
            var T = k/1236.85;
            var T2 = T * T;
            var T3 = T2 * T;
            var dr = Math.PI/180;
            var Jd1 = 2415020.75933 + 29.53058868*k + 0.0001178*T2 - 0.000000155*T3;
            Jd1 = Jd1 + 0.00033*Math.sin((166.56 + 132.87*T - 0.009173*T2)*dr);
            var M = 359.2242 + 29.10535608*k - 0.0000333*T2 - 0.00000347*T3;
            var Mpr = 306.0253 + 385.81691806*k + 0.0107306*T2 + 0.00001236*T3;
            var F = 21.2964 + 390.67050646*k - 0.0016528*T2 - 0.00000239*T3;
            var C1 = (0.1734 - 0.000393*T)*Math.sin(M*dr) + 0.0021*Math.sin(2*dr*M);
            C1 = C1 - 0.4068*Math.sin(Mpr*dr) + 0.0161*Math.sin(dr*2*Mpr);
            C1 = C1 - 0.0004*Math.sin(dr*3*Mpr);
            C1 = C1 + 0.0104*Math.sin(dr*2*F) - 0.0051*Math.sin(dr*(M+Mpr));
            C1 = C1 - 0.0074*Math.sin(dr*(M-Mpr)) + 0.0004*Math.sin(dr*(2*F+M));
            C1 = C1 - 0.0004*Math.sin(dr*(2*F-M)) - 0.0006*Math.sin(dr*(2*F+Mpr));
            C1 = C1 + 0.0010*Math.sin(dr*(2*F-Mpr)) + 0.0005*Math.sin(dr*(2*Mpr+M));
            var deltaT = 0;
            if (T < -11) {
                deltaT = 0.001 + 0.000839*T + 0.0002261*T2 - 0.00000845*T3 - 0.000000081*T*T3;
            } else {
                deltaT = -0.000278 + 0.000265*T + 0.000262*T2;
            };
            var JdNew = Jd1 + C1 - deltaT;
            return Math.floor(JdNew + 0.5 + timeZone/24);
        }

        function getSunLongitude(jdn, timeZone) {
            var T = (jdn - 2451545.5 - timeZone/24) / 36525;
            var T2 = T * T;
            var dr = Math.PI/180;
            var M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2;
            var L0 = 280.46645 + 36000.76983*T + 0.0003032*T2;
            var DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
            DL = DL + (0.019993 - 0.000101*T)*Math.sin(dr*2*M) + 0.000290*Math.sin(dr*3*M);
            var L = L0 + DL;
            L = L - 360*Math.floor(L/360);
            return Math.floor(L/30);
        }

        function getLunarMonth11(yy, timeZone) {
            var k = Math.floor((yy-1900)*12.37);
            var off = Math.floor((yy-1900)*12.37);
            var nm = getNewMoonDay(k, timeZone);
            var sunLong = getSunLongitude(nm, timeZone);
            if (sunLong >= 9) {
                nm = getNewMoonDay(k-1, timeZone);
            }
            return nm;
        }

        function getLeapMonthOffset(a11, timeZone) {
            var k = Math.floor((a11 - 2415021.076998695) / 29.530588853);
            var last = 0;
            var i = 1;
            var arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);
            do {
                last = arc;
                i++;
                arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);
            } while (arc != last && i < 14);
            return i-1;
        }

        function convertSolar2Lunar(dd, mm, yy, timeZone) {
            var dayNumber = jdFromDate(dd, mm, yy);
            var k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
            var monthStart = getNewMoonDay(k+1, timeZone);
            if (monthStart > dayNumber) {
                monthStart = getNewMoonDay(k, timeZone);
            }
            var a11 = getLunarMonth11(yy, timeZone);
            var b11 = a11;
            var lunarYear;
            if (a11 >= monthStart) {
                lunarYear = yy;
                a11 = getLunarMonth11(yy-1, timeZone);
            } else {
                lunarYear = yy+1;
                b11 = getLunarMonth11(yy+1, timeZone);
            }
            var lunarDay = dayNumber - monthStart + 1;
            var diff = Math.floor((monthStart - a11)/29);
            var lunarMonth = diff + 11;
            if (b11 - a11 > 365) {
                var leapMonthDiff = getLeapMonthOffset(a11, timeZone);
                if (diff >= leapMonthDiff) {
                    lunarMonth = diff + 10;
                }
            }
            if (lunarMonth > 12) {
                lunarMonth = lunarMonth - 12;
            }
            if (lunarMonth >= 11 && diff < 4) {
                lunarYear -= 1;
            }
            return {
                day: lunarDay,
                month: lunarMonth,
                year: lunarYear
            };
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
      const detailday = document.getElementById("DetailDay").value;
      const countTicket = document.getElementById("CountTicket").value;

      const date = new Date(detailday);

      const dd = date.getDate();
      const mm = date.getMonth() + 1;
      const yy = date.getFullYear();

      const lunar = convertSolar2Lunar(dd, mm, yy, 7); // Múi giờ +7

      if(!isValidPhoneNumber(phone)) {

        alert("Số điện thoại không hợp lệ !");

      } else {
          const ThongtinNguoiDung = {
              fullname: fullname,
              PhoneNumber: phone,
              placeGo: placeGo,
              placeTo: placeTo,
              detaillocal: detaillocal,
              detailday: `Ngày ${dd} tháng ${mm} năm ${yy}`,
              moonday: `Ngày ${lunar.day} tháng ${lunar.month} năm ${lunar.year - 1} (âm lịch)`,
              countTicket: countTicket,
              title: "Đặt vé xe ngày thường",
              price: (700000).toLocaleString(),
              tongtien: (700000 * countTicket).toLocaleString(),
              status: false,
          };
          document.getElementById("Fullname").value = '';
          document.getElementById("PhoneName").value = '';
          document.getElementById("PlaceGo").value = '';
          document.getElementById("PlaceTo").value = '';
          document.getElementById("DetailLocal").value = '';
          document.getElementById("DetailDay").value = '';
          document.getElementById("CountTicket").value = '';
  
          console.log(ThongtinNguoiDung);
          localStorage.setItem('DatVe', JSON.stringify(ThongtinNguoiDung));
          window.location.href = "ThanhToan.html";
        }
      }
    catch (error) {
      console.log(`Lỗi khi gửi dữ liệu: ${error}`);
    }
});


