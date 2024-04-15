$(document).ready(function(){
    // Đặt chiều cao tối đa cho bảng
    $('#custom-table').css('max-height', ($(window).height() - 200) + 'px');

    // Hàm định dạng giá tiền
    function formatCurrency(price) {
        if (typeof price !== 'number') {
            price = parseFloat(price.replace(/[,.đ]/g, '')); // Chuyển đổi giá trị từ chuỗi sang số
        }
        return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.', ',') + ' đ';
    }

    // Hiển thị thông tin sản phẩm từ localStorage lên bảng và tính tổng giá trị
    function displayCart() {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var tbody = $('#custom-table tbody');
        tbody.empty(); // Xóa hết các hàng cũ trong bảng
        var total = 0; // Khởi tạo biến tổng giá trị

        if (cart && cart.length > 0) {
            cart.forEach(function(item) {
                // Kiểm tra và chuyển đổi giá thành số nếu cần
                if (typeof item.price !== 'number') {
                    item.price = parseFloat(item.price.replace(/[,.đ]/g, ''));
                }
                var html = '<tr>' +
                    '<td><img src="' + item.image + '" alt=""></td>' +
                    '<td><p class="name">' + item.name + '</p></td>' +
                    '<td><p class="donGia">' + formatCurrency(item.price) + '</p></td>' +
                    '<td><input type="number" class="sl" value="' + item.quantity + '" min="1"></td>' +
                    '<td><p class="tongtien">' + formatCurrency(parseFloat(item.price) * item.quantity) + '</p></td>' +
                    '<td><p><i class="fa-solid fa-trash remove-item" data-name="' + item.name + '"></i></p></td>' +
                    '</tr>';
                tbody.append(html);
                total += parseFloat(item.price) * item.quantity; // Cộng vào tổng giá trị
            });
        }
        // Lấy mảng từ localStorage
        var productList = JSON.parse(localStorage.getItem('cart'));

        var productCount = productList ? productList.length : 0;
        
        $('#productCountBadge').text(productCount);

        // Hiển thị tổng giá trị
        $('.tongGT b').text(formatCurrency(total));
    }

    // Gọi hàm hiển thị giỏ hàng khi tải trang
    displayCart();

    // Xử lý sự kiện khi người dùng nhấn vào biểu tượng xoá để loại bỏ sản phẩm khỏi giỏ hàng
    $(document).on('click', '.remove-item', function() {
        var itemName = $(this).data('name');
        var cart = JSON.parse(localStorage.getItem('cart'));
        var updatedCart = cart.filter(function(item) {
            return item.name !== itemName;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCart(); // Hiển thị lại giỏ hàng sau khi loại bỏ sản phẩm
    });

    // Xử lý sự kiện khi người dùng thay đổi số lượng sản phẩm để cập nhật tổng tiền
    $(document).on('change', '.sl', function() {
        var quantity = parseInt($(this).val());
        var itemName = $(this).closest('tr').find('.name').text();
        var cart = JSON.parse(localStorage.getItem('cart'));
        var updatedCart = cart.map(function(item) {
            if (item.name === itemName) {
                item.quantity = quantity;
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCart(); // Hiển thị lại giỏ hàng sau khi cập nhật số lượng sản phẩm
    });

    // Hàm hiển thị thông báo lỗi cho một trường
    function displayError(field, errorMessage) {
        $('#' + field + 'Error').text(errorMessage);
        $('#' + field + 'Error').removeClass('valid-label').addClass('error-label');
    }

    // Hàm hiển thị thông báo hợp lệ cho một trường
    function displayValid(field) {
        $('#' + field + 'Error').text('Mẫu hợp lệ');
        $('#' + field + 'Error').removeClass('error-label').addClass('valid-label');
    }

    // Hàm kiểm tra email
    function validateEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Hàm kiểm tra số điện thoại
    function validatePhone(phone) {
        var regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        return regex.test(phone);
    }

    // Hàm kiểm tra địa chỉ giao hàng
    function validateAddress(address) {
        var regex =  /^[A-Z][a-z]*(\s[A-Z][a-z0-9]*)*$/;
        return regex.test(address);
    }

    // Hàm kiểm tra các trường thông tin và hiển thị thông báo lỗi cho từng trường
    function validateInputs() {
        var fullName = $('#fullName').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        var address = $('#address').val().trim();
        var isValid = true;

        // Kiểm tra tên
        if (fullName === "") {
            displayError("fullName", "Họ và tên không được để trống.");
            isValid = false;
        } else if (!/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(fullName)) {
            displayError("fullName", "Tên phải là chữ và viết hoa chữ cái đầu của mỗi từ.");
            isValid = false;
        } else {
            displayValid("fullName");
        }

        // Kiểm tra email
        if (email === "") {
            displayError("email", "Email không được để trống.");
            isValid = false;
        } else if (!validateEmail(email)) {
            displayError("email", "Email không hợp lệ.");
            isValid = false;
        } else {
            displayValid("email");
        }

        // Kiểm tra số điện thoại
        if (phone === "") {
            displayError("phone", "Số điện thoại không được để trống.");
            isValid = false;
        } else if (!validatePhone(phone)) {
            displayError("phone", "Số điện thoại không hợp lệ.");
            isValid = false;
        } else {
            displayValid("phone");
        }

        // Kiểm tra địa chỉ giao hàng
        if (address === "") {
            displayError("address", "Địa chỉ giao hàng không được để trống.");
            isValid = false;
        } else if (!validateAddress(address)) {
            displayError("address", "Địa chỉ giao hàng không hợp lệ.");
            isValid = false;
        } else {
            displayValid("address");
        }

        // Trả về kết quả kiểm tra
        return isValid;
    }

    // Xử lý sự kiện khi người dùng rời khỏi các trường nhập liệu
    $('#fullName, #email, #phone, #address').blur(function() {
        if ($(this).val().trim() !== "") {
            // Chỉ kiểm tra khi có dữ liệu nhập vào
            validateInputs();
        }
    });
    
    // Xử lý sự kiện khi người dùng nhấn nút "Thanh toán"
$('#paymentModal .btn-primary').click(function() {
    // Kiểm tra tất cả các trường thông tin
    if (validateInputs()) {
        // Hiển thị thông báo thành công trong một div có lớp alert trên thẻ body
        $('body').prepend('<div class="alert alert-success alert-dismissible fade show" role="alert">Thanh toán <strong>Thành công!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

        // Đóng modal
        $('#paymentModal').modal('hide');

        // Xóa hết các dòng trong bảng và đặt tổng giá trị về 0
        $('#custom-table tbody').empty();
        $('.tongGT b').text(formatCurrency(0));
    } else {
        // Nếu có thông tin không hợp lệ, di chuyển con trỏ đến trường đầu tiên sai
        $('input.error-field, textarea.error-field').first().focus();
    }
});
});
