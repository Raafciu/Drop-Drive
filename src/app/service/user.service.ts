import {Injectable} from '@angular/core';
import {User} from '../model/user';

const USERS = 'users';

@Injectable()
export class UserService {

  addUser(profile: gapi.auth2.BasicProfile) {
    let user: User = UserService.createUserFromProfile(profile);
    let users = this.getAll();

    if (users.has(user)) {
      users.delete(user);
    }
    users.add(user);
    this.saveUser(users);
  }

  getAll(): Set<User> {
    const data = localStorage.getItem(USERS);
    if (data) {
      return new Set<User>(JSON.parse(data));
    } else {
      return new Set<User>();
    }
  }

  saveUser(users: Set<User>) {
    localStorage.setItem(USERS, JSON.stringify(Array.from(users)));
  }

  private static createUserFromProfile(profile: gapi.auth2.BasicProfile): User {
    const user: User = new User();
    user.id = profile.getId();
    user.email = profile.getEmail();
    return user;
  }
}
