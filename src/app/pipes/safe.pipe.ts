import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(text, securityContext) {
    if (securityContext === undefined) {
      return this.sanitizer.bypassSecurityTrustUrl(text);
    }
    switch (securityContext) {
      case 'resource_url' : return this.sanitizer.bypassSecurityTrustResourceUrl(text);
      case 'html'         : return this.sanitizer.bypassSecurityTrustHtml(text);
      case 'script'       : return this.sanitizer.bypassSecurityTrustScript(text);
      case 'style'        : return this.sanitizer.bypassSecurityTrustStyle(text);
      case 'url'          : return this.sanitizer.bypassSecurityTrustUrl(text);
      default             :
        console.error('INVALID: Invalid string passed to safePipe');
        return text;
    }
  }
}
