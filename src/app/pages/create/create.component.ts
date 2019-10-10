import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  plantillaA: boolean;
  plantillaB: boolean;
  plantillaC: boolean;
  plantilla: number;

  constructor() {
    this.plantillaA = true;
    this.plantillaB = false;
    this.plantillaC = false;
  }

  ngOnInit() {
  }

  ChangedPlantilla(plantilla) {
    if ( plantilla * 1 === 1) {
      this.plantillaA = true;
      this.plantillaB = false;
      this.plantillaC = false;
    } else if ( plantilla * 1 === 2 ) {
      this.plantillaA = false;
      this.plantillaB = true;
      this.plantillaC = false;
    } else if ( plantilla * 1 === 3 ) {
      this.plantillaA = false;
      this.plantillaB = false;
      this.plantillaC = true;
    }
  }

}
