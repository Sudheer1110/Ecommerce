package Controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import org.json.JSONObject;

import BLL.CalFare;
import DAL.Contract;
import DAO.DAOBridge;
import Models.CartProductDetails;
import Models.OrderDetails;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/CheckOutServlet")
public class CheckoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String al = request.getParameter("product_details");
		JSONObject ob = new JSONObject(al);
		Contract c = DAOBridge.getDalObj();
		HashMap<Integer, Integer> idqu = new HashMap<>();
		for (String key : ob.keySet()) {
			idqu.put(Integer.parseInt(key), ob.getInt(key));
		}
		ArrayList<CartProductDetails> cpd = null;
		try {
			cpd = c.getCartProd(idqu);
		} catch (Exception e) {
			e.printStackTrace();
		}
		double orderAmount = new CalFare().caluclateAmount(cpd);
		OrderDetails o = c.createOrder(orderAmount);
		c.createOrderProducts(cpd, o);

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}