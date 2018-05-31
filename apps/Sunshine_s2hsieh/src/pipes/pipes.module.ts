import { NgModule } from '@angular/core';
import { UvLevelPipe } from './uv-level/uv-level';
import { DegSymbolPipe } from './deg-symbol/deg-symbol';
import { IconSetPipe } from './icon-set/icon-set';
import { KeysPipe } from './keys/keys';
import { ProperNounPipe } from './proper-noun/proper-noun';
@NgModule({
	declarations: [UvLevelPipe, DegSymbolPipe, IconSetPipe, KeysPipe, ProperNounPipe],
	imports: [],
	exports: [UvLevelPipe, DegSymbolPipe, IconSetPipe, KeysPipe, ProperNounPipe]
})
export class PipesModule { }
