import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  testing: string = 'Hello World, First angular app!';
  isValid = true;

  peopleByCountry: any[] = [
    {
      country: 'UK',
      people: [{ name: 'Douglas Pace' }, { name: 'Mcleod Mueller' }],
    },
    {
      country: 'US',
      people: [
        { name: 'Day Meyers' },
        { name: 'Aguirre Ellis' },
        { name: 'Cook Tyson' },
      ],
    },
    {
      country: 'MARS',
      people: [{ name: 'Douglas Pace' }, { name: 'Mcleod Mueller' }],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
