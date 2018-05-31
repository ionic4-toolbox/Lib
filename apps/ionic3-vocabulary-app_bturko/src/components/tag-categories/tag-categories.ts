import { Component }            from '@angular/core';
import { ICategory }            from '../../shared/interfaces/category.interface';
import { GamePage }             from '../../pages/learn/game/game';
import { NavController }        from 'ionic-angular';
//import { Toast }                from '@ionic-native/toast';
import { CategoriesService }    from '../../shared/services/categories.service'

@Component({
  selector: 'tag-categories',
  templateUrl: 'tag-categories.html'
})
export class TagCategoriesComponent {

  text: string;
  categories: ICategory[];

  constructor(
      public navCtrl: NavController,
      //private toast: Toast,
      private categoriesService: CategoriesService
  ){
    this.text = 'Доступные категории';
    this.categoriesService.getCategories()
        .then((categories) => this.categories = categories);
  }

  learn() {
    this.navCtrl.push(GamePage, { val: 1 })
  }

}
