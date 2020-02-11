export class FormatterUtil {

  static dateFormat(modifiedTime: string): string {
    if (modifiedTime.includes('T') && modifiedTime.includes('Z')) {
      modifiedTime = modifiedTime.replace('T', ' ');
      modifiedTime = modifiedTime.replace('Z', ' ');
      return modifiedTime;
    } else {
      return modifiedTime;
    }
  }

  static sizeFormat(stringSize: string): string {
    if (!stringSize) {
      return '-';
    }

    let size: number = parseInt(stringSize);
    if (size < Math.pow(1024, 1)) {
      return size.toString() + ' B';
    } else if (size < Math.pow(1024, 2)) {
      return Math.floor(size / Math.pow(1024, 1)) + ' KB';
    } else if (size < Math.pow(1024, 3)) {
      return Math.floor(size / Math.pow(1024, 2)) + ' MB';
    } else if (size < Math.pow(1024, 4)) {
      return Math.floor(size / Math.pow(1024, 3)) + ' GB';
    } else {
      return Math.floor(size / Math.pow(1024, 4)) + " TB";
    }
  }
}
