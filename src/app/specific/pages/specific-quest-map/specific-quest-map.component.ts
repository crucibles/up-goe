import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-specific-quest-map',
  templateUrl: './specific-quest-map.component.html',
  styleUrls: ['./specific-quest-map.component.css']
})
export class SpecificQuestMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var $ = go.GraphObject.make;
    var myDiagram =
      $(go.Diagram, "myDiagramDiv");
  }

}

