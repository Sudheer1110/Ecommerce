package Controllers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

import org.json.JSONObject;

import DAL.Contract;
import DAO.DAOBridge;
import Models.Products;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/AllProducts")
public class AllProducts extends HttpServlet {
	Connection con;
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		JSONObject ob = new JSONObject();
		Contract c = DAOBridge.getDalObj();
		int pg_no=Integer.parseInt(request.getParameter("page"));
		System.out.println(pg_no);
		try {
			ArrayList<Products> products = c.getProd(pg_no);
			ArrayList<String> catigories = c.getCat();
			ArrayList<ArrayList<String>> all = new ArrayList<>();

			for (Products it : products) {
				ArrayList<String> ls = new ArrayList<>();
				ls.add(it.getImgurl());
				ls.add(it.getProdname());
				ls.add(it.getPrice().toString());
				ls.add(String.valueOf(it.getPid()));
				all.add(ls);

			}

			ArrayList<String> lm = new ArrayList<>();
			for (String it : catigories) {
				lm.add(it);

			}
			ob.put("AllProducts", all);
			ob.put("Catigories", lm);

		} catch (SQLException e) {

			e.printStackTrace();
		}
		response.getWriter().write(ob.toString());
	}

}