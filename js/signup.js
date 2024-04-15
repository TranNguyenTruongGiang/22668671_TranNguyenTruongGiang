$(document).ready(function() {
    // Kiểm tra và khởi tạo đối tượng user trong localStorage
    if(localStorage.getItem('user') === null) {
        var user = {
            login: false
        };
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Xử lý khi nhấn nút "Cancel"
    $("#btnClose").click(function(event) {
        // Ngăn chặn hành vi mặc định của nút "Cancel" trong form
        event.preventDefault();
        // Chuyển hướng về trang ../html/login.html
        window.location.href = "../html/login.html";
    });

    function checkEmail() {
        var username = $('#username').val();
        var regex = /^[a-zA-Z0-9._%+-]+$/;
        if (username.trim() === '') {
            $('#tbusername').text('username cannot be empty.');
            return false;
        } else if (!regex.test(username)) {
            $('#tbusername').text('Please enter a valid Username');
            return false;
        }
        $('#tbusername').text('*');
        return true;
    }
    
    $('#username').blur(function() {
        checkEmail();
    });

    // Kiểm tra trường password
    function checkPassword() {
        var password = $('#pwd').val();
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (password.trim() === '') {
            $('#tbpwd').text('Password cannot be empty.');
            return false;
        } else if (!regex.test(password)) {
            $('#tbpwd').text('Password must have at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return false;
        }
        $('#tbpwd').text('*');
        return true;
    }

    $('#pwd').blur(function() {
        checkPassword();
    });

    // Kiểm tra trường confirm password
    function checkConfirmPassword() {
        var password = $('#pwd').val();
        var confirmPassword = $('#cfpwd').val();
        if (confirmPassword.trim() === '') {
            $('#tbcfpwd').text('Confirm password cannot be empty.');
            return false;
        } else if (password !== confirmPassword) {
            $('#tbcfpwd').text('Confirm password does not match the password.');
            return false;
        } else if (!checkPassword()) {
            // Kiểm tra confirm password phải đảm bảo định dạng như password
            return false;
        }
        $('#tbcfpwd').text('*');
        return true;
    }

    $('#cfpwd').blur(function() {
        checkConfirmPassword();
    });

    // Kiểm tra trường last name
    function checkLastName() {
        var lastName = $('#lastN').val();
        var regex = /^[A-Z][a-z]*$/;
        if (lastName.trim() === '') {
            $('#tblastN').text('Last name cannot be empty.');
            return false;
        } else if (!regex.test(lastName)) {
            $('#tblastN').text('Last name must start with an uppercase letter and only contain letters.');
            return false;
        }
        $('#tblastN').text('*');
        return true;
    }

    $('#lastN').blur(function() {
        checkLastName();
    });

    // Kiểm tra trường first name
    function checkFirstName() {
        var firstName = $('#firstN').val();
        var regex = /^[A-Z][a-z]*$/;
        if (firstName.trim() === '') {
            $('#tbfirstN').text('First name cannot be empty.');
            return false;
        } else if (!regex.test(firstName)) {
            $('#tbfirstN').text('First name must start with an uppercase letter and only contain letters.');
            return false;
        }
        $('#tbfirstN').text('*');
        return true;
    }

    $('#firstN').blur(function() {
        checkFirstName();
    });

    // Kiểm tra trường ngày sinh
    function checkDateOfBirth() {
        var day = parseInt($('#day').val());
        var month = parseInt($('#month').val());
        var year = parseInt($('#year').val());
        var daysInMonth = [31, 28 + ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            $('#lbdate').text('Date of birth cannot be empty.');
            return false;
        } else if (day < 1 || day > daysInMonth[month - 1]) {
            $('#lbdate').text('Invalid day for the selected month and year.');
            return false;
        }
        $('#lbdate').text('*');
        return true;
    }

    $('#btnSubmit').click(function(event){
        var username = checkEmail();
        var pass = checkPassword();
        var cfpass = checkConfirmPassword();
        var lName = checkLastName();
        var fName = checkFirstName();
        var date = checkDateOfBirth();
        var check = username && pass && cfpass && lName && fName && date;
        event.preventDefault();
        if(check == true){
            var userInfo = {
                username: $('#username').val(),
                password: $('#pwd').val(),
                lastName: $('#lastN').val(),
                firstName: $('#firstN').val(),
                dateOfBirth: $('#day').val() + '-' + $('#month').val() + '-' + $('#year').val(),
            };

            // Cập nhật trạng thái đăng nhập thành công
            var user = JSON.parse(localStorage.getItem('user'));
            user.login = true;
            localStorage.setItem('user', JSON.stringify(user));

            // Hiển thị thông báo thành công
            alert('Đăng ký thành công!');

            // Lưu vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // Chờ 1 giây trước khi chuyển hướng sang trang home.html
            setTimeout(function() {
                window.location.href = '../html/home.html';
            }, 1000); // Chờ 1 giây (1000 mili giây)
        }
    });

});
