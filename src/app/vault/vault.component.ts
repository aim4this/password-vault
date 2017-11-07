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

  editPassword(i) {
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
