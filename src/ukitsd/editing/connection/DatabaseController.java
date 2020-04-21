package ukitsd.editing.connection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;


// for BoneCp connection pool:
import com.jolbox.bonecp.BoneCP;
import com.jolbox.bonecp.BoneCPConfig;

public class DatabaseController
{

    /**********************************************************************
     *
     * ATTRIBUTES
     *
     **********************************************************************/

   // variables for db connection pooling:
      BoneCP connectionPool = null;

   // db configuration variables:
       private static String dbName="", dbDriver="", dbHost="", dbPort="", dbUser="", dbDriverPath="", dbUserPassword="", dbConnectionEncoding="";


    /**
     * Stores the connection
     */
    public Connection databaseConnection;

    /**
     * Stores the database structure
     */
    private LinkedList databaseTables;



    /**********************************************************************
     *
     * OPERATIONS
     *
     **********************************************************************/


    /**
     * Connect to the database
     *
     * @return true when connection successful.
     */


    public DatabaseController ()
    {
        // default values for the connection

   // getting the connection data from the "settings" bean:
      // creating an instance of "settings":
//         settings settingsData = new settings();

      // getting the connection data:
//         dbDriverPath=settingsData.getDbDriverPath();
//         dbDriver=settingsData.getDbDriver();
//         dbHost=settingsData.getDbHost();
//         dbName=settingsData.getDbName();
//         dbUser=settingsData.getDbUser();
//         dbUserPassword=settingsData.getDbUserPassword();
//         dbPort=settingsData.getDbPort();
//         dbConnectionEncoding=settingsData.getDbConnectionEncoding();

        // databaseConnection = null;
        // databaseTables = new LinkedList();

    }


    /**
     *
     * @throws SQLException when connection failed
     *
     */
    public boolean connectDb ()
        throws SQLException
    {


   try
       {
      // DriverManager.registerDriver(new com.mysql.jdbc.Driver());
                Class.forName(dbDriverPath).newInstance();

      } catch (Exception ex)
      {
        ex.printStackTrace();
        return false;
       }


   try
       {

         // setup the connection pool
         BoneCPConfig config = new BoneCPConfig();
         // config.setJdbcUrl("jdbc:hsqldb:mem:test"); // jdbc url specific to your database, eg jdbc:mysql://127.0.0.1/yourdb
         // config.setJdbcUrl(dbDriver+"://" + dbHost+":"+dbPort+"/"+ dbName+"?autoReconnect=true"+dbConnectionEncoding); // jdbc url specific to your database, eg jdbc:mysql://127.0.0.1/yourdb
         config.setJdbcUrl(dbDriver+"://" + dbHost+":"+dbPort+"/"+ dbName); // jdbc url specific to your database, eg jdbc:mysql://127.0.0.1/yourdb


         config.setUsername(dbUser);
         config.setPassword(dbUserPassword);
         connectionPool = new BoneCP(config); // setup the connection pool

         databaseConnection = connectionPool.getConnection(); // fetch a connection

         return true;

         //   conn = DriverManager.getConnection( dbDriver+"://" + dbHost+":"+dbPort+"/"+ dbName+"?autoReconnect=true"+dbConnectionEncoding, dbUser, dbUserPassword);

      } catch (SQLException ex)
      {
        ex.printStackTrace();
        return false;
       }


    }


    /**
     * Check if there is a connection with the database
     *
     * @return true when connection is alived
     */
    public boolean isConnected ()
    {

        return ( databaseConnection != null ? true : false );

    }


    /**
     * Execute a SQL Query
     *
     * @param sql represents the sql query
     * @return true when the query has been executed successfully
     */
    public boolean sqlExecute ( String sql )
        throws Exception
    {
        if ( databaseConnection == null )
        {
            throw new Exception( "SQL: no connection to the database!" );
        }

        if ( ( sql == null ) || ( sql.equals( "" ) ) )
        {
            throw new Exception( "SQL: no sql query!" );
        }

        Statement stmt = databaseConnection.createStatement();

        try
        {
            stmt.execute( sql );
            stmt.close();
        }

        catch (SQLException e)
        {

            return false;
        }


        return true;

    }






    /**
     * Execute a SQL Query
     *
     * @return true when successfully execution
     * @throws SQLException
     */
    public ResultSet sqlQuery ( String query )
        throws SQLException
    {

        // initializing the resulset
        ResultSet res = null;

        try
        {
            Statement stmt = databaseConnection.createStatement();

            res = stmt.executeQuery( query );
            stmt.close();
        }
        catch ( SQLException e )
        {
            throw new SQLException( e.getMessage() );
        }

        return res;

    }







    /**
     * Close the database connection
     *
     * @return true when connection close successfully
     */
    public boolean closeDb ()
        throws SQLException
    {

         connectionPool.shutdown(); // shutdown connection pool.


         if (databaseConnection != null)
          {
            try
            {
               databaseConnection.close();
            } catch (SQLException e)
            {
               e.printStackTrace();
               return false;
            }

          }
        return true;

    }


}
