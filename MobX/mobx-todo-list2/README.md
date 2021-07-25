# 使用 mobx 完成 article 数据在 react 项目中的展示
  - Article 组件
  1. Storage
  2. API  前后端
  3. 组件MVVM
  
  1. url(路径层级)设计
    /articles
    /articles/:id
  2. react-router-dom
    router 配置 前端路由 SPA
  3. mobx 数据管理
    provider Store 做一个分支 Article
    mobx 通过observerable进行数据监听，@action getArticles 进行数据修改，组件生命通过getArticleById获取指定ariticle
  4. API
    配置后端url
  5. Article相关组件 @observable store
    componentDidMount 
  
  路由有多个模块
  /users  /articles /goods
  数据状态收到中央  什么状态都放在一个Store实例里就会导致结构混乱
  仓库只能有一个，
  <Provider store={store}>
  </Provider>
  多模块