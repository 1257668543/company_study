## Tips:

​	之前数据平台使用的默认主题并非echarts 3.x的默认主题，而是使用常量的默认主题修改配置项颜色。同时存在一个btheme的主题设置，但暂未找到该主题的注册代码，猜测当初想要使用主题注入，最后改为了配置项传入。

之前使用的默认主题样式（不同指标会依次选取以下色号）：

```js
const defaultTheme = ['#4E7CCC', '#35B3C2', '#4ECDA5', '#94E08A', '#C7E466', '#EDCB72', '#F8AB60', '#F9815C', '#EB4456', '#C82B3D', '#375EA2'];
```

![image-20211022164122343](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211022164122343.png)

现在可以在这里 选择想要的主题 / 自行配置一个，生成JSON后用代码进行主题注册：

https://echarts.apache.org/zh/theme-builder.html	

==新增==深色模式（可以考虑增加一个 深/浅 色模式切换功能）：

![image-20211022165649358](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211022165649358.png)

![image-20211022165717061](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211022165717061.png)

![image-20211022165742275](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211022165742275.png)

# 时间序列折线图

升级后差异及问题：

1. 默认不再有Y轴线，只有刻度线（新的设计，也可选择展示）
2. 直接修改Y轴数据格式不生效，再修改其他配置后才生效
3. X轴文字方向横向与竖向之间切换失效，再修改其他配置后才生效
4. 对数刻度功能
5. 缺失过渡动画

功能优化：

1. 展示区间新的交互方式

# 时间序列柱状图

升级后差异及问题：

1. 默认不再有Y轴线，只有刻度线（新的设计，也可选择展示）
2. Y轴数据格式
3. X轴文字方向横向与竖向之间切换失效
4. 对数刻度功能
5. 缺失过渡动画

功能优化：

1. 展示区间新的交互方式

# 分布式柱状图

升级后差异及问题：

1. 默认不再有Y轴线，只有刻度线（新的设计，也可选择展示）
2. Y轴数据格式
3. X轴文字方向横向与竖向之间切换失效
4. 对数刻度功能
5. 缺失过渡动画

功能优化：

1. 展示区间新的交互方式

# 时间序列折柱图

升级后差异及问题：

1. 默认不再有Y轴线，只有刻度线（新的设计，也可选择展示）
2. Y轴数据格式
3. X轴文字方向横向与竖向之间切换失效
4. 对数刻度功能
5. 缺失过渡动画

功能优化：

1. 展示区间新的交互方式

# 饼图

升级后差异及问题：

1. 显示文本与值没有颜色与指向线
2. 缺失过渡动画

功能优化：

1. 增加高亮配置：聚焦，淡出效果

# 漏斗图

无



# 问题resolve

#### 1.直接修改Y轴数据格式不生效，再修改其他配置后才生效

​	验证y轴formatter根据sliceDetail已经更新，但图表并未刷新即formatter并未被执行，修改其他配置后才生效，怀疑是echarts-for-react组件未检测到options中函数类型formatter的变化，notMerge并未生效。

当前状态：done

修改：可以定位原因是通过echarts-for-react的options传入的函数类型formatter变化并没有被该组件检测到，于是直接获取echarts实例，在组件每次接受props转化为options后手动调用实例方法修改echarts的options。

#### 2.X轴文字方向横向与竖向之间切换失效，需要修改其他配置项才生效

​	初步猜测与以上问题相似，因为x轴方向为竖向也是通过函数类型formatter实现的

当前状态：done

修改：同上

#### 3.对数刻度功能

​	设置基数后对数刻度的上限会变为该基数，超出部分没有继续按指数分隔刻度，而是直接被隐藏，

以上情况只在beta环境下使用risk_level度量时复现。

当前状态：unfinished	

#### 4.过渡动画

​	初次加载以及options更新时缺少过场动画，但在部分场景下存在动画

当前状态：unfinished

#### 5.饼图显示文本与值缺少指示线

当前状态：done

修改：api变动带来的不兼容问题，options对齐至文档后解决。