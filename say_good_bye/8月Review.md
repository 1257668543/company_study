# 需求总览

| 需求名称                      | 时间      | 概述                                                         |
| ----------------------------- | --------- | ------------------------------------------------------------ |
| 数据权限-权限管理-用户权限    | 8.2-8.5   | 需求上线调整及优化：[wiki](https://wiki.corp.bianlifeng.com/pages/viewpage.action?pageId=660899975&_flowOrderId=2110092402333605&_taskOrderId=9a92ea03-27b6-4adb-b5a9-3bc4282d36cc) |
| 分析图表-分析配置抽屉         | 8.6-8.19  | 拆解业务流程 -> 映射到代码逻辑 -> 开发 -> 自测 -> 联调 -> 提测 -> 调整 |
| 数据开发模块(视图表&文件上传) | 8.20-8.31 | 开发 -> 自测 -> 联调 -> 提测 -> 调整 -> 上线                 |

# 问题总结

## 一、视图表&文件上传

- 状态：

  ![image-20210910181609395](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20210910181609395.png)
  
- 业务流程：

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

  

- 文件上传处理：

  失败尝试：上传控件 -> file对象 -> 二进制流, readAsBinaryString() -> body（fail） 

  成功尝试：使用FormatData数据类型 -> append('file', file对象) -> Request设置data: { formdata: true } -> content-type：multipart/form-data

  

  Upload组件api：

  ![image-20210906150527489](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20210906150527489.png)

  Request：

  ![image-20210906151405756](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20210906151405756.png)

  

  基于xhr 2提供的FormData接口生成FormData对象，使用append（k，v）添加表单项，此时v可以为file对象（该对象基于Blob，扩展了支持用户上传文件的功能，只存储文件的相关信息，并不包含实质内容，但可通过使用Blob的api进行读取处理，如FileReader）。将FormData对象作为xhr请求的body时，请求内容格式content-type会被自动设置为 multipart / form-data，此时文件随表单以数据流的格式上传。

  ![1293392956-87680fce285e696a](/Users/bianlifeng/Desktop/1293392956-87680fce285e696a.png)

  ### ***相关拓展：***

  1. DataURL转blob

  2. 预览图片
  
  3. 以二进制流上传文件
  
     ```javascript
     var fileInput = document.getElementById("fileInput");
     fileInput.addEventListener('change', function(event) {
         var file = fileInput.files[0];
         if (file) {
             var reader = new FileReader();  
             var xhr = new XMLHttpRequest();
             xhr.onprogress=function(e){
                 var percentage = Math.round((e.loaded * 100) / e.total);
                 console.log("percentage:"+percentage);
             }
             xhr.onload=function(e){
                 console.log("percentage:100");
             }
             xhr.open("POST", "这里填写服务器地址");  
             reader.onload = function(evt) {
                 xhr.send(evt.target.result);
             };
             reader.readAsBinaryString(file);
         }
     }); 
     ```
  
  4. 实现浏览器下载js生成的文件
  
  
  5. 文件切割上传
  

## 二、分析图表

- key不固定导致的重复render失去焦点问题

  ​	key的作用，单一职责

- 原生表格（table）列宽度问题

  ​	table-layout:

    * auto
    * fixed
  * 总的来说，对td设置宽度后显示效果与设置不相符的情况出现在显式为td设置了宽度而其宽度综合超过了table的宽度（table宽度可能是事先显式指定也可能未指定而td显式宽度总和超过视口宽度）
     在为超过table宽度的情况下，浏览器会优先将设置了宽度的td显示成对应的宽度值，在超过的时候，浏览器会尽可能地将td显示成设置的宽度值。如果要强制每列按照设置的宽度值显示，可以将table的布局设置为fixed，但还是要注意保证每列的宽度总和不要超过table的宽度，以免出现诡异的显示效果。

