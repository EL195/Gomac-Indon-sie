import { LoadService } from './load.service';
import { Injectable } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fer: any;
 

  constructor(private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation,public load:LoadService) { }
  
  
    geographie(long=0.00,lat=0.00){
    // this.load.present();
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
if(long !=0.00 || lat != 0.00){
  console.log(long);
  return this.nativeGeocoder.reverseGeocode(lat,long , options);
}
else{
 this.gps().then( (resp) => {
      console.log(resp);
  let lati=resp.coords.latitude;
  let longi=resp.coords.longitude;
 return   this.nativeGeocoder.reverseGeocode(lati,longi,options)

  
 });
}
}
 //let lati= cor.lat;
 //let longi=cor.long;
 // resp.coords.longitude



  math(value){
    this.load.present();
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
    this.nativeGeocoder.forwardGeocode('Berlin', options)
  .then((result: NativeGeocoderResult[]) => {console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
  this.load.dismiss();
  return result[0];
})
  .catch((error: any) =>{
    console.log(error);
    this.load.dismiss();
  return null;
  } );
  }

   gps(){

     return this.geolocation.getCurrentPosition();
   
  }
  calculateDistance(lat1,lat2,long1,long2):any
  {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }
}
