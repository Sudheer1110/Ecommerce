<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Order Details</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(to bottom, #4ecdc4, #556270);

    }
    .card {
        width: 80%;
        max-width: 600px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        padding: 20px;
    }
    h2 {
        text-align: center;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    th, td {
        border: 1px solid #dddddd;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
        text-align: left;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    tfoot {
        font-weight: bold;
    }
    tfoot td {
        background-color: #f2f2f2;
    }
    tfoot td:first-child {
        text-align: right;
    }
</style>
</head>
<body onload="loadOrderItems()">
    <div class="card">
        <h2>Order Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody id="orderItems">
                
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2"><strong>Order ID:</strong></td>
                    <td><span id="orderId"></span></td>
                </tr>
                <tr>
                    <td colspan="2"><strong>Total Fare:</strong></td>
                    <td><span id="totalFare"></span></td>
                </tr>
            </tfoot>
        </table>
    </div>
    <script>
        function loadOrderItems() {
            let dl={};
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var item = JSON.parse(value);
                dl[item.itemId]=item.quantity;
            }
            console.log(dl);
            $.ajax({
                url:"http://localhost:8080/Ecommerce/CheckOutServlet",
                method:'GET',
                data:{
                    "product_details":JSON.stringify(dl)
                },
                success: function(data) {
                    console.log("success")
                },
                error: function(xhr, status, error) {
                    console.log("Error: " + error);
                }
            })
        }

    </script>
</body>
</html>
