import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shubham-resume';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/svg/github.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/svg/linkedin.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      'pen-tool',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/svg/pen-tool.svg`)
    );
  }
}
