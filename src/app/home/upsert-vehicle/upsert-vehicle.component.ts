import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Vehicle } from '~/app/shared/vehicle/vehicle.model';
import { VehicleService } from '~/app/shared/vehicle/vehicle.service';
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";



@Component({
  selector: 'ns-upsert-vehicle',
  templateUrl: './upsert-vehicle.component.html',
  styleUrls: ['./upsert-vehicle.component.css'],
  moduleId: module.id,
  providers: [VehicleService]
})
export class UpsertVehicleComponent implements OnInit {
  car:Vehicle;
  new: boolean = true;
  constructor(private page: Page, private router: RouterExtensions, private route: ActivatedRoute, private vehicleService: VehicleService) { 
    this.car = new Vehicle();
  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.new = false;
      this.vehicleService.getVehicle(id).subscribe((res)=>{
        this.car = res;
      });
    }
  }
  submit(){
    // console.log('saving');
    console.log(this.car);
    this.vehicleService.save(this.car).subscribe((res)=>{
      // console.log('edited')
      this.router.navigate(['home']);
    });
  }
  onCancelButtonTap(){
    this.router.navigate(['home']);
  }

}
