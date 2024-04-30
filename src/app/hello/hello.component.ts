import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../services/experiment.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent implements OnInit {
  hasResults = false;

  constructor(private experimentService: ExperimentService) {}

  ngOnInit(): void {
    this.hasResults = this.experimentService.hasResults();
  }

  download() {
    this.experimentService.downloadExperimentResults();
  }
}
