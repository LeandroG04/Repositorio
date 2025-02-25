import { bootstrapApplication } from '@angular/platform-browser';
import { TodoComponent } from './app/components/todo/todo.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(TodoComponent, config);

export default bootstrap;
