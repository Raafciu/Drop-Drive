import {Injectable} from '@angular/core';
import {FileInfo} from '../model/fileInfo';
import {FormatterUtil} from '../utils/formatterUtil';

@Injectable()
export class FileService {


  getFiles(folderId: string) {
    return gapi.client.drive.files.list({
      pageSize: 100,
      fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, size)',
      q: `'${folderId}' in parents and trashed = false`
    }).then((response) => {
      const files: FileInfo[] = [];
      response.result.files.forEach(file => {
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
    fileInfo.name = file.name;
    fileInfo.size = FormatterUtil.sizeFormat(file.size);
    return fileInfo;
  }
}
