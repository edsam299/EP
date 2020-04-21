package ukitsd.ep.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.menuservice.MenuService;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class Linking
 */
public class Linking extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Linking() {
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
			if(act.equals("getTreeMenu")){
				getTreeMenu(request, response);
			}else if(act.equals("importFile")){
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			act=null;
		}
	}
	
	protected void getTreeMenu(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Connection oEp=null; Connection oMp=null;
		try{
			oMp=ConnectionFactory.getConnectionItap(); oEp=ConnectionFactory.getConnectionEp();
			out=response.getWriter();
			out.print(new Gson().toJson(new MenuService().getMenuTree(oMp, oEp, "<br/>", 
					Integer.parseInt(request.getParameter("start")), Integer.parseInt(request.getParameter("end")))));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			Util.closeConnection(oMp); Util.closeConnection(oEp);
			out.close(); out=null;
		}
	}

}
