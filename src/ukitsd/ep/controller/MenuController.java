package ukitsd.ep.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.menuservice.MenuManagementService;
import ukitsd.editing.service.UserService;
import ukitsd.editing.ui.table.PageBean;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

/**
 * Servlet implementation class MenuController
 */
public class MenuController extends HttpServlet {
	private static final long serialVersionUID = 1L;
//	 Connection oConMp = SQLSERVERJDBC.getITAPConnection(); Connection oConEp = SQLSERVERJDBC.getEPConnection(); Connection oConEph =  SQLSERVERJDBC.getEPHConnection();
	private boolean permision=false;
	private boolean permissionPage=false;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MenuController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String operation = request.getParameter("operation");
		String address=null;
		PrintWriter out=null;
		RequestDispatcher dispatcher=null;
		String error_message="<font color=red>You not have permission {message}.</font>";
		response.setContentType("text/html;charset=UTF-8");
		try{
			if (operation == null)
				operation = "unknown";
			this.checkMenuByIdRole(request, response);			
			if(permision){
				if(request.getParameter("page_id")==null)
					permissionPage=true;// call main menu
				else
					this.checkPageByIdRole(request, response);
				if(permissionPage){
					System.out.println("operation "+operation);
					if (operation.equals("Editing")) {					
						address = "/WEB-INF/e1.jsp";												
					}else if (operation.equals("E2")) {
						address = "/WEB-INF/e2_new.jsp";
					}else if (operation.equals("Tools")) {
						address = "/WEB-INF/tools.jsp";
					}else if (operation.equals("Synoptic View")) {
						address = "/WEB-INF/synoptic.jsp";
					}else if (operation.equals("Manage Menu")) {
						address = "/WEB-INF/managemenu.jsp";
					}else if (operation.equals("Main Menu")){
						address = "/WEB-INF/menu.jsp";
					}else if (operation.equals("Rearrange")){
						address = "/WEB-INF/rearrange.jsp";
					}else if (operation.equals("Linking")){
						address = "/WEB-INF/linking_new.jsp";
					}else if(operation.equals("Approve Linking")){
						address = "/WEB-INF/approvelinking.jsp";
					}else if(operation.equals("Proofing")){
						address = "/WEB-INF/proofing.jsp";
					}else if(operation.equals("Reports")){
						address = "/WEB-INF/report.jsp";
					}else if(operation.equals("CESearch")){
						address = "/WEB-INF/cesearch.jsp";
					}else if(operation.equals("ReportWord")){
						address = "/WEB-INF/reportword.jsp";
					}else{
						address = "/WEB-INF/UnknownOperation.jsp";
					}
				}else{
					address = "/WEB-INF/permission.jsp";
					request.setAttribute("premission", "<b>No permission to this page. Please contract the admiistrator.<b>");
				}
			}else
				address = "/WEB-INF/menu.jsp";
			if(permision){
				dispatcher = request.getRequestDispatcher(address);
				dispatcher.forward(request, response);
			}else{
				dispatcher = getServletContext().getRequestDispatcher(address);
	            out= response.getWriter();
	            out.println(error_message.replace("{message}", operation));
	            dispatcher.include(request, response);
			}				
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(out!=null){
				out.close(); out=null;
			}
			operation=null; dispatcher=null; address=null;					
		}
		
	}

	@SuppressWarnings("unchecked")
	protected void checkPageByIdRole(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		List<PageBean> pageBean=null;
		MenuManagementService menuManagementService=null;
		permissionPage=false;
		UkitSDBean ukitSDBean=null;
		try{
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
			menuManagementService = new MenuManagementService();
			ukitSDBean=menuManagementService.searchPageByIdRoleIdMenu(oConEp, Integer.parseInt(request.getSession().getAttribute("idrole").toString())
					, Integer.parseInt(request.getParameter("id")));
//			System.out.println("idpage: "+request.getParameter("page_id"));
//			System.out.println(new Gson().toJson(pageBean)+" pageBean");
			if(ukitSDBean!=null){
				pageBean=(List<PageBean>) ukitSDBean.getData();
				for(PageBean page:pageBean){
					if(page.getStatus()==1 && page.getId()==Integer.parseInt(request.getParameter("page_id"))){
						permissionPage=true;	
						break;
					}						
				}
			}
//			System.out.println("permissionPage "+permissionPage);
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			pageBean=null; menuManagementService=null; ukitSDBean=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
		
	}
	
	protected void checkMenuByIdRole(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UserService userService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		UkitSDBean ukitSDBean=null;
		try{
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
			userService=new UserService();
			ukitSDBean=userService.checkMenuPermissionByIdRole(oConMp, oConEp, Integer.parseInt(request.getSession().getAttribute("idrole").toString())
					, Integer.parseInt(request.getParameter("id")));
			permision=Boolean.parseBoolean(ukitSDBean.getValue());
//			permision=userService.checkMenuByIdRole(oConEp, oConEph, oConMp,
//					Integer.parseInt(request.getSession().getAttribute("idrole").toString()),
//					Integer.parseInt(request.getParameter("id")));						 
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			userService=null; ukitSDBean=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
