import { Component, ViewEncapsulation } from '@angular/core';

enum Direction {
  'north',
  'east',
  'south',
  'west'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Robot';
  x: number = 0; y: number = 0;
  currentDirection = '';
  enteredCli = "";
  outputMessage = "";
  report = "";
  enteredPlaceCommand: boolean = false;
  validCommand: boolean = false;

  proccess() {
    this.validCommand = false;
    this.outputMessage = "";
    this.report = "";
    let cli = this.enteredCli.toLowerCase();
    
    // Command Place
    if (cli.indexOf('place ') !== -1) {
      this.placeFunction(cli);
    }

    // Command Move
    if (cli == 'move' && this.enteredPlaceCommand) {
      console.log('COMMAND MOVE ');
      if (this.currentDirection == "north") {
        if (this.x > 1) {
          this.x--;
          this.validCommand = true;
        }
      }
      if (this.currentDirection == "south") {
        if (this.x < 5) {
          this.x++;
          this.validCommand = true;
        }
      }
      if (this.currentDirection == "west") {
        if (this.y > 1) {
          this.y--;
          this.validCommand = true;
        }
      }
      if (this.currentDirection == "east") {
        if (this.y < 5) {
          this.y++;
          this.validCommand = true;
        }
      }
    }

    // Command Left
    if (cli == 'left' && this.enteredPlaceCommand) {
      console.log('COMMAND LEFT');
      let direction = this.currentDirection;
      switch (direction) {
        case 'north':
          this.currentDirection = "west";
          this.validCommand = true;
          break;
        case 'west':
          this.currentDirection = "south";
          this.validCommand = true;
          break;
        case 'south':
          this.currentDirection = "east";
          this.validCommand = true;
          break;
        case 'east':
          this.currentDirection = "north";
          this.validCommand = true;
          break;
      }
    }

    // Command Right
    if (cli == 'right' && this.enteredPlaceCommand)  {
      console.log('COMMAND RIGHT');
      let direction = this.currentDirection;
      switch (direction) {
        case 'north':
          this.currentDirection = "east";
          this.validCommand = true;
          break;
        case 'east':
          this.currentDirection = "south";
          this.validCommand = true;
          break;
        case 'south':
          this.currentDirection = "west";
          this.validCommand = true;
          break;
        case 'west':
          this.currentDirection = "north";
          this.validCommand = true;
          break;
      }
    }

    // Command Report
    if (cli == 'report' && this.enteredPlaceCommand)  {
      console.log('COMMAND REPORT ');
      this.report = "Report:<br>Current Robot location is on " + this.x + " x " + this.y + "<br>" + "Facing " + this.currentDirection;
      this.validCommand = true;
    }

    // Command Output
    if (this.validCommand) {
      this.outputMessage = "Command executed";
    } else {
      this.outputMessage = "Command Not executed";
    }

  }

  placeFunction(cli: string) {
    let validPlace = false;
    let validFirstNo = false;
    let validSecondNo = false;
    let validDirection = false;
    console.log('COMMAND PLACE ');
    cli = cli.trim();
    // validation for place word
    let placeWord = cli.substring(0, 6);
    if ((placeWord.toLowerCase() == "place " && validPlace == false) || (validPlace)) {
      validPlace = true
    } 

    // validation for 1st number
    let firstNo = cli.substring(6, 7);
    if (parseInt(firstNo) && (parseInt(firstNo)>0 && parseInt(firstNo)<6)) {
      validFirstNo = true;
    } 

    // validation for 2nd number
    let secondNo = cli.substring(8, 9);
    console.log('secondNo=', secondNo)
    if (parseInt(secondNo) && (parseInt(secondNo)>0 && parseInt(secondNo)<6)) {
      console.log('is a number');
      validSecondNo = true;
    } 

    // validate direction
    let direction = cli.substring(10);
    if (direction in Direction) {
      validDirection = true;
    } 
    console.log('direction=', direction);
    
    // Compile validation
    console.log('all validations: ' + validPlace + " " +  validFirstNo  + " " +  validSecondNo  + " " +  validDirection);
    if (validPlace && validFirstNo && validSecondNo && validDirection) {
      this.x = parseInt(firstNo);
      this.y = parseInt(secondNo);
      this.currentDirection = direction;
      this.enteredPlaceCommand = true;
      this.validCommand = true;
    } else {
      this.validCommand = false;
    }
  }

  layout() {
    let robotPos = "<table class='tableClass' cellpadding=5>"
    for (var row = 1; row < 6; row++) {
      robotPos = robotPos + "<tr >";
      for (var col = 1; col < 6; col++) {

        if (this.x == row && this.y == col) {
          robotPos = robotPos + "<td class='tdClass' width=55 height=55 >";
          robotPos = robotPos + "<img class='robImg " + this.currentDirection + "' src='/assets/robotimg.jpg' >";
          robotPos = robotPos + "</td>";
        } else {
          robotPos = robotPos + "<td class='tableClass'  width=55 height=55 bgcolor=gray>";
          robotPos = robotPos + "</td>";
        }
      }
      robotPos = robotPos + "</tr>";
    }
    robotPos = robotPos + "</table>"
    return robotPos;
  }

}
