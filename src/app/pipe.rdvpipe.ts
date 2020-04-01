import { Pipe , PipeTransform, OnInit} from '@angular/core'
import { AuthenticationService } from '@/services';

@Pipe({
    name : 'rdvpipe'
})
//pipe pour filtrer par utilisateur 
export class RdvPipe implements PipeTransform{
    constructor(
        private authenticationService: AuthenticationService,
        
    ) {
        
    }
    transform(values: any[], args?: any): any {
        return values.filter((rdv)=>rdv.user==this.authenticationService.currentUserValue.username);
    }

}    
