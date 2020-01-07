import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PREFIX} from '../../utils/dropboxUtil';

@Component({
  selector: 'drop-box-breadcrumb',
  templateUrl: './drop-box-breadcrumb.component.html',
  styleUrls: ['./drop-box-breadcrumb.component.scss']
})
export class DropBoxBreadcrumbComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private pathArray: PathInfo[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.url.subscribe(() => {
      console.log(this.router.url);
      const urlWithoutParams = decodeURIComponent(this.router.url).split('?')[0];
      console.log(urlWithoutParams);
      this.pathArray = this.getPathsToShowFromUrl(urlWithoutParams);
    });
  }

  getPathsToShowFromUrl(currentPath: string) {
    currentPath = currentPath.substr(1);
    let paths = currentPath.split('/');
    if (currentPath === '' || currentPath === '/') {
      paths = [''];
    }
    let fullPath = '';
    const pathsToRender = [];
    for (let i = 0; i < paths.length; i++) {
      const path = decodeURI(paths[i]);
      fullPath += `/${path}`;
      pathsToRender.push({
        path,
        fullPath,
      });
    }
    return pathsToRender;

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigateLink(url: string) {
    if (url.length === 0) {
      this.router.navigate([PREFIX]);
    } else {
      this.router.navigate([url]);
    }
  }


}

interface PathInfo {
  path: string;
  fullPath: string;
}
