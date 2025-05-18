import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { TaskListComponent } from './app/components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

bootstrapApplication(TaskListComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, FormsModule),
    provideRouter([]),
  ],
}).catch(err => console.error(err));
