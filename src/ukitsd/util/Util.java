package ukitsd.util;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.Signature;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.rama.his.util.DateUtil;

import ukitsd.editing.connection.SQLSERVERCONNECTION;


//import sun.misc.BASE64Encoder;


public class Util  extends HttpServlet {
	public static final Date getCurrentDate(){
		try{
			java.util.Calendar cal = java.util.Calendar.getInstance();
			java.util.Date utilDate = cal.getTime();
			java.sql.Date sqlDate = new Date(utilDate.getTime());
			return sqlDate;
		}catch(Exception e){
			return null;
		}

//		System.out.println(sqlDate+" "+DateUtil.getDetailOfDate(sqlDate, "dd/MM/yyyy", DateUtil.LocaleUS));
	}
	public static final Timestamp getCurrentDateTimeStamp(){
		try{
			java.util.Calendar cal = java.util.Calendar.getInstance();
			java.util.Date utilDate = cal.getTime();
			Timestamp sqlDate = new Timestamp(utilDate.getTime());
			return sqlDate;
		}catch(Exception e){
			return null;
		}
	}
	public static final Date getDateFromString(String date, String formatdate, Locale locale){
		SimpleDateFormat format=null;
		java.util.Date parsed = null;
		java.sql.Date sql = null;
		try{
//			"yyyy/MM/dd"
			format = new SimpleDateFormat(formatdate,locale);
			parsed = format.parse(date);
		    sql = new java.sql.Date(parsed.getTime());
			return sql;
		}catch(Exception e){
			return null;
		}finally{
			
		}
	}
	
	static public String customFormat(String pattern, double value ) {
		DecimalFormat myFormatter=null; String output=null;
		try{
		      myFormatter = new DecimalFormat(pattern);
		      output = myFormatter.format(value);
//		      System.out.println(value + "  " + pattern + "  " + output);
		      return output;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}finally{myFormatter=null; output=null;}
	}
	
	static public String customFormat(String pattern, int value ) {
		DecimalFormat myFormatter=null; String output=null;
		try{
		      myFormatter = new DecimalFormat(pattern);
		      output = myFormatter.format(value);
//		      System.out.println(value + "  " + pattern + "  " + output);
		      return output;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}finally{myFormatter=null; output=null;}
	}
	
	public static final boolean islogin(HttpServletRequest request, HttpServletResponse response){
		try{
			if(request.getSession().getAttribute("isMember")==null){
				return false;
			}
			return true;
//			if(re)
		}catch(Exception e){
			return false;
		}
	}
	
	
//	public String decode(String s) {
//	    return StringUtils.newStringUtf8(Base64.decodeBase64(s));
//	}
//	
	public static Connection stateConnection(Connection oConn,String connectionName){
		try{
			if(connectionName.equals("ITAP")){
				if(oConn.isClosed())
					oConn=SQLSERVERCONNECTION.getConnectionItap();
			}
			if(connectionName.equals("EP")){
				if(oConn.isClosed())
					oConn=SQLSERVERCONNECTION.getConnectionEp();
			}
			if(connectionName.equals("EPH")){
				if(oConn.isClosed())
					oConn=SQLSERVERCONNECTION.getConnectionEph();
			}
			return oConn;
		}catch(Exception e){
			e.printStackTrace();
			return oConn;
		}
	}

	
	public static void closeConnection(Connection oConn){
		if (oConn != null) {
			try { oConn.close();  oConn=null;} catch (SQLException e) {
			}//oConn = null;
		}
	}
	
	public static final Boolean checkKey(String key){
		try{
			   KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
			    kpg.initialize(1024);
			    KeyPair keyPair = kpg.genKeyPair();
//			    String key="ทดสอบ";
			    byte[] data = key.getBytes("UTF8");
			    Signature sig = Signature.getInstance("MD5WithRSA");
			    sig.initSign(keyPair.getPrivate());
			    sig.update(data);
			    byte[] signatureBytes = sig.sign();
//			    System.out.println("Singature:" + new BASE64Encoder().encode(signatureBytes));
//			    System.out.println("private: "+keyPair);
			    sig.initVerify(keyPair.getPublic());
			    sig.update(data);

//			    System.out.println(sig.verify(signatureBytes));
			    return sig.verify(signatureBytes);
		}catch(Exception e){
			return false;
		}
	}
//	public static final String genarateKey(String key){
//		try{
//			   KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
//			    kpg.initialize(1048);
//			    KeyPair keyPair = kpg.genKeyPair();
////			    String key="ทดสอบ";
//			    byte[] data = key.getBytes("UTF8");
//			    Signature sig = Signature.getInstance("MD5WithRSA");
//			    sig.initSign(keyPair.getPrivate());
//			    sig.update(data);
//			    byte[] signatureBytes = sig.sign();
////			    System.out.println("Singature:" + new BASE64Encoder().encode(signatureBytes));
////			    System.out.println("private: "+keyPair);
////			    sig.initVerify(keyPair.getPublic());
////			    sig.update(data);
////System.out.println(Util.checkKey(new BASE64Encoder().encode(signatureBytes)));
////			    System.out.println(sig.verify(signatureBytes));
//			    String keys=new BASE64Encoder().encode(signatureBytes);
//				String ar[] = keys.split("\n");
//				String k1=null;
//				String k2=null; 
//				String k3=null; 
//				String keygen="";
//				for(int i=0; i<ar.length; i++){
//					switch(i){
//					case 0:
//						k1=ar[i];
//						break;
//					case 1:
//						k2=ar[i];
//						break;
//					case 2:
//						k3=ar[i];
//						break;
//					}
//				}
//				keygen=k1+k2+k3;
//			    return keygen;//new BASE64Encoder().encode(signatureBytes);
//		}catch(Exception e){
//			return null;
//		}
//	}

	public static void main(String arg[]){
		java.sql.Date d = Util.getCurrentDate();
		java.sql.Date d1=Util.getDateFromString("2013/11/12", "yyyy/MM/dd", Locale.US);
		
		System.out.println(d+" "+d1.getYear());
		System.out.println(Util.getCurrentDateTimeStamp());
		
//		System.out.println(d.compareTo(d1.getDate()));
	}
	
}
