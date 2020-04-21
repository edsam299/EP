package ukitsd.ep.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.contentservice.HeaderLabelService;
import ukitsd.editing.exportservice.Word;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class ExportController
 */
public class ExportController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExportController() {
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
		if(param.equals("getTableH1ToH4")){
			getTableH1ToH4(request, response);
		}else if(param.equals("getUnit")){
			getUnit(request, response);
		}else if(param.equals("exportWordBySutta")){
			exportWordBySutta(request, response);
		}else if(param.equals("exportWordByUnit")){
			exportWordByUnit(request, response);
		}else if(param.equals("exportWordByUnitFromE2")){
			exportWordByUnitFromE2(request, response);
		}
	}
	
	protected void getTableH1ToH4(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Gson gson=null;
		Connection oConEp = null;
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
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();	
			out.print(gson.toJson(new HeaderLabelService().getTableH1toH4(oConEp, jsonObject.getInt("level"), jsonObject.getInt("id"))));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConEp);
		}
	}
	protected void getUnit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Gson gson=null;
		Connection oConEp = null;
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
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();	
			out.print(gson.toJson(new HeaderLabelService().getUnit(oConEp, jsonObject.getInt("idseries"), jsonObject.getInt("idbasetext")
					, jsonObject.getInt("idsutta"), jsonObject.getInt("idsection"), " ")));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConEp);
		}
	}
	@SuppressWarnings("deprecation")
	protected void exportWordByUnit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Gson gson=null;
		Connection oConEp = null; Connection oConMp=null;
		ArrayList<Integer> arrunit=null;
		JSONArray jsonArray=null;
		UkitSDBean ukitsdBean=null;
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
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
			jsonArray=JSONArray.fromObject(jsonObject.getString("unit"));
			arrunit=new ArrayList<>();
			for(int i=0; i<jsonArray.size(); i++){
				arrunit.add(jsonArray.getInt(i));
			}
			ukitsdBean=new Word().exportWordByUnit(oConMp, oConEp, "<br>", "", jsonObject.getInt("idseries")
					, jsonObject.getInt("idbasetext"), jsonObject.getInt("idsutta"), jsonObject.getInt("idsection")
					, arrunit, request.getRealPath("/")+"word.docx", jsonObject.getInt("excluding"));
			if(ukitsdBean.getValue().equals("true")){
				out.print(gson.toJson(request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/word.docx"));
			}else{
				out.print(gson.toJson(ukitsdBean));
			}
		}catch(Exception e){
			e.printStackTrace();
			out.print(gson.toJson(ukitsdBean));
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConEp);
		}
	}
	protected void exportWordByUnitFromE2(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Gson gson=null;
		Connection oConEp = null; Connection oConMp=null;
		ArrayList<Integer> arrunit=null;
		JSONArray jsonArray=null;
		UkitSDBean ukitsdBean=null;
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
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
			jsonArray=JSONArray.fromObject(jsonObject.getString("unit"));
			arrunit=new ArrayList<>();
			for(int i=0; i<jsonArray.size(); i++){
				arrunit.add(jsonArray.getInt(i));
			}
			ukitsdBean=new Word().exportWordByUnit(oConMp, oConEp, "<br>", "", jsonObject.getString("idseries")
					, jsonObject.getString("idbasetext"), jsonObject.getString("idsutta"), jsonObject.getString("idsection")
					, arrunit, request.getRealPath("/")+"word.docx", jsonObject.getInt("excluding"));
			if(ukitsdBean.getValue().equals("true")){
				out.print(gson.toJson(request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/word.docx"));
			}else{
				out.print(gson.toJson(ukitsdBean));
			}
		}catch(Exception e){
			e.printStackTrace();
			out.print(gson.toJson(ukitsdBean));
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null;
			Util.closeConnection(oConEp);
		}
	}
	@SuppressWarnings("deprecation")
	protected void exportWordBySutta(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONObject jsonObject = null;
		Gson gson=null;
		Connection oConEp = null; Connection oConMp=null;
		ArrayList<Integer> arrsutta=null;
		JSONArray jsonArray=null;
		UkitSDBean ukitsdBean=null;
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
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
			jsonArray=JSONArray.fromObject(jsonObject.getString("idsutta"));
			arrsutta=new ArrayList<>();
			for(int i=0; i<jsonArray.size(); i++){
				arrsutta.add(jsonArray.getInt(i));
			}
			ukitsdBean=new Word().exportWordBySutta(oConMp, oConEp, "", "", jsonObject.getInt("idseries")
					, jsonObject.getInt("idbasetext"), arrsutta, request.getRealPath("/")+"word.docx", jsonObject.getInt("excluding"));
			if(ukitsdBean.getValue().endsWith("true")){
				out.print(gson.toJson(request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/word.docx"));
			}else
				out.print(gson.toJson(ukitsdBean));
		}catch(Exception e){
			e.printStackTrace();
			out.print(gson.toJson(ukitsdBean));
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonObject=null; gson=null; arrsutta=null; jsonArray=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConMp);
		}
	}
}
