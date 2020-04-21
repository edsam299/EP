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
import ukitsd.editing.connection.SQLCONNECT;
import ukitsd.editing.connection.SQLSERVERCONNECTION;
import ukitsd.editing.contentservice.ContentService;
import ukitsd.editing.menuservice.MenuService;
import ukitsd.editing.workloadservice.WorkLoadService;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class E1
 */
public class E1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public E1() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out=null;
		Gson gson = null;
		MenuService menuService=null;
		UkitSDBean ukitSDBean = null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph=null;
		String error=null;
		try{
			if(request.getParameter("act").equals("getXmlTree")){
				try{
					out = response.getWriter();
					gson = new Gson();
//					ePHeaderService = new EPHeaderService();
					menuService=new MenuService();
					oConEp = ConnectionFactory.getConnectionEp();
					oConMp = ConnectionFactory.getConnectionItap();
//					ukitSDBean=ePHeaderService.setXMLTree(oConMp, oConEp,"<br/>");
					ukitSDBean=menuService.getMenuTree(oConMp, oConEp,"<br/>", 1, 3);
					out.print(gson.toJson(ukitSDBean));
				}catch(Exception e){
					e.printStackTrace();
					out.print(error);
				}finally{
					out.close();
					out=null; gson=null; ukitSDBean = null;
					Util.closeConnection(oConMp);
					Util.closeConnection(oConEp);
				}
			}else if(request.getParameter("act").equals("getSection")){	
				try{
					out = response.getWriter();
					gson = new Gson();	        	
					oConEp = ConnectionFactory.getConnectionEp();
					oConMp = ConnectionFactory.getConnectionItap();
//					sectionOverViewBean=ePHeaderService.searchSectionOverviewGrid(request.getParameter("id"), oConMp, oConEp,"<br/>");
					
					out.print(gson.toJson(new ContentService().editing_sectiontable(oConMp, oConEp,"<br/>", request.getParameter("id"), "&nbsp;")));
				}catch(Exception e){
					e.printStackTrace();
					out.print(error);
				}finally{
					out.close();
					out=null; gson=null;
					Util.closeConnection(oConMp);
					Util.closeConnection(oConEp);
				}
			}else if(request.getParameter("act").equals("getRecentWork")){
//				List<RecentWorkGrid> recentWorkGrid = null;
//				RecentWorkService recentWorkService=null;
				try{
					out = response.getWriter();
					gson = new Gson();
					oConEp = ConnectionFactory.getConnectionEp();
					oConEph =ConnectionFactory.getConnectionEph();
//					recentWorkService = new RecentWorkService();
					new WorkLoadService().searchRecentWork(Integer.parseInt(request.getParameter("iduser")), oConEp, oConEph);
//					recentWorkGrid=recentWorkService.searchRecentWork(Integer.parseInt(request.getParameter("iduser")), oConEp, oConEph);
//					System.out.println("size: "+recentWorkGrid.size());
					out.print(gson.toJson(new WorkLoadService().searchRecentWork(Integer.parseInt(request.getParameter("iduser")), oConEp, oConEph)));
				}catch(Exception e){
					e.printStackTrace();
					out.print(error);
				}finally{
					out.close();
					out=null; gson=null;
					Util.closeConnection(oConEp);
					Util.closeConnection(oConEph);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{

		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
