import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showComponentA: boolean;
  showComponentB: boolean;
  showComponentC: boolean;
  showComponentD: boolean;

  constructor() {
    this.showComponentA = true;
    this.showComponentB = true;
    this.showComponentC = true;
    this.showComponentD = true;
  }

  ngOnInit() {
  }

  show(component: boolean) {
    if (!component) {
       return component = true;
    } else {
      return component = false;
    }
  }

  showA() {
    if (!this.showComponentA) {
       return this.showComponentA = true;
    } else {
      return this.showComponentA = false;
    }
  }
  showB() {
    if (!this.showComponentB) {
       return this.showComponentB = true;
    } else {
      return this.showComponentB = false;
    }
  }
  showC() {
    if (!this.showComponentC) {
       return this.showComponentC = true;
    } else {
      return this.showComponentC = false;
    }
  }

  showD() {
    if (!this.showComponentD) {
       return this.showComponentD = true;
    } else {
      return this.showComponentD = false;
    }
  }
}
