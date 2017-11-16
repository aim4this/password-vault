import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer } from '@angular/core';
import {ClipboardService} from 'ngx-clipboard/dist';
import {VaultService} from './services/vault.service';

@Directive({
  selector: '[appClipboard]'
})
export class CopyToClipboardDirective implements OnInit, OnDestroy {
  @Input('ngxClipboard') public targetElm: HTMLInputElement;
  @Input() public password;

  @Input() public cbContent: string;

  @Output() public cbOnSuccess: EventEmitter<any> = new EventEmitter<any>();

  @Output() public cbOnError: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private clipboardSrv: ClipboardService,
    private vault: VaultService,
    private renderer: Renderer

  ) { }

  public ngOnInit() { }

  public ngOnDestroy() {
    this.clipboardSrv.destroy();
  }

  @HostListener('click', ['$event.target']) public onClick() {
    if (!this.cbContent) {
      this.vault.getPassword(this.password.id).subscribe(
        res => {
          this.password.decrypted_password = res.json().decrypted_password;
          setTimeout(() => {
            console.log(this.password.decrypted_password);
            console.log(this.cbContent);
            this.copyProcess(this.cbContent);
          }, 500);
        }
      );
    } else {
      this.copyProcess(this.cbContent);
    }
  }

  copyProcess(content) {
    if (!this.clipboardSrv.isSupported) {
      this.handleResult(false, undefined);
    } else if (content) {
      debugger;
      this.handleResult(this.clipboardSrv.copyFromContent(content, this.renderer), content);
    }
  }

  /**
   * Fires an event based on the copy operation result.
   * @param {Boolean} succeeded
   */
  private handleResult(succeeded: Boolean, copiedContent: string | undefined) {
    console.log('success:', succeeded);
    if (succeeded) {
      this.cbOnSuccess.emit({ isSuccess: true, content: copiedContent });
    } else {
      this.cbOnError.emit({ isSuccess: false });
    }
  }
}
