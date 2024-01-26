import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  if (!localStorage.getItem("user_token")) {
    return false
  }
  return true;
};
