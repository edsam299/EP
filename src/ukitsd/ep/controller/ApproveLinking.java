//package ukitsd.ep.controller;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.PrintWriter;
//import java.sql.Connection;
//import java.util.List;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import net.sf.json.JSONObject;
//import ukitsd.common.UkitSDBean;
//import ukitsd.editing.connection.ConnectionFactory;
//import ukitsd.ep.bean.ApproveEBTUnitBean;
//import ukitsd.ep.bean.ApproveSectionBean;
//import ukitsd.ep.bean.ApproveUnitBean;
//import ukitsd.ep.service.ApproveService;
//import ukitsd.util.Util;
//
//import com.google.gson.Gson;
//
///**
// * Servlet implementation class ApproveLinking
// */
//public class ApproveLinking extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//       
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
//    public ApproveLinking() {
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
//		String param=request.getParameter("param");
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			if(param==null){
//				param=request.getHeader("param");
//			}
//			if(param.equals("loadSectionTable")){
//				loadSectionTable(request, response);
//			}else if(param.equals("loadUnitTable")){
//				loadUnitTable(request, response);
//			}else if(param.equals("getHeader")){
//				getHeader(request, response);
//			}else if(param.equals("getTable")){
//				getTable(request, response);
//			}else if(param.equals("getRearrangeBy")){
//				getRearrangeBy(request, response);
//			}else if(param.equals("getDTPContent")){
//				getDTPContent(request, response);
//			}else if(param.equals("setEBTUnitTable")){
//				setEBTUnitTable(request, response);
//			}else if(param.equals("approve")){
//				approve(request, response);
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			param=null;
//		}
//	}
//	
//	protected void loadSectionTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph = null;
//		List<ApproveSectionBean> approveSectionBean=null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		;
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();
//			approveSectionBean=new ApproveService().loadSectionTable(oConMp, oConEp, oConEph, jsonObject.getString("h1"), jsonObject.getString("h2"), jsonObject.getString("h3"));
//			out.print(gson.toJson(approveSectionBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null; approveSectionBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void loadUnitTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph = null;
//		List<ApproveUnitBean> approveUnitBean=null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		;
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();
//			approveUnitBean=new ApproveService().loadUnitTable(oConMp, oConEp, oConEph, jsonObject.getInt("idsection"), jsonObject.getInt("idh"), "&nbsp;", "<br>");
//			out.print(gson.toJson(approveUnitBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null; approveUnitBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void getHeader(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		;
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();		
//			out.print(gson.toJson(new ApproveService().getHeader(oConEp, jsonObject.getInt("newIdh"))));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null;
//			Util.closeConnection(oConEp);
//		}
//	}
//	
//	protected void getTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		;
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();	
//			if(jsonObject.getString("mode").equals("auto"))
//				out.print(gson.toJson(new ApproveService().getTable(oConMp, oConEp, oConEph, jsonObject.getInt("newIdh"), jsonObject.getInt("newunit"), "&nbsp;", "<br>", 2)));
//			else
//				out.print(gson.toJson(new ApproveService().getTable(oConMp, oConEp, oConEph, jsonObject.getInt("newIdh"), jsonObject.getInt("newunit"), "&nbsp;", "<br>", 3)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void getRearrangeBy(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		;
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();	
//			out.print(gson.toJson(new ApproveService().getRearrangeBy(oConMp, oConEp, oConEph, jsonObject.getInt("newIdh"), jsonObject.getInt("newunit"))));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void getDTPContent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			request.setCharacterEncoding("UTF-8");
//			out=response.getWriter();
//			reader = new InputStreamReader(request.getInputStream(),"UTF8");
//			br = new BufferedReader(reader);
//			sb = new StringBuilder();		;
//			temp_="";
//			while((temp_ = br.readLine()) != null){
//				sb.append(temp_);
//			}	
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();	
//			out.print(gson.toJson(new ApproveService().getDTPContent(oConMp, oConEp, oConEph, jsonObject.getInt("newIdh"), jsonObject.getInt("newunit"),"&nbsp;","<br>")));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void setEBTUnitTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		List<ApproveEBTUnitBean> approveEBTUnitBean=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph = null;
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
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();	
//			approveEBTUnitBean=new ApproveService().setEBTUnitTable(oConMp, oConEp, oConEph, jsonObject.getInt("newIdh"), jsonObject.getInt("newunit"),"&nbsp;","<br>");
//			out.print(gson.toJson(approveEBTUnitBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null; approveEBTUnitBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void approve(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		UkitSDBean ukitSDBean=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph = null;
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
//			jsonObject=JSONObject.fromObject(sb.toString());
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();	
//			ukitSDBean=new ApproveService().approve(oConMp, oConEp, oConEph, jsonObject.getString("ft"), jsonObject.getInt("idh"), 
//					jsonObject.getInt("unitno"), jsonObject.getInt("iduser"), jsonObject.getInt("idpage"), "<br>", "&nbsp;");
//			out.print(gson.toJson(ukitSDBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null;
//			gson=null; ukitSDBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//}
