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
    
    private final static String UPLOADDIR = "/files";//�ļ��ϴ���·������webContent�½���
    public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}


	private File file;  //input�ؼ���һ��Ϊfile 
    //�ϴ��ļ�������   
    private String fileFileName;   
    //�ϴ��ļ��������ͼ���   
    private String fileContentType; 
    
    private String filename;
 
    public String upload() throws FileNotFoundException, IOException{
        String path=uploadFile();//�ļ��������ݿ��·��
    
        return SUCCESS;
    }
    
    //ִ���ϴ�����   
    @SuppressWarnings("deprecation")
    public String uploadFile() throws FileNotFoundException, IOException {   
        try {   
            InputStream in = new FileInputStream(file);   
            String dir = ServletActionContext.getRequest().getRealPath(UPLOADDIR);  
            File fileLocation = new File(dir);  
            //�˴�Ҳ������Ӧ�ø�Ŀ¼�ֶ�����Ŀ���ϴ�Ŀ¼  
            if(!fileLocation.exists()){  
                boolean isCreated  = fileLocation.mkdir();  
                if(!isCreated) {  
                    //Ŀ���ϴ�Ŀ¼����ʧ��,������������,�����׳��Զ����쳣��,һ��Ӧ�ò���������������  
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