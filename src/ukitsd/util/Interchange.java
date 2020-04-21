package ukitsd.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Interchange
{
  public String U2U(String s)
  {
	String res=null;
	Matcher m=null;
	Pattern p=null;
	try{
		if ((s == null) || (s.isEmpty())) {
			return "";
		}
		p = Pattern.compile("\\\\u([0-9A-Fa-f]{4})");
		res = s;
		m = p.matcher(res);

		while (m.find())
		{
			res = res.replaceAll("\\" + m.group(0), Character.toString((char)Integer.parseInt(m.group(1), 16)));
		}
		return res;
	}catch(Exception e){
		return null;
	}finally{
		res=null; m=null; p=null;
	}

  }

  public String convert(String str) {
    StringBuffer ostr = null;
    String hex = null;
    char ch;
    try{
    	ostr = new StringBuffer();
        for (int i = 0; i < str.length(); i++) {
            ch = str.charAt(i);

            ostr.append("\\u");
            hex = Integer.toHexString(str.charAt(i) & 0xFFFF);
            for (int j = 0; j < 4 - hex.length(); j++)
            {
              ostr.append("0");
            }
            ostr.append(hex.toLowerCase());
            hex=null;
          }
        return new String(ostr);
    }catch(Exception e){
    	return null;
    }finally{
    	ostr=null; hex=null;
    }
  }
}