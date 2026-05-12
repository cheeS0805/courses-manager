import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-manager',
  standalone: false,
  templateUrl: './courses-manager.component.html',
  styleUrls: ['./courses-manager.component.css']
})
export class CoursesManagerComponent implements OnInit {
  courses$!: Observable<Course[]>;
  form!: FormGroup;
  courseToDelete: Course | null = null;

  constructor(
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.courses$ = this.coursesService.courses$;

    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.coursesService.addCourse(this.form.value);
      this.form.reset();
    }
  }

  confirmDelete(course: Course): void {
    this.courseToDelete = course;
  }

  onConfirmDelete(): void {
    if (this.courseToDelete) {
      this.coursesService.deleteCourse(this.courseToDelete.id);
      this.courseToDelete = null;
    }
  }

  onCancelDelete(): void {
    this.courseToDelete = null;
  }
}
