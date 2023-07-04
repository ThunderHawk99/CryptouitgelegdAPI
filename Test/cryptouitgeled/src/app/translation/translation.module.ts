import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * * import ngx-translate and the http loader
 */
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from "@ngx-translate/core";
import {
  TranslateCacheModule,
  TranslateCacheSettings,
  TranslateCacheService
} from "ngx-translate-cache";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheName: "language", // default value is 'lang'.
      cacheMechanism:"LocalStorage"
      // cacheMechanism: "Cookie" // default value is 'LocalStorage'.
    })
  ]
})
export class TranslationModule { }

/**
 * Translate
 * 
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function translateCacheFactory(
  translateService: TranslateService,
  translateCacheSettings: TranslateCacheSettings
) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}

export class TranslateServiceStub {
  setDefaultLang(lang: string) { }
  use(lang: string) { }
  onLangChange() { return of({lang: 'nl'}) }
  get() { return 'nl' }
}
