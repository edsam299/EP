package ukitsd.ep.controller;

import java.io.BufferedReader;
import java.io.FileOutputStream;
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

import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;

import ukitsd.editing.bean.ep.report.EditingReportBean;
import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.reportservice.ReportService;
import ukitsd.editing.reportservice.Report_History_Editing;
import ukitsd.editing.reportservice.Report_WordBean;
import ukitsd.editing.reportservice.Report_WordService;
import ukitsd.exception.UKITSDException;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

/**
 * Servlet implementation class ReportController
 */
public class ReportController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReportController() {
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
		String param=request.getHeader("param");
		if(param.equals("getReportEditingMaster")){
			getReportEditingMaster(request, response);
		}else if(param.equals("List of undecided word")){
			reportListOfUndecideWord(request, response);
		}else if(param.equals("List of emendation")){
			reportListofEmendationWord(request, response);
		}else if(param.equals("Word List(By Text)")){
			
		}else if(param.equals("getAllSeries")){
			getAllSeries(request, response);
		}else if(param.equals("getBastextByIdseries")){
			getBastextByIdseries(request, response);
		}else if(param.equals("getSuttaByIdbasetext")){
			getSuttaByIdbasetext(request, response);
		}else if(param.equals("getSectionByIdsutta")){
			getSectionByIdsutta(request, response);
		}else if(param.equals("getWordList")){
			getWordList(request, response);
		}else if(param.equals("getUnitByIdSection")){
			getUnitByIdSection(request, response);
		}else if(param.equals("editingHistory")){
			editingHistory(request, response);
		}
	}

	protected void getAllSeries(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null; Connection oConn=null;
		try{
			response.setContentType("text/html;charset=UTF-8");
			out=response.getWriter();
			oConn=ConnectionFactory.getConnectionEp();
			out.print(new Gson().toJson(new Report_WordService().getAllSeries(oConn)));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null;
			Util.closeConnection(oConn);
		}
	}
	
	protected void getBastextByIdseries(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConn = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		JSONObject jsonObject=null;
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
			jsonObject=JSONObject.fromObject(sb.toString());
			gson=new GsonBuilder().serializeNulls().create();
			oConn=ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new Report_WordService().getBastextByIdseries(oConn, jsonObject.getInt("idseries"))));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; reader.close(); reader=null; br.close(); br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConn);
		}
	}
	
	protected void getSuttaByIdbasetext(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConn = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		JSONObject jsonObject=null;
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
			jsonObject=JSONObject.fromObject(sb.toString());
			gson=new GsonBuilder().serializeNulls().create();
			oConn=ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new Report_WordService().getSuttaByIdbasetext(oConn, jsonObject.getInt("idbasetext"))));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; reader.close(); reader=null; br.close(); br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConn);
		}
	}
	
	protected void getSectionByIdsutta(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConn = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		JSONObject jsonObject=null;
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
			jsonObject=JSONObject.fromObject(sb.toString());
			gson=new GsonBuilder().serializeNulls().create();
			oConn=ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new Report_WordService().getSectionByIdsutta(oConn, jsonObject.getInt("idsutta"))));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; reader.close(); reader=null; br.close(); br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConn);
		}
	}
	protected void getUnitByIdSection(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		Gson gson=null;
		Connection oConn = null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		JSONObject jsonObject=null;
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
			jsonObject=JSONObject.fromObject(sb.toString());
			gson=new GsonBuilder().serializeNulls().create();
			oConn=ConnectionFactory.getConnectionEp();
			out.print(gson.toJson(new Report_WordService().getUnitByIdSection(oConn, jsonObject.getInt("idsutta"))));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null; reader.close(); reader=null; br.close(); br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConn);
		}
	}
	@SuppressWarnings("deprecation")
	protected void getWordList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		FileOutputStream fileOut = null;
		String excelFile=null;
		PrintWriter out =null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Connection oConEp = null; Connection oConEph = null; Connection oConnItap=null;
		UkitSDBean ukitSDBean=null;
		List<Report_WordBean> report_WordBean=null;
		boolean haveFootnote_Comment=false; HSSFCellStyle cellStyle=null;
		JsonObject json=null; boolean genReport=false;
		try{
			response.setContentType("text/html;charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();		;
			temp_="";
			while((temp_ = br.readLine()) != null){
				sb.append(temp_);
			}	
			jsonObject=JSONObject.fromObject(sb.toString());
			oConnItap=ConnectionFactory.getConnectionItap();
			oConEp=ConnectionFactory.getConnectionEp();
			oConEph=ConnectionFactory.getConnectionEph();
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("report");
			HSSFRow row = sheet.createRow((short)0);
			row = sheet.createRow((short)(0));
//			System.out.println(jsonObject.getString("section")+" "+ jsonObject.getString("sutta")+ " "+jsonObject.getInt("menu"));
			json=new JsonObject();
//			if(jsonObject.getInt("menu")==4){
//				haveFootnote_Comment=true;
				sheet.addMergedRegion(new CellRangeAddress(0,0,0,12));
//			}else
//				sheet.addMergedRegion(new CellRangeAddress(0,0,0,5));
			createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_BOTTOM,"List of "+jsonObject.getString("header_report"),false,(short)11, "Tahoma",Font.BOLDWEIGHT_BOLD);
			ukitSDBean=new Report_WordService().getWordList(oConEp, oConEph, oConnItap, jsonObject.getString("sutta"), jsonObject.getString("section"), jsonObject.getInt("menu"));
			row = sheet.createRow((short)(1));
			createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Word",true,(short)10, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 1, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Sum",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 2, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Sutta",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 3, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Section",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 4, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Unit no",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 5, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Line",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
//			if(haveFootnote_Comment){
				createCell(wb, row, (short) 6, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Editor",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
				createCell(wb, row, (short) 7, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Footnote",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
				createCell(wb, row, (short) 8, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Comment",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
				createCell(wb, row, (short) 9, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Comment by",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
				createCell(wb, row, (short) 10, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Conclusion",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
				createCell(wb, row, (short) 11, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Conclusion by",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
				createCell(wb, row, (short) 12, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Reason",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
				haveFootnote_Comment=true;
//			}

	        cellStyle=createCellStyle(wb, false, "Tahoma", 11, Font.DEFAULT_CHARSET, CellStyle.ALIGN_LEFT, CellStyle.VERTICAL_JUSTIFY);
			if(ukitSDBean.getValue().equals("true")){
				report_WordBean=(List<Report_WordBean>) ukitSDBean.getData();
				if(report_WordBean!=null && report_WordBean.size()>0){
					genReport=true;
					for(int i=0; i<report_WordBean.size(); i++){
						row = sheet.createRow((short)(i+2));
						row.createCell((short)0).setCellValue(report_WordBean.get(i).getWord());
						row.getCell(0).setCellStyle(cellStyle);
						row.createCell((short)1).setCellValue(report_WordBean.get(i).getSum());
						row.getCell(1).setCellStyle(cellStyle);
						row.createCell((short)2).setCellValue(report_WordBean.get(i).getSutta());
						row.getCell(2).setCellStyle(cellStyle);
						row.createCell((short)3).setCellValue(report_WordBean.get(i).getSection());
						row.getCell(3).setCellStyle(cellStyle);
						row.createCell((short)4).setCellValue(report_WordBean.get(i).getUnit());
						row.getCell(4).setCellStyle(cellStyle);
						row.createCell((short)5).setCellValue(report_WordBean.get(i).getLine());
						row.getCell(5).setCellStyle(cellStyle);
							row.createCell((short)6).setCellValue(report_WordBean.get(i).getEditor());
							row.getCell(6).setCellStyle(cellStyle);
							row.createCell((short)7).setCellValue(report_WordBean.get(i).getFootnote());
							row.getCell(7).setCellStyle(cellStyle);
							row.createCell((short)8).setCellValue(report_WordBean.get(i).getComment());
							row.getCell(8).setCellStyle(cellStyle);
							row.createCell((short)9).setCellValue(report_WordBean.get(i).getComment_by());
							row.getCell(9).setCellStyle(cellStyle);
							row.createCell((short)10).setCellValue(report_WordBean.get(i).getConclusion());
							row.getCell(10).setCellStyle(cellStyle);
							row.createCell((short)11).setCellValue(report_WordBean.get(i).getConclusion_by());
							row.getCell(11).setCellStyle(cellStyle);
							row.createCell((short)12).setCellValue(report_WordBean.get(i).getComment_reason());
							row.getCell(12).setCellStyle(cellStyle);
					}

//					sheet.autoSizeColumn(0);
					sheet.autoSizeColumn(1);
					sheet.autoSizeColumn(2);
					sheet.autoSizeColumn(3);
					sheet.autoSizeColumn(4);
					sheet.autoSizeColumn(5);
//					sheet.autoSizeColumn(6);
//					sheet.autoSizeColumn(7);
//					sheet.autoSizeColumn(8);
//					sheet.autoSizeColumn(9);
//					sheet.autoSizeColumn(10);
//					sheet.autoSizeColumn(11);
					fileOut = new FileOutputStream(request.getRealPath("/")+"report.xls");				
					wb.write(fileOut);
					fileOut.close();
					excelFile=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/report.xls";
					if(genReport){
						json.addProperty("value", true);
						json.addProperty("file", excelFile);	
					}
				}else{
					json.addProperty("value", false);
					json.addProperty("message", "Report Not Found");
				}
			}else{
				json.addProperty("value", false);
				json.addProperty("message", ukitSDBean.getDescription());
			}
			out.print(new Gson().toJson(json));
			wb=null;
			sheet=null;
			row=null;
			excelFile=null;
		}catch(Exception e){
			e.printStackTrace();
			json.addProperty("value", false);
			json.addProperty("message", ukitSDBean.getDescription());
			out.print(new Gson().toJson(json));
		}finally{
			out.close(); 
			out=null; excelFile=null; fileOut=null;
			br.close();
			reader.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null; report_WordBean=null; cellStyle=null; json=null;
			Util.closeConnection(oConEp); Util.closeConnection(oConEph); Util.closeConnection(oConnItap);
		}
	}
	
	@SuppressWarnings("deprecation")
	protected void editingHistory(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		FileOutputStream fileOut = null;
		String excelFile=null;
		PrintWriter out =null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Connection oConEp = null; Connection oConnItap=null;
		UkitSDBean ukitSDBean=null;
		List<Report_History_Editing> report_History_Editing=null;
		boolean haveFootnote_Comment=false; HSSFCellStyle cellStyle=null;
		JsonObject json=null; boolean genReport=false;
		try{
			response.setContentType("text/html;charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();		;
			temp_="";
			while((temp_ = br.readLine()) != null){
				sb.append(temp_);
			}	
			jsonObject=JSONObject.fromObject(sb.toString());
			oConnItap=ConnectionFactory.getConnectionItap();
			oConEp=ConnectionFactory.getConnectionEp();
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("report");
			HSSFRow row = sheet.createRow((short)0);
			row = sheet.createRow((short)(0));
//			System.out.println(jsonObject.getString("section")+" "+ jsonObject.getString("sutta")+ " "+jsonObject.getString("menu"));
			json=new JsonObject();
//			if(jsonObject.getInt("menu")==4){
//				haveFootnote_Comment=true;
				sheet.addMergedRegion(new CellRangeAddress(0,0,0,7));
//			}else
//				sheet.addMergedRegion(new CellRangeAddress(0,0,0,5));
			createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_BOTTOM,"History Editing of "+jsonObject.getString("header_report"),false,(short)11, "Tahoma",Font.BOLDWEIGHT_BOLD);
			ukitSDBean=new Report_WordService().getHistoryEditing(oConnItap, oConEp, jsonObject.getString("sutta"), jsonObject.getString("section"), jsonObject.getString("unit"));
			row = sheet.createRow((short)(1));
			createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"UnitNo",true,(short)10, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 1, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"LineNo",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 2, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Seq",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 3, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Basetext",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 4, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Previous Reading",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 5, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Latest Reading",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 6, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Name",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			createCell(wb, row, (short) 7, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,"Date",true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
			
	        cellStyle=createCellStyle(wb, false, "Tahoma", 11, Font.DEFAULT_CHARSET, CellStyle.ALIGN_LEFT, CellStyle.VERTICAL_JUSTIFY);
			if(ukitSDBean.getValue().equals("true")){
				report_History_Editing=(List<Report_History_Editing>) ukitSDBean.getData();
				if(report_History_Editing!=null && report_History_Editing.size()>0){
					genReport=true;
					for(int i=0; i<report_History_Editing.size(); i++){
						row = sheet.createRow((short)(i+2));
						row.createCell((short)0).setCellValue(report_History_Editing.get(i).getUnitno());
						row.getCell(0).setCellStyle(cellStyle);
						row.createCell((short)1).setCellValue(report_History_Editing.get(i).getLineno());
						row.getCell(1).setCellStyle(cellStyle);
						row.createCell((short)2).setCellValue(report_History_Editing.get(i).getSeq());
						row.getCell(2).setCellStyle(cellStyle);
						row.createCell((short)3).setCellValue(report_History_Editing.get(i).getPre());
						row.getCell(3).setCellStyle(cellStyle);
						row.createCell((short)4).setCellValue(report_History_Editing.get(i).getOld());
						row.getCell(4).setCellStyle(cellStyle);
						row.createCell((short)5).setCellValue(report_History_Editing.get(i).getNewcontent());
						row.getCell(5).setCellStyle(cellStyle);
						row.createCell((short)6).setCellValue(report_History_Editing.get(i).getName());
						row.getCell(6).setCellStyle(cellStyle);
						row.createCell((short)7).setCellValue(report_History_Editing.get(i).getDate());
						row.getCell(7).setCellStyle(cellStyle);
					}

					sheet.autoSizeColumn(0);
					sheet.autoSizeColumn(1);
					sheet.autoSizeColumn(2);
					sheet.autoSizeColumn(3);
					sheet.autoSizeColumn(4);
					sheet.autoSizeColumn(5);
					sheet.autoSizeColumn(6);
					sheet.autoSizeColumn(7);

					fileOut = new FileOutputStream(request.getRealPath("/")+"report.xls");				
					wb.write(fileOut);
					fileOut.close();
					excelFile=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/report.xls";
					if(genReport){
						json.addProperty("value", true);
						json.addProperty("file", excelFile);	
					}
				}else{
					json.addProperty("value", false);
					json.addProperty("message", "Report Not Found");
				}
			}else{
				json.addProperty("value", false);
				json.addProperty("message", ukitSDBean.getDescription());
			}
			out.print(new Gson().toJson(json));
			wb=null;
			sheet=null;
			row=null;
			excelFile=null;
		}catch(Exception e){
			e.printStackTrace();
			json.addProperty("value", false);
			json.addProperty("message", ukitSDBean.getDescription());
			out.print(new Gson().toJson(json));
		}finally{
			out.close(); 
			out=null; excelFile=null; fileOut=null;
			br.close();
			reader.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null; report_History_Editing=null; cellStyle=null; json=null;
			Util.closeConnection(oConEp); Util.closeConnection(oConnItap);
		}
	}
		
	protected void getReportEditingMaster(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		try{
			response.setContentType("text/html;charset=UTF-8");
			out=response.getWriter();
			out.print(new Gson().toJson(new ReportService().getReportEditingMaster()));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			out=null;
		}
	}
	@SuppressWarnings({ "deprecation", "unchecked" })
	protected void reportListofEmendationWord(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		FileOutputStream fileOut = null;
		String excelFile=null;
		PrintWriter out =null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Connection oConEp = null; Connection oConEph = null; Connection oConMp=null;
		UkitSDBean ukitSDBean=null;
		List<EditingReportBean> editingReportBean=null;
		try{
			response.setContentType("text/html;charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();		;
			temp_="";
			while((temp_ = br.readLine()) != null){
				sb.append(temp_);
			}	
			jsonObject=JSONObject.fromObject(sb.toString());
			oConEp=ConnectionFactory.getConnectionEp();
			oConEph=ConnectionFactory.getConnectionEph();
			oConMp=ConnectionFactory.getConnectionItap();
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("emendationword");
			HSSFRow row = sheet.createRow((short)0);
			row = sheet.createRow((short)(0));
			sheet.addMergedRegion(new CellRangeAddress(0,0,0,8));
			createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_BOTTOM,jsonObject.getString("header_report"),false,(short)11, "Tahoma",Font.BOLDWEIGHT_BOLD);
			ukitSDBean=new ReportService().reportListofEmendationWord(oConMp, oConEp, oConEph, jsonObject.getInt("idseries"), jsonObject.getInt("idbasetext"));
			if(ukitSDBean.getValue().equals("true")){
				editingReportBean=(List<EditingReportBean>) ukitSDBean.getData();
				if(editingReportBean!=null){
					for(int i=0; i<editingReportBean.size(); i++){
						row = sheet.createRow((short)(i+1));
						createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getWord(),true,(short)10, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 1, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getSumstr(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 2, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getH3(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 3, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getH4(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 4, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getUnit(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 5, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getLine(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 6, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getFt(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 7, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getComment(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 8, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getUsername(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
					}
					sheet.autoSizeColumn(0);
					sheet.autoSizeColumn(1);
					sheet.autoSizeColumn(2);
					sheet.autoSizeColumn(3);
					sheet.autoSizeColumn(4);
					sheet.autoSizeColumn(5);
					sheet.autoSizeColumn(6);
					sheet.autoSizeColumn(7);
					sheet.autoSizeColumn(8);
					fileOut = new FileOutputStream(request.getRealPath("/")+"emendationword.xls");				
					wb.write(fileOut);
					fileOut.close();
					excelFile=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/emendationword.xls";
					out.print(new Gson().toJson(excelFile));
				}			
			}else{
				out.print(new Gson().toJson(ukitSDBean));
			}			
			wb=null;
			sheet=null;
			row=null;
			excelFile=null;
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close(); 
			out=null; excelFile=null; fileOut=null;
			br.close();
			reader.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null;
			Util.closeConnection(oConEp); Util.closeConnection(oConEph); Util.closeConnection(oConMp);
		}
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	protected void reportListOfUndecideWord(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		FileOutputStream fileOut = null;
		String excelFile=null;
		PrintWriter out =null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Connection oConEp = null; Connection oConEph = null;
		UkitSDBean ukitSDBean=null;
		List<EditingReportBean> editingReportBean=null;
		try{
			response.setContentType("text/html;charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();		;
			temp_="";
			while((temp_ = br.readLine()) != null){
				sb.append(temp_);
			}	
			jsonObject=JSONObject.fromObject(sb.toString());
			oConEp=ConnectionFactory.getConnectionEp();
			oConEph=ConnectionFactory.getConnectionEph();
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("undecided");
			HSSFRow row = sheet.createRow((short)0);
			row = sheet.createRow((short)(0));
			sheet.addMergedRegion(new CellRangeAddress(0,0,0,7));
			createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_BOTTOM,jsonObject.getString("header_report"),false,(short)11, "Tahoma",Font.BOLDWEIGHT_BOLD);
			
			ukitSDBean=new ReportService().reportListofUndecidedWord(oConEp, oConEph, jsonObject.getInt("idseries"), jsonObject.getInt("idbasetext"));
			if(ukitSDBean.getValue().equals("true")){
				editingReportBean=(List<EditingReportBean>) ukitSDBean.getData();
				if(editingReportBean!=null){
					for(int i=0; i<editingReportBean.size(); i++){
						row = sheet.createRow((short)(i+1));
						createCell(wb, row, (short) 0, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getWord(),true,(short)10, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 1, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getSumstr(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 2, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getH3(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 3, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getH4(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 4, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getUnit(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 5, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getLine(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 6, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getFt(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
						createCell(wb, row, (short) 7, CellStyle.ALIGN_CENTER, CellStyle.VERTICAL_JUSTIFY,editingReportBean.get(i).getComment(),true,(short)11, "Tahoma",Font.DEFAULT_CHARSET);
					}
					sheet.autoSizeColumn(0);
					sheet.autoSizeColumn(1);
					sheet.autoSizeColumn(2);
					sheet.autoSizeColumn(3);
					sheet.autoSizeColumn(4);
					sheet.autoSizeColumn(5);
					sheet.autoSizeColumn(6);
					sheet.autoSizeColumn(7);
					fileOut = new FileOutputStream(request.getRealPath("/")+"undecided.xls");				
					wb.write(fileOut);
					fileOut.close();
					excelFile=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/undecided.xls";
					out.print(new Gson().toJson(excelFile));
				}			
			}else{
				out.print(new Gson().toJson(ukitSDBean));
			}			
			wb=null;
			sheet=null;
			row=null;
			excelFile=null;
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close(); 
			out=null; excelFile=null; fileOut=null;
			br.close();
			reader.close();
			reader=null; br=null; sb=null; temp_=null; jsonObject=null;
			Util.closeConnection(oConEp); Util.closeConnection(oConEph);
		}
	}
	
	@SuppressWarnings("deprecation")
	private void createCell(HSSFWorkbook wb, HSSFRow row, short column,
			short halign, short valign, String colName, boolean border, short fontsize, String fontname, short fontstyle) {
		 	Cell cell = row.createCell(column);
	        cell.setCellValue(colName);
	        CellStyle cellStyle = wb.createCellStyle();
	        cellStyle.setAlignment(halign);
	        cellStyle.setVerticalAlignment(valign);
	        if(border){
		        cellStyle.setBorderBottom(CellStyle.BORDER_THIN);
		        cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		        cellStyle.setBorderLeft(CellStyle.BORDER_THIN);
		        cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		        cellStyle.setBorderRight(CellStyle.BORDER_THIN);
		        cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
		        cellStyle.setBorderTop(CellStyle.BORDER_THIN);
		        cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
	        }
	        cellStyle.setWrapText(true);
	        cell.setCellStyle(cellStyle);
	        
	        Font font = wb.createFont();
	        font.setFontHeightInPoints((short)fontsize);
	        font.setFontName(fontname);
	        font.setBoldweight(fontstyle);
//	        font.setItalic(true);
//	        font.setStrikeout(true);
	        cellStyle.setFont(font);
	}
	
	private static HSSFCellStyle createCellStyle(HSSFWorkbook wb, boolean border, String fontName, int fontSize, short fontBoldweight, short fontAlign, short verticalAlign){
        HSSFCellStyle cellStyle=wb.createCellStyle();
        cellStyle.setAlignment(fontAlign);
        cellStyle.setVerticalAlignment(verticalAlign);
     
        Font font = wb.createFont();
        font.setFontHeightInPoints((short)fontSize);
        font.setFontName(fontName);
        font.setBoldweight(fontBoldweight);
        
        if(border){
	        cellStyle.setBorderBottom(CellStyle.BORDER_THIN);
	        cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
	        cellStyle.setBorderLeft(CellStyle.BORDER_THIN);
	        cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
	        cellStyle.setBorderRight(CellStyle.BORDER_THIN);
	        cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
	        cellStyle.setBorderTop(CellStyle.BORDER_THIN);
	        cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        }
//        font.setItalic(true);
//        font.setStrikeout(true);
        cellStyle.setFont(font);
        cellStyle.setWrapText(true);
        return cellStyle;
	}
//	protected void getReportEditingMaster(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		PrintWriter out=null;
//		try{
//			response.setContentType("text/html;charset=UTF-8");
//			out=response.getWriter();
//			out.print(new Gson().toJson(new ReportService().getReportEditingMaster()));
//		}catch(Exception e){
//			e.printStackTrace();
//		}finally{
//			out.close();
//			out=null;
//		}
//	}

	public static void main(String [] args) throws UKITSDException, SQLException{
		  Connection oConnItap=ConnectionFactory.getConnectionItap();
		  Connection oConEp=ConnectionFactory.getConnectionEp();
		  Connection oConEph=ConnectionFactory.getConnectionEph();
		  System.out.println(new Gson().toJson(new Report_WordService().getWordList(oConEp, oConEph,oConnItap, "14,16,17,18,19,20,21,22,23,15", "", 4)));
		 }
}


