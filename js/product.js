$(document).ready(function() {
    // Kiểm tra và khởi tạo đối tượng user trong localStorage
    if(localStorage.getItem('user') === null) {
        var user = {
            login: false
        };
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Xử lý khi nhấp vào nút "Add to Cart"
    $('.btn.btn-primary.t-3').click(function(){
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        var user = JSON.parse(localStorage.getItem('user'));
        if(!user.login) {
            // Nếu người dùng chưa đăng nhập, hiển thị modal đăng nhập và không thực hiện thêm vào giỏ hàng
            $('#loginModal').modal('show');
            return;
        }

        // Nếu người dùng đã đăng nhập, tiếp tục thực hiện thêm vào giỏ hàng
        var productName = $(this).closest('.product-item').find('.product-name').text().trim();
        var productPrice = $(this).closest('.product-item').find('.product-price').text().trim();
        var productImage = $(this).closest('.product-item').find('.product-image').attr('src');

        // Kiểm tra xem localStorage có tồn tại giỏ hàng không
        var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        var existingProductIndex = cart.findIndex(function(item){
            return item.name === productName;
        });

        if(existingProductIndex !== -1){
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
            cart[existingProductIndex].quantity++;
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào danh sách
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        // Lưu thông tin giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật số lượng trên badge
        var totalQuantity = cart.length;
        $('.nav-btns .badge').text(totalQuantity);

        // Thông báo cho người dùng sản phẩm đã được thêm vào giỏ hàng
        alert(productName + " đã được thêm vào giỏ hàng!");

        // Hiển thị danh sách sản phẩm trong giỏ hàng ra console
        console.log("Danh sách sản phẩm trong giỏ hàng:");
        console.log(cart);
    });

    // Xử lý khi người dùng click vào ảnh sản phẩm
    $('.product-item .product-image').click(function() {
        // Lấy thông tin sản phẩm từ ảnh được click
        var productName = $(this).closest('.product-item').find('.product-name').text().trim();
        var productPrice = $(this).closest('.product-item').find('.product-price').text().trim();
        var productImage = $(this).attr('src');

        // Tạo đối tượng view chứa thông tin sản phẩm
        var view = {
            "product-name": productName,
            "product-price": productPrice,
            "product-image": productImage
        };

        // Lưu đối tượng view vào localStorage với key là "view"
        localStorage.setItem("view", JSON.stringify(view));
    });
});
