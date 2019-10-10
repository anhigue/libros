import { AdminService } from '../app/services/admin.service';
export class Util {

    constructor(private admin: AdminService) {}

    async updateVista() {
      await this.admin.updateVisita().toPromise().then( res => console.log(res));
    }
}
