import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products = [
    {
      title: 'Nueva Colección',
      description: 'Descubre las últimas tendencias en moda',
      image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1200',
      link: '/productos/coleccion'
    },
    {
      title: 'Essentials',
      description: 'Básicos atemporales para tu guardarropa',
      image: 'https://images.pexels.com/photos/5709664/pexels-photo-5709664.jpeg?auto=compress&cs=tinysrgb&w=1200',
      link: '/productos/essentials'
    }
  ];
}
