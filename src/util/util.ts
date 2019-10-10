import { AdminService } from '../app/services/admin.service';
export class Util {

    constructor(private admin: AdminService) {}

    async updateVista(id) {
      return await this.admin.updateVisita(id).toPromise();
    }
}
