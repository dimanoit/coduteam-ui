import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: Record<string, any>): HttpParams {
  return Object.getOwnPropertyNames(obj).reduce((params, key) => {
    return obj[key] !== undefined && obj[key] !== null
      ? params.set(key, obj[key].toString())
      : params;
  }, new HttpParams());
}
