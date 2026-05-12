import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private nextId = 4;

  private initialCourses: Course[] = [
    { id: 1, title: 'Angular для початківців', category: 'Frontend', duration: '10 годин' },
    { id: 2, title: 'RxJS та реактивне програмування', category: 'Frontend', duration: '8 годин' },
    { id: 3, title: 'Node.js та Express', category: 'Backend', duration: '12 годин' },
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.initialCourses);

  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  addCourse(data: Omit<Course, 'id'>): void {
    const current = this.coursesSubject.getValue();
    const newCourse: Course = { id: this.nextId++, ...data };
    this.coursesSubject.next([...current, newCourse]);
  }

  deleteCourse(id: number): void {
    const current = this.coursesSubject.getValue();
    this.coursesSubject.next(current.filter(c => c.id !== id));
  }
}
