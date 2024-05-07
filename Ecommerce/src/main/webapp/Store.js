let a=5;


// $(document).ready(function(){
//         $.ajax({
//             url: 'http://localhost:8080/Ecommerce/AllProducts',
//             method: 'GET',
//             success: function(data) {
//                 $('#items').empty();
//                 $.each(data.AllProducts, function(ind, ele) {
//                     var item = '<div class="item-card" id="' + ele[3] + '">' +
//                     '<img src="images/' + ele[0] + '" alt="Item">' +
//                     '<h4>' + ele[1] + '</h4>' +
//                     '<p>' + ele[2] + '</p>' +
//                     '<button>Add to Cart</button>' +
//                     '</div>';
//                     $('#items').append(item);
//                 });
//                 $.each(data.Catigories, function(ind, ele1) {
//                     var item1 = '<option value="'+(a++).toString()+'">'+ele1+'</option>';
//                     $('#category').append(item1);
//                 });
//             },
//             error: function(xhr, status, error) {
//                 console.log("Error: " + error);
//             }
//  	       });
// })

$(document).ready(function(){
    $('#category').change(function(){
        var selectedVal=$(this).val();
        $.ajax({
            url:"http://localhost:8080/Ecommerce/CategoryServlet?cat="+selectedVal,
            method:'GET',
            success: function(data) {
                $('#items').empty();
                try {
                    data = JSON.parse(data);
                    $.each(data.AllProducts, function(ind, ele) {
                        var item = '<div class="item-card" id="' + ele[3] + '">' +
                                        '<img src="images/' + ele[0] + '" alt="Item">' +
                                        '<h4>' + ele[1] + '</h4>' +
                                        '<p>' + ele[2] + '</p>' +
                                        '<button>Add to Cart</button>' +
                                        '</div>';
                        $('#items').append(item);
                    });
                } catch (e) {
                    console.log("Error parsing JSON: " + e);
                }

            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
            }
        })
    })
})

$(document).ready(function() {
    $('#items').on('click', '.item-card button', function() {
        var itemCard = $(this).closest('.item-card');
        var imageSrc = itemCard.find('img').attr('src');
        var itemName = itemCard.find('h4').text();
        var itemDescription = itemCard.find('p').text();
        var itemId = itemCard.attr('id');
        console.log(itemId)
        var itemData = {
            itemId: itemId,
            imageSrc: imageSrc,
            itemName: itemName,
            itemDescription: itemDescription,
            quantity: 1 
        };

        console.log("data"+itemData)

        var existingItemDataJSON = localStorage.getItem(itemName);
        console.log("eidj"+existingItemData)
        if (existingItemDataJSON) {
            var existingItemData = JSON.parse(existingItemDataJSON);
            console.log("eid"+existingItemData)
            existingItemData.quantity++;
            itemData = existingItemData;
        }

        var itemDataJSON = JSON.stringify(itemData);

        console.log("dataobj"+itemDataJSON)

        localStorage.setItem(itemName, itemDataJSON);

        alert('Item added to cart successfully!');
    });
});

$(document).ready(function() {
    $("#pageList li").click(function() {
        var pgno = $(this).text();
        goToPage(pgno);
    });
});

function goToPage(pgno) {
    console.log(pgno)
    // Make AJAX call to servlet
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/Ecommerce/AllProducts",
        data: { page: pgno },
        success: function(data) {
            $('#items').empty();
            console.log(data);
            console.log(typeof data);
            data = JSON.parse(data);
            $.each(data.AllProducts, function(ind, ele) {
                var item = '<div class="item-card" id="' + ele[3] + '">' +
                '<img src="images/' + ele[0] + '" alt="Item">' +
                '<h4>' + ele[1] + '</h4>' +
                '<p>' + ele[2] + '</p>' +
                '<button>Add to Cart</button>' +
                '</div>';
                console.log(item);
                console.log(ele);
                $('#items').append(item);
            });
            $.each(data.Catigories, function(ind, ele1) {
                var item1 = '<option value="'+(a++).toString()+'">'+ele1+'</option>';
                $('#category').append(item1);
            });
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        }
    });
}









