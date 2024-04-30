import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ExperimentService } from '../services/experiment.service';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent {
  constructor(private experimentService: ExperimentService) {}

  download() {
    const result = this.experimentService.getExperimentResultsJSON();
    if (!result) {
      return;
    }

    const blob = new Blob([result], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'experiment_results.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
