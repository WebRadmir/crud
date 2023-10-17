import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

import { Person } from 'src/app/services/httpClients/http-clients.types';
import { HttpClientsService } from 'src/app/services/httpClients/http-clients.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'age',
    'gender',
    'actions',
  ];
  public dataSource: Person[] = [];

  constructor(
    private httpClient: HttpClientsService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.httpClient.getPerson().pipe(take(1)).subscribe();
    this.loadPersons();
  }

  public loadPersons(): void {
    this.httpClient.subscribeToData((data) => {
      this.dataSource = data;
    });
  }

  public updatePerson(element: Person): void {
    this.httpClient
      .updatePerson(element)
      .pipe(take(1))
      .subscribe(() => {
        this.notification.informationStick('Данные успешно обновлены');
      });
    element.editing = false;
  }

  public deletePerson(id: string): void {
    this.httpClient
      .deletePerson(id)
      .pipe(take(1))
      .subscribe(() => {
        this.notification.informationStick('Пользователь успешно удален');
      });
  }

  public openConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result === true) {
          this.deletePerson(id);
        }
      });
  }

  public toggleEditing(element: Person): void {
    element.editing = !element.editing;
  }

  ngOnDestroy(): void {
    this.httpClient.unsubscribeFromData();
  }
}
