import { Component } from '@angular/core';
import { LoaderService } from '../../../core/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  constructor(public loader: LoaderService) {}
}
