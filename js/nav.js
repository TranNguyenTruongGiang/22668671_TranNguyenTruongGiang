$(document).ready(function(){
    // Kiểm tra xem có tồn tại 'stock' trong localStorage không
    if (!localStorage.getItem('stock')) {
        // Nếu chưa, tạo mới 'stock' với các thông tin từ thẻ HTML
        fetch('../html/product.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const products = doc.querySelectorAll('.product-item');

                // Khởi tạo mảng stock
                const stock = [];

                // Lặp qua mỗi sản phẩm và thêm thông tin vào stock
                products.forEach(product => {
                    const productImage = product.querySelector('.product-image').getAttribute('src');
                    const productName = product.querySelector('.product-name').innerText;
                    const productPrice = product.querySelector('.product-price').innerText;

                    // Tạo đối tượng sản phẩm mới và thêm vào stock
                    const newProduct = {
                        'product-image': productImage,
                        'product-name': productName,
                        'product-price': productPrice
                    };
                    stock.push(newProduct);
                });

                // Lưu mảng stock vào local storage
                localStorage.setItem('stock', JSON.stringify(stock));
            });
    }

    document.querySelector('#searchBox input').addEventListener('keyup', function(event) {
        // Kiểm tra xem phím đã được nhấn có phải là phím Enter không
        if (event.key === 'Enter') {
            // Lấy nội dung đã nhập vào ô tìm kiếm
            const searchText = this.value.trim().toLowerCase();
            alert(searchText);
            
            // Lấy mảng sản phẩm từ localStorage
            const stock = JSON.parse(localStorage.getItem('stock')) || [];
            
            // Tìm kiếm sản phẩm trong mảng
            let foundProduct = null;
            for (let i = 0; i < stock.length; i++) {
                if (stock[i]['product-name'].toLowerCase()==searchText) {
                    foundProduct = stock[i];
                    break; // Dừng vòng lặp khi tìm thấy sản phẩm
                }
            }
            // Nếu tìm thấy sản phẩm
            if (foundProduct) {
                var productName = foundProduct['product-name'];
                var productPrice = foundProduct['product-price'];
                var productImageSrc = foundProduct['product-image'];
                
                // Lưu thông tin sản phẩm vào đối tượng view trong localStorage
                var view = {
                    "product-name": productName,
                    "product-price": productPrice,
                    "product-image": productImageSrc
                };
                localStorage.setItem("view", JSON.stringify(view));
    
                // Chuyển đến trang product_detail.html
                const productUrl = '../html/product_detail.html';
                window.location.href = productUrl;
            } else {
                // Nếu không tìm thấy sản phẩm, thông báo và không chuyển trang
                alert('Không tìm thấy sản phẩm!');
            }
        }
    });
    
    
    // Kiểm tra và khởi tạo đối tượng user trong localStorage
    if(localStorage.getItem('user') === null) {
        var user = {
            login: false
        };
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Lấy mảng từ localStorage
    var productList = JSON.parse(localStorage.getItem('cart'));

    // Đếm số lượng phần tử trong mảng
    var productCount = productList ? productList.length : 0;

    // Cập nhật nội dung của thẻ <span> với số lượng phần tử
    $('#productCountBadge').text(productCount);

    // Lấy trạng thái đăng nhập từ localStorage
    var user = JSON.parse(localStorage.getItem('user'));
    
    // Xử lý sự kiện click vào nút giỏ hàng
    $('#btnCart').click(function(event) {
        // Ngăn chặn hành vi mặc định của thẻ <a>
        event.preventDefault();

        console.log("Button clicked");
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (user && user.login) {
            // Nếu đã đăng nhập, chuyển hướng đến trang giỏ hàng
            window.location.href = "../html/cart.html";
        } else {
            // Nếu chưa đăng nhập, mở modal đăng nhập
            console.log("Opening login modal");
            $('#loginModal').modal('show');
        }
    });

    $("#searchButton").click(function() {
        var searchBox = $("#searchBox");
        if (searchBox.css("display") === "none") {
            searchBox.css("display", "block");
        } else {
            searchBox.css("display", "none");
        }
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
    $('#password').blur(function () {
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
        var password = $('#password').val();

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
    });

    // Xử lý khi nút "Login" được nhấn trên modal đăng nhập
    $('#btnLogin').click(function(event) {
        var username = $('#username').val();
        var password = $('#password').val();

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
                window.location.href = '../html/cart.html';
            }, 1000); // Chờ 1 giây (1000 mili giây)
        }
    });
})
