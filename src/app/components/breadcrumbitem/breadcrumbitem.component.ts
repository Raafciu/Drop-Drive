import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BreadCrumbItem} from '../../model/breadCrumbItem';
import {BreadCrumbItemOption, OPTION_NEW_FOLDER} from '../../model/breadCrumbItemOption';

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
    this.onSelectedOption.emit({name: 'New folder', option: OPTION_NEW_FOLDER, date: null});
  }

  select() {
    this.onSelected.emit(this.item);
  }
}
