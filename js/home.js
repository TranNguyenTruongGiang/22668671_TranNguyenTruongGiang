$(document).ready(function(){
    // init Isotope
    var $grid = $('.collection-list').isotope({
    // options
    });
  // filter items on button click
  $('.filter-button-group').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    resetFilterBtns();
    $(this).addClass('active-filter-btn');
    $grid.isotope({ filter: filterValue });
  });

  var filterBtns = $('.filter-button-group').find('button');
  function resetFilterBtns(){
    filterBtns.each(function(){
        $(this).removeClass('active-filter-btn');
    });
  }

  $(".product-item").click(function() {
    // Lấy thông tin sản phẩm từ ảnh được click
    var productName = $(this).closest('.product-item').find('.product-name').text().trim();
    var productPrice = $(this).closest('.product-item').find('.product-price').text().trim();
    var productImage = $(this).closest('.product-item').find('.product-image').attr('src');
    
    // Tạo đối tượng view chứa thông tin sản phẩm
    var view = {
        "product-name": productName,
        "product-price": productPrice,
        "product-image": productImage
    };

    // Lưu đối tượng view vào localStorage với key là "view"
    localStorage.setItem("view", JSON.stringify(view));

    // var productName = $(this).find(".product-name").text();
    // var productPrice = $(this).find(".product-price").text();
    // var productImageSrc = $(this).find(".product-image").attr("src");
    
    // // Lưu thông tin sản phẩm vào localStorage
    // localStorage.setItem("productName", productName);
    // localStorage.setItem("productPrice", productPrice);
    // localStorage.setItem("productImageSrc", productImageSrc);
  });
})