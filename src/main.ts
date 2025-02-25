import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TodoComponent } from './app/components/todo/todo.component';

bootstrapApplication(TodoComponent, appConfig)
  .catch((err) => console.error(err));