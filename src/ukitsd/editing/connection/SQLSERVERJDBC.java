package ukitsd.editing.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import ukitsd.editing.properties.FileProperties;

public final class SQLSERVERJDBC {
	static Properties properties=FileProperties.getInstance().getConfigProperties();
	static Connection ocon=null;

	
	public static final Connection getITAPConnection(){
		try {
			Class.forName("net.sourceforge.jtds.jdbc.Driver");
			ocon = DriverManager.getConnection(properties.getProperty("iTAPDataSource"),properties.getProperty("iTAP_user"),properties.getProperty("iTAP_password"));
			return ocon;
		} catch (Exception ex) {
			return null;
		}finally{
			ocon=null;
		}
	}
	public static final Connection getEPConnection(){
		try {
			Class.forName("net.sourceforge.jtds.jdbc.Driver");
			ocon = DriverManager.getConnection(properties.getProperty("ePDataSource"),properties.getProperty("eP_user"),properties.getProperty("eP_password"));
			return ocon;
		} catch (Exception ex) {
			return null;
		}finally{
			ocon=null;
		}
	}
	public static final Connection getEPHConnection(){
		try {
			Class.forName("net.sourceforge.jtds.jdbc.Driver");
			ocon = DriverManager.getConnection(properties.getProperty("ePHDataSource"),properties.getProperty("ePH_user"),properties.getProperty("ePH_password"));
			return ocon;
		} catch (Exception ex) {
			return null;
		}finally{
			ocon=null;
		}
	}
	
	public static void main(String arg[]){
		try {
			for(int i=0; i<5; i++){
				System.out.println(SQLSERVERJDBC.getEPConnection());
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

