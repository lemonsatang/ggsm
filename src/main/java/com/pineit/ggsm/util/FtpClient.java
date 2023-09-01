package com.pineit.ggsm.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.SocketException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.web.multipart.MultipartFile;

public class FtpClient {
    private String serverIp;
    private int serverPort;
    private String user;
    private String password;

    public FtpClient(String serverIp, int serverPort, String user, String password) {
        this.serverIp = serverIp;
        this.serverPort = serverPort;
        this.user = user;
        this.password = password;
    }

    // 파일 업로드
    public boolean upload(MultipartFile fileObj, String saveFileName, String path)
            throws SocketException, IOException, Exception {
        ByteArrayInputStream fis = null;
        FTPClient ftpClient = new FTPClient();
        boolean result = false;

        try {
            ftpClient.connect(serverIp, serverPort); // ftp 연결
            ftpClient.setControlEncoding("UTF-8"); // ftp 인코딩설정
            // ftpClient.setSoTimeout(1000 * 10); //timeout 설정
            ftpClient.login(user, password); // ftp 로그인
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE); // 파일타입설정
            ftpClient.enterLocalPassiveMode(); // active,passive 모드 설정

            int reply = ftpClient.getReplyCode(); // 응답코드받기

            if (!FTPReply.isPositiveCompletion(reply)) { // 응답이 false 라면 연결 해제 exception 발생
                ftpClient.disconnect();
                throw new Exception(serverIp + " FTP 서버 연결 실패");
            }

            /*
             * ftpClient.changeWorkingDirectory("upload");
             * ftpClient.changeWorkingDirectory("resort");
             */

            String[] dir = path.split("/");

            for (int i = 0; i < dir.length; i++) {
                if (dir.equals(""))
                    continue;
                ftpClient.makeDirectory(dir[i]);
                ftpClient.changeWorkingDirectory(dir[i]);
            }

            fis = new ByteArrayInputStream(fileObj.getBytes());
            result = ftpClient.storeFile(saveFileName, fis); // 파일 업로드

            if (result) {
                System.out.println("업로드 성공");
            } else {
                System.out.println("업로드 실패");
            }

            return result;
        } finally {
            if (ftpClient.isConnected()) {
                ftpClient.disconnect();
            }
            if (fis != null) {
                fis.close();
            }
        }
    }

    // 파일 삭제
    public boolean delete(String fileName, String path) {
        boolean result = false;
        FTPClient ftpClient = new FTPClient();

        try {
            ftpClient.connect(serverIp, serverPort); // ftp 연결
            ftpClient.setControlEncoding("UTF-8"); // ftp 인코딩설정
            // ftpClient.setSoTimeout(1000 * 10); //timeout 설정
            ftpClient.login(user, password); // ftp 로그인
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE); // 파일타입설정
            ftpClient.enterLocalPassiveMode(); // active,passive 모드 설정

            int reply = ftpClient.getReplyCode(); // 응답코드받기

            if (!FTPReply.isPositiveCompletion(reply)) { // 응답이 false 라면 연결 해제 exception 발생
                ftpClient.disconnect();
                throw new Exception(serverIp + " FTP 서버 연결 실패");
            }

            String[] dir = path.split("/");

            for (int i = 0; i < dir.length; i++) {
                if (dir.equals(""))
                    continue;
                ftpClient.makeDirectory(dir[i]);
                ftpClient.changeWorkingDirectory(dir[i]);
            }

            result = ftpClient.deleteFile(fileName); // 파일 삭제

            if (result) {
                System.out.println("삭제 성공");
            } else {
                System.out.println("삭제 실패");
            }

            return result;

        } catch (Exception e) {
            e.printStackTrace();
            return result;
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static void showServerReply(FTPClient ftpClient) {
        String[] replies = ftpClient.getReplyStrings();

        if (replies != null && replies.length > 0) {
            for (String aReply : replies) {
                System.out.println("SERVER: " + aReply);
            }
        }
    }

    // 디렉토리 삭제
    public static void removeDirectory(FTPClient ftpClient, String parentDir,
            String currentDir) throws IOException {
        String dirToList = parentDir;
        if (!currentDir.equals("")) {
            dirToList += "/" + currentDir;
        }

        FTPFile[] subFiles = ftpClient.listFiles(dirToList);

        if (subFiles != null && subFiles.length > 0) {
            for (FTPFile aFile : subFiles) {
                String currentFileName = aFile.getName();
                if (currentFileName.equals(".") || currentFileName.equals("..")) {
                    // skip parent directory and the directory itself
                    continue;
                }
                String filePath = parentDir + "/" + currentDir + "/"
                        + currentFileName;
                if (currentDir.equals("")) {
                    filePath = parentDir + "/" + currentFileName;
                }

                if (aFile.isDirectory()) {
                    // remove the sub directory
                    removeDirectory(ftpClient, dirToList, currentFileName);
                } else {
                    // delete the file
                    boolean deleted = ftpClient.deleteFile(filePath);
                    if (deleted) {
                        System.out.println("DELETED the file: " + filePath);
                    } else {
                        System.out.println("CANNOT delete the file: "
                                + filePath);
                    }
                }
            }

            // finally, remove the directory itself
            boolean removed = ftpClient.removeDirectory(dirToList);
            if (removed) {
                System.out.println("REMOVED the directory: " + dirToList);
            } else {
                System.out.println("CANNOT remove the directory: " + dirToList);
            }
        }
    }
}
