//import java.sql.Connection;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.sql.Statement;
//import javax.naming.NamingException;
//import javax.sql.DataSource;
//
////import com.google.common.base.Connect;
//
//import ukitsd.editing.connection.SQLCONNECT;;
//
//
//public class TestBoneCp {
//	public static void main(String a[]) throws NamingException, SQLException{
//		SQLCONNECT.initializeDataSource();
////    	System.out.println(System.getProperty(Context.INITIAL_CONTEXT_FACTORY));
////    	Context initContext = new InitialContext();
//////    	Context envContext  = (Context)initContext.lookup("java:/comp/env");
//////    	DataSource ds = (DataSource)envContext.lookup("jdbc/FluxDataSource");
////    	DataSource ds = (DataSource)SQLCONNECT.initialContext.lookup("UEDataSourceItap");
//    	Connection conn=SQLCONNECT.dsItap.getConnection();
//		Statement stmt = conn.createStatement();
//		ResultSet rs = stmt.executeQuery("select fcbaseid from editiontext"); // do something with the connection.
////		System.out.println(rs.getCursorName());
//		int cnt=0;	
//		while(rs.next()){
//			cnt++;
////			System.out.println(rs.getString("fcbaseid")); // should print out "1"'
//		}
//		conn.close();
//		System.out.println("ITAP "+cnt+" "+conn);
//		
//		conn=SQLCONNECT.dsEp.getConnection();
//		stmt=conn.createStatement();
//		rs = stmt.executeQuery("select * from role");
//		cnt=0;
//		while(rs.next()){
//			cnt++;
////			System.out.println(rs.getString(1));
//		}
//		System.out.println("EP "+cnt+" "+conn);
//		conn.close();
////    	for(int i=0; i<10; i++){        	
////        	conn = ds.getConnection();
////        	conn.close();
////        	System.out.println(conn);
////    	}
//	}
//}
