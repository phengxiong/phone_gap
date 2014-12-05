$(document).ready(function () {

    var buy_form = $("#buy_form")
    buy_form.hide();

    //google map
    navigator.geolocation.getCurrentPosition(function (pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        console.log(lat + " : " + lng);
        $("#lat").text(lat);
        $("#lng").text(lng);

        var url = '<a href="http://maps.google.com/maps?daddr=Pizza+Hut,+2630+E+29th+Ave,+Spokane,+WA+99223&saddr=' + lat + ',' + lng + '">You are here!</a>';
        $("#url").html(url);

        var map = '<iframe src="https://www.google.com/maps/embed?pb=!1m27!1m12!1m3!1d42993.96368150064!2d-117.41149076113919!3d47.6626121289962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m12!1i0!3e6!4m3!3m2!1d' + lat + '!2d' + lng + '!4m5!1s0x549e225da8c55f81%3A0x23bb16360c284c5e!2sPizza+Hut%2C+2630+E+29th+Ave%2C+Spokane%2C+WA+99223!3m2!1d47.628018!2d-117.37275199999999!5e0!3m2!1sen!2sus!4v1416470616697"' + ' width="360" height="360" frameborder="0" style="border:0"></iframe>';
        $("#map").append(map);
    });


    var cart = [];

    function displayCart() {
        var cartDiv = $("#cartDiv");
        cartDiv.html("");
        var grand_total = 0;
        for (var item in cart) {
            var qty = cart[item].qty;
            var price = cart[item].price;
            var subtotal = qty * price;
            grand_total += subtotal;

            cartDiv.append('<p><span class="num ">x' + qty + '</span>&nbsp;&nbsp;&nbsp;' + '<span class="item">' + cart[item].name + '</span>' +
            '<span class="num">$' + subtotal.toFixed(2) + '</span></p>');
        }
        cartDiv.append('<p>Grand Total: $' + '<span class="num">' + grand_total.toFixed(2) + '</span>' + '</p>');
    }

    // add buy button for each product
    $("div[data-product]").each(function () {
        $(this).append("<button class='btnCart'>Add To Cart</button>");
    });

    $(".btnCart").on("click", function (event) {
        var pid = $(this).parent().data("product");
        console.log(pid);
        var obj = new Object();
        if (cart[pid]) {
            cart[pid].qty += 1;
        } else {
            cart[pid] = new Object();
            cart[pid].qty = 1;
            cart[pid].pid = pid;
            cart[pid].name = $(this).parent().children("span").data("name")
            cart[pid].price = $(this).parent().children("span").next().data("price");
        }
        displayCart();
    });

    $("#saveOrder").on("click", function (event) {
        var cartStr = "[";
        for (var item in cart) {
            cartStr += JSON.stringify(cart[item]) + ",";
        }
        cartStr = cartStr.slice(0, -1);
        cartStr += "]";
        console.log(cartStr);
        localStorage['cart'] = cartStr;
    });

    $("#loadOrder").on("click", function (event) {
        cart = [];
        var obj = JSON.parse(localStorage['cart']);
        for (item in obj) {
            pid = obj[item].pid;
            cart[pid] = obj[item];
        }
        displayCart();
    });

    $("#buy").on("click", function (event) {
        var buyUrl = "";

        for (var item in cart) {
            buyUrl += "&pid[]=" + item + "&qty[]" + cart[item].qty;
        }

        buy_form.show();

        console.log("http://cis217-4.phengxiong.com/buy.html?" + buyUrl);
    });

});