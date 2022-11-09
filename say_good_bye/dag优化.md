# Opt1

重置焦点原来会导致两次update，一次是transform变化导致的，一次是重置isReset标志导致的，忽略isReset导致的update可以减少一次重渲染。

优化前：

![image-20220125142804086](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125142804086.png)

优化后：

![image-20220125142930132](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125142930132.png)

# Opt2

在任务节点数量比较多时（百、千级别），页面初始化会变得很慢，在使用chrome Performence 工具测试后发现 大部分时间花在了将从后端请求的结果set为MobX 的 observable 变量上，具体效果见下图（测试环境，拷贝线上数据进行本地mock）：

优化前：

![image-20220125144314268](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125144314268.png)

优化后：

![image-20220125162149300](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125162149300.png)

![image-20220125152301755](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125152301755.png)

![image-20220125152234997](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125152234997.png)

## source code:

![image-20220125171627048](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125171627048.png)

## tight-tree：

![image-20220125170721343](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125170721343.png)

![image-20220125164530101](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125164530101.png)



## longest-path:

![image-20220125170628597](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125170628597.png)

![image-20220125164853862](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125164853862.png)



## network-simplex(default):

![image-20220125170450194](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125170450194.png)

![image-20220125165313422](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20220125165313422.png)