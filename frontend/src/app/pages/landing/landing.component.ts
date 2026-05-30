import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="relative w-full h-screen flex justify-center items-center overflow-hidden font-sans"
      style="background: url('/map.png') no-repeat center center/cover;"
    >
      <div class="absolute inset-0 bg-black/65 z-10"></div>

      <div class="relative z-20 text-center color-white px-5">
        <h1
          class="text-white text-4xl md:text-6xl font-extrabold tracking-widest mb-4"
        >
          Chevrolet Tracker
        </h1>
        <p
          class="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Work Productivity & Audit System
        </p>
        <button
          routerLink="/login"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 text-base rounded uppercase tracking-wider transition-colors duration-300"
        >
          Enter System
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class LandingComponent {}
