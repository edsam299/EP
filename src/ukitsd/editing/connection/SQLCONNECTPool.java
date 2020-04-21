package ukitsd.editing.connection;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.jolbox.bonecp.BoneCP;
import com.jolbox.bonecp.BoneCPConfig;
import com.jolbox.bonecp.BoneCPDataSource;

public final class SQLCONNECTPool {
	 
    public static Context initialContext;
    public static Context initialContextep;
    public static BoneCPConfig dsEp;
    public static BoneCPConfig dsEph;
    public static BoneCPConfig dsItap;
    public static BoneCP connectionpool=null;
    public static BoneCP connectionpool1=null;
    public static BoneCP connectionpool2=null;
    static {
        try {
            System.setProperty(Context.INITIAL_CONTEXT_FACTORY, "org.apache.naming.java.javaURLContextFactory");
            System.setProperty(Context.URL_PKG_PREFIXES, "org.apache.naming");
            initialContext = new InitialContext();
            initializeDataSource();
        } catch (NamingException e) {
            // log exception
        } catch (SQLException e) {
            // log exception
        }
    }
 
    @SuppressWarnings("deprecation")
	public static void initializeDataSource()  throws NamingException, SQLException {
    	try {
			Class.forName("net.sourceforge.jtds.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	BoneCPConfig ds = new BoneCPConfig();
        ds.setJdbcUrl("jdbc:jtds:sqlserver:/localhost:1433/ITAP");
        ds.setUsername("sa");
        ds.setPassword("1234");
        ds.setMinConnectionsPerPartition(5);
        ds.setMaxConnectionsPerPartition(10);
        ds.setPartitionCount(1);
        ds.setConnectionHook(new DatabaseShutdownHook());// Required only if you need notifications.
        ds.setTransactionRecoveryEnabled(true);// Important: This should be enabled
        ds.setAcquireRetryAttempts(10);//default is 5
        ds.setAcquireRetryDelay(10000);// default is 7 secs
        ds.setReleaseHelperThreads(5);
        connectionpool=new BoneCP(ds);
        Connection con = connectionpool.getConnection();
        if (con != null) {
            initialContext.rebind("UEDataSourceItap", ds);
            dsItap=(BoneCPConfig)SQLCONNECTPool.initialContext.lookup("UEDataSourceItap");
//            con.close();
//            connectionpool.shutdown();
        }
        
        BoneCPConfig dsep = new BoneCPConfig();
        dsep.setJdbcUrl("jdbc:jtds:sqlserver:/localhost:1433/EP");
        dsep.setUsername("sa");
        dsep.setPassword("1234");
        dsep.setMinConnectionsPerPartition(5);
        dsep.setMaxConnectionsPerPartition(10);
        dsep.setPartitionCount(1);
        ds.setConnectionHook(new DatabaseShutdownHook());// Required only if you need notifications.
        dsep.setTransactionRecoveryEnabled(true);// Important: This should be enabled
        dsep.setAcquireRetryAttempts(10);//default is 5
        dsep.setAcquireRetryDelay(10000);// default is 7 secs
        dsep.setReleaseHelperThreads(5);
        connectionpool1=new BoneCP(dsep);
        con = connectionpool1.getConnection();
        if (con != null) {
//        	System.out.println("UEDataSourceEp "+dsep);
            initialContext.rebind("UEDataSourceEp", dsep);
            dsEp=(BoneCPConfig) SQLCONNECTPool.initialContext.lookup("UEDataSourceEp");
//            connectionpool1.shutdown();
//            con.close();
        }
        
        BoneCPConfig dseph = new BoneCPConfig();
        dseph.setJdbcUrl("jdbc:jtds:sqlserver:/localhost:1433/EPH");
        dseph.setUsername("sa");
        dseph.setPassword("1234");
        dseph.setMinConnectionsPerPartition(5);
        dseph.setMaxConnectionsPerPartition(10);
        dseph.setPartitionCount(1);
        ds.setConnectionHook(new DatabaseShutdownHook());// Required only if you need notifications.
        dseph.setTransactionRecoveryEnabled(true);// Important: This should be enabled
        dseph.setAcquireRetryAttempts(10);//default is 5
        dseph.setAcquireRetryDelay(10000);// default is 7 secs
        dseph.setReleaseHelperThreads(5);
        connectionpool2=new BoneCP(dseph);
        con = connectionpool2.getConnection();;

        if (con != null) {
            initialContext.rebind("UEDataSourceEph", dseph);
            dsEph=(BoneCPConfig)SQLCONNECTPool.initialContext.lookup("UEDataSourceEph");
//            connectionpool2.shutdown();
//            con.close();
        }
//        System.out.println("DataSource configured.");
    }
 
    public static void closeConnection() throws NamingException, SQLException{
//    	connectionpool.shutdown();
//    	connectionpool.close();
//    	connectionpool1.shutdown();
//    	connectionpool1.close();
//    	connectionpool2.shutdown();
//    	connectionpool2.close();
//    	initializeDataSource();
    }
    public static void main(String[] args) throws Exception {
    	SQLCONNECTPool.initializeDataSource();
    	DataSource ds = (DataSource)initialContext.lookup("UEDataSourceEp");
    	for(int i=0; i<10; i++){        	
        	Connection conn = ds.getConnection();
        	conn.close();
//        	System.out.println(conn);
    	}
    }
}