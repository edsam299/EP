import com.google.gson.GsonBuilder;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.editing.menuservice.MenuManagementService;
import ukitsd.exception.UkitSDBean;



public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		java.util.List<UserBean> user=null;
			try {
//				UkitSDBean ukit=new UserService().searchAllUser(ConnectionFactory.getConnectionItap(), ConnectionFactory.getConnectionEp());
//				java.util.List<UserBean> user=(java.util.List<UserBean>) new UserService().searchAllUser(ConnectionFactory.getConnectionItap(), ConnectionFactory.getConnectionEp()).getData();
//				System.out.println(user.get(0).getFirstname());
//				System.out.println(new ContentService());
//				Gson gson=new GsonBuilder().serializeNulls().disableHtmlEscaping().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
//				System.out.println(gson.toJson(new ContentService().searchComment(ConnectionFactory.getConnectionItap(), ConnectionFactory.getConnectionEp(), "DN02000140002709")));
//				System.out.println(new  ItapSoapProxy().passEncrypt("test"));
//				System.out.println(new ItapSoapProxy().passDecrypt("hU8JZKqS4ESFrBpptetAKw=="));
//				System.out.println(gson.toJson(new CesearchService().getTexts2Search(ConnectionFactory.getConnectionItap(),
//						ConnectionFactory.getConnectionEp())));
//				UkitSDBean ukitSDBean=new Report_WordService().getWordList(ConnectionFactory.getConnectionEp(), ConnectionFactory.getConnectionEph(), "14,16", "", 1);
//				List<Report_WordBean> report_WordBean=(List<Report_WordBean>) ukitSDBean.getData();
//				for(Report_WordBean rpt:report_WordBean){
//					System.out.println(rpt.getWord());
//				}
//				  Connection oConnItap=ConnectionFactory.getConnectionItap();
//				  Connection oConEp=ConnectionFactory.getConnectionEp();
//				  Connection oConEph=ConnectionFactory.getConnectionEph();
//				  System.out.println(new Gson().toJson(new Report_WordService().getWordList(oConEp, oConEph,oConnItap, "14,16,17,18,19,20,21,22,23,15", "", 4)));
//				Connection con=ConnectionFactory.getConnectionPostgres();
//				Statement stmt=con.createStatement();
//				ResultSet rs=stmt.executeQuery("select * from test");
//				while(rs.next()){
//					System.out.println(rs.getString("id"));
//				}
//				con.close();
//				System.out.println(new MenuService().getMenuTree(ConnectionFactory.getConnectionItap()
//						, ConnectionFactory.getConnectionEp(), "<br>", 1, 2).getDescription());
//				System.out.println(new ImportFile().getSuttaTable(ConnectionFactory.getConnectionItap()
//						, ConnectionFactory.getConnectionEp(), "NKY000002").getObject());
				
				
//				BufferedReader br= new BufferedReader(new FileReader("d:\\jsonsbpdf.txt"));
//				String str=br.readLine();
//				System.out.println(str);
//				StringBuilder sb=new StringBuilder();
//				while((str=br.readLine())!=null){
//					System.out.println(str);
//					sb.append(str);
//				}
//				System.out.println(sb.toString());
//				System.out.println(br.readLine());
//				System.out.println(new Gson().toJson(br.readLine()));
//				System.out.println("end");
//				br.close();
				UkitSDBean xx=new MenuManagementService().searchMenuByIdRole(ConnectionFactory.getConnectionEp(), 1);
				System.out.println(new GsonBuilder().serializeNulls().create().toJson(xx));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}

}
