package ukitsd.ep.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.menuservice.MenuManagementService;
import ukitsd.editing.ui.table.ButtonBean;
import ukitsd.editing.ui.table.MenuBean;
import ukitsd.editing.ui.table.PageBean;
import ukitsd.editing.ui.table.RoleBean;
import ukitsd.exception.UkitSDBean;

import ukitsd.util.Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class ManageMenu
 */
public class ManageMenu extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ManageMenu() {
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
				act=request.getHeader("act");
			if(act.equals("searchAllRole")){
				searchAllRole(request, response);
			}else if(act.equals("searchMenuByIdRole")){
				searchMenuByIdRole(request, response);
			}else if(act.equals("searchPageByIdRoleIdMenu")){
				searchPageByIdRoleIdMenu(request, response);
			}else if(act.equals("searchButtonByIdRoleIdPage")){
				searchButtonByIdRoleIdPage(request, response);
			}else if(act.equals("saveMenu")){
				saveMenu(request, response);
			}else if(act.equals("savePageByIdRole")){
				savePageByIdRole(request, response);
			}else if(act.equals("saveButtonByIdRole")){
				saveButtonByIdRole(request, response);
			}else if(act.equals("searchButtonByIdRoleIdPageForActive")){
				searchButtonByIdRoleIdPageForActive(request, response);
			}else if(act.equals("loadMenu")){
				loadMenu(request, response);
			}else if(act.equals("searchMenuByIdRoleActive")){
				searchMenuByIdRoleActive(request, response);
			}else if(act.equals("searchPageByIdRoleIdMenuForActive")){
				searchPageByIdRoleIdMenuForActive(request, response);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			act=null;
		}
	}
	
	protected void searchAllRole(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		List<RoleBean> roleBean=null;
		Gson gson=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			menuManagementService.searchAllRole(oConEp, oConMp, oConEph);
//			menuManagementService.searchAllRole(oConMp, oConEp);
			out.print(gson.toJson(menuManagementService.searchAllRole(oConMp, oConEp)));
		}catch(Exception e){
			e.printStackTrace();
			out.print(roleBean);
		}finally{
			out.close();
			menuManagementService=null; roleBean=null; gson=null;
			Util.closeConnection(oConMp);
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	protected void searchMenuByIdRole(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConEp = null; Connection oConEph = null;
		List<MenuBean>  menuBean=null;
		Gson gson=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
//			menuBean=menuManagementService.searchMenuByIdRole(oConEp, oConEph, Integer.parseInt(request.getParameter("idrole")));
			
			out.print(gson.toJson(menuManagementService.searchMenuByIdRole(oConEp, Integer.parseInt(request.getParameter("idrole")))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(menuBean);
		}finally{
			out.close();
			menuManagementService=null; menuBean=null; gson=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	@SuppressWarnings("unchecked")
	protected void searchMenuByIdRoleActive(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConEp = null; Connection oConEph = null;
		List<MenuBean>  menuBean=null;
		List<MenuBean> arrMenu=null;
		Gson gson=null;
		UkitSDBean ukitSDBean=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService();
			gson = new Gson();
			arrMenu = new ArrayList<MenuBean>();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
//			menuBean=menuManagementService.searchMenuByIdRole(oConEp, oConEph, Integer.parseInt(request.getParameter("idrole")));
			ukitSDBean=menuManagementService.searchMenuByIdRole(oConEp, Integer.parseInt(request.getParameter("idrole")));
			if(ukitSDBean!=null){
				menuBean=(List<MenuBean>) ukitSDBean.getData();
				for(MenuBean menu:menuBean){
					if(menu.getStatus()==1)
						arrMenu.add(menu);
				}
			}
			out.print(gson.toJson(arrMenu));
		}catch(Exception e){
			e.printStackTrace();
			out.print(menuBean);
		}finally{
			out.close();
			menuManagementService=null; menuBean=null; gson=null; arrMenu=null; ukitSDBean =null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	protected void searchPageByIdRoleIdMenu(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		List<PageBean>  pageBean=null;
		Gson gson=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService(); 
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			menuManagementService.searchPageByIdRoleIdMenu(oConEp, Integer.parseInt(request.getSession().getAttribute("idrole").toString())
//					, Integer.parseInt(request.getParameter("idmenu")));
			out.print(gson.toJson(menuManagementService.searchPageByIdRoleIdMenu(oConEp, Integer.parseInt(request.getSession().getAttribute("idrole").toString())
					, Integer.parseInt(request.getParameter("idmenu")))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(pageBean);
		}finally{
			out.close();
			menuManagementService=null; pageBean=null; gson=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMp);
		}
	}
	
	@SuppressWarnings("unchecked")
	protected void searchPageByIdRoleIdMenuForActive(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		List<PageBean>  pageBean=null;
		List<PageBean> arrPage=null;
		UkitSDBean ukitSDBean =null; 
		Gson gson=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService(); 
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
			ukitSDBean=menuManagementService.searchPageByIdRoleIdMenu(oConEp, Integer.parseInt(request.getParameter("idrole"))
					, Integer.parseInt(request.getParameter("idmenu")));
			if(ukitSDBean!=null){
				pageBean=(List<PageBean>) ukitSDBean.getData();
				arrPage=new ArrayList<PageBean>();
				for(PageBean page:pageBean){
					if(page.getStatus()==1)
						arrPage.add(page);
				}
			}
			out.print(gson.toJson(arrPage));
		}catch(Exception e){
			e.printStackTrace();
			out.print(pageBean);
		}finally{
			out.close();
			menuManagementService=null; pageBean=null; gson=null; arrPage=null; ukitSDBean =null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMp);
		}
	}
	
	@SuppressWarnings("unchecked")
	protected void loadMenu(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConEp = null; Connection oConEph = null;
		List<MenuBean>  menuBean=null;
		UkitSDBean ukitSDBean=null;
		Gson gson=null;
		StringBuilder str=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService();
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			System.out.println(oConEp);
			oConEph =ConnectionFactory.getConnectionEph();
			System.out.println("role :"+request.getParameter("idrole"));
			ukitSDBean=menuManagementService.searchMenuByIdRole(oConEp, Integer.parseInt(request.getParameter("idrole")));
			System.out.println(new GsonBuilder().serializeNulls().create().toJson(ukitSDBean));
			if(ukitSDBean!=null){
				menuBean=(List<MenuBean>) ukitSDBean.getData();
				str=new StringBuilder();
		        str.append("<table style=\"margin-top: 10%\" align=\"center\"><tr><td>");
		        str.append("<div class=\"navigation\" align=\"center\"><ul>");
		        for(int i=0; i<menuBean.size(); i++){ 
		        	if(menuBean.get(i).getStatus()==1){
			        	if(i==5){
			        		str.append("</ul><br/></div></td></tr>" +
			        				"<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>"+
			        				"<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>"+
			        				"<tr><td><div class=\"navigation\" align=\"center\"><ul>");
			        		str.append(menuBean.get(i).getTag());
			        	}else{
			        		str.append(menuBean.get(i).getTag());
			        	}	
		        	}
		        }
		        str.append("</ul><br/></div></td></tr></table>");		        
			}
			
			out.print(gson.toJson(str.toString()));
		}catch(Exception e){
			e.printStackTrace();
			out.print(menuBean);
		}finally{
			out.close();
			menuManagementService=null; menuBean=null; gson=null; ukitSDBean =null;
			str.setLength(0); str=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
		}
	}
	
	protected void searchButtonByIdRoleIdPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		List<ButtonBean> buttonBean=null;
		Gson gson=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService(); 
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			buttonBean=menuManagementService.searchButtonByIdRoleIdPage(oConEp, oConEph, oConMp, Integer.parseInt(request.getParameter("idrole"))
//					, Integer.parseInt(request.getParameter("idpage")));
			out.print(gson.toJson(menuManagementService.searchButtonByIdRoleIdPage(oConEp, Integer.parseInt(request.getParameter("idrole"))
					, Integer.parseInt(request.getParameter("idpage")))));
		}catch(Exception e){
			e.printStackTrace();
			out.print(buttonBean);
		}finally{
			out.close();
			menuManagementService=null; buttonBean=null; gson=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMp);
		}
	}
	
	@SuppressWarnings("unchecked")
	protected void searchButtonByIdRoleIdPageForActive(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		List<ButtonBean> buttonBean=null;
		List<ButtonBean> arrButtonActive = null;
		Gson gson=null;
		UkitSDBean ukitSDBean=null;
		try{
			out=response.getWriter();
			menuManagementService=new MenuManagementService(); 
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
			ukitSDBean=menuManagementService.searchButtonByIdRoleIdPage(oConEp, Integer.parseInt(request.getParameter("idrole"))
					, Integer.parseInt(request.getParameter("idpage")));
			if(ukitSDBean!=null){
				arrButtonActive=new ArrayList<ButtonBean>();
				buttonBean=(List<ButtonBean>) ukitSDBean.getData();
				for(ButtonBean bt:buttonBean){
					if(bt.getStatus()==1)
						arrButtonActive.add(bt);
					System.out.println(bt.getDiv()+" "+bt.getId()+" "+bt.getName());
				}
			}
			out.print(gson.toJson(arrButtonActive));
		}catch(Exception e){
			e.printStackTrace();
			out.print(buttonBean);
		}finally{
			out.close();
			menuManagementService=null; buttonBean=null; gson=null; arrButtonActive=null; ukitSDBean =null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMp);
		}
	}
	
	protected void saveMenu(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		Gson gson=null;
		JSONArray jsonArray = null;
		JSONArray arrMenu = null;
		JSONObject jsonObject = null;
		int idrole=0;
		UkitSDBean ukitSDBean = null;
		MenuBean menuBean=null;
		List<MenuBean> arrMenuBean = null;
		try{
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();
			arrMenuBean = new ArrayList<MenuBean>();
			temp_="";
			while((temp_=br.readLine())!=null){
				sb.append(temp_);
			}
			jsonArray=JSONArray.fromObject(sb.toString());
			for(int i=0; i<jsonArray.size(); i++){
				jsonObject = JSONObject.fromObject(jsonArray.get(i));
				idrole=jsonObject.getInt("idrole");
				arrMenu=JSONArray.fromObject(jsonObject.getString("menu"));
				for(int j=0; j<arrMenu.size(); j++){
					jsonObject = JSONObject.fromObject(arrMenu.get(j));
					menuBean = new MenuBean();
					menuBean.setIdmenu(jsonObject.getInt("id"));
					menuBean.setStatus(jsonObject.getInt("status"));
					arrMenuBean.add(menuBean);
					menuBean=null;
				}
			}
			menuManagementService=new MenuManagementService(); 
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			ukitSDBean=menuManagementService.saveMenuByIdrole(oConEp, oConEph, oConMp, arrMenuBean, idrole);
			out.print(gson.toJson(menuManagementService.saveMenuByIdrole(oConEp, arrMenuBean, idrole))); 
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close(); reader.close(); br.close(); sb.setLength(0);
			menuManagementService=null; ukitSDBean=null; gson=null; out=null; reader=null; br=null; sb=null;
			temp_=null; jsonArray.clear(); jsonArray=null; jsonObject.clear(); jsonObject=null;
			arrMenuBean.clear(); arrMenuBean=null; menuBean=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMp);
		}
	}
	
	protected void savePageByIdRole(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		Gson gson=null;
		JSONArray jsonArray = null;
		JSONArray arrPage = null;
		JSONObject jsonObject = null;
		int idrole=0;
		UkitSDBean ukitSDBean = null;
		PageBean pageBean = null;
		List<PageBean> arrPageBean = new ArrayList<PageBean>();
		try{
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();
			temp_="";
			while((temp_=br.readLine())!=null){
				sb.append(temp_);
			}
			jsonArray=JSONArray.fromObject(sb.toString());
			for(int i=0; i<jsonArray.size(); i++){
				jsonObject = JSONObject.fromObject(jsonArray.get(i));
				idrole=jsonObject.getInt("idrole");
				arrPage=JSONArray.fromObject(jsonObject.getString("page"));
				for(int j=0; j<arrPage.size(); j++){
					jsonObject = JSONObject.fromObject(arrPage.get(j));
					pageBean = new PageBean();
					pageBean.setId(jsonObject.getInt("id"));
					pageBean.setStatus(jsonObject.getInt("status"));
					arrPageBean.add(pageBean);
					pageBean=null;
				}
			}
			menuManagementService=new MenuManagementService(); 
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			ukitSDBean=menuManagementService.savePageByIdRole(oConEp, oConEph, oConMp, arrPageBean, idrole);
			out.print(gson.toJson(menuManagementService.savePageByIdRole(oConEp, idrole, arrPageBean))); 
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close(); reader.close(); br.close(); sb.setLength(0);
			menuManagementService=null; ukitSDBean=null; gson=null; out=null; reader=null; br=null; sb=null;
			temp_=null; jsonArray.clear(); jsonArray=null;  jsonObject.clear(); jsonObject=null; pageBean=null; arrPageBean.clear(); arrPageBean=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMp);
		}
	}
	
	protected void saveButtonByIdRole(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=null;
		InputStreamReader reader=null;
		BufferedReader br=null;
		StringBuilder sb=null;
		String temp_=null;
		MenuManagementService menuManagementService=null;
		Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
		Gson gson=null;
		JSONArray jsonArray = null;
		JSONArray arrButton = null;
		JSONObject jsonObject = null;
		int idrole=0;
		UkitSDBean ukitSDBean = null;
		ButtonBean buttonBean=null;
		List<ButtonBean> arrButtonBean = null;
		try{
			out=response.getWriter();
			reader = new InputStreamReader(request.getInputStream(),"UTF8");
			br = new BufferedReader(reader);
			sb = new StringBuilder();
			temp_="";
			while((temp_=br.readLine())!=null){
				sb.append(temp_);
			}
			arrButtonBean = new ArrayList<ButtonBean>();
			jsonArray=JSONArray.fromObject(sb.toString());
			for(int i=0; i<jsonArray.size(); i++){
				jsonObject = JSONObject.fromObject(jsonArray.get(i));
				idrole=jsonObject.getInt("idrole");
				arrButton=JSONArray.fromObject(jsonObject.getString("button"));
				for(int j=0; j<arrButton.size(); j++){
					jsonObject = JSONObject.fromObject(arrButton.get(j));
					buttonBean = new ButtonBean();
					buttonBean.setId(jsonObject.getInt("id"));
					buttonBean.setStatus(jsonObject.getInt("status"));
					arrButtonBean.add(buttonBean);
					buttonBean=null;
				}
			}
			menuManagementService=new MenuManagementService(); 
			gson = new Gson();
			oConEp = ConnectionFactory.getConnectionEp();
			oConEph =ConnectionFactory.getConnectionEph();
			oConMp = ConnectionFactory.getConnectionItap();
//			ukitSDBean=menuManagementService.saveButtonByIdRole(oConEp, arrButtonBean, idrole);
//			menuManagementService.saveButtonByIdRole(oConEp, arrButtonBean, idrole);
			out.print(gson.toJson(menuManagementService.saveButtonByIdRole(oConEp, arrButtonBean, idrole))); 
		}catch(Exception e){
			e.printStackTrace();
			out.print(ukitSDBean);
		}finally{
			out.close(); reader.close(); br.close(); sb.setLength(0);
			menuManagementService=null; ukitSDBean=null; gson=null; out=null; reader=null; br=null; sb=null;
			temp_=null; jsonArray.clear(); jsonArray=null; arrButtonBean.clear(); arrButtonBean=null; jsonObject.clear(); jsonObject=null;
			buttonBean=null;
			Util.closeConnection(oConEp);
			Util.closeConnection(oConEph);
			Util.closeConnection(oConMp);
		}
	}
}
