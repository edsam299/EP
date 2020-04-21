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
//import ukitsd.ep.bean.ProofContentBean;
//import ukitsd.ep.bean.ProofUnitBean;
//import ukitsd.ep.service.ProofService;
//import ukitsd.eph.bean.CommentE2HistoryBean;
//import ukitsd.eph.bean.FootnoteE2HistoryBean;
//import ukitsd.util.Util;
//
//import com.google.gson.Gson;
//
///**
// * Servlet implementation class Proof
// */
//public class Proof extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//       
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
//    public Proof() {
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
//			if(param.equals("getHeader")){
//				getHeader(request, response);
//			}else if(param.equals("setUnitTable")){
//				setUnitTable(request, response);
//			}else if(param.equals("getContentFT")){
//				getContentFT(request, response);
//			}else if(param.equals("searchFootnoteById")){
//				searchFootnoteById(request, response);
//			}else if(param.equals("getLatestCommentByEPFcrid")){
//				getLatestCommentByEPFcrid(request, response);
//			}else if(param.equals("searchFootnoteHistory")){
//				searchFootnoteHistory(request, response);
//			}else if(param.equals("saveFootnote")){
//				saveFootnote(request, response);
//			}else if(param.equals("saveFootnote")){
//				saveFootnote(request, response);
//			}else if(param.equals("getComment")){
//				getComment(request, response);
//			}else if(param.equals("searchComment")){
//				searchComment(request, response);
//			}else if(param.equals("searchReasonComment")){
//				searchReasonComment(request, response);
//			}else if(param.equals("deleteComment")){
//				deleteComment(request, response);
//			}else if(param.equals("deleteFootnote")){
//				deleteFootnote(request, response);
//			}else if(param.equals("showFootnote")){
//				showFootnote(request, response);
//			}else if(param.equals("getCompareTable")){
//				getCompareTable(request, response);
//			}else if(param.equals("editComment")){
//				editComment(request, response);
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			param=null;
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
//		Connection oConEp = null; Connection oConMp = null;
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
//			out.print(gson.toJson(new ProofService().getHeader(jsonObject.getString("h1"), jsonObject.getString("h2"), jsonObject.getString("h3"),
//					jsonObject.getString("h4"), "3", oConEp, oConMp)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConMp);
//		}
//	}
//
//	protected void setUnitTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		List<ProofUnitBean> proofUnitBean=null;
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
//			proofUnitBean=new ProofService().setUnitTable(oConMp, oConEp, oConEph, jsonObject.getString("h1"), jsonObject.getString("h2"), jsonObject.getString("h3"),
//					jsonObject.getString("h4"), "&nbsp;", "<br>");		
//			out.print(gson.toJson(proofUnitBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; proofUnitBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void getContentFT(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		List<ProofContentBean>  proofContentBean=null;
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
//			proofContentBean=new ProofService().getContentFT(oConMp, oConEp, oConEph, jsonObject.getInt("idh"), jsonObject.getInt("unit"), "&nbsp;", "<br>");
//			out.print(gson.toJson(proofContentBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; proofContentBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void searchFootnoteById(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		String[] footnote=null;
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
//			footnote=new ProofService().searchFootnoteById(oConMp, oConEp, oConEph, jsonObject.getString("fcrid"), jsonObject.getInt("idh"), "<br>");
//			out.print(gson.toJson(footnote));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; footnote=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void getLatestCommentByEPFcrid(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		String[] lastcomment=null;
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
//			lastcomment=new ProofService().getLatestCommentByEPFcrid(oConMp, oConEp, oConEph, "<br>", jsonObject.getInt("iduser"),
//					jsonObject.getInt("idh"), jsonObject.getString("fcrid"));			
//			out.print(gson.toJson(lastcomment));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; lastcomment=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void searchFootnoteHistory(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		 List<FootnoteE2HistoryBean> footnoteE2HistoryBean=null;
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
//			footnoteE2HistoryBean=new ProofService().searchFootnoteHistory(oConMp, oConEp, oConEph, jsonObject.getString("fcrid"), jsonObject.getInt("idh"), "<br>");	
//			out.print(gson.toJson(footnoteE2HistoryBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; footnoteE2HistoryBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void saveFootnote(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		UkitSDBean ukitSDBean=null;
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
//			ukitSDBean=new ProofService().saveFootnote(oConMp, oConEp, oConEph, jsonObject.getString("fcrid"),
//					jsonObject.getInt("idh"), jsonObject.getInt("iduser"), jsonObject.getString("ft"));			
//			out.print(gson.toJson(ukitSDBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; ukitSDBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void getComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		List<CommentE2HistoryBean> commentE2HistoryBean=null;
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
//			commentE2HistoryBean=new ProofService().getComment(oConMp, oConEp, oConEph, jsonObject.getString("fcrid"), "<br>", jsonObject.getInt("idh"));	
//			out.print(gson.toJson(commentE2HistoryBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; commentE2HistoryBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void searchComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		String []comment=null;
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
//			comment=new ProofService().searchComment(oConMp, oConEp, oConEph, jsonObject.getInt("idh"), jsonObject.getInt("iduser"),
//					jsonObject.getInt("unit"), jsonObject.getInt("idword"), jsonObject.getInt("idgroup"), jsonObject.getInt("id"));	
//			for(int i=0; i<comment.length; i++){
//				System.out.println(i+"---"+comment[i]);
//			}
//			out.print(gson.toJson(comment));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; comment=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void searchReasonComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		Gson gson=null;
//		Connection oConEp = null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			out=response.getWriter();
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			out.print(gson.toJson(new ProofService().searchReasonComment(oConEp)));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			out=null; gson=null;
//			Util.closeConnection(oConEp);
//		}
//	}
//	
//	protected void deleteComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		Gson gson=null;
//		JSONObject jsonObject=null;
//		Connection oConEp = null; Connection oConMp=null; Connection oConEph=null;
//		UkitSDBean ukitSDBean=null;
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
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();
//			jsonObject=JSONObject.fromObject(sb.toString());
//			ukitSDBean=new ProofService().deleteComment(oConMp, oConEp, oConEph, jsonObject.getInt("id"), jsonObject.getInt("idh"));
//			out.print(gson.toJson(ukitSDBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; gson=null; jsonObject=null; ukitSDBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void deleteFootnote(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		Gson gson=null;
//		JSONObject jsonObject=null;
//		Connection oConEp = null; Connection oConMp=null; Connection oConEph=null;
//		UkitSDBean ukitSDBean=null;
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
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();
//			jsonObject=JSONObject.fromObject(sb.toString());
//			ukitSDBean=new ProofService().deleteFootnote(oConMp, oConEp, oConEph, jsonObject.getString("fcrid"), jsonObject.getInt("idh"));
//			out.print(gson.toJson(ukitSDBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; gson=null; jsonObject=null; ukitSDBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void showFootnote(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		Gson gson=null;
//		JSONObject jsonObject=null;
//		Connection oConEp = null; Connection oConMp=null; Connection oConEph=null;
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
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();
//			jsonObject=JSONObject.fromObject(sb.toString());
//			out.print(gson.toJson(new ProofService().showFootnote(oConMp, oConEp, oConEph, jsonObject.getString("fcrid"), jsonObject.getInt("idh"), jsonObject.getInt("iduser"))));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; gson=null; jsonObject=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void getCompareTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		Gson gson=null;
//		JSONObject jsonObject=null;
//		Connection oConEp = null; Connection oConMp=null; Connection oConEph=null;
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
//			gson = new Gson();
//			oConEp = ConnectionFactory.getConnectionEp();
//			oConMp = ConnectionFactory.getConnectionItap();
//			oConEph = ConnectionFactory.getConnectionEph();
//			jsonObject=JSONObject.fromObject(sb.toString());
//			out.print(gson.toJson(new ProofService().getComparedTable(oConMp, oConEp, oConEph, jsonObject.getInt("idh"), jsonObject.getInt("newunit"), "&nbsp;", "<br>")));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; gson=null; jsonObject=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//	protected void editComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		InputStreamReader reader=null;
//		BufferedReader br=null;
//		StringBuilder sb=null;
//		String temp_ =null;
//		JSONObject jsonObject = null;
//		Gson gson=null;
//		Connection oConEp = null; Connection oConMp = null; Connection oConEph=null;
//		UkitSDBean ukitSDBean=null;
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
//			ukitSDBean=new ProofService().editComment(oConMp, oConEp, oConEph, jsonObject.getInt("id"), jsonObject.getString("idcomment"), 
//					jsonObject.getString("comment"), jsonObject.getInt("idh"));;			
//			out.print(gson.toJson(ukitSDBean));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			br.close();
//			reader.close();
//			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; ukitSDBean=null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//			Util.closeConnection(oConMp);
//		}
//	}
//	
//}
