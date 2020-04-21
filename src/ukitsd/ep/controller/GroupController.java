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
import ukitsd.editing.connection.DBUtil;
import ukitsd.editing.contentservice.GroupServiceVersion4;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class GroupController
 */
public class GroupController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GroupController() {
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
		String evn=null;
		try{
			response.setContentType("text/html;charset=UTF-8");
			evn=request.getParameter("evn");
			if(evn==null)
				evn=request.getHeader("act");
			if(evn.equals("checkSingleOrGroupWord")){
//				checkSingleOrGroupWord(request, response);
			}else if(evn.equals("checkContinueId")){
//				checkContinueId(request, response);
			}else if(evn.equals("groupungroup")){
				groupungroup(request, response);
			}
		}catch(Exception e){
			
		}finally{
			evn=null;
		}
	}
	
//	protected void checkSingleOrGroupWord(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out = null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject=null;
//		JSONArray jsonArray=null;
//		boolean allSingle = true;
//		CommonService commonService = null;
//		Connection oConEp=null;
//		try{
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb=new StringBuilder();
//			commonService=new CommonService();
//			while((temp_ = br.readLine())!=null){
//				sb.append(temp_);
//			}
//			oConEp = ConnectionFactory.getConnectionEp();
////			commonService.getFcridOfWordFromFcridGroup(oConEp, arg1)
//			jsonObject = JSONObject.fromObject(sb.toString());
//			jsonArray = JSONArray.fromObject(jsonObject.get("fcrid"));
//			for(int i=0; i<jsonArray.size(); i++){
//				if(!commonService.checkSingleOrGroupWord(jsonArray.get(i).toString())){
//					allSingle=false;
//					break;
//				}
//				
//			}
//			out.print(allSingle);
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			out=null; reader.close(); reader=null; br.close(); br=null; sb.setLength(0); sb=null;
//			DBUtil.close(oConEp);
//		}
//	}
	
//	protected void checkContinueId(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out = null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject=null;
//		JSONArray jsonArray=null;
//		GroupService groupService = null;
//		Connection oConEp=null;
//		String fcrid[]=null;
//		try{
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb=new StringBuilder();
//			groupService=new GroupService();
//			while((temp_ = br.readLine())!=null){
//				sb.append(temp_);
//			}
//			oConEp = ConnectionFactory.getConnectionEp();
//			jsonObject = JSONObject.fromObject(sb.toString());
//			jsonArray = JSONArray.fromObject(jsonObject.get("fcrid"));
//			fcrid =new String[jsonArray.size()];
//			for(int i=0; i<jsonArray.size(); i++){
//				fcrid[i]=jsonArray.get(i).toString();
//			}
//			out.print(groupService.checkContinueId(oConEp, fcrid));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			out=null; reader.close(); reader=null; br.close(); br=null; sb.setLength(0); sb=null; fcrid=null;
//			DBUtil.close(oConEp);
//		}
//	}
	
	protected void groupungroup(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject=null;
		JSONArray jsonArray=null;
		String fcrid[]=null;
		UkitSDBean ukitSDBean=null;
		Connection oEpConn=null; Connection oMpConn=null; Connection oGenConn=null;
		Gson gson=null;
		try{
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb=new StringBuilder();
			gson = new Gson();
			while((temp_ = br.readLine())!=null){
				sb.append(temp_);
			}
			jsonObject = JSONObject.fromObject(sb.toString());
			jsonArray = JSONArray.fromObject(jsonObject.get("fcrid"));
			fcrid =new String[jsonArray.size()];
			for(int i=0; i<jsonArray.size(); i++){
				fcrid[i]=jsonArray.get(i).toString();
			}
			oEpConn=ConnectionFactory.getConnectionEp();
			oMpConn=ConnectionFactory.getConnectionItap();
			oGenConn=ConnectionFactory.getConnectionEp();
			oEpConn.setAutoCommit(false);  oMpConn.setAutoCommit(false); 
//			ukitSDBean=groupService.groupungroup(fcrid, oEpConn, oEphConn, oMpConn, 
//					jsonObject.getInt("iduser"), jsonObject.getInt("status"), jsonObject.getInt("flag"), oGenConn);
			ukitSDBean=new GroupServiceVersion4().groupungroup(fcrid, oEpConn, oMpConn, jsonObject.getInt("iduser"), jsonObject.getInt("flag"), oGenConn,
					" ", "<br>");
			oEpConn.commit(); oMpConn.commit();
			out.print(gson.toJson(ukitSDBean));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; reader.close(); reader=null; br.close(); br=null; sb.setLength(0); sb=null; fcrid=null;
			DBUtil.close(oEpConn); DBUtil.close(oMpConn); DBUtil.close(oGenConn);
		}
	}
}
