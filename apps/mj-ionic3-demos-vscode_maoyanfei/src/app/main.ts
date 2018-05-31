//导入视图类
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//导入本app使用的模型
import { AppModule } from './app.module';

//根据不同的平台创建与其对应的编译器实例
platformBrowserDynamic().bootstrapModule(AppModule);

