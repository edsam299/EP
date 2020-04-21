package ukitsd.testservice;



import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.NamingException;

import ukitsd.editing.connection.ConnectionFactory;
import ukitsd.exception.UKITSDException;


public class Test {

	/**
	 * @param args
	 * @throws UKITSDException 
	 * @throws NamingException 
	 * @throws SQLException 
	 */
	public static void main(String[] args) throws UKITSDException {
//		System.out.println(ukitsd.common.Interchange.U2U("\u0073\u0061\u006d\u006d\u0101\u0073\u0061\u006d\u0062\u0075\u0064\u0064\u0068\u0061\u0073\u0073\u0061"));
		 Connection oConMp = null; Connection oConEp = null; Connection oConEph = null;
//		oConEp = ConnectionFactory.getConnectionEp();
//		oConEph =ConnectionFactory.getConnectionEph();
//		oConMp = ConnectionFactory.getConnectionItap();
		Connection conn=ConnectionFactory.getConnectionPostgres();
		try {
			System.out.println(conn);
			Statement stmt=conn.createStatement();
			ResultSet rs=stmt.executeQuery("select detail from config");
			while(rs.next()) {
				System.out.println(rs.getString("detail"));
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
//		new UserService().searchUserDetailFromMP(oConEp, oConEph, oConMp, "1");
	}
}
