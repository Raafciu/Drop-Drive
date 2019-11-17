export class DateFormatterUtil {

  static dateFormat(modifiedTime: string): string {
    if (modifiedTime.includes('T') && modifiedTime.includes('Z')) {
      modifiedTime = modifiedTime.replace('T', ' ');
      modifiedTime = modifiedTime.replace('Z', ' ');
      return modifiedTime;
    } else {
      return modifiedTime;
    }
  }
}
