import { CanActivateFn } from '@angular/router';

export const teacherGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('role')=='teacher' || localStorage.getItem('role')=='admin')
    return true;
  alert('Only for teachers')
  return false;
};
