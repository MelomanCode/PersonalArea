import {Component, OnInit} from '@angular/core';
import {PersonalAreaService} from "../service/personal-area.service";
import {PersonalAreaComponent} from "../personal-area/personal-area.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



constructor( private personalAreaService: PersonalAreaService, private modalService: NgbModal) {
}

  ngOnInit() {

  }

  add() {
    this.modalService.open(PersonalAreaComponent, {size: 'xl'})
  }

}
