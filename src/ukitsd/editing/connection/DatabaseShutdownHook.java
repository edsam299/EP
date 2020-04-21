package ukitsd.editing.connection;


import com.jolbox.bonecp.ConnectionHandle;
import com.jolbox.bonecp.hooks.AbstractConnectionHook;
import com.jolbox.bonecp.hooks.AcquireFailConfig;

public class DatabaseShutdownHook extends AbstractConnectionHook {
    @Override
    public boolean onConnectionException(ConnectionHandle connection, String state, Throwable t) {
        // handle notifications here: SNMP or SMTP
//        System.out.println("Database down at " + System.currentTimeMillis());
        		;
        return super.onConnectionException(connection, state, t);
    }
 
    @Override
    public boolean onAcquireFail(Throwable t, AcquireFailConfig acquireConfig) {
        // handle notifications here: SNMP or SMTP
//        System.out.println("Failure to acquire connection at " + System.currentTimeMillis() + ". Retry attempts remaining : " + acquireConfig.getAcquireRetryAttempts());
        return super.onAcquireFail(t, acquireConfig);
    }
 
}