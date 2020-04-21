package ukitsd.editing.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import ukitsd.editing.properties.FileProperties;

public class SQLSERVERCONNECTION {
    
    private static Connection connectionitap;// = null;
    private static Connection connectionep;//= null;
    private static Connection connectioneph;// = null;
    private final static String ADRESS   = "";
    private final static String DATABASE = "";
//    private final static String USER     = "";
//    private final static String PASSWORD = "";
    private final static String PORT     = "";
    private final static String DRIVER   = "";
    static Properties properties=FileProperties.getInstance().getConfigProperties();
    /**
     * Method that loads the specified driver
     * 
     * @return void
     **/
    
    private static void loadDriver() {
        try {
        	Class.forName("net.sourceforge.jtds.jdbc.Driver");
        }
        catch (Exception e) {
            errorHandler("Failed to load the driver " + DRIVER, e);
        }
    }

    /**
     * Method that loads the connection into the right property
     * 
     * @return void
     **/
    
    private static void loadConnectionItap() {
        try {

        	connectionitap = DriverManager.getConnection(properties.getProperty("iTAPDataSource"),properties.getProperty("iTAP_user"),properties.getProperty("iTAP_password"));
        }
        catch (SQLException e) {
            errorHandler("Failed to connect to the database " + getFormatedUrl(), e);         
        }
    }
    private static void loadConnectionEp() {
        try {
        	connectionep = DriverManager.getConnection(properties.getProperty("ePDataSource"),properties.getProperty("eP_user"),properties.getProperty("eP_password"));
        }
        catch (SQLException e) {
            errorHandler("Failed to connect to the database " + getFormatedUrl(), e);         
        }
    }
    private static void loadConnectionEph() {
        try {
        	connectioneph = DriverManager.getConnection(properties.getProperty("ePHDataSource"),properties.getProperty("ePH_user"),properties.getProperty("ePH_password"));
        }
        catch (SQLException e) {
            errorHandler("Failed to connect to the database " + getFormatedUrl(), e);         
        }
    }
    /**
     * Method that shows the errors thrown by the singleton
     * 
     * @param  {String}    Message
     * @option {Exception} e
     * @return  void
     **/
    
    private static void errorHandler(String message, Exception e) {
        System.out.println(message);  
        if (e != null) System.out.println(e.getMessage());   
    }

    /**
     * Method that returns the formated URL to connect to the database
     * 
     * @return {String}
     **/
    
    private static String getFormatedUrl() {
        return ADRESS + ":" + PORT + "/" + DATABASE;
    }
    
    /**
     * Static method that returns the instance for the singleton
     * 
     * @return {Connection} connection
     **/
    
    public static Connection getConnectionItap() {
        try {
//        	System.out.println(connectionitap);
			if (connectionitap == null || connectionitap.isClosed()) {
//				System.out.println(connectionitap);
			    loadDriver();
			    loadConnectionItap();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//        System.out.println("connectionitap "+connectionitap);
        return connectionitap;
    }
    public static Connection getConnectionEp() {
        try {
			if (connectionep == null || connectionep.isClosed()) {
			    loadDriver();
			    loadConnectionEp();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//        System.out.println("connectionep "+connectionep);
        return connectionep;
    }
    public static Connection getConnectionEph() {
        try {
			if (connectioneph == null || connectioneph.isClosed()) {
			    loadDriver();
			    loadConnectionEph();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//        System.out.println("connectioneph "+connectioneph);
        return connectioneph;
    }
    
    /**
     * Static method that close the connection to the database
     * 
     * @return void
     **/
    
    public static void closeConnection() {
        if (connectionitap == null) {
            errorHandler("No connection found", null);
        }
        else {
            try {
            	connectionitap.close();
//            	connectionitap = null;
            }
            catch (SQLException e) {
                errorHandler("Failed to close the connection", e);
            }
        }
        if (connectionep == null) {
            errorHandler("No connection found", null);
        }
        else {
            try {
            	connectionep.close();
//            	connectionep = null;
            }
            catch (SQLException e) {
                errorHandler("Failed to close the connection", e);
            }
        }
        if (connectioneph == null) {
            errorHandler("No connection found", null);
        }
        else {
            try {
            	connectioneph.close();
//            	connectioneph = null;
            }
            catch (SQLException e) {
                errorHandler("Failed to close the connection", e);
            }
        }   
    }
}
