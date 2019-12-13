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
    if (this.isFolder) {
      return 'folder';
    } else {
      return 'file';
    }
  }

  public get isFolder(): boolean {
    return this.mimeType === MIME_TYPE_FOLDER;
  }
}
