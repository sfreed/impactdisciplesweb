import { SafeYoutubeUrlPipe } from './safe-youtube-url.pipe';
import { NgModule } from '@angular/core';
import { SafeCssPipe } from './safe-css.pipe';
import { SafeHTMLPipe } from './safe-html.pipe';
import { SafeResourcePipe } from './safe-resource.pipe';
import { SafeScriptPipe } from './safe-script.pipe';
import { SafeVideoVimeoUrlPipe } from './safe-take5-vimeo-url.pipe';
import { SafeVideoYoutubeUrlPipe } from './safe-take5-youtube-url.pipe';
import { SafeVimeoUrlPipe } from './safe-vimeo-url.pipe';


@NgModule({
  declarations: [
    SafeCssPipe,
    SafeHTMLPipe,
    SafeResourcePipe,
    SafeScriptPipe,
    SafeVideoVimeoUrlPipe,
    SafeVideoYoutubeUrlPipe,
    SafeVimeoUrlPipe,
    SafeYoutubeUrlPipe
  ],
  imports: [
  ],
  exports: [
     SafeCssPipe,
    SafeHTMLPipe,
    SafeResourcePipe,
    SafeScriptPipe,
    SafeVideoVimeoUrlPipe,
    SafeVideoYoutubeUrlPipe,
    SafeVimeoUrlPipe,
    SafeYoutubeUrlPipe
  ],
})
export class SafePipesModule {}
