export const MIME_TYPE_FOLDER = 'application/vnd.google-apps.folder';

export class FileInfo {

  // blob: File;
  id: string;
  mimeType: string;
  modifiedTime: string;
  name: string;
  webContentLink: string;
  // progress: number;
  size: string;

  public get icon(): string {
    if (this.IsFolder) {
      return 'folder';
    } else {
      return 'file';
    }
  }

  public get IsFolder(): boolean {
    return this.mimeType === MIME_TYPE_FOLDER;
  }
}
