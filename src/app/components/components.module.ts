import { RechercheComponent } from './../recherche/recherche.component';
import { ValidationComponent } from './../validation/validation.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallsComponent } from "./calls/calls.component";
import { ChatsComponent } from "./chats/chats.component";
import { StatusComponent } from "./status/status.component";
import { FormsModule } from "@angular/forms";
import { IonicModule, MenuController } from "@ionic/angular";
import { MenuvComponent } from '../compoents/menuv/menuv.component';
import { MenusComponent } from './menus/menus.component';
import { MenuVoyageComponent } from './menu-voyage/menu-voyage.component';
import { MenuRestoComponent } from './menu-resto/menu-resto.component';
import { ConnexionMessageComponent } from './connexion-message/connexion-message.component';
import { CompleteComponent } from './complete/complete.component';
import { PlaceComponentComponent } from './place-component/place-component.component';
import { RedirectComponent } from './redirect/redirect.component';
import { NotifComponent } from './notif/notif.component';

@NgModule({
  declarations: [
    RedirectComponent,
    NotifComponent,
    ChatsComponent,
    RechercheComponent, 
    ValidationComponent,
    PlaceComponentComponent, 
    StatusComponent, 
    CompleteComponent, 
    ConnexionMessageComponent,
     CallsComponent, 
     MenuvComponent, 
     MenusComponent, 
     MenuVoyageComponent, 
     MenuRestoComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  entryComponents: [
    MenuvComponent,
    MenusComponent,
    CompleteComponent,
    MenuVoyageComponent,
    ConnexionMessageComponent,
    PlaceComponentComponent,
    MenuRestoComponent,
    ValidationComponent,
    RechercheComponent,
    RedirectComponent,
    NotifComponent,
  ],
  exports: [
    RedirectComponent,
    NotifComponent,
    MenuRestoComponent,
    RechercheComponent,
    ValidationComponent, 
    PlaceComponentComponent,
     CompleteComponent,
      ConnexionMessageComponent,
       ChatsComponent, 
       StatusComponent, 
       CallsComponent,
        MenuvComponent, 
        MenusComponent, 
        MenuVoyageComponent]
})
export class ComponentsModule {}
