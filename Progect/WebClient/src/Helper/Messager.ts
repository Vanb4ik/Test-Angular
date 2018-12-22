import * as toastr from 'toastr';
const x = 100;
toastr.options.progressBar = true;
toastr.options.closeDuration = 300 * x;
toastr.options.closeButton = true;
toastr.options.closeMethod = 'fadeOut';
toastr.options.closeEasing = 'swing';
toastr.options.positionClass = "toast-top-center";
toastr.options.timeOut = 50 * x;
toastr.options.extendedTimeOut = 60 * x;

const isOkSettings = () => {
  toastr.options.timeOut = 10 * x;
  toastr.options.extendedTimeOut = 6 * x;
  toastr.options.closeDuration = 30 * x;
};

const isBadSettings = () => {
  toastr.options.timeOut = 20 * x;
  toastr.options.extendedTimeOut = 20 * x;
  toastr.options.closeDuration = 60 * x;
};

export class Messager {

  static success(message: string, title?: string) {
    isOkSettings();
    toastr.success(message, title);
  }

  static info(message: string, title?: string) {
    isOkSettings();
    toastr.info(message, title);
  }

  static warning(message: string, title?: string) {
    isBadSettings();
    toastr.warning(message, title);
  }

  static error(message: string, title?: string) {
    isBadSettings();
    toastr.error(message, title);
  }
}
