package ukitsd.ep.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.contentservice.ContentService;
import ukitsd.editing.saveservice.E2SaveService;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class Footnote
 */
public class Footnote extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Footnote() {
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
			if(act.equals("searchFootnoteByFcrid")){
				searchFootnoteByFcrid(request, response);
			}else if(act.equals("showFootnote")){
				showFootnote(request, response);
			}else if(act.equals("deleteFootnote")){
				deleteFootnote(request, response);
			}else if(act.equals("favorites")){
				favorites(request, response);
			}else if(act.equals("saveFootnote")){
				saveFootnote(request, response);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			act=null;
		}
	}
	
	protected void searchFootnoteByFcrid(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
//		UkitSDBean ukitSDBean=null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			ukitSDBean=footnoteService.searchFootnoteByFcrid(oConEp, oConEph, oConMp, request.getParameter("fcrid"));
//			System.out.println(new ContentService().searchFootnoteByFcrid(oConEp, request.getParameter("fcrid"), Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage"))).getDescription());
//			ukitSDBean=new ContentService().searchFootnoteByFcrid(oConEp, request.getParameter("fcrid"), Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage")));
//			if(ukitSDBean!=null){
//				if(ukitSDBean.getValue().equals("true")){
//					System.out.println(ukitSDBean.getDescription());
////					ukitSDBean.setDescription(ukitSDBean.getDescription().replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
//				}
//			}
//			
			out.print(gson.toJson(new ContentService().searchFootnoteByFcrid(oConEp, request.getParameter("fcrid"), Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage")))));
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

	protected void showFootnote(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		String footnote=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
//			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			footnote=footnoteService.showFootnote(oConEp, oConEph, oConMp, request.getParameter("fcrid"), 
//					Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage")));
//			out.print(gson.toJson(footnote));
			out.print(gson.toJson(new ContentService().showFootnote(oConMp, oConEp, request.getParameter("fcrid"), 
					Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage")))));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; gson=null;  footnote=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	protected void deleteFootnote(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null; UkitSDBean ukitSDBean=null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
			ukitSDBean=new ContentService().deleteFootnote(oConMp, oConEp, request.getParameter("fcrid"), Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage")));
			if(ukitSDBean.getValue().equals("true")){
				out.print(gson.toJson(true));
			}else{
				out.print(gson.toJson(false));
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; gson=null;  ukitSDBean=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	protected void favorites(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			if(interestingWordService.saveInterestingWord(oConEp, oConEph, oConMp, request.getParameter("fcrid"), Integer.parseInt(request.getParameter("iduser")))){
//				out.print(gson.toJson(true));
//			}else{
//				out.print(gson.toJson(false));
//			}
			out.print(gson.toJson(new ContentService().saveInterestingWord(oConEp, request.getParameter("fcrid"),  
					Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage")))));
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
	
	protected void saveFootnote(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;
		int iduser=0; String fcrid=null; String ft=null;
		Gson gson=null;
		Connection oConEp = null;

		try{
			response.setContentType("text/html;charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();		
			temp_="";
			while((temp_ = br.readLine()) != null){
				sb.append(temp_);
			}	
			jsonArray=JSONArray.fromObject(sb.toString());
			for(int i=0; i<jsonArray.size(); i++){
				jsonObject = JSONObject.fromObject(jsonArray.get(i));			
				iduser=jsonObject.getInt("iduser");
				fcrid=jsonObject.getString("fcrid");
				System.out.println(jsonObject.getString("ft"));
				ft=jsonObject.getString("ft").replace("<div>", "<br>").replace("</div>", "");
			}
//			System.out.println(ft);
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new E2SaveService().saveFootnote(oConEp, ft, fcrid, iduser)));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null; gson=null;
			fcrid=null; ft=null;
			Util.closeConnection(oConEp);
		}
	}
}
