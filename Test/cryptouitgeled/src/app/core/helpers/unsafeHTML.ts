import {DomSanitizer} from '@angular/platform-browser';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({ name: 'unsafeHTML'})
export class UnsafeHTML implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}