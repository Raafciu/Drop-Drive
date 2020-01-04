import {Injectable} from '@angular/core';
import {User} from '../../model/user';

const USERS = 'users';

@Injectable()
export class UserService {

  addUser(profile: gapi.auth2.BasicProfile) {
    let user: User = UserService.createUserFromProfile(profile);
    this.saveUser(user);
  }

  getUser(): User {
    const data = localStorage.getItem(USERS);
    if (data) {
      return  JSON.parse(data);
    } else {
      return new User();
    }
  }

  saveUser(user: User) {
    localStorage.setItem(USERS, JSON.stringify(user));
  }

  private static createUserFromProfile(profile: gapi.auth2.BasicProfile): User {
    const user: User = new User();
    user.id = profile.getId();
    user.email = profile.getEmail();
    return user;
  }
}
