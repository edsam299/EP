package ukitsd.editing.connection;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBUtil {
	public static void close(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
                connection=null;
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
 
    public static void close(Statement statement) {
        if (statement != null) {
            try {
                statement.close();
                statement=null;
            } catch (SQLException e) {
               e.printStackTrace();
            }
        }
    }
 
    public static void close(ResultSet resultSet) {
        if (resultSet != null) {
            try {
                resultSet.close();
                resultSet=null;
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void close(PreparedStatement preparedStatement){
    	if(preparedStatement != null){
            try {
            	preparedStatement.close();
            	preparedStatement=null;
            } catch (SQLException e) {
                e.printStackTrace();
            }
    	}
    }
   
    public static void close(CallableStatement callableStatement){
    	if(callableStatement != null){
            try {
            	callableStatement.close();
            	callableStatement=null;
            } catch (SQLException e) {
                e.printStackTrace();
            }
    	}
    }
    
}
