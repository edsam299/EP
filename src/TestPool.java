//import org.apache.tomcat.jdbc.pool.PoolProperties;
//import java.sql.Connection;
//import java.sql.ResultSet;
//import java.sql.Statement;
//
//import org.apache.tomcat.jdbc.pool.DataSource;
//
//public class TestPool {
//	 public static void main(String[] args) throws Exception {
//         PoolProperties p = new PoolProperties();
//         p.setUrl("jdbc:jtds:sqlserver:/localhost:1433/ITAP");
//         p.setDriverClassName("net.sourceforge.jtds.jdbc.Driver");
//         p.setUsername("sa");
//         p.setPassword("1234");
//         p.setJmxEnabled(true);
//         p.setTestWhileIdle(false);
//         p.setTestOnBorrow(true);
//         p.setValidationQuery("SELECT 1");
//         p.setTestOnReturn(false);
//         p.setValidationInterval(30000);
//         p.setTimeBetweenEvictionRunsMillis(30000);
//         p.setMaxActive(100);
//         p.setInitialSize(10);
//         p.setMaxWait(10000);
//         p.setRemoveAbandonedTimeout(60);
//         p.setMinEvictableIdleTimeMillis(30000);
//         p.setMinIdle(10);
//         p.setLogAbandoned(true);
//         p.setRemoveAbandoned(true);
//         p.setJdbcInterceptors("org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
//           "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");
//         DataSource datasource = new DataSource();
//         datasource.setPoolProperties(p); 
//         
//         Connection con = null;
//         try {
//           con = datasource.getConnection();
//           Statement st = con.createStatement();
//           ResultSet rs = st.executeQuery("select * from editiontext");
//           int cnt = 1;
//           while (rs.next()) {
//               System.out.println((cnt++)+". Host:" +rs.getString("fcdcicode"));
//           }
//           rs.close();
//           st.close();
//         } finally {
//           if (con!=null) try {con.close();}catch (Exception ignore) {}
//         }
//     }
//}
