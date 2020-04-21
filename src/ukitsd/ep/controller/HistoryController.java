package ukitsd.ep.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.historyservice.E2HistoryService;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class History
 */
public class HistoryController extends HttpServlet {
	private static final long serialVersionUID = 1L;
//	Connection oConMp = SQLSERVERJDBC.getITAPConnection(); Connection oConEp = SQLSERVERJDBC.getEPConnection(); Connection oConEph =  SQLSERVERJDBC.getEPHConnection();   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HistoryController() {
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
		String act=request.getParameter("act");
		try{
			if(act.equals("searchFootnote")){
				searchFootnote(request, response);
			}else if(act.equals("searchEmendation")){
				searchEmendation(request, response);
			}else if(act.equals("searchComment")){
				searchComment(request, response);
			}else if(act.equals("searchUnit")){
				searchUnit(request, response);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			
		}
	}
	
	protected void searchFootnote(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null;
		try{
			out=response.getWriter();
			gson=new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
//			footnoteE2HistoryBean=history.searchFootnote(oConEp, oConEph, oConMp, Integer.parseInt(request.getParameter("idh")),
//					Integer.parseInt(request.getParameter("idunit")), request.getSession().getAttribute("iduser").toString(), "<br/>", "&nbsp;");
			out.print(gson.toJson(new E2HistoryService().searchFootnote(oConMp, oConEp, Integer.parseInt(request.getParameter("idh")), Integer.parseInt(request.getParameter("idunit")),
					Integer.parseInt(request.getSession().getAttribute("iduser").toString()), "<br/>", "&nbsp;")));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; gson=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
		}
	}
	
	protected void searchEmendation(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null;
		try{
			out=response.getWriter();
			gson=new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
//			emendationE2HistoryBean=history.searchEmendation(oConEp, oConEph, oConMp, Integer.parseInt(request.getParameter("idh")),
//					Integer.parseInt(request.getParameter("idunit")), request.getSession().getAttribute("iduser").toString(), "<br/>", "&nbsp;");
			out.print(gson.toJson(new E2HistoryService().searchEmendation(oConMp, oConEp, Integer.parseInt(request.getParameter("idh")), Integer.parseInt(request.getParameter("idunit")),
					Integer.parseInt(request.getSession().getAttribute("iduser").toString()), "<br/>", "&nbsp;")));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; gson=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
		}
	}
	
	protected void searchComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null;
		try{
			out=response.getWriter();
			gson=new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
//			commentE2HistoryBean=history.searchComment(oConEp, oConEph, oConMp, Integer.parseInt(request.getParameter("idh")),
//					Integer.parseInt(request.getParameter("idunit")), request.getSession().getAttribute("iduser").toString(), "<br/>", "&nbsp;");
			out.print(gson.toJson(new E2HistoryService().searchComment(oConMp, oConEp, Integer.parseInt(request.getParameter("idh")), Integer.parseInt(request.getParameter("idunit")),
					Integer.parseInt(request.getSession().getAttribute("iduser").toString()), "<br/>", "&nbsp;")));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; gson=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);

		}
	}
	
	protected void searchUnit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
//		HistoryE2Service history=null;
		PrintWriter out=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		try{
			out=response.getWriter();
//			history=new HistoryE2Service();
			gson=new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			unitE2HistoryBean=history.searchUnit(oConEp, oConEph, oConMp, Integer.parseInt(request.getParameter("idh")),
//					Integer.parseInt(request.getParameter("idunit")), request.getSession().getAttribute("iduser").toString(), "<br/>", "&nbsp;");
//			new E2HistoryService().searchUnit(oConMp, oConEp, Integer.parseInt(request.getSession().getAttribute("iduser").toString()),
//					Integer.parseInt(request.getParameter("idh")), Integer.parseInt(request.getParameter("idunit")), "<br/>", "&nbsp;");
//			new E2HistoryService();
			out.print(gson.toJson(new E2HistoryService().searchUnit(oConMp, oConEp, Integer.parseInt(request.getSession().getAttribute("iduser").toString()),
					Integer.parseInt(request.getParameter("idh")), Integer.parseInt(request.getParameter("idunit")), "<br/>", "&nbsp;")));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; gson=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
}
