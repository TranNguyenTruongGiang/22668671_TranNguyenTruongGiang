$(document).ready(function () {
    // Kiểm tra và khởi tạo đối tượng user trong localStorage
    if(localStorage.getItem('user') === null) {
        var user = {
            login: false
        };
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Xử lý khi nút "Login with Google" được nhấn
    $('#googleLoginBtn').click(function () {
        // Mở modal cho Google
        $('#googleModal').modal('show');
    });

    // Xử lý khi nút "Login with Facebook" được nhấn
    $('#facebookLoginBtn').click(function () {
        // Mở modal cho Facebook
        $('#facebookModal').modal('show');
    });

    // Xử lý khi nút "Tiếp tục" trên modal Google được nhấn
    $('#googleContinueBtn').click(function () {
        // Đóng modal Google
        $('#googleModal').modal('hide');
        // Thực hiện điều hướng sang trang home.html
        window.location.href = '../html/home.html';
        // Cập nhật trạng thái đăng nhập thành công
        var user = JSON.parse(localStorage.getItem('user'));
        user.login = true;
        localStorage.setItem('user', JSON.stringify(user));
    });

    // Xử lý khi nút "Tiếp tục" trên modal Facebook được nhấn
    $('#facebookContinueBtn').click(function () {
        // Đóng modal Facebook
        $('#facebookModal').modal('hide');
        // Thực hiện điều hướng sang trang home.html
        window.location.href = '../html/home.html';
        // Cập nhật trạng thái đăng nhập thành công
        var user = JSON.parse(localStorage.getItem('user'));
        user.login = true;
        localStorage.setItem('user', JSON.stringify(user));
    });

    // Hàm kiểm tra username
    function validateUsername(username) {
        // Regex để kiểm tra username
        var usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return usernameRegex.test(username);
    }

    // Hàm kiểm tra password
    function validatePassword(password) {
        // Regex để kiểm tra password
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // Xử lý khi người dùng rời khỏi trường username
    $('#username').blur(function () {
        var username = $(this).val();
        if (!validateUsername(username)) {
            $('#usernameError').text('Username không hợp lệ').addClass('text-danger');
        } else {
            $('#usernameError').text('Mẫu hợp lệ').removeClass('text-danger').addClass('text-success');
        }
    });

    // Xử lý khi người dùng rời khỏi trường password
    $('#pass').blur(function () {
        var password = $(this).val();
        if (!validatePassword(password)) {
            $('#passwordError').text('Password không hợp lệ').addClass('text-danger');
        } else {
            $('#passwordError').text('Mẫu hợp lệ').removeClass('text-danger').addClass('text-success');
        }
    });

    // Xử lý khi nút "Login" được nhấn
    $('form').submit(function (event) {
        var username = $('#username').val();
        var password = $('#pass').val();

        // Kiểm tra username và password
        if (!validateUsername(username)) {
            $('#usernameError').text('Username không hợp lệ').addClass('text-danger');
            event.preventDefault(); // Ngăn chặn việc submit form nếu có lỗi
        } else {
            $('#usernameError').text('Mẫu hợp lệ').removeClass('text-danger').addClass('text-success');
        }

        if (!validatePassword(password)) {
            $('#passwordError').text('Password không hợp lệ').addClass('text-danger');
            event.preventDefault(); // Ngăn chặn việc submit form nếu có lỗi
        } else {
            $('#passwordError').text('Mẫu hợp lệ').removeClass('text-danger').addClass('text-success');
        }

        // Kiểm tra nếu cả username và password hợp lệ
        if (validateUsername(username) && validatePassword(password)) {
            // Cập nhật trạng thái đăng nhập thành công
            var user = JSON.parse(localStorage.getItem('user'));
            user.login = true;
            localStorage.setItem('user', JSON.stringify(user));

            // Hiển thị thông báo thành công
            alert('Đăng nhập thành công!');

            // Chờ 1 giây trước khi chuyển hướng sang trang home.html
            setTimeout(function() {
                window.location.href = '../html/home.html';
            }, 1000); // Chờ 1 giây (1000 mili giây)
        }
    });
});
