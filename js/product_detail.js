$(document).ready(function() {
    // Lấy mảng stock từ Local Storage
    const stock = JSON.parse(localStorage.getItem('stock')) || [];

    // Lấy danh sách các phần tử sản phẩm trong HTML
    const otherProductItems = document.querySelectorAll('#other .product-item');

    // Tạo một mảng con chứa các chỉ số ngẫu nhiên từ 0 đến độ dài của mảng stock
    const randomIndexes = [];
    while (randomIndexes.length < otherProductItems.length) {
        const randomIndex = Math.floor(Math.random() * stock.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    // Thực hiện việc gán thông tin từ stock vào các phần tử HTML của Other products
    randomIndexes.forEach((randomIndex, index) => {
        const product = stock[randomIndex];
        const productItem = otherProductItems[index];
        const productImageElement = productItem.querySelector('.product-image');
        const productNameElement = productItem.querySelector('.product-name');
        const productPriceElement = productItem.querySelector('.product-price');

        if (product) {
            productImageElement.src = product['product-image'];
            productNameElement.textContent = product['product-name'];
            productPriceElement.textContent = product['product-price'];
        }
    });

    // Lấy thông tin sản phẩm từ đối tượng view trong localStorage
    var view = JSON.parse(localStorage.getItem("view"));
    if (view) {
        var productName = view["product-name"];
        var productPrice = view["product-price"];
        var productImageSrc = view["product-image"];

        // Hiển thị thông tin sản phẩm
        displayProductDetail(productName, productPrice, productImageSrc);

        document.title = productName;
    }

    function displayProductDetail(name, price, imageSrc) {
        $("#product-name").text(name);
        $("#product-price").text(price);
        $("#product-image").attr("src", imageSrc);
    }

    $(".product-item").click(function() {
        var productName = $(this).find(".product-name").text();
        var productPrice = $(this).find(".product-price").text();
        var productImageSrc = $(this).find(".product-image").attr("src");
        
        // Lưu thông tin sản phẩm vào đối tượng view trong localStorage
        var view = {
            "product-name": productName,
            "product-price": productPrice,
            "product-image": productImageSrc
        };
        localStorage.setItem("view", JSON.stringify(view));
    });
    var user = JSON.parse(localStorage.getItem('user'));

    $('#btnBuyNow').click(function(event) {
        // var cart

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
});
