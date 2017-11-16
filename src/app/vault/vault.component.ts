import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {VaultService} from '../services/vault.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit {

  passwords = [];
  passwordBeingEdited;
  isAdding = false;
  @ViewChild('scrollingView') scrollingView;

  constructor(private vault: VaultService, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    this.vault.getPasswords()
      .subscribe(
        res => {
          this.passwords = res.json();
        },
        err => {
          this.router.navigate(['/']);
        }
      );
  }

  toggleMenu(event) {
    event.stopPropagation();
    this.closeMenu();
    let target = event.target || event.srcElement || event.currentTarget;
    if (target.classList.contains('menu-open')) {
      this.renderer.removeClass(target, 'menu-open');
    } else {
      this.renderer.addClass(target, 'menu-open');
    }
  }

  beginAddingPassword() {
    this.passwordBeingEdited = undefined;
    this.isAdding = true;
    setTimeout(() => {
      this.scrollingView.nativeElement.scrollTop = this.scrollingView.nativeElement.scrollHeight;
    }, 50);
  }

  addPassword(urlField, usernameField, passwordField) {
    this.vault.createPassword(urlField.value, usernameField.value, passwordField.value)
      .subscribe(
        res => {
          console.log(res);
          this.passwords.push(res.json().new_password);
          this.isAdding = false;
        },
        err => {
          console.log(err);
        }
      );
  }

  updatePassword() {
    this.vault.updatePassword(
      this.passwordBeingEdited.id,
      this.passwordBeingEdited.url,
      this.passwordBeingEdited.username,
      this.passwordBeingEdited.decrypted_password
    ).subscribe(
      res => {
        console.log(res);
        this.passwordBeingEdited.title = res.json().title;
        this.passwordBeingEdited = undefined;
      },
      err => {
        console.log(err);
      }
    );
  }

  copySuccess(e, id) {
    console.log('copied!', id, e);
  }

  toggleShowPassword(password) {
    if (!password.showPassword) {
      if (password.decrypted_password) {
        password.showPassword = true;
      } else {
        this.vault.getPassword(password.id)
          .subscribe(
            res => {
              password.decrypted_password = res.json().decrypted_password;
              password.showPassword = true;
            }
          );
      }
    } else {
      password.showPassword = false;
    }
  }

  editPassword(i) {
    this.passwordBeingEdited = this.passwords[i];
    this.isAdding = false;
    this.vault.getPassword(this.passwordBeingEdited.id)
      .subscribe(
        res => {
          console.log(res.json());
          this.passwordBeingEdited.decrypted_password = res.json().decrypted_password;
        },
        err => {
          console.log(err.json());
        }
      );
    this.closeMenu();
  }

  removePassword(i) {
    const password = this.passwords[i];
    this.vault.deletePassword(password.id)
      .subscribe(
        res => {
          console.log(res);
          this.deleteSuccess(password, i);
        },
        err => {
          console.log(err);
        }
      );
    this.closeMenu();
  }

  deleteSuccess(password, i) {
    password.isDeleted = true;
    setTimeout(() => {
      this.passwords.splice(i, 1);
    }, 1000);
  }

  closeMenu() {
    const menues = document.getElementsByClassName('menu-open');
    for (let i = 0; i < menues.length; i++) {
      this.renderer.removeClass(menues[i], 'menu-open');
    }
  }

}
