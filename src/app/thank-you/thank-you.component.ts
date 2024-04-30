import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ExperimentService } from '../services/experiment.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent {
  constructor(private experimentService: ExperimentService) {}

  download() {
    this.experimentService.downloadExperimentResults();
  }
}
