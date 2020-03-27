import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: User;
  name: string;

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private router: Router,
              private snackbar: MatSnackBar
  ) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
          if (user) {
            router.navigate(['home']);
            this.afs.doc<User>(`users/${user.uid}`).get().subscribe(userData => {
              const data = userData.data() as User;
              this.name = data.displayName;
              localStorage.setItem('user', JSON.stringify(data));
            });

            return this.afs.doc(`Users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }
      ));
    afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.user$ = afs.doc<User>(`users/${user.uid}`).valueChanges();
        this.user$.subscribe(local => {
          this.name = local.displayName;
          localStorage.setItem('user', JSON.stringify(local));
        });
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  get af() {
    return this.afAuth;
  }

  get authState() {
    return this.afAuth.authState;
  }

  get isLoggedIn(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user != null;
    } catch (e) {
      return false;
    }
  }

  getUser(): User {
    if (this.isLoggedIn) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser !== null) {
        return localUser as User;
      }
    } else {
      this.snackbar.open('Login to play quiz', 'Dismiss', {
        duration: 1000
      });
      return null;
    }
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    // return result.user;
    return this.updateUserData(result.user);
  }

  SetUserData(user, dname) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: dname,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async register(email: string, password: string, displayname: string) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.SetUserData(result.user, displayname);
  }

  async logout() {
    localStorage.clear();
    await this.afAuth.auth.signOut();
    await this.router.navigate(['login']);
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    await this.router.navigate(['verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    // localStorage.setItem('user', JSON.stringify(data));
    return userRef.get();
  }
}
