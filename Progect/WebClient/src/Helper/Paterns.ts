enum mainReg {
  FLOAT_NOT_ZERO = "^((?!0)\\d{1,7}$)|(^[1-9]{1,7}\\.\\d{1,2}$)|(^[1-9]{1,4}[0-9]{1,3}\\.\d{1,2}$)|(^[0]\\.[1-9]{1,2}$)|(^[0]\\.[0](?!0)\\d{1,2}$)"
}

export class Paterns {
  public static get floatNotZero(): RegExp {
    return new RegExp(mainReg.FLOAT_NOT_ZERO, );
  }
}
