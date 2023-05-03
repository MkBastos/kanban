import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { TaskManagerService } from '../services/task.manager.service';

export function userExistsValidator(
  service: TaskManagerService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return service.getUsers().pipe(
      map((users) => {
        const result = users.filter((user: { user: string }) => user.user == control.value);
        if (result.length) {
          return { userExists: true };
        }
        return null;
      })
    );
  };
}
