package ukitsd.editing.connection;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.jolbox.bonecp.BoneCPDataSource;

public final class SQLCONNECT {
	 
    public static Context initialContext;
    public static Context initialContextep;
    public static DataSource dsEp;
    public static DataSource dsEph;
    public static DataSource dsItap;
    static {
        try {
//        	System.out.println("dsItap "+dsItap);
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
        BoneCPDataSource ds = new BoneCPDataSource();
        ds.setJdbcUrl("jdbc:jtds:sqlserver:/localhost:1433/ITAP");
        ds.setUsername("sa");
        ds.setPassword("12345ab+");
        ds.setMinConnectionsPerPartition(5);
        ds.setMaxConnectionsPerPartition(10);
        ds.setPartitionCount(1);
        ds.setConnectionHook(new DatabaseShutdownHook());// Required only if you need notifications.
        ds.setTransactionRecoveryEnabled(true);// Important: This should be enabled
        ds.setIdleMaxAge(1);
        ds.setAcquireRetryAttempts(10);//default is 5
        ds.setAcquireRetryDelay(10000);// default is 7 secs
        ds.setReleaseHelperThreads(5);
 
        Connection con = ds.getConnection();
        if (con != null) {
            initialContext.rebind("UEDataSourceItap", ds);
            dsItap=(DataSource)SQLCONNECT.initialContext.lookup("UEDataSourceItap");
            con.close();
        }
        
        BoneCPDataSource dsep = new BoneCPDataSource();
        dsep.setJdbcUrl("jdbc:jtds:sqlserver:/localhost:1433/EP");
        dsep.setUsername("sa");
        dsep.setPassword("12345ab+");
        dsep.setMinConnectionsPerPartition(5);
        dsep.setMaxConnectionsPerPartition(10);
        dsep.setPartitionCount(1);
        ds.setConnectionHook(new DatabaseShutdownHook());// Required only if you need notifications.
        dsep.setTransactionRecoveryEnabled(true);// Important: This should be enabled
        dsep.setAcquireRetryAttempts(10);//default is 5
        dsep.setAcquireRetryDelay(10000);// default is 7 secs
        dsep.setReleaseHelperThreads(5);
        con = dsep.getConnection();
        if (con != null) {
//        	System.out.println("UEDataSourceEp wwww"+dsep);
            initialContext.rebind("UEDataSourceEp", dsep);
            dsEp=(DataSource)SQLCONNECT.initialContext.lookup("UEDataSourceEp");
            con.close();
        }
        
        BoneCPDataSource dseph = new BoneCPDataSource();
        dseph.setJdbcUrl("jdbc:jtds:sqlserver:/localhost:1433/EPH");
        dseph.setUsername("sa");
        dseph.setPassword("12345ab+");
        dseph.setMinConnectionsPerPartition(5);
        dseph.setMaxConnectionsPerPartition(10);
        dseph.setPartitionCount(1);
        ds.setConnectionHook(new DatabaseShutdownHook());// Required only if you need notifications.
        dseph.setTransactionRecoveryEnabled(true);// Important: This should be enabled
        dseph.setAcquireRetryAttempts(10);//default is 5
        dseph.setAcquireRetryDelay(10000);// default is 7 secs
        dseph.setReleaseHelperThreads(5);
        con = dseph.getConnection();

        if (con != null) {
            initialContext.rebind("UEDataSourceEph", dseph);
            dsEph=(DataSource)SQLCONNECT.initialContext.lookup("UEDataSourceEph");
            con.close();
        }
//        System.out.println("DataSource configured.");
    }
 
//    public static void main(String[] args) throws Exception {
//    	SQLCONNECT.initializeDataSource();
//    	DataSource ds = (DataSource)initialContext.lookup("UEDataSourceEp");
//    	for(int i=0; i<10; i++){        	
//        	Connection conn = ds.getConnection();
//        	conn.close();
//        	System.out.println(conn);
//    	}
//    }
}