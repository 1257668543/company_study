# 需求总览

![image-20211014111654063](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211014111654063.png)

| 需求名称                         | 时间      | 概述                                                         |
| -------------------------------- | --------- | ------------------------------------------------------------ |
| 数据分析模块（移动端自定义看板） | 9.03-9.29 | 同步pc端看板配置，在移动设备上进行筛选与横屏查看             |
| 数据开发模块（视图表&文件上传）  | 8.20-8.31 | 数据表管理与建表配置流程控制，支持使用上传文件作为数据源进行建表配置 |



## 移动端自定义看板

## 设计

### 交互流程：



看板列表：

<img src="/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211019111541598.png" alt="image-20211019111541598" style="zoom: 33%;" />

![pageInter](/Users/bianlifeng/Desktop/out/需求设计/modules/list_module/pageInter.png)

看板详情：

<img src="/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211019111653271.png" alt="image-20211019111653271" style="zoom:33%;" /><img src="/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211019111739889.png" alt="image-20211019111739889" style="zoom:33%;" />

![pageInter](/Users/bianlifeng/Desktop/out/需求设计/modules/detail_module/pageInter.png)

图表详情：

<img src="/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211019111836624.png" alt="image-20211019111836624" style="zoom:33%;" /><img src="/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211019111902346.png" alt="image-20211019111902346" style="zoom:33%;" />

![pageInter](/Users/bianlifeng/Desktop/out/需求设计/modules/chart_module/pageInter.png)



### 代码结构：

![image-20211011192412594](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211011192412594.png)

### 场景：

​	不同类型筛选项修改，状态收集



# 视图表&文件上传



场景：

1. 状态控制

2. 文件上传



## 状态控制

### 状态：

![image-20210910181609395](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20210910181609395.png)

### 业务流程：

```mermaid
graph TB
A[数据表开发] --> B[新建]
A --> C[复制]
A --> D[编辑]
A --> E[历史]
E --> 查看历史建表配置
B --不携带id--> F[填写建表配置, 生成id]
C --携带id初始化配置信息--> F[填写建表配置, 生成id]
F --> G[发布动作]
D --> H{版本号 > 0}
H --N--> G
H --Y--> K[修改建表无关信息]
G --版本号++--> K
K -.-> G
```

## 文件上传



失败尝试：上传控件 -> file对象 -> 二进制流, readAsBinaryString() -> body（fail） 

成功尝试：使用FormatData数据类型 -> append('file', file对象) -> Request设置data: { formdata: true } -> content-type：multipart/form-data



Upload组件api：

![image-20210906150527489](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20210906150527489.png)

Request：

![image-20210906151405756](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20210906151405756.png)



基于xhr 2提供的FormData接口生成FormData对象，使用append（k，v）添加表单项，此时v可以为file对象（该对象基于Blob，扩展了支持用户上传文件的功能，存储文件的相关信息，可通过使用Blob的api进行读取处理，如FileReader）。将FormData对象作为xhr请求的request-body时，请求内容格式content-type会被自动设置为 multipart / form-data，此时文件随表单以数据流的格式上传。

![1293392956-87680fce285e696a](/Users/bianlifeng/Desktop/1293392956-87680fce285e696a.png)



# 总结

1. 合理的设计可以减少开发时的成本，设计时对业务动作的思考也可以帮助避免在实现时容易忽略的问题。
2. 我们所使用的框架、组件，时常不能完美契合需求场景，需要有实现自定义封装，深入底层的能力。
3. 一个完整的需求，需要与设计、产品、后端有充分的沟通，避免开发到后期理解错误带来的时间等损失。

# 学习 & 产出



React-hooks: https://wiki.corp.bianlifeng.com/pages/viewpage.action?pageId=683639109

TypeScript: https://github.com/1257668543/company_study/tree/master/TS (进行中)

