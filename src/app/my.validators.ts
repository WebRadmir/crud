import { FormControl } from '@angular/forms';

export class MyValidators {
  static noSpaces(control: FormControl): { [key: string]: boolean } | null {
    const hasSpaces = /\s/.test(control.value);
    if (hasSpaces) {
      control.setErrors({ hasSpaces: true });
      return { hasSpaces: true };
    } else {
      return null;
    }
  }
}
