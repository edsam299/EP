package ukitsd.ep.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.contentservice.ResetService;
import ukitsd.editing.contentservice.SynopticServiceVersion3;
import ukitsd.editing.menuservice.MenuService;
import ukitsd.editing.service.CommonService;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class Tool
 */
public class Tool extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Tool() {
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
		if(act==null)
			act=request.getHeader("param");
		response.setContentType("text/html;charset=UTF-8");
		try{
			if(act.equals("setXMLTreeH1toH4")){
				setXMLTreeH1toH4(request, response);
			}else if(act.equals("searchAllUnitByH4")){
				searchAllUnitByH4(request, response);
			}else if(act.equals("searchLineGridBean")){
				searchLineGridBean(request, response);
			}else if(act.equals("searchSynopticLabel")){
				searchSynopticLabel(request, response);
			}else if(act.equals("getPicturePath")){
				getPicturePath(request, response);
			}else if(act.equals("searchLine")){
				searchLine(request, response);
			}else if(act.equals("searchFinaltext")){
				searchFinaltext(request, response);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			act=null;
		}
	}
	
	protected void setXMLTreeH1toH4(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
//		EPHeaderService ePHeaderService=null;
		Connection oConMp = null; Connection oConEp = null;
		try{
			out = response.getWriter();
			gson = new Gson();
//			ePHeaderService = new EPHeaderService();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
//			ukitSDBean=ePHeaderService.setXMLTreeH1toH4(oConMp, oConEp,"<br/>");
			out.print(gson.toJson(new MenuService().getMenuTree(oConMp, oConEp, "<br/>", 1, 4)));
		}catch(Exception e){
			e.printStackTrace();
			out.print(e.getMessage());
		}finally{
			out.close();
			out=null; gson=null; 
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
		}
	}
	
	protected void searchAllUnitByH4(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
//		SynopticService synopticService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph=null;
		try{
			out = response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
			out.print(gson.toJson(new SynopticServiceVersion3().searchAllUnitBySection(oConEp, oConEph, oConMp, request.getParameter("h4"))));			
		}catch(Exception e){
			e.printStackTrace();
			out.print(e.getMessage());
		}finally{
			out.close();
			out=null; gson=null; 
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	protected void searchLineGridBean(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		GsonBuilder gson=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph=null;
		try{
			out = response.getWriter();
			gson = new GsonBuilder();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			synopticLineGridBean=synopticService.searchLineGridBean(oConEp, oConEph, oConMp, Integer.parseInt(request.getParameter("unitno"))
//					, request.getParameter("fcedition"));
			
			out.print(gson.setDateFormat("dd-MM-yyyy HH:mm:ss").create().toJson(new SynopticServiceVersion3().searchLineGridBean(oConEp, oConEph, oConMp, 
					request.getParameter("fcedition"), Integer.parseInt(request.getParameter("unitno")))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(e.getMessage());
		}finally{
			out.close();
			out=null; gson=null; 
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	protected void searchSynopticLabel(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
//		SynopticService synopticService=null;
		Connection oConMp = null; Connection oConEp = null;
		try{		        
			out = response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
//			synopticService = new SynopticService();
//			ukitSDBean = synopticService.searchSynopticLabel(oConEp, oConEp,
//					oConMp, "<br/>", "&nbsp;", request.getParameter("fcedition"), Integer.parseInt(request.getParameter("unitno")), Integer.parseInt(request.getParameter("lineno"))
//					, Integer.parseInt(request.getParameter("idh")));
			
			out.print(gson.toJson(new SynopticServiceVersion3().searchSynopticLabel(oConEp, oConEp,
					oConMp, "<br/>", "", request.getParameter("fcedition"), Integer.parseInt(request.getParameter("unitno")),
					Integer.parseInt(request.getParameter("lineno")), Integer.parseInt(request.getParameter("idh"))
					,Integer.parseInt(request.getParameter("endline")))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(e.getMessage());
		}finally{
			out.close();
			out=null; gson=null; 
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
		}
	}
	
	protected void getPicturePath(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		String path=null;
		Connection oConEp = null; Statement stmt=null; ResultSet rs=null;
		try{		        
			out = response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new CommonService().getPictureServer(oConEp, stmt, rs)));
		}catch(Exception e){
			e.printStackTrace();
			out.print(path);
		}finally{
			out.close();
			out=null; gson=null; 
			Util.closeConnection(oConEp);
			if(stmt!=null){
				try {
					stmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(rs!=null){
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
	
	protected void searchLine(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		JSONObject jsonObject=null;
		try{
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();		
			temp_="";
			while((temp_ = br.readLine()) != null){
				sb.append(temp_);
			}	
			jsonObject=JSONObject.fromObject(sb.toString());
			gson=new GsonBuilder().serializeNulls();
			oConEp=ConnectionFactory.getConnectionEp();
			out.print(gson.create().toJson(new SynopticServiceVersion3().searchLine(oConEp, jsonObject.getString("fcrid"))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; gson=null; ukitSDBean=null;
			reader.close(); br.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null;
			Util.closeConnection(oConEp);
		}	
	}
	protected void searchFinaltext(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		JSONObject jsonObject=null;
		try{
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();		
			temp_="";
			while((temp_ = br.readLine()) != null){
				sb.append(temp_);
			}	
			jsonObject=JSONObject.fromObject(sb.toString());
			gson=new GsonBuilder().serializeNulls();
			oConEp=ConnectionFactory.getConnectionEp();
			oConMp=ConnectionFactory.getConnectionItap();			
			out.print(gson.create().toJson(new SynopticServiceVersion3().searchFinalText(oConMp, oConEp, jsonObject.getString("picturename"))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; gson=null; ukitSDBean=null;
			reader.close(); br.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConMp);
		}	
	}
}
