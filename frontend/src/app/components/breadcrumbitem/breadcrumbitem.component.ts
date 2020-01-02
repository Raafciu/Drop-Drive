import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BreadCrumbItem} from '../../model/breadCrumbItem';
import {BreadCrumbItemOption, OPTION_NEW_FOLDER, OPTION_UPLOAD_FILES} from '../../model/breadCrumbItemOption';

@Component({
  selector: 'breadcrumbitem',
  templateUrl: './breadcrumbitem.component.html',
  styleUrls: ['./breadcrumbitem.component.scss']
})
export class BreadcrumbitemComponent {

  @Input()
  item: BreadCrumbItem;

  @Output()
  onSelected: EventEmitter<BreadCrumbItem> = new EventEmitter<BreadCrumbItem>();

  @Output()
  onSelectedOption: EventEmitter<BreadCrumbItemOption> = new EventEmitter<BreadCrumbItemOption>();

  createNewFolder() {
    this.onSelectedOption.emit({name: 'New folder', option: OPTION_NEW_FOLDER, data: null});
  }


  select() {
    this.onSelected.emit(this.item);
  }

  uploadFiles($event) {
    this.onSelectedOption.emit({name: 'Upload files', option: OPTION_UPLOAD_FILES, data: $event.target.files});
  }
}
