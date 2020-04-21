//package ukitsd.ep.controller;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.PrintWriter;
//import java.sql.Connection;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import net.sf.json.JSONArray;
//import net.sf.json.JSONObject;
//import ukitsd.common.UkitSDBean;
//import ukitsd.editing.connection.ConnectionFactory;
//import ukitsd.editing.connection.DBUtil;
//import ukitsd.editing.contentservice.RearrangeServiceVersion3;
//import ukitsd.editing.saveservice.E2SubmitService;
//import ukitsd.ep.service.EPHeaderService;
//import ukitsd.ep.service.RearrangeService;
//import ukitsd.ep.service.SubmitService;
//import ukitsd.util.Util;
//
//import com.google.gson.Gson;
//
///**
// * Servlet implementation class Rearrange
// */
//public class Rearrange extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//       
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
//    public Rearrange() {
//        super();
//        // TODO Auto-generated constructor stub
//    }
//
//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		processRequest(request, response);
//	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		processRequest(request, response);
//	}
//	
//	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		String act=null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			act=request.getParameter("act");
//			if(act==null)
//				act=request.getHeader("act");
//			if(act.equals("getMainContent")){
//				getMainContent(request, response);
//			}else if(act.equals("searchLatestUser")){
//				searchLatestUser(request, response);
//			}else if(act.equals("compareRearrange")){
//				compareRearrange(request, response);
//			}else if(act.equals("confirmSubmit")){
//				confirmSubmit(request, response);
//			}else if(act.equals("unlock")){
//				unlock(request, response);
//			}else if(act.equals("save")){
//				save(request, response);
//			}else if(act.equals("searchSectionOverviewGrid")){
//				searchSectionOverviewGrid(request, response);
//			}else if(act.equals("searchUnitByH4")){
//				searchUnitByH4(request, response);
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//	}
//	
//	protected void getMainContent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONArray jsonArray = null;
//		JSONObject jsonObject = null;
//		int idh=0;
//		int unitno=0; int flag=0;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonArray=JSONArray.fromObject(sb.toString());
//			for(int i=0; i<jsonArray.size(); i++){
//				jsonObject = JSONObject.fromObject(jsonArray.get(i));			
//				idh=jsonObject.getInt("idh");
//				unitno=jsonObject.getInt("unitno");
//				flag=jsonObject.getInt("flag");
//			}
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			System.out.println("ue : "+new RearrangeServiceVersion3().getMainContent(oConMp, oConEp, idh, unitno, "<br>", "&nbsp;",flag).getDescription());
//			out.print(gson.toJson(new RearrangeServiceVersion3().getMainContent(oConMp, oConEp, idh, unitno, "<br>", "&nbsp;",flag)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null; gson=null;
//			DBUtil.close(oConEp);
//			DBUtil.close(oConMp);
//		}
//	}
//
//	protected void compareRearrange(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONArray jsonArray = null;
//		JSONObject jsonObject = null;
//		int idh=0; String ft=null;
//		int unitno=0; int flag=0;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonArray=JSONArray.fromObject(sb.toString());
//			for(int i=0; i<jsonArray.size(); i++){
//				jsonObject = JSONObject.fromObject(jsonArray.get(i));			
//				unitno=jsonObject.getInt("unitno");
//				idh=jsonObject.getInt("idh");
//				ft=jsonObject.getString("ft").replace("<div>", "<br>").replace("</div>", "");
//				flag=jsonObject.getInt("flag");
//			}
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			out.print(gson.toJson(new RearrangeServiceVersion3().compareRearrange(oConMp, oConEp, idh, unitno, "<br>", "&nbsp;", ft,flag)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null;
//			gson=null; ft=null;
//			DBUtil.close(oConEp);
//			DBUtil.close(oConMp);
//		}
//	}
//	
//	protected void searchLatestUser(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONArray jsonArray = null;
//		JSONObject jsonObject = null;
//		int idh=0; int unitno=0;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonArray=JSONArray.fromObject(sb.toString());
//			for(int i=0; i<jsonArray.size(); i++){
//				jsonObject = JSONObject.fromObject(jsonArray.get(i));			
//				idh=jsonObject.getInt("idh");
//				unitno=jsonObject.getInt("unitno");
//			}
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			out.print(gson.toJson(new E2SubmitService().searchLatestUser(oConMp, oConEp, idh, unitno)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null;
//			gson=null;
//			DBUtil.close(oConEp);
//			DBUtil.close(oConMp);
//		}
//	}
//	
//	protected void confirmSubmit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONArray jsonArray = null;
//		JSONObject jsonObject = null;
//		int idh=0; String ft=null; String word=null;
//		int unitno=0; int idpage=0; int iduser=0;
//		Gson gson=null;
//		Connection oConEp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonArray=JSONArray.fromObject(sb.toString());
//			for(int i=0; i<jsonArray.size(); i++){
//				jsonObject = JSONObject.fromObject(jsonArray.get(i));			
//				unitno=jsonObject.getInt("unitno");
//				idh=jsonObject.getInt("idh");
//				ft=jsonObject.getString("ft");
//				word=jsonObject.getString("word");
//				iduser=jsonObject.getInt("iduser");
//				idpage=jsonObject.getInt("idpage");
//			}
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			out.print(gson.toJson(new RearrangeServiceVersion3().confirmSubmit(oConEp, ft, idh, unitno, iduser, idpage, "<br>", "&nbsp;",word)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null; word=null;
//			gson=null; ft=null;
//			DBUtil.close(oConEp);
//		}
//	}
//	
//	protected void unlock(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONArray jsonArray = null;
//		JSONObject jsonObject = null;
//		int idh=0; int unitno=0;
//		Gson gson=null;
//		Connection oConEp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonArray=JSONArray.fromObject(sb.toString());
//			for(int i=0; i<jsonArray.size(); i++){
//				jsonObject = JSONObject.fromObject(jsonArray.get(i));			
//				unitno=jsonObject.getInt("unitno");
//				idh=jsonObject.getInt("idh");
//			}
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();	
//			out.print(gson.toJson(new RearrangeServiceVersion3().unlock(oConEp, idh, unitno)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null;
//			DBUtil.close(oConEp);
//		}
//	}
//
//	protected void save(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONArray jsonArray = null;
//		JSONObject jsonObject = null;
//		int idh=0; String ft=null;
//		int unitno=0; int iduser=0;
//		Gson gson=null;
//		Connection oConEp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonArray=JSONArray.fromObject(sb.toString());
//			for(int i=0; i<jsonArray.size(); i++){
//				jsonObject = JSONObject.fromObject(jsonArray.get(i));			
//				unitno=jsonObject.getInt("unitno");
//				idh=jsonObject.getInt("idh");
//				ft=jsonObject.getString("ft");
//				iduser=jsonObject.getInt("iduser");
//			}
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();	
//			out.print(gson.toJson(new RearrangeServiceVersion3().saveRearrange(oConEp, idh, unitno, iduser, ft)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null;
//			gson=null;  ft=null;
//			DBUtil.close(oConEp);
//		}
//	}
//	
//	protected void searchSectionOverviewGrid(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		Connection oConEp = null; Connection oConMp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			out=response.getWriter();
//			oConEp=ConnectionFactory.getConnectionEp(); oConMp=ConnectionFactory.getConnectionItap();
//			out.print(new Gson().toJson((new RearrangeServiceVersion3().searchSectionOverviewGrid(oConMp, oConEp, "<br/>", request.getParameter("id"), "3"))));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			out=null;
//			DBUtil.close(oConEp);
//			DBUtil.close(oConMp);
//		}
//	}
//	
//	protected void searchUnitByH4(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		Connection oConEp = null; Connection oConMp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			out=response.getWriter();
//			oConEp=ConnectionFactory.getConnectionEp(); oConMp=ConnectionFactory.getConnectionItap();
//			out.print(new Gson().toJson(new RearrangeServiceVersion3().searchUnitByH4(oConMp, oConEp, request.getParameter("h4"))));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			out=null;
//			DBUtil.close(oConEp);
//			DBUtil.close(oConMp);
//		}
//	}
//}
