/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ukitsd.testservice;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author 005748
 */
public class Intern {
    
    public void test2(){
        
    }
    public boolean checkPattern(String p){
        if(p.equals("<")){
            return true;
        }else if(p.equals(">")){
            return true;
        }else if(p.equals("-")){
            return true;
        }else if(p.equals("[")){
            return true;
        }else if(p.equals("]")){
            return true;
        }
        return false;
    }
    public void test1(String a, String b){
        String [] arr_a = a.split("");
        String [] arr_b = b.split("");
        ArrayList<String> alist = new ArrayList<String>();
        ArrayList<String> blist = new ArrayList<String>();
        for(int i=0;i<arr_a.length;i++){
            if(this.checkPattern(arr_a[i])==false){
                alist.add(arr_a[i]);
            }
        }
        for(int i=0;i<arr_b.length;i++){
            if(arr_b[i].trim().isEmpty()) continue;
            if(this.checkPattern(arr_b[i])==false){
                blist.add(arr_b[i]);
            }
        }
        System.out.println(new Gson().toJson(alist).toString());
        System.out.println(new Gson().toJson(blist).toString());
        
    }
    public boolean isNumeric(String str)
    {
      return str.matches("-?\\d+(\\.\\d+)?");  //match a number with optional '-' and decimal.
    }
    public static void main(String[] args){
        String a = "abcd a<b sdfdfd";
        String b= "abcd bd";
        ArrayList<String> content= new ArrayList<String>();
        ArrayList<String> ftcontent= new ArrayList<String>();
        ArrayList<String> idwg = new ArrayList<String>();
  
        
//        content.add("evamme ^");
//        content.add("sutaṃ");
//        content.add("ekaṃ");
//        content.add("ste ss");
//        ftcontent.add("");
//        ftcontent.add("");
//        ftcontent.add("");
//        ftcontent.add("");
        idwg.add("1");
        idwg.add("2");
        idwg.add("5");
        idwg.add("8");
        
        String c="<label id='1136'>evamme ^</label>&nbsp;<label id='3'>sutaṃ</label>&nbsp;<label id='4'>ekaṃ</label>&nbsp;<label id='5'>samayaṃ</label>&nbsp;<label id='1099'>bhagavā sāvatthiyaṃ viharati jetavane</label><br/><label id='10'>anāthapiṇḍikassa</label>&nbsp;<label id='11'>^</label>&nbsp;<label id='12'>kareri-kuṭikāyaṃ</label>&nbsp;<label id='1100'>athakh</label>&nbsp;<label id='15'>sambahūlānaṃ</label><br/><label id='16'>bhikkhūnaṃ</label>&nbsp;<label id='17'>pacchā-bhattaṃ</label>&nbsp;<label id='18'>piṇḍapātapaṭikkantāṇaṃ</label>&nbsp;<label id='19'>karerimaṇḍalamāle</label>&nbsp;<label id='20'>sannisiṇṇānaṃ</label><br/><label id='21'>sannipatitānaṃ</label>&nbsp;<label id='22'>pubbe-nivāsa-paṭisaṃyuttā</label>&nbsp;<label id='23'>dhammī</label>&nbsp;<label id='24'>kathā</label>&nbsp;<label id='25'>udapādi</label>&nbsp;<label id='26'>iti</label>&nbsp;<label id='27'>pubbe-nivāso</label><br/><label id='28'>iti</label>&nbsp;<label id='29'>pubbenivāso</label>&nbsp;<label id='30'>^</label>";
        c = c.replace("<br/>", "");
        String[] cc = c.trim().split("</label>");
//        System.out.println(cc.length);
//        System.out.println(new Gson().toJson(cc).toString());
        String tmpstr0=null; boolean isid=false; String[] arr_str=null;
        String tmpstr1=null; int position=0;
        for(int i=0;i<cc.length;i++){
            tmpstr0=cc[i];
            content.add(cc[i]);
            ftcontent.add("");
            arr_str=tmpstr0.split("<label id='");
            System.out.println("<label id='"+arr_str.length);
            System.out.println("<label id='"+new Gson().toJson(arr_str).toString());
            tmpstr1="";                    
            for(int j=0;j<arr_str.length;j++){
                if(j==0){
                    if(arr_str[j].isEmpty()||arr_str[j].equals("&nbsp;")){
                        continue;
                    }else{
                        tmpstr0= arr_str[j];
                        if(i==0){
                           ftcontent.set(i, ftcontent.get(i)+tmpstr0);
                        }else{
                           ftcontent.set(i-1, ftcontent.get(i-1)+tmpstr0);
                        }
                        continue;
                    }
                }
                tmpstr1=tmpstr1+arr_str[j];
            }
            System.out.println(tmpstr1);
            arr_str = tmpstr1.split("'>");//["1","abcd"]
            System.out.println(new Gson().toJson(arr_str).toString());
            if(arr_str.length==2){
                position=0;
                for(int k=0;k<idwg.size();k++){
                    if(idwg.get(k).trim().equals(arr_str[0].trim())){
                        position=k;
                        break;
                    }
                }
                ftcontent.set(position, ftcontent.get(i)+arr_str[1]);
            }else{
                tmpstr1="";
                for(int j=0;j<arr_str.length;j++){
                    tmpstr1= tmpstr1+arr_str[j];
                }
                ftcontent.set(i, ftcontent.get(i)+tmpstr1);
            }
        }
        System.out.println(new Gson().toJson(content).toString());
        System.out.println(new Gson().toJson(ftcontent).toString());
        //hilight
        for(int i=0;i<content.size();i++){
            
        }
        
//        Intern obj = new Intern();
//        obj.test1(a,b);
    }
}
