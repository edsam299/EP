package ukitsd.ep.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.searchservice.CesearchService;
import ukitsd.util.Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class CESearchController
 */
public class CESearchController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CESearchController() {
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
			act=request.getParameter("act");
			if(act==null)
				act=request.getHeader("param");
			if(act.equals("getTexts2Search")){
				getTexts2Search(request, response);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			
		}
		
	}

	protected void getTexts2Search(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		PrintWriter out=null; Gson gson=null;
		Connection oMpConn=null; Connection oEPConn = null;
		try{
			out=response.getWriter();
			gson=new GsonBuilder().serializeNulls().create();
			oMpConn=ConnectionFactory.getConnectionItap();
			oEPConn=ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new CesearchService().getTexts2Search(oMpConn, oEPConn)));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			Util.closeConnection(oEPConn);
			Util.closeConnection(oMpConn);
		}
	}
}
