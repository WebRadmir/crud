import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, take } from 'rxjs';

import { Person } from 'src/app/services/httpClients/http-clients.types';
import { HttpClientsService } from 'src/app/services/httpClients/http-clients.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MyValidators } from 'src/app/my.validators';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss'],
})
export class CreatePersonComponent {
  public showForm: boolean = false;

  public form: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.maxLength(25),
      Validators.required,
      Validators.pattern(/^[a-zA-Zа-яА-Я-]+$/),
      MyValidators.noSpaces,
    ]),
    lastname: new FormControl('', [
      Validators.maxLength(25),
      Validators.required,
      Validators.pattern(/^[a-zA-Zа-яА-Я-]+$/),
      MyValidators.noSpaces,
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?\d+\.?\d*$/),
    ]),
    gender: new FormControl('', Validators.required),
  });

  constructor(
    private httpClient: HttpClientsService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  public createPerson(): void {
    if (this.form.valid) {
      const newPersonData: Person = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        email: this.form.value.email,
        age: +this.form.value.age,
        gender: this.form.value.gender,
        editing: false,
      };
      this.httpClient
        .createPerson(newPersonData)
        .pipe(take(1), catchError(this.httpClient.handleError))
        .subscribe(() => {
          this.notification.informationStick('Пользователь успешно добавлен');
        });
      this.form.reset();
      this.showForm = false;
    }
  }

  public toggleForm(): void {
    this.showForm = !this.showForm;
    this.cdr.detectChanges();
    if (this.showForm) {
      const buttonElement = document.querySelector('.addPerson');
      if (buttonElement) {
        buttonElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }
  }
}
