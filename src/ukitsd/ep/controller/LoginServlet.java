package ukitsd.ep.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import network.dhammakaya.fdnet.ItapSoapProxy;
import ukitsd.editing.bean.commonbean.UserBean;
import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.connection.DBUtil;
import ukitsd.editing.dao.RoleDAO;
import ukitsd.editing.service.UserService;
import ukitsd.exception.UkitSDBean;
import ukitsd.itapdb.service.ITAPUserService;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    	
//    Connection oConMp = SQLSERVERJDBC.getITAPConnection(); Connection oConEp = SQLSERVERJDBC.getEPConnection(); Connection oConEph =  SQLSERVERJDBC.getEPHConnection();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(false);
		PrintWriter out=response.getWriter();
		if (session!=null) {
		  out.print(true);
		}
		else {
			out.print(false);
		  //Session has expired - redirect to login.jsp
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	 
	    protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
	    	response.setContentType("text/html;charset=UTF-8");
	        String user = request.getParameter("user");
	        String password = request.getParameter("pwd");
	        System.out.println(password+" -> "+user);
	        UserService userService=new UserService();
	        UserBean userBean=null; 
	        UkitSDBean ukitSDBean=null;
	        HttpSession session=null;
	        RequestDispatcher rd=null;
	        PrintWriter out=null;
	        Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
	        ITAPUserService itapuserservice=null; ResultSet rs = null;Statement stmt=null;
	        String username=""; String iduser=""; String idrole="";
	        String passDb=null;
	        try{
				oConEp = ConnectionFactory.getConnectionEp();
				oConEph =ConnectionFactory.getConnectionEph();
				oConMp = ConnectionFactory.getConnectionItap();
				itapuserservice = new ITAPUserService();
				if(user!=null) {
					rs = itapuserservice.searchByFcusername(oConMp, stmt, user);	
				}					
				if(rs==null){
					if(request.getParameter("app").equals("ITAP")){
	    	            rd = getServletContext().getRequestDispatcher("/logout.html");
	    	            rd.include(request, response);
	        		}else{
	    	            rd = getServletContext().getRequestDispatcher("/login.html");
	    	            out= response.getWriter();
	    	            out.println("<font color=red>Either user name or password is wrong.</font>");
	    	            rd.include(request, response);
	        		}
				}else{
					password=new  ItapSoapProxy().passEncrypt(password);//encrypt
					System.out.println("password "+password);
					while(rs.next()){
						System.out.println("pwww "+rs.getString("FCPASSWORD"));
						passDb=rs.getString("FCPASSWORD");//fake
						username = rs.getString("FCUSERNAME");
						iduser = rs.getString("FCRID");
						idrole= rs.getString("FKITAPROLE").trim();
					}
					rs = new RoleDAO().searchAll(oConEp, stmt);
					if(rs==null){
						idrole="0";
					}else{
						while(rs.next()){
							System.out.println(idrole +" role "+rs.getString("fccode").trim());
							
							if(rs.getString("fccode").trim().equals(idrole)){
								idrole = rs.getString("id");
								break;
							}
						}
					}
//					if(rs.getString("FCPASSWORD").trim().equals(password.trim())){
					if(password.isEmpty()==false && idrole.equals("0")==false && passDb!=null){
						if(passDb.trim().equals(password.trim())){
							session = request.getSession();
		        			session.setAttribute("user", username);
		        			session.setAttribute("iduser", iduser);
		        			session.setAttribute("idrole", idrole);
		        			session.setAttribute("appname", request.getParameter("app"));
		        			session.setAttribute("key", Math.random());
		        			rd = getServletContext().getRequestDispatcher("/WEB-INF/menu.jsp");
		    	            rd.include(request, response);
						}else{
							 rd = getServletContext().getRequestDispatcher("/login.html");
			    	         out= response.getWriter();
			    	         out.println("<font color=red>Either user name or password is wrong.</font>");
			    	         rd.include(request, response);
						}
					}else{
						 rd = getServletContext().getRequestDispatcher("/login.html");
		    	         out= response.getWriter();
		    	         out.println("<font color=red>Either user name or password is wrong.</font>");
		    	         rd.include(request, response);
					}
				}
	        }catch(Exception e){
//	        	e.printStackTrace();
				 rd = getServletContext().getRequestDispatcher("/login.html");
    	         out= response.getWriter();
    	         out.println("<font color=red>"+e.getMessage()+"</font>");
    	         rd.include(request, response);
	        }finally{
	        	user=null; userService=null; userBean=null; session=null; rd=null;out=null;
	        	DBUtil.close(oConEp);
	        	DBUtil.close(oConEph);
	        	DBUtil.close(oConMp);
	        }

	    }

}


//package ukitsd.ep.controller;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.sql.Connection;
//
//import javax.servlet.RequestDispatcher;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//
//import ukitsd.editing.bean.commonbean.UserBean;
//import ukitsd.editing.connection.ConnectionFactory;
//import ukitsd.editing.connection.DBUtil;
//import ukitsd.editing.service.UserService;
//import ukitsd.exception.UkitSDBean;
//
//import com.google.gson.Gson;
//
///**
// * Servlet implementation class LoginServlet
// */
//public class LoginServlet extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//    	
////    Connection oConMp = SQLSERVERJDBC.getITAPConnection(); Connection oConEp = SQLSERVERJDBC.getEPConnection(); Connection oConEph =  SQLSERVERJDBC.getEPHConnection();
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
//    public LoginServlet() {
//        super();
//        // TODO Auto-generated constructor stub
//    }
//
//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.setContentType("text/html;charset=UTF-8");
//		HttpSession session = request.getSession(false);
//		PrintWriter out=response.getWriter();
//		if (session!=null) {
//		  out.print(true);
//		}
//		else {
//			out.print(false);
//		  //Session has expired - redirect to login.jsp
//		}
//	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
//	 
//	    protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
//	    	response.setContentType("text/html;charset=UTF-8");
//	        String user = request.getParameter("user");
//	        UserService userService=new UserService();
//	        UserBean userBean=null; 
//	        UkitSDBean ukitSDBean=null;
//	        HttpSession session=null;
//	        RequestDispatcher rd=null;
//	        PrintWriter out=null;
//	        Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
//	        try{
//				oConEp = ConnectionFactory.getConnectionEp();
//				oConEph =ConnectionFactory.getConnectionEph();
//				oConMp = ConnectionFactory.getConnectionItap();
//				System.out.println("user "+user);
//				if(user!=null)
//					ukitSDBean=userService.searchUserByFcrid(oConMp, oConEp, user);
////					userBean=userService.searchUserDetailFromMP(oConEp, oConEph, oConMp, user);
//				System.out.println(new Gson().toJson(ukitSDBean));
//	        	if(ukitSDBean!=null && ukitSDBean.getValue().equals("true")){
//	        		userBean=(UserBean) ukitSDBean.getObject();
//	        		if(userBean.getIduser()==Integer.parseInt(user)){
//	        			session = request.getSession();
//	        			session.setAttribute("user", userBean.getUsername());
//	        			session.setAttribute("iduser", userBean.getIduser());
//	        			session.setAttribute("idrole", userBean.getIdrole());
//	        			session.setAttribute("appname", request.getParameter("app"));
//	        			session.setAttribute("key", Math.random());
////	        			response.sendRedirect("WEB-INF/menu.html");
//	    	            rd = getServletContext().getRequestDispatcher("/WEB-INF/menu.jsp");
//	    	            rd.include(request, response);
//	        		}else{
//	    	            rd = getServletContext().getRequestDispatcher("/login.html");
//	    	            out= response.getWriter();
//	    	            out.println("<font color=red>Either user name or password is wrong.</font>");
//	    	            rd.include(request, response);
//	        		}
//	        	}else{
//	        		if(request.getParameter("app").equals("ITAP")){
//	    	            rd = getServletContext().getRequestDispatcher("/logout.html");
//	    	            rd.include(request, response);
//	        		}else{
//	    	            rd = getServletContext().getRequestDispatcher("/login.html");
//	    	            out= response.getWriter();
//	    	            out.println("<font color=red>Either user name or password is wrong.</font>");
//	    	            rd.include(request, response);
//	        		}
//
//	        	}
//	        }catch(Exception e){
//	        	e.printStackTrace();
//	        }finally{
//	        	user=null; userService=null; userBean=null; session=null; rd=null;out=null;
//	        	DBUtil.close(oConEp);
//	        	DBUtil.close(oConEph);
//	        	DBUtil.close(oConMp);
//	        }
////	        if(userID.equals(user) && password.equals(pwd)){
////	            HttpSession session = request.getSession();
////	            session.setAttribute("user", "Pankaj");
////	            //setting session to expiry in 30 mins
//////	            session.setMaxInactiveInterval(30*60);
//////	            Cookie userName = new Cookie("user", user);
//////	            userName.setMaxAge(30*60);
//////	            response.addCookie(userName);
////	            response.sendRedirect("menu.html");
////	        }else{
////	            RequestDispatcher rd = getServletContext().getRequestDispatcher("/login.html");
////	            PrintWriter out= response.getWriter();
////	            out.println("<font color=red>Either user name or password is wrong.</font>");
////	            rd.include(request, response);
////	        }
//	 
//	    }
//
//}
