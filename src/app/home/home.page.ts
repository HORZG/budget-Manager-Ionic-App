import { Component } from '@angular/core';
import { DepenseService } from '../services/depense.service';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedOption!: string;
  depensess: any = [];
  dep = {};
  totalDepenses: number = 0; 
  connectedUser: any = {}; 
  allUser = [];

  constructor(
    private serviceD: DepenseService,
    private alertController: AlertController,
    private modalController: ModalController,
    private userService: UserService
  ) {}

  onOptionChange(event: any) {
    console.log('Option sélectionnée :', this.selectedOption);
  }

  Add(NewObject: any) {
    console.log(NewObject);

    const Mont = NewObject.value.montant;
    const note = NewObject.value.note;
    const cat = NewObject.value.option;

    let NewO = {
      Montant: Mont,
      note: note,
      Category: cat,
      conUser: localStorage.getItem('userId'),
    };

    this.serviceD.ajouterDepense(NewO).subscribe({
      next: (response) => {
        console.log(response);
        this.allDepenses();
        this.closeModal();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  getUserById(connectedUserId: string) {
    if (!connectedUserId) return;

    this.userService.allUsers().subscribe({
      next: (result: Record<string, any>) => {
        for (const key in result) {
          const user = { id: key, ...result[key] };
          if (user.id === connectedUserId) {
            this.connectedUser = user;
            console.log('Connected User:', this.connectedUser.Firstname);
            break;
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  allDepenses() {
    this.depensess = [];
    this.serviceD.allDepenses().subscribe({
      next: (response: Record<string, any>) => {
        for (const key in response) {
          if (response[key].conUser === localStorage.getItem("userId")) {
            this.depensess.push({ id: key, ...response[key] });
          }
        }
        this.totalDepenses = 0; 
        console.log(this.depensess);
        for (let i = 0; i < this.depensess.length; i++) {
          this.totalDepenses += parseFloat(this.depensess[i].Montant);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  async presentAlert(itemId) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Etes vous sur de vouloir supprimer cette dépense ?',
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: () => {
            this.serviceD.deleteDepense(itemId).subscribe({
              next: (response) => {
                this.allDepenses();
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  logout(){
    if (this.connectedUser) {
      localStorage.clear();
    }
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.getUserById(userId);
    this.allDepenses();
  }
}
