import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  currentNav = 'ai';
  tabs = [
    {
      name: 'AI',
      nav: 'ai'
    },
    {
      name: 'Frontend',
      nav: 'frontend'
    },
    {
      name: 'Backend',
      nav: 'backend'
    },
    {
      name: 'DevOps',
      nav: 'devops'
    },
    {
      name: 'Frameworks',
      nav: 'frameworks'
    }

  ]

  navTo = (nav: string) => {
    this.currentNav = nav;
  }

}
