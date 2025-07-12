import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private showToast(icon: SweetAlertIcon, title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      
      customClass: {
        popup: 'my-swal-toast',
      },
      didOpen: (toast: HTMLElement) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  success(title: string) {
    this.showToast('success', title);
  }

  error(title: string) {
    this.showToast('error', title);
  }

  warning(title: string) {
    this.showToast('warning', title);
  }

  info(title: string) {
    this.showToast('info', title);
  }
}
