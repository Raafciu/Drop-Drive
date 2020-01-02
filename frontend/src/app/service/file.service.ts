import {EventEmitter, Injectable} from '@angular/core';
import {FileInfo, MIME_TYPE_FOLDER} from '../model/fileInfo';
import {FormatterUtil} from '../utils/formatterUtil';
import {API_KEY} from './gapi.service';

declare var UploaderForGoogleDrive;

@Injectable()
export class FileService {

  public uploadFinished: EventEmitter<any> = new EventEmitter();

  getFiles(folderId: string) {
    return gapi.client.drive.files.list({
      pageSize: 100,
      fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, webContentLink, size)',
      q: `'${folderId}' in parents and trashed = false`
    }).then((response) => {
      const files: FileInfo[] = [];
      response.result.files.forEach(file => {
        // console.log(file);
        files.push(FileService.createFileFromGoogle(file));
      });
      return files;
    });
  }

  deleteFile(fileId: string) {
    return gapi.client.drive.files.delete({
      fileId: fileId
    });
  }

  private static createFileFromGoogle(file: gapi.client.drive.File): FileInfo {
    const fileInfo: FileInfo = new FileInfo();
    fileInfo.id = file.id;
    fileInfo.mimeType = file.mimeType;
    fileInfo.modifiedTime = FormatterUtil.dateFormat(file.modifiedTime);
    fileInfo.webContentLink = file.webContentLink;
    fileInfo.name = file.name;
    fileInfo.size = FormatterUtil.sizeFormat(file.size);
    return fileInfo;
  }

  getBlobFile(fileInfo: FileInfo) {
    console.log(gapi.client.getToken().access_token);
    return gapi.client.drive.files.get({
      fileId: fileInfo.id,
      alt: 'media',
      oauth_token: gapi.client.getToken().access_token,
      key: API_KEY
    });
  }

  createFile(parentId: string, folderName: string) {
    let folder = {
      name: folderName,
      mimeType: MIME_TYPE_FOLDER,
      parents: [parentId]
    };
    return gapi.client.drive.files.create({
      resource: folder,
      fields: 'id, name, mimeType, modifiedTime, size'
    }).then(res => {
      return FileService.createFileFromGoogle(res.result);
    });
  }

  importFile(parentId: string, file: FileInfo, onError: any, onComplete: any, onProgress: any) {
    let contentType = file.blob.type || 'application/octet-stream';

    let metadata = {
      name: file.blob.name,
      mimeType: contentType,
      parents: [parentId]
    };

    let uploader = new UploaderForGoogleDrive({
      file: file.blob,
      token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
      metadata: metadata,
      onError: onError,
      onComplete: onComplete,
      onProgress: onProgress,
      params: {
        convert: false,
        ocr: false
      }
    });

    uploader.upload();
  }
}
