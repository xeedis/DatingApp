import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' // *appHasRole='["Admin"]
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole:string[]; //now we have access to parameters for appHasRole as Member,Moderator,Admin
  user:User;
  constructor(private vieWContainerRef:ViewContainerRef,
    private templateRef:TemplateRef<any>,
    private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
        this.user = user;
      })
     }
  ngOnInit(): void {
    //clear view if no roles (if youser don`t have any container then we`re gonna clear the container)
    if(!this.user?.roles || this.user ==null){
      this.vieWContainerRef.clear();
      return ;
    }
    if(this.user?.roles.some(r=> this.appHasRole.includes(r))){
      this.vieWContainerRef.createEmbeddedView(this.templateRef);//if our youser has role then we`re gonna create embedded view with admin link if it`s proper role
    }else{
      this.vieWContainerRef.clear();
    }
  }

}
