import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FileInfo} from '../../model/fileInfo';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {FileService} from '../../service/google-drive-service/file.service';
import {BreadcrumbService} from '../../service/breadcrumb.service';

@Component({
  selector: 'upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  files: FileInfo[] = [];
  currentFile: FileInfo;
  errorMessage: string;
  currentIndex: number = -1;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public fileList: FileList,
              private _fileService: FileService,
              private _breadCrumbService: BreadcrumbService,
              private cdRef: ChangeDetectorRef) {

    this.files = [];

    for (let i = 0; i < fileList.length; i++) {
      let fileInfo = new FileInfo();
      fileInfo.name = fileList[i].name;
      fileInfo.blob = fileList[i];
      this.files.push(fileInfo);
    }
  }

  nextFile() {
    this.currentIndex++;
    if (this.currentIndex <= this.files.length - 1) {
      return this.files[this.currentIndex];
    }
  }

  ngOnInit(): void {
    this.uploadNextFile();
  }

  private uploadNextFile() {
    this.currentFile = this.nextFile();
    if (this.currentFile) {
      this.uploadCurrentFile();
    }
  }

  private uploadCurrentFile() {
    this.currentFile.progress = 10;
    this._fileService.importFile(
      this._breadCrumbService.currentItem.id,
      this.currentFile,
      (res) => this.onImportError(res),
      () => this.onImportComplete(),
      (res) => this.onImportProgress(res)
    );
  }

  onImportError(res) {
    console.log(res);
    this.errorMessage = res;
  }

  onImportComplete() {
    this.currentFile.progress = 100;
    this.uploadNextFile();
    this._fileService.uploadFinished.emit();
  }

  onImportProgress(event: any) {
    this.currentFile.progress = (event.loaded / event.total) * 100;
    this.cdRef.detectChanges();
  }
}



