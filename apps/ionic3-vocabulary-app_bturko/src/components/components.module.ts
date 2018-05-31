import { NgModule } from '@angular/core';
import { TagCategoriesComponent } from './tag-categories/tag-categories';
import { TagBadgeComponent } from './tag-badge/tag-badge';
import { TagGame1Component } from './tag-game1/tag-game1';

@NgModule({
	declarations: [
        TagCategoriesComponent,
        TagBadgeComponent,
        TagGame1Component
    ],
	imports: [],
	exports: [
	    TagCategoriesComponent,
        TagBadgeComponent,
        TagGame1Component
    ]
})
export class ComponentsModule {}
