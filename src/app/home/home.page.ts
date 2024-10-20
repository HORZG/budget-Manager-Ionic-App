import { Component } from '@angular/core';
import { DepenseService } from '../services/depense.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedOption !: string;
  depensess: any = [];
  dep = {};




  constructor(private serviceD: DepenseService,
     private alertController : AlertController,
      private modalController: ModalController) { 
    
  }

  onOptionChange(event: any) {
    console.log('Option sélectionnée :', this.selectedOption);


  }

  Add(NewObject: any) {

    console.log(NewObject)

    const Mont = NewObject.value.montant;
    const note = NewObject.value.note;
    const cat = NewObject.value.option;

    let NewO = {
      Montant: Mont,
      note: note,
      Category: cat
    }

    this.serviceD.ajouterDepense(NewO).subscribe({
      next: (response) => {
        console.log(response)
        this.allDepenses();
        this.closeModal(); 
      },
      error: (error) => {
        console.log(error)
      }
    })
    
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  allDepenses() {
    this.depensess = [];
    this.serviceD.allDepenses().subscribe({
      next: (response : Record<string,any>) => {
        for (const key in response) {
          console.log(this.depensess);
          this.depensess.push({ id: key, ...response[key] });
        }
        },
        error: (error) => {
          console.error(error);
        }
      })
  }



/*update(itemId){
this.serviceD.updateDepense(itemId).subscribe({
  next : (response)=> {
    console.log(response)
  },
  error : (error)=> {
    console.log(error)
  }
})
}*/

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


  ngOnInit() {
    this.allDepenses();

  }


}
