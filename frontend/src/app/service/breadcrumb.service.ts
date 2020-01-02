import {Injectable} from '@angular/core';
import {BreadCrumbItem} from '../model/breadCrumbItem';

const ROOT_FOLDER = 'root';

@Injectable()
export class BreadcrumbService {

  items: BreadCrumbItem[] = [];


  init(): any {
    this.items = [];
    this.push(ROOT_FOLDER, 'My Drive');
  }

  private push(id: string, name: string) {
    this.items.forEach(item => item.showOption = false);
    let item = new BreadCrumbItem();
    item.id = id;
    item.name = name;
    this.items.push(item);
    this.setShowOptionOnLastItem();
  }

  private setShowOptionOnLastItem() {
    let lastItem = this.items[this.items.length - 1];
    lastItem.showOption = true;
  }

  navigateTo(id: string, name: string) {
    let foundIndex = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex >= 0) {
      this.items = this.items.slice(0, foundIndex + 1);
      this.setShowOptionOnLastItem();
    } else {
      this.push(id, name);
    }
  }

  get currentItem(): BreadCrumbItem {
    return this.items[this.items.length - 1];
  }
}
