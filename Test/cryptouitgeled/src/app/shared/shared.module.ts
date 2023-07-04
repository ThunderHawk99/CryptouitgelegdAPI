import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


/**
 * * import ngx-translate and the http loader
 */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import {
  TranslateCacheModule,
  TranslateCacheSettings,
  TranslateCacheService,
} from 'ngx-translate-cache';
import { HttpClient } from '@angular/common/http';

/**
 * The shared module contains classes and resources which are used in more than one dynamically loaded module.
 * By always loading with the application the shared components are ready whenever a module requests them.
 *
 * The shared module is a good place to import and export the FormsModule and the ReactiveFormsModule.
 * It is also good for the FontAwesomeModule and any other resource used by some modules some of the time but not all modules all of the time.
 */

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatSelectModule,
    TranslateModule,
    TranslateCacheModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule
  ],
})
export class SharedModule {}
