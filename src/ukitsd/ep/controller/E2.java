package ukitsd.ep.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.contentservice.ContentService;
import ukitsd.editing.contentservice.ContentServiceVersion5;
import ukitsd.editing.contentservice.DifferentialContent;
import ukitsd.editing.contentservice.HeaderLabelService;
import ukitsd.editing.contentservice.ResetService;
import ukitsd.editing.saveservice.E2SubmitService;
import ukitsd.editing.service.CommonService;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


/**
 * Servlet implementation class E2
 */
public class E2 extends HttpServlet {
	private static final long serialVersionUID = 1L;
	DataSource ds=null;
//	Connection oConMp = SQLSERVERJDBC.getITAPConnection(); Connection oConEp = SQLSERVERJDBC.getEPConnection(); Connection oConEph =  SQLSERVERJDBC.getEPHConnection();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public E2() {
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
//			System.out.println("oConEp "+oConEp);
			response.setContentType("text/html;charset=UTF-8");
			act=request.getParameter("act");
			if(act==null)
				act=request.getHeader("param");
			if(act.equals("getE2Header")){
				getE2Header(request, response);
			}else if(act.equals("searchUnitByH4")){
				searchUnitByH4(request, response);
			}else if(act.equals("searchVariantTable")){
				searchVariantTable(request, response);
			}else if(act.equals("getInfocardPicture")){
				getInfocardPicture(request, response);
			}else if(act.equals("getEds")){
				getEds(request, response);
			}else if(act.equals("getCommentaryChoice")){
				getCommentaryChoice(request, response);
			}else if(act.equals("saveCty")){
				saveCty(request, response);
			}else if(act.equals("showReasonCommentChoice")){
				showReasonCommentChoice(request, response);
			}else if(act.equals("saveReasoncomment")){
				saveReasoncomment(request, response);
			}else if(act.equals("saveEmendation")){
				saveEmendation(request, response);
			}else if(act.equals("searchLastCommentByFcrid")){
				searchLastCommentByFcrid(request, response);
			}else if(act.equals("searchPatternLabel")){
				searchPatternLabel(request, response);
			}else if(act.equals("submitUnit")){
				submitUnit(request, response);
			}else if(act.equals("unlockUnit")){
				unlockUnit(request, response);
			}else if(act.equals("checkUnit")){
				checkUnit(request, response);
			}else if(act.equals("checkBasetextStatus")){			
				checkBaseTextStatus(request, response);
			}else if(act.equals("resetUnit")){			
				resetUnit(request, response);
			}else if(act.equals("getBaseText")){			
				getBaseText(request, response);
			}else if(act.equals("getTable")){			
				getTable(request, response);
			}else if(act.equals("resetBlock")){			
				resetBlock(request, response);
			}else if(act.equals("resetAllBlock")){			
				resetAllBlock(request, response);
			}else if(act.equals("saveComment")){
				saveComment(request, response);
			}else if(act.equals("searchComment")){
				searchComment(request, response);
			}else if(act.equals("manageComment")){
				manageComment(request, response);
			}else if(act.equals("getTableReset")){
				getTableReset(request, response);
			}else if(act.equals("refreshData")){
				refreshData(request, response);
			}else if(act.equals("searchFcrid")){
				searchFcrid(request, response);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			act=null;
		}
	}

	protected void searchUnitByH4(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		ContentService contentService = null; 
		UkitSDBean ukitSDBean=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		try{
			out = response.getWriter();
			gson = new GsonBuilder().serializeNulls().disableHtmlEscaping().create();
			contentService=new ContentService();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			long start=System.currentTimeMillis();
			if(request.getParameter("seq").equals("before")){
//				sectionGrid=editService.searchUnitByH4(request.getParameter("h1"), request.getParameter("h2"),request.getParameter("h3"), request.getParameter("h4"), 
//						oConEp, oConMp,"<br>", oConEph, "&nbsp;",Integer.parseInt(request.getParameter("iduser")));	
				ukitSDBean=contentService.searchUnitBySection(oConMp, oConEp, request.getParameter("h4"), " ", "<br>", 0, Integer.parseInt(request.getParameter("iduser")));
				out.print(gson.toJson(ukitSDBean));
			}else{			
//				ukitSDBean=contentService.searchUnitBySection();
//				System.out.println("new Service");
				out.print(gson.toJson(new ContentServiceVersion5().searchUnit(oConMp, oConEp, request.getParameter("h4"), " ", "<br>",
						Integer.parseInt(request.getParameter("unitno")), Integer.parseInt(request.getParameter("iduser")))));
			}
//			long time=System.currentTimeMillis()-start;
//			System.out.println(time/1000.0+" sec.");

		}catch(Exception e){
			e.printStackTrace();
			out.print("");
		}finally{
			out.close();
			out=null; gson=null; 
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}

	protected void getE2Header(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;
		HeaderLabelService headerLabelService=null;
		Connection oConMp = null; Connection oConEp = null;
		UkitSDBean ukitSDBean=null;
		try{
			out = response.getWriter();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
			headerLabelService=new HeaderLabelService();
//			headerLabelService.getHeaderH1toH4(h1, h2, h3, h4, unit, ep)
			jsonArray = new JSONArray();
			jsonObject = new JSONObject();

			
			ukitSDBean=headerLabelService.getHeaderH1toH4(request.getParameter("h1"), request.getParameter("h2"),request.getParameter("h3"), request.getParameter("h4"), "0",
					oConEp);
			jsonObject.put("e2HeaderLeft", ukitSDBean.getDescription());
			
			ukitSDBean=headerLabelService.getHeaderH1toH4(request.getParameter("h1"), request.getParameter("h2"),request.getParameter("h3"), request.getParameter("h4"), "1",
					oConEp);			
			jsonObject.put("e2HeaderRight",  ukitSDBean.getDescription());
			jsonArray.add(jsonObject);
			out.print(jsonArray);
		}catch(Exception e){
			e.printStackTrace();
			out.print(jsonArray);
		}finally{
			out.close();
			out=null; jsonArray = null; jsonObject=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
		}
	}

	protected void searchVariantTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		ContentService contentService=null;
		Gson gson=null;
		List<String[]> variantTable = null;
		Connection oConMp = null; Connection oConEp = null;
		try{
			out = response.getWriter();
			contentService=new ContentService();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
			gson = new Gson();
//			contentService.setVariantTable(oConMp, oConEp, request.getParameter("idword"));
//			variantTable= variantService.searchVariantTable(oConEp, oConMp, oConEph, request.getParameter("idword"));
			out.print(gson.toJson(contentService.setVariantTable(oConMp, oConEp, request.getParameter("idword"))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(variantTable);
		}finally{
			out.close();
			out=null; gson=null; variantTable=null; contentService= null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
		}
	}

//	protected void getInfocardPicture(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		List<InfocardPictureBean> infocardPictureBean=null;
//		Gson gson=null;
//		InfocardService infocardService=null;
//		Connection oConEp = null; Connection oConEph = null;
//		try{
//			out = response.getWriter();
//			gson = new Gson();
//        	ds=(DataSource)SQLCONNECT.initialContext.lookup("UEDataSourceEp");
//			oConEp = ds.getConnection();
//			ds=(DataSource)SQLCONNECT.initialContext.lookup("UEDataSourceEph");
//			oConEph = ds.getConnection();
//			infocardService = new InfocardService();
//			infocardPictureBean=infocardService.getInfocardPicture(request.getParameter("fcrid"), request.getParameter("pattern"),
//					request.getParameter("column"), oConEp, oConEph);
//			out.print((infocardPictureBean.size()>0)?gson.toJson(infocardPictureBean):null);
//		}catch(Exception e){
//			e.printStackTrace();
//			out.print(infocardPictureBean);
//		}finally{
//			out.close();
//			out=null; gson=null; infocardService=null; infocardPictureBean= null;
//			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
//		}
//	}

	protected void getEds(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConEp = null; Connection oConEph = null; Connection oConMP=null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMP=ConnectionFactory.getConnectionItap();
			out.print(gson.toJson(new ContentService().getEdsPicture(request.getParameter("fcrid"), 
					new String(request.getParameter("pattern").getBytes("ISO-8859-1"),"UTF-8"), oConEp, oConMP)));
		}catch(Exception e){
			e.printStackTrace();
			out.print("");
		}finally{
			out.close();
			out=null;gson=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMP);
		}		
	}

	protected void getCommentaryChoice(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		String commentary=null;
		Gson gson=null;
		Connection oConEp = null; Connection oConEph = null; Connection oConMP=null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMP=ConnectionFactory.getConnectionItap();
			out.print(gson.toJson(new ContentService().showCommentaryChoice(request.getParameter("fcrid"),new String(request.getParameter("pattern").getBytes("ISO-8859-1"),"UTF-8"), "<br/>"," ", oConEp, oConMP)));
		}catch(Exception e){
			e.printStackTrace();
			out.print(commentary);
		}finally{
			out.close();
			out=null;
			commentary=null; gson=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMP);
		}		
	}

	protected void saveCty(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		String ctyId = null;
		String cty[]=null;
		int id[]=null;
		UkitSDBean ukitSDBean=null;
		Gson gson=null;
		Connection oConMP = null; Connection oConEp = null; Connection oConEph = null;
		try{
			ctyId = request.getParameter("ctyId");
			cty=ctyId.split(",");
			out=response.getWriter();
			gson = new Gson();
			id=new int[cty.length];
			for(int i=0; i<cty.length; i++){
				id[i]=(cty[i]!="")?Integer.parseInt(cty[i]):0;
			}
			oConEp= ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMP = ConnectionFactory.getConnectionItap();
			out.print(gson.toJson(new ContentService().saveCommentary(request.getParameter("fcrid"), 
					new String(request.getParameter("pattern").getBytes("ISO-8859-1"),"UTF-8"), id, 
					Integer.parseInt(request.getParameter("iduser")), oConEp, oConMP)));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null;
			ctyId=null; cty=null; id=null; gson=null; ukitSDBean=null;
			Util.closeConnection(oConMP);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}	
	}

	protected void showReasonCommentChoice(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		String reasonComment=null;
		Gson gson=null;
		Connection oConEp = null;
		try{
			out=response.getWriter();
			gson=new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
//			reasonComment=reasonCommentService.showReasonCommentChoice(request.getParameter("fcrid"), oConEp, oConEph, "<br>", "&nbsp;");
			out.print(gson.toJson(new ContentService().showReasonCommentChoice(oConEp, request.getParameter("fcrid"), 
					Integer.parseInt(request.getParameter("iduser")), 2, "<br>")));
		}catch(Exception e){
			e.printStackTrace();
			out.print(reasonComment);
		}finally{
			out.close();
			out=null; gson=null; reasonComment=null;
			Util.closeConnection(oConEp);
		}	
	}
	
	protected void saveReasoncomment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		Gson gson=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			ukitSDBean=reasonCommentService.saveReasonComment(oConEp, oConEph, oConMp, request.getParameter("fcrid"), Integer.parseInt(request.getParameter("idpage"))
//					,Integer.parseInt(request.getParameter("iduser")),request.getParameter("idreason"));

			out.print(gson.toJson(new ContentService().saveReasonComment(oConEp, request.getParameter("fcrid"), 
					Integer.parseInt(request.getParameter("iduser")), Integer.parseInt(request.getParameter("idpage")), request.getParameter("idreason"))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null;
			gson=null; ukitSDBean=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	protected void saveComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		Connection oConEp = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		System.out.println("save");
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
			
			oConEp=ConnectionFactory.getConnectionEp();
			jsonObject=JSONObject.fromObject(sb.toString());			
			out.print(new Gson().toJson(new ContentService().saveComment(oConEp, jsonObject.getString("fcrid"), 
					jsonObject.getInt("iduser"), jsonObject.getInt("idpage"), 
					jsonObject.getString("comment"), jsonObject.getInt("conclusion"))));
			
			System.out.println(jsonObject.getString("comment"));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; jsonObject=null; br.close(); br=null; sb=null; temp_=null; reader.close(); reader=null; ukitSDBean=null;
			Util.closeConnection(oConEp);
		}
	}
	protected void searchComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		Connection oConEp = null;
		Connection oConMp=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
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
			oConEp=ConnectionFactory.getConnectionEp();
			oConMp=ConnectionFactory.getConnectionItap();
			jsonObject=JSONObject.fromObject(sb.toString());			
			out.print(new GsonBuilder().serializeNulls().disableHtmlEscaping().setDateFormat("dd-MM-yyyy HH:mm:ss").create().toJson(new ContentService().searchComment(oConMp, oConEp, jsonObject.getString("fcrid"))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; jsonObject=null; br.close(); br=null; sb=null; temp_=null; reader.close(); reader=null; ukitSDBean=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConMp);
		}
	}
	protected void manageComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		Connection oConEp = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
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
			oConEp=ConnectionFactory.getConnectionEp();
			jsonObject=JSONObject.fromObject(sb.toString());
			out.print(new Gson().toJson(new ContentService().manageComment(oConEp, jsonObject.getString("fcrid"), jsonObject.getInt("iduser"),
					jsonObject.getInt("idpage"), jsonObject.getString("comment"), jsonObject.getInt("conclusion"),
					jsonObject.getInt("flagedit"), jsonObject.getInt("idcomment"))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; jsonObject=null; br.close(); br=null; sb=null; temp_=null; reader.close(); reader=null; ukitSDBean=null;
			Util.closeConnection(oConEp);
		}
	}
	protected void saveEmendation(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConEp = null; Connection oConEph = null; Connection oConMP=null;
		try{
			out=response.getWriter();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMP=ConnectionFactory.getConnectionItap();
			out.print(gson.toJson(new ContentService().saveEmendation(request.getParameter("fcrid"), Integer.parseInt(request.getParameter("iduser")),
					new String(request.getParameter("content").getBytes("ISO-8859-1"),"UTF-8"), 
					oConEp, Integer.parseInt(request.getParameter("idpage")),oConMP)));
		}catch(Exception e){
			e.printStackTrace();
			out.print(false);
		}finally{
			out.close();
			out=null;
			gson=null;
			Util.closeConnection(oConEph);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConMP);
		}	
	}
	
	protected void searchLastCommentByFcrid(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		String comment[]=null;
		Gson gson=null;
		Connection oConEp = null;
		try{
			out=response.getWriter();
			gson=new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new ContentService().searchLatestCommentByFcrid(oConEp, request.getParameter("fcrid"), Integer.parseInt(request.getParameter("iduser")),
					Integer.parseInt(request.getParameter("idpage")), "<br>")));
		}catch(Exception e){
			e.printStackTrace();
			out.print(comment);
		}finally{
			out.close();
			out=null; gson=null; comment=null;
			Util.closeConnection(oConEp);
		}	
	}

	protected void searchPatternLabel(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		String pattern=null;
		Connection oConEp = null;
		try{
			out=response.getWriter();
			gson=new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
//			oConEph =ConnectionFactory.getConnectionEph();
//			oConMp = ConnectionFactory.getConnectionItap();
//			pattern=editService.searchPatternLabel(oConEp,oConEph, oConMp, request.getParameter("fcrid"));
			out.print(gson.toJson(new ContentService().searchPatternLabel(oConEp,request.getParameter("fcrid"))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(pattern);
		}finally{
			out.close();
			out=null; gson=null; pattern=null;
//			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
//			Util.closeConnection(oConEph);
		}	
	}
	
	protected void getInfocardPicture(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;
		String pattern=null;
		String fcrid=null;
		String column=null;
		Gson gson=null;
		Connection oConEp = null; Connection oConEph = null; Connection oConMP=null;
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
				pattern=jsonObject.getString("pattern");			
				fcrid=jsonObject.getString("fcrid");
				column=jsonObject.getString("column");
			}
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMP=ConnectionFactory.getConnectionItap();
			out.print(gson.toJson(new ContentService().getInfocardPicture(fcrid, pattern, column, oConEp, oConMP)));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null;
			pattern=null; fcrid=null; column =null; gson=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMP);
		}
	}
	
	protected void submitUnit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;
		int idh=0; int iduser=0; int idpage=0; int unitno=0;
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
				idh=jsonObject.getInt("idh");
				unitno=jsonObject.getInt("unitno");
				iduser=jsonObject.getInt("iduser");
				idpage=jsonObject.getInt("idpage");
			}
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new E2SubmitService().submit(oConEp, idh, unitno, iduser, idpage)));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null; gson=null;
			Util.closeConnection(oConEp);
		}
	}
	protected void checkUnit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;
		int idh=0; int unitno=0;
		Gson gson=null;
		CommonService commonservice=null;
		Connection oConEp = null; Connection oConEph = null;
		Connection oConnMp=null;
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
				idh=jsonObject.getInt("idh");
				unitno=jsonObject.getInt("unitno");

			}
			gson = new Gson();
			commonservice = new CommonService();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConnMp = ConnectionFactory.getConnectionItap();
			out.print(gson.toJson(commonservice.getIdstatusUnit(idh, unitno, oConnMp, oConEp, oConEph)));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null; gson=null; commonservice=null; 
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConnMp);
		}
	}
	protected void unlockUnit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;
		int idh=0; int iduser=0; int idpage=0; int unitno=0;
		Gson gson=null;
//		EditService editService=null;
		Connection oConEp = null; Connection oConEph = null;
		Connection oConnMp=null;
		UkitSDBean ukitSDBean=null;
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
				idh=jsonObject.getInt("idh");
				unitno=jsonObject.getInt("unitno");
				iduser=jsonObject.getInt("iduser");
				idpage=jsonObject.getInt("idpage");
			}
			gson = new Gson();
//			editService = new EditService();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConnMp = ConnectionFactory.getConnectionItap();
//			ukitSDBean=editService.unlock(oConnMp,oConEp,oConEph, idh, unitno);
			out.print(gson.toJson(ukitSDBean));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null; gson=null; ukitSDBean=null; //editService=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConnMp);
		}
	}
	
	protected void checkBaseTextStatus(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		ContentService contentService=null;
		UkitSDBean ukitSDBean=null;
		Gson gson=null;
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
			gson=new Gson();
			oConEp=ConnectionFactory.getConnectionEp();
			contentService=new ContentService();
			ukitSDBean=contentService.checkBasetextStatus(oConEp, jsonObject.getString("fcrid"), jsonObject.getInt(("flag")));
			out.print(gson.toJson(ukitSDBean));
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; gson=null; ukitSDBean=null; contentService=null;
			reader.close(); br.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null;
			Util.closeConnection(oConEp);
		}	
	}
	
	protected void resetUnit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		ContentService contentService=null;
		UkitSDBean ukitSDBean=null;
		Gson gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			gson=new Gson();
			oConEp=ConnectionFactory.getConnectionEp();
			oConMp=ConnectionFactory.getConnectionItap();
			contentService=new ContentService();
			oConEp.setAutoCommit(false);
			oConMp.setAutoCommit(false);
			ukitSDBean=contentService.resetUnit(oConMp, oConEp, jsonObject.getString("fcrid"), jsonObject.getInt("unitno"), jsonObject.getInt(("iduser")));						
			oConEp.commit();
			oConMp.commit();
			out.print(gson.toJson(ukitSDBean));
		}catch(Exception e){
			e.printStackTrace();
			try {
				oConMp.rollback();
				oConEp.rollback();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			out.print(ukitSDBean);
		}finally{
			out.close();
			out=null; gson=null; ukitSDBean=null; contentService=null;
			reader.close(); br.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConMp);
		}	
	}
	
	protected void getBaseText(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			out.print(gson.create().toJson(new DifferentialContent().getBasetext(oConMp, oConEp, jsonObject.getString("h4"), jsonObject.getInt("unitno"), jsonObject.getInt(("iduser")), "&nbsp;", "<br>")));
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
	
	protected void getTable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			out.print(gson.create().toJson(new DifferentialContent().getTable(oConMp, oConEp, jsonObject.getString("fcbaseid"))));
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
	
	protected void resetBlock(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			
			out.print(gson.create().toJson(new ResetService().resetBlock(oConMp, oConEp, jsonObject.getInt("iduser"), jsonObject.getString("fcbaseid"), " ", "<br>")));
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
	
	protected void resetAllBlock(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			out.print(gson.create().toJson(new DifferentialContent().resetAllBlock(oConMp, oConEp, jsonObject.getString("fcbaseid"), jsonObject.getInt("iduser"),
					jsonObject.getString("all"), jsonObject.getString("fcedition"))));
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
	protected void refreshData(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			gson=new GsonBuilder().serializeNulls().disableHtmlEscaping();
			oConEp=ConnectionFactory.getConnectionEp();
			oConMp=ConnectionFactory.getConnectionItap();
			
			out.print(gson.create().toJson(new ContentServiceVersion5().searchUnit(oConMp, oConEp, jsonObject.getString("h4"), " ", "<br>",
					jsonObject.getInt("unitno"), jsonObject.getInt("iduser"))));
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
	protected void getTableReset(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			out.print(gson.create().toJson(new ResetService().getTable(oConMp, oConEp, jsonObject.getString("fcbaseid"))));
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
	protected void searchFcrid(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		UkitSDBean ukitSDBean=null;
		GsonBuilder gson=null;
		Connection oConEp = null;
		Connection oConMp = null;
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
			out.print(gson.create().toJson(new ResetService().searchFcrid(oConMp, oConEp, jsonObject.getInt("iduser"), jsonObject.getString("fcrid"))));
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
