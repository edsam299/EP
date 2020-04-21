package ukitsd.editing.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import ukitsd.editing.connection.FileProperties;

import ukitsd.exception.ErrorCode;
import ukitsd.exception.UKITSDException;



public class ConnectionFactory {
    private static ConnectionFactory instance = new ConnectionFactory();
    static Properties properties=FileProperties.getInstance().getConfigProperties();
    private static Connection itapConnection=null;
    private static Connection epConnection;
    private static Connection ephConnection=null;
    private static Connection postgresConnection=null;
    
    private ConnectionFactory() {
        try {
             Class.forName("net.sourceforge.jtds.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
     
    private Connection createConnectionSc() throws UKITSDException {
        Connection connection = null;
        try {
        	connection = DriverManager.getConnection(properties.getProperty("SCDataSource"),properties.getProperty("SC_user"),properties.getProperty("SC_password"));
        } catch (Exception e) {
                throw new UKITSDException("ConnectionFactory", "createConnectionSc", e,ErrorCode.CANNOTCONNECTDB);
        }
        return connection;
    }   
     private Connection createConnectionItap() throws UKITSDException {
        try {
//        	if(itapConnection==null){
        		itapConnection = DriverManager.getConnection(properties.getProperty("ItapDataSource"),properties.getProperty("Itap_user"),properties.getProperty("Itap_password"));
//        	}
        	return itapConnection;
        } catch (Exception e) {
                throw new UKITSDException("ConnectionFactory", "createConnectionSc", e,ErrorCode.CANNOTCONNECTDB);
        }
        
    }    
     private Connection createConnectionEp() throws UKITSDException {
        try {
//        	if(epConnection==null){
        		epConnection = DriverManager.getConnection(properties.getProperty("ePDataSource"),properties.getProperty("eP_user"),properties.getProperty("eP_password"));	
//        	}        	
        	return epConnection;
        } catch (Exception e) {
                throw new UKITSDException("ConnectionFactory", "createConnectionEP", e,ErrorCode.CANNOTCONNECTDB);
        }
        
    }    
      private Connection createConnectionEph() throws UKITSDException {
          try {
//        	  if(ephConnection==null){
        		  ephConnection = DriverManager.getConnection(properties.getProperty("EphDataSource"),properties.getProperty("Eph_user"),properties.getProperty("Eph_password"));
//        	  }
          } catch (Exception e) {
                  throw new UKITSDException("ConnectionFactory", "createConnectionEph", e,ErrorCode.CANNOTCONNECTDB);
          }
          return ephConnection;
      }  
      
      private Connection createConnectionPostgres() throws UKITSDException {
          try {
//        	 if(postgresConnection==null){
        		 postgresConnection = DriverManager.getConnection(properties.getProperty("postgres_ds"),properties.getProperty("postgres_user"),properties.getProperty("postgres_password"));
//        	 }
          } catch (Exception e) {
                  throw new UKITSDException("ConnectionFactory", "createConnectionPostgres", e,ErrorCode.CANNOTCONNECTDB);
          }
          return postgresConnection ;
      }  
    public static Connection getConnectionSc() throws UKITSDException {
        return instance.createConnectionSc();
    }
    public static Connection getConnectionEp() throws UKITSDException {
        return instance.createConnectionEp();
    }
    public static Connection getConnectionEph() throws UKITSDException {
        return instance.createConnectionEph();
    }
    public static Connection getConnectionItap() throws UKITSDException {
        return instance.createConnectionItap();
    }
    public static Connection getConnectionPostgres() throws UKITSDException {
        return instance.createConnectionPostgres();
    }
    public static void closeConnection(Connection oConn){
		if (oConn != null) {
			try { oConn.close(); oConn = null;} catch (SQLException e) {				
			}oConn = null;
		}
    }
    
    public static void closeResultSet(ResultSet rs){
		if (rs!=null) {
			try { rs.close(); rs = null;} catch (SQLException e) {
			}rs = null;
		}	
    }
    
    public static void closeStatement(Statement stmt){
		if (stmt!=null) {
			try { stmt.close(); stmt=null;} catch (SQLException e) {
			}stmt = null;
		}	
    }
    
    public static void closePreparedStatement(PreparedStatement pstmt){
		if (pstmt!=null) {
			try { pstmt.close(); pstmt=null;} catch (SQLException e) {
			}pstmt = null;
		}	
    }
    
    public static void rollBack(Connection oConn){
		if (oConn!=null) {
			try { oConn.rollback();} catch (SQLException e) {
			}oConn = null;
		}	
    }
}