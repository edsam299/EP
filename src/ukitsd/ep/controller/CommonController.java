package ukitsd.ep.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.service.CommonService;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class CommonController
 */
public class CommonController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CommonController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String act=null;
		try{
			response.setContentType("text/html;charset=UTF-8");
			act=request.getParameter("param");
			if(act==null)
				act=request.getHeader("param");
			if(act.equals("searchAllMessage")){
				searchAllMessage(request, response);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			act=null;
		}
	}
	
	protected void searchAllMessage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConEp = null;
		try{
			response.setContentType("text/html;charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();	
			out.print(gson.toJson(new CommonService().searchSystemMessage(oConEp, 7)));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; gson=null;
			Util.closeConnection(oConEp);
		}
	}

	
	

}
