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
import ukitsd.editing.saveservice.E2SaveService;
import ukitsd.exception.UkitSDBean;
import ukitsd.util.Util;

import com.google.gson.Gson;

/**
 * Servlet implementation class SaveE2
 */
public class SaveE2 extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveE2() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_ =null;
		JSONArray jsonArray = null;
		JSONObject jsonObject = null;
		String pattern[]=null;
		String fcrid=null;
		int idcomment=0;
		String comment=null;
		String pattern_=null;
		int iduser=0;
		int idpage=0;
		Gson gson=null;
		Connection oConEp=null; Connection oConMp=null;
		try{
			out=response.getWriter();
			oConEp = ConnectionFactory.getConnectionEp();
			oConMp = ConnectionFactory.getConnectionItap();
			oConEp.setAutoCommit(false); oConMp.setAutoCommit(false);
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
				pattern_=jsonObject.getString("pattern");
				fcrid=jsonObject.getString("fcrid");
				idcomment=jsonObject.getInt("idcomment");
				comment=jsonObject.getString("comment");
				iduser=jsonObject.getInt("iduser");
				idpage=jsonObject.getInt("idpage");
			}
			if(!pattern_.equals("null")){
				jsonArray=JSONArray.fromObject(pattern_.toString());
				pattern=new String[jsonArray.size()];
				for(int i=0; i<jsonArray.size(); i++){
					pattern[i]=jsonArray.get(i).toString().replaceAll("\"", "");
				}
			}else{
				pattern=null;
			}
			gson = new Gson();
//			System.out.println(gson.toJson(pattern));
//			UkitSDBean ukitSDBean=new SaveService().saveE2(oConEp, oConEph, oConMp, fcrid, pattern, idcomment, comment, iduser, idpage);
			UkitSDBean  ukitsdBean=new E2SaveService().save(oConMp, oConEp, fcrid, pattern, idcomment, comment, iduser, idpage);
			oConEp.commit(); oConMp.commit();
			out.print(gson.toJson(ukitsdBean));
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			out.close();
			br.close();
			reader.close();
			out=null; reader=null; br=null; sb=null; temp_=null; jsonArray=null; jsonObject=null;
			pattern=null; fcrid=null; gson=null; comment=null; pattern_=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConMp);
		}
	}

}
