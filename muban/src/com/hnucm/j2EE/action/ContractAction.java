package com.hnucm.j2EE.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Random;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class ContractAction extends ActionSupport {
    
    private final static String UPLOADDIR = "/files";//文件上传的路径，在webContent下建立
    public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}


	private File file;  //input控件名一定为file 
    //上传文件名集合   
    private String fileFileName;   
    //上传文件内容类型集合   
    private String fileContentType; 
    
    private String filename;
 
    public String upload() throws FileNotFoundException, IOException{
        String path=uploadFile();//文件保存数据库的路径
    
        return SUCCESS;
    }
    
    //执行上传功能   
    @SuppressWarnings("deprecation")
    public String uploadFile() throws FileNotFoundException, IOException {   
        try {   
            InputStream in = new FileInputStream(file);   
            String dir = ServletActionContext.getRequest().getRealPath(UPLOADDIR);  
            File fileLocation = new File(dir);  
            //此处也可以在应用根目录手动建立目标上传目录  
            if(!fileLocation.exists()){  
                boolean isCreated  = fileLocation.mkdir();  
                if(!isCreated) {  
                    //目标上传目录创建失败,可做其他处理,例如抛出自定义异常等,一般应该不会出现这种情况。  
                    return null;  
                }  
            }
           // this.setFileFileName(getRandomString(20));
            String[] Name=this.getFileFileName().split("\\.");
            String fileName=getRandomString(20)+"."+Name[Name.length-1];
            this.setFileFileName(fileName);
            System.out.println(fileName);
            File uploadFile = new File(dir, fileName);
            OutputStream out = new FileOutputStream(uploadFile);   
            byte[] buffer = new byte[1024 * 1024];   
            int length;   
            while ((length = in.read(buffer)) > 0) {   
                out.write(buffer, 0, length);   
            }
            in.close();   
            out.close();   
            return UPLOADDIR.substring(1)+"\\"+fileFileName;
            } catch (FileNotFoundException ex) {
                return null;   
            } catch (IOException ex) {
                return null;   
        }   
    }
    
    
    public static String getRandomString(int length){
        String str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random=new Random();
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<length;i++){
          int number=random.nextInt(62);
          sb.append(str.charAt(number));
        }
        return sb.toString();
    }    

}