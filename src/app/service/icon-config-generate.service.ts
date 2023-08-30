import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/personal-area.interface';

@Injectable({
  providedIn: 'root',
})
export class IconConfigGenerateService {
  private getInitials(data: IUser): string {
    return (data.name.charAt(0) + data.surname.charAt(0)).toUpperCase();
  }

  private randomColor(): string {
    const colors = [
      '#4285F4',
      '#EA4335',
      '#FBBC05',
      '#0def07',
      '#A80BF6FF',
      '#0BF6DBFF',
      '#EF7109FF',
      '#97a5fc',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getIconConfig(data: IUser): { color: string; text: string } {
    const text = this.getInitials(data);
    const color = this.randomColor();
    return { color: color, text: text };
  }
}
