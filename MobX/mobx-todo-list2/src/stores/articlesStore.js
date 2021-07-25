// observable 可以被观察 action 修改状态的方式
import { observable, action } from 'mobx';

export class ArticleStore {
  // 可以被观察的map array object
  // 从无到有 loading
  @observable articlesRegistry = observable.map();
  @action loadArticle(slug) {
    // articlesRegistry push
    // api
  }
}

export default new ArticleStore();