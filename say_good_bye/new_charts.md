[TOC]



- [ ] 瀑布图（柱图）
- [ ] 面积图（线图）
- [ ] 组合图形（柱、线、堆积）
- [ ] 玫瑰图（饼图） ==新==
- [ ] 雷达图 ==新==
- [ ] 散点图 ==新==
- [ ] 气泡图 ==新==
- [ ] 箱图 ==新==

# 瀑布图✅

## 1. 时间序列柱状图



后端返回数据结构：

```json
{
	"status": 0,
	"msg": null,
	"data": {
		"query": "select create_time as `create_time`, count(1) as `count111`, app_version as `app_version`, max(risk_level) as `测试` from yin_qi_1626272965328_140 where ((1=1) and (mysql_auto_time ='2021-08-27 00:00:00')) group by create_time, app_version order by `测试` desc, app_version asc, create_time asc, count(1) desc limit 50",
		"data_update_time": "2021-08-27 10:06:53",
		"fault": false,
		"fail_message": null,
		"slice_name": "",
		"have_filter": 0,
		"params": null,
		"data_from": "2021-08-27 00:00:00",
		"data_to": "2021-08-27 00:00:00",
		"owner": "",
		"custom_head": null,
		"slice_status": 0,
		"legends": ["count111", "app_version", "测试"],
		"times": ["2019-12-06 23:55:11.0", "2019-12-06 23:55:12.0", "2019-12-06 23:55:13.0", "2019-12-06 23:55:14.0", "2019-12-06 23:55:15.0", "2019-12-06 23:55:15.0", "2019-12-06 23:55:17.0", "2019-12-06 23:55:18.0", "2019-12-06 23:55:19.0", "2019-12-06 23:55:20.0", "2019-12-06 23:55:23.0", "2019-12-06 23:55:24.0", "2019-12-06 23:55:25.0", "2019-12-06 23:55:26.0", "2019-12-06 23:55:28.0", "2019-12-06 23:55:29.0", "2019-12-06 23:55:30.0", "2019-12-06 23:55:31.0", "2019-12-06 23:57:36.0", "2019-12-06 23:58:15.0"],
		"bar_bodies": [{
			"legend": "count111",
			"metrics": [5, 5, 6, 4, 1, 1, 3, 5, 2, 4, 1, 5, 2, 3, 5, 3, 4, 1, 1, 1],
			"dotted_line": false,
			"display_metrics": ["5", "5", "6", "4", "1", "1", "3", "5", "2", "4", "1", "5", "2", "3", "5", "3", "4", "1", "1", "1"]
		}, {
			"legend": "app_version",
			"metrics": [8010229, 8010229, 8010229, 8010229, 8010005, 8010005, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010227, 8010005],
			"dotted_line": false,
			"display_metrics": ["801,0229", "801,0229", "801,0229", "801,0229", "801,0005", "801,0005", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0227", "801,0005"]
		}, {
			"legend": "测试",
			"metrics": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2],
			"dotted_line": false,
			"display_metrics": ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "4", "2", "2", "2"]
		}]
	}
}
```

前端echarts配置数据结构：

```json
{
  "title":{
      "show":false,
      "text":"某站点用户访问来源",
      "subtext":"纯属虚构",
      "x":"center"
  },
  "legend":{
      "type":"scroll",
      "show":true,
      "data":[
          "count111",
          "app_version",
          "测试"
      ]
  },
  "tooltip":{
      "trigger":"axis",
      "axisPointer":{
          "type":"shadow"
      }
  },
  "xAxis":{
      "type":"category",
      "nameLocation":"middle",
      "nameGap":30,
      "data":[
          "2019-12-06 23:55:11.0",
          "2019-12-06 23:55:12.0",
          "2019-12-06 23:55:13.0",
          "2019-12-06 23:55:14.0",
          "2019-12-06 23:55:15.0",
          "2019-12-06 23:55:15.0",
          "2019-12-06 23:55:17.0",
          "2019-12-06 23:55:18.0",
          "2019-12-06 23:55:19.0",
          "2019-12-06 23:55:20.0",
          "2019-12-06 23:55:23.0",
          "2019-12-06 23:55:24.0",
          "2019-12-06 23:55:25.0",
          "2019-12-06 23:55:26.0",
          "2019-12-06 23:55:28.0",
          "2019-12-06 23:55:29.0",
          "2019-12-06 23:55:30.0",
          "2019-12-06 23:55:31.0",
          "2019-12-06 23:57:36.0",
          "2019-12-06 23:58:15.0"
      ],
      "axisLabel":{
          "rotate":0
      },
      "position":"bottom",
      "axisLine":{
          "onZero":true
      }
  },
  "yAxis":[
      {
          "type":"value",
          "logBase":10,
          "inverse":false,
          "axisLabel":{

          }
      }
  ],
  "grid":{
      "left":"3%",
      "right":"4%",
      "bottom":"10%",
      "containLabel":true
  },
  "dataZoom":[
      {
          "show":false,
          "start":0,
          "end":100,
          "realtime":true
      },
      {
          "type":"inside",
          "realtime":true,
          "disabled":false,
          "zoomOnMouseWheel":true
      }
  ],
  "series":[
      {
          "data":[
              5,
              5,
              6,
              4,
              1,
              1,
              3,
              5,
              2,
              4,
              1,
              5,
              2,
              3,
              5,
              3,
              4,
              1,
              1,
              1
          ],
          "name":"count111",
          "type":"bar",
          "label":{
              "normal":{
                  "position":"insideTop"
              }
          },
          "stack":null
      },
      {
          "data":[
              8010229,
              8010229,
              8010229,
              8010229,
              8010005,
              8010005,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010227,
              8010005
          ],
          "name":"app_version",
          "type":"bar",
          "label":{
              "normal":{
                  "position":"insideTop"
              }
          },
          "stack":null
      },
      {
          "data":[
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              4,
              2,
              2,
              2
          ],
          "name":"测试",
          "type":"bar",
          "label":{
              "normal":{
                  "position":"insideTop"
              }
          },
          "stack":null
      }
  ],
  "color":[
      "#4f69f2",
      "#35a7fa",
      "#9152f7",
      "#d177f4",
      "#ff5959",
      "#f5c723",
      "#87d068"
  ]
}
```



## 2. 分布式柱状图



后端返回数据结构：

```json
{
  "status":0,
  "msg":null,
  "data":{
      "query":"select create_time as `create_time`, count(1) as `count111`, app_version as `app_version`, max(risk_level) as `测试` from yin_qi_1626272965328_140 where ((1=1) and (mysql_auto_time ='2021-08-27 00:00:00')) group by create_time, app_version order by `测试` desc, app_version asc, create_time asc, count(1) desc limit 1000",
      "data_update_time":"2021-08-27 10:06:53",
      "fault":false,
      "fail_message":null,
      "slice_name":"",
      "have_filter":0,
      "params":null,
      "data_from":"2021-08-27 00:00:00",
      "data_to":"2021-08-27 00:00:00",
      "owner":"",
      "custom_head":null,
      "slice_status":0,
      "need_map":{
          "[count111]":[
              {
                  "x":"[2019-12-06 23:55:30.0]",
                  "y":"4",
                  "display_y":"4"
              },
              {
                  "x":"[2019-12-06 23:55:15.0]",
                  "y":"4",
                  "display_y":"4"
              },
              {
                  "x":"[2019-12-06 23:58:15.0]",
                  "y":"1",
                  "display_y":"1"
              },
              {
                  "x":"[2019-12-06 23:57:36.0]",
                  "y":"1",
                  "display_y":"1"
              },
              {
                  "x":"[2019-12-06 23:55:11.0]",
                  "y":"5",
                  "display_y":"5"
              },
              {
                  "x":"[2019-12-06 23:55:12.0]",
                  "y":"5",
                  "display_y":"5"
              },
              {
                  "x":"[2019-12-06 23:55:13.0]",
                  "y":"6",
                  "display_y":"6"
              },
              {
                  "x":"[2019-12-06 23:55:14.0]",
                  "y":"4",
                  "display_y":"4"
              },
              {
                  "x":"[2019-12-06 23:55:17.0]",
                  "y":"3",
                  "display_y":"3"
              },
              {
                  "x":"[2019-12-06 23:55:18.0]",
                  "y":"5",
                  "display_y":"5"
              },
              {
                  "x":"[2019-12-06 23:55:19.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:20.0]",
                  "y":"4",
                  "display_y":"4"
              },
              {
                  "x":"[2019-12-06 23:55:23.0]",
                  "y":"1",
                  "display_y":"1"
              },
              {
                  "x":"[2019-12-06 23:55:24.0]",
                  "y":"5",
                  "display_y":"5"
              },
              {
                  "x":"[2019-12-06 23:55:25.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:26.0]",
                  "y":"3",
                  "display_y":"3"
              },
              {
                  "x":"[2019-12-06 23:55:28.0]",
                  "y":"5",
                  "display_y":"5"
              },
              {
                  "x":"[2019-12-06 23:55:29.0]",
                  "y":"3",
                  "display_y":"3"
              },
              {
                  "x":"[2019-12-06 23:55:31.0]",
                  "y":"1",
                  "display_y":"1"
              }
          ],
          "[app_version]":[
              {
                  "x":"[2019-12-06 23:55:30.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:15.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:58:15.0]",
                  "y":"8010005",
                  "display_y":"801,0005"
              },
              {
                  "x":"[2019-12-06 23:57:36.0]",
                  "y":"8010227",
                  "display_y":"801,0227"
              },
              {
                  "x":"[2019-12-06 23:55:11.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:12.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:13.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:14.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:17.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:18.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:19.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:20.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:23.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:24.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:25.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:26.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:28.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:29.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              },
              {
                  "x":"[2019-12-06 23:55:31.0]",
                  "y":"8010229",
                  "display_y":"801,0229"
              }
          ],
          "[测试]":[
              {
                  "x":"[2019-12-06 23:55:30.0]",
                  "y":"4",
                  "display_y":"4"
              },
              {
                  "x":"[2019-12-06 23:55:15.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:58:15.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:57:36.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:11.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:12.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:13.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:14.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:17.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:18.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:19.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:20.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:23.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:24.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:25.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:26.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:28.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:29.0]",
                  "y":"2",
                  "display_y":"2"
              },
              {
                  "x":"[2019-12-06 23:55:31.0]",
                  "y":"2",
                  "display_y":"2"
              }
          ]
      }
  }
}
```

前端echarts配置数据结构：

```json
{
  "title":{
      "show":false,
      "text":"某站点用户访问来源",
      "subtext":"纯属虚构",
      "x":"center"
  },
  "legend":{
      "type":"scroll",
      "show":true,
      "data":[
          "count111",
          "app_version",
          "测试"
      ]
  },
  "tooltip":{
      "trigger":"axis",
      "axisPointer":{
          "type":"shadow"
      }
  },
  "xAxis":{
      "type":"category",
      "nameLocation":"middle",
      "nameGap":30,
      "data":[
          "2019-12-06 23:55:30.0",
          "2019-12-06 23:55:15.0",
          "2019-12-06 23:58:15.0",
          "2019-12-06 23:57:36.0",
          "2019-12-06 23:55:11.0",
          "2019-12-06 23:55:12.0",
          "2019-12-06 23:55:13.0",
          "2019-12-06 23:55:14.0",
          "2019-12-06 23:55:17.0",
          "2019-12-06 23:55:18.0",
          "2019-12-06 23:55:19.0",
          "2019-12-06 23:55:20.0",
          "2019-12-06 23:55:23.0",
          "2019-12-06 23:55:24.0",
          "2019-12-06 23:55:25.0",
          "2019-12-06 23:55:26.0",
          "2019-12-06 23:55:28.0",
          "2019-12-06 23:55:29.0",
          "2019-12-06 23:55:31.0"
      ],
      "nameTextStyle":{
          "padding":[
              -10,
              0,
              0,
              6
          ]
      },
      "axisLabel":{
          "rotate":0
      },
      "position":"bottom",
      "axisLine":{
          "onZero":true
      }
  },
  "yAxis":{
      "type":"value",
      "logBase":10,
      "inverse":false,
      "splitLine":{
          "lineStyle":{
              "color":"#eee",
              "type":"dashed",
              "width":1
          }
      },
      "axisLabel":{

      },
      "splitArea":{
          "show":false
      }
  },
  "grid":{
      "left":"3%",
      "right":"4%",
      "bottom":"10%",
      "containLabel":true
  },
  "dataZoom":[
      {
          "show":false,
          "start":0,
          "end":100,
          "realtime":true,
          "orient":"horizontal",
          "yAxisIndex":null
      },
      {
          "type":"inside",
          "realtime":true,
          "disabled":false,
          "zoomOnMouseWheel":true,
          "orient":"horizontal",
          "yAxisIndex":null
      }
  ],
  "series":[
      {
          "name":"count111",
          "type":"bar",
          "data":[
              "4",
              "4",
              "1",
              "1",
              "5",
              "5",
              "6",
              "4",
              "3",
              "5",
              "2",
              "4",
              "1",
              "5",
              "2",
              "3",
              "5",
              "3",
              "1"
          ],
          "label":{
              "normal":{
                  "position":"insideTop"
              }
          },
          "stack":null
      },
      {
          "name":"app_version",
          "type":"bar",
          "data":[
              "8010229",
              "8010229",
              "8010005",
              "8010227",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229",
              "8010229"
          ],
          "label":{
              "normal":{
                  "position":"insideTop"
              }
          },
          "stack":null
      },
      {
          "name":"测试",
          "type":"bar",
          "data":[
              "4",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2",
              "2"
          ],
          "label":{
              "normal":{
                  "position":"insideTop"
              }
          },
          "stack":null
      }
  ],
  "color":[
      "#4f69f2",
      "#35a7fa",
      "#9152f7",
      "#d177f4",
      "#ff5959",
      "#f5c723",
      "#87d068"
  ]
}
```



## 3. 前端echarts配置

```json
{
    "title":{
        "text":"Accumulated Waterfall Chart"
    },
    "tooltip":{
        "trigger":"axis",
        "axisPointer":{
            "type":"shadow"
        }
    },
    "legend":{
        "data":[
            "Expenses",
            "Income"
        ]
    },
    "grid":{
        "left":"3%",
        "right":"4%",
        "bottom":"3%",
        "containLabel":true
    },
    "xAxis":{
        "type":"category",
        "data":[
            "Nov 1",
            "Nov 2",
            "Nov 3",
            "Nov 4",
            "Nov 5",
            "Nov 6",
            "Nov 7",
            "Nov 8",
            "Nov 9",
            "Nov 10",
            "Nov 11"
        ]
    },
    "yAxis":{
        "type":"value"
    },
    "series":[
        {
            "name":"Placeholder",
            "type":"bar",
            "stack":"Total",
            "itemStyle":{
                "borderColor":"transparent",
                "color":"transparent"
            },
            "emphasis":{
                "itemStyle":{
                    "borderColor":"transparent",
                    "color":"transparent"
                }
            },
            "data":[
                0,
                900,
                1245,
                1530,
                1376,
                1376,
                1511,
                1689,
                1856,
                1495,
                1292
            ]
        },
        {
            "name":"Income",
            "type":"bar",
            "stack":"Total",
            "label":{
                "show":true,
                "position":"top"
            },
            "data":[
                900,
                345,
                393,
                "-",
                "-",
                135,
                178,
                286,
                "-",
                "-",
                "-"
            ]
        },
        {
            "name":"Expenses",
            "type":"bar",
            "stack":"Total",
            "label":{
                "show":true,
                "position":"bottom"
            },
            "data":[
                "-",
                "-",
                "-",
                108,
                154,
                "-",
                "-",
                "-",
                119,
                361,
                203
            ]
        }
    ]
}
```



# 面积图（新）✅



## 后端返回数据结构：

```json
{
	"status": 0,
	"msg": null,
	"data": {
		"query": "select create_time as `create_time`, count(1) as `count111`, app_version as `app_version`, max(risk_level) as `测试` from yin_qi_1626272965328_140 where ((1=1) and (mysql_auto_time ='2021-08-27 00:00:00')) group by create_time, app_version order by `测试` desc, app_version asc, create_time asc, count(1) desc limit 1000",
		"data_update_time": "2021-08-27 10:06:53",
		"fault": false,
		"fail_message": null,
		"slice_name": "",
		"have_filter": 0,
		"params": null,
		"data_from": "2021-08-27 00:00:00",
		"data_to": "2021-08-27 00:00:00",
		"owner": "",
		"custom_head": null,
		"slice_status": 0,
		"legends": ["count111", "app_version", "测试"],
		"compare_query": null,
		"times": ["2019-12-06 23:55:11.0", "2019-12-06 23:55:12.0", "2019-12-06 23:55:13.0", "2019-12-06 23:55:14.0", "2019-12-06 23:55:15.0", "2019-12-06 23:55:15.0", "2019-12-06 23:55:17.0", "2019-12-06 23:55:18.0", "2019-12-06 23:55:19.0", "2019-12-06 23:55:20.0", "2019-12-06 23:55:23.0", "2019-12-06 23:55:24.0", "2019-12-06 23:55:25.0", "2019-12-06 23:55:26.0", "2019-12-06 23:55:28.0", "2019-12-06 23:55:29.0", "2019-12-06 23:55:30.0", "2019-12-06 23:55:31.0", "2019-12-06 23:57:36.0", "2019-12-06 23:58:15.0"],
		"compare_times": null,
		"line_bodies": [{
			"legend": "count111",
			"metrics": [5, 5, 6, 4, 1, 1, 3, 5, 2, 4, 1, 5, 2, 3, 5, 3, 4, 1, 1, 1],
			"dotted_line": false,
			"display_metrics": ["5", "5", "6", "4", "1", "1", "3", "5", "2", "4", "1", "5", "2", "3", "5", "3", "4", "1", "1", "1"],
			"type": null
		}, {
			"legend": "app_version",
			"metrics": [8010229, 8010229, 8010229, 8010229, 8010005, 8010005, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010229, 8010227, 8010005],
			"dotted_line": false,
			"display_metrics": ["801,0229", "801,0229", "801,0229", "801,0229", "801,0005", "801,0005", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0229", "801,0227", "801,0005"],
			"type": null
		}, {
			"legend": "测试",
			"metrics": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2],
			"dotted_line": false,
			"display_metrics": ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "4", "2", "2", "2"],
			"type": null
		}],
		"compare_line_bodies": null
	}
}
```

## 前端echarts配置数据结构：

```json
{
  "title":{
      "show":false,
      "text":"某站点用户访问来源",
      "subtext":"纯属虚构",
      "x":"center"
  },
  "legend":{
      "type":"scroll",
      "data":[
          "count111",
          "app_version",
          "测试"
      ],
      "show":true
  },
  "tooltip":{
      "confine":true,
      "trigger":"axis"
  },
  "xAxis":{
      "type":"category",
      "boundaryGap":false,
      "nameLocation":"middle",
      "nameGap":30,
      "data":[
          "2019-12-06 23:55:11.0",
          "2019-12-06 23:55:12.0",
          "2019-12-06 23:55:13.0",
          "2019-12-06 23:55:14.0",
          "2019-12-06 23:55:15.0",
          "2019-12-06 23:55:15.0",
          "2019-12-06 23:55:17.0",
          "2019-12-06 23:55:18.0",
          "2019-12-06 23:55:19.0",
          "2019-12-06 23:55:20.0",
          "2019-12-06 23:55:23.0",
          "2019-12-06 23:55:24.0",
          "2019-12-06 23:55:25.0",
          "2019-12-06 23:55:26.0",
          "2019-12-06 23:55:28.0",
          "2019-12-06 23:55:29.0",
          "2019-12-06 23:55:30.0",
          "2019-12-06 23:55:31.0",
          "2019-12-06 23:57:36.0",
          "2019-12-06 23:58:15.0"
      ],
      "axisLabel":{
          "rotate":0
      },
      "position":"bottom",
      "axisLine":{
          "onZero":true
      }
  },
  "yAxis":{
      "type":"value",
      "logBase":10,
      "inverse":false,
      "axisLabel":{

      },
      "splitLine":{
          "lineStyle":{
              "color":"#eee",
              "type":"dashed",
              "width":1
          }
      }
  },
  "grid":{
      "left":"3%",
      "right":"4%",
      "bottom":"10%",
      "containLabel":true
  },
  "dataZoom":[
      {
          "show":false,
          "start":0,
          "end":100,
          "realtime":true
      },
      {
          "type":"inside",
          "realtime":true,
          "disabled":false,
          "zoomOnMouseWheel":true
      }
  ],
  "series":[
      {
          "data":[
              5,
              5,
              6,
              4,
              1,
              1,
              3,
              5,
              2,
              4,
              1,
              5,
              2,
              3,
              5,
              3,
              4,
              1,
              1,
              1
          ],
          "name":"count111",
          "type":"line",
          "symbol":"circle",
          "symbolSize":6,
          "showAllSymbol":true,
          "smooth":true,
          "showSymbol":false
      },
      {
          "data":[
              8010229,
              8010229,
              8010229,
              8010229,
              8010005,
              8010005,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010229,
              8010227,
              8010005
          ],
          "name":"app_version",
          "type":"line",
          "symbol":"circle",
          "symbolSize":6,
          "showAllSymbol":true,
          "smooth":true,
          "showSymbol":false
      },
      {
          "data":[
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              2,
              4,
              2,
              2,
              2
          ],
          "name":"测试",
          "type":"line",
          "symbol":"circle",
          "symbolSize":6,
          "showAllSymbol":true,
          "smooth":true,
          "showSymbol":false
      }
  ],
  "color":[
      "#4f69f2",
      "#35a7fa",
      "#9152f7",
      "#d177f4",
      "#ff5959",
      "#f5c723",
      "#87d068"
  ]
}
```

## ==不需要后端支持，前端修改配置==

# 组合图形（新）



## 后端返回数据结构：

## 无



## 前端echarts配置数据结构（demo）：

```json
{
  "tooltip":{
      "trigger":"axis",
      "axisPointer":{
          "type":"cross",
          "crossStyle":{
              "color":"#999"
          }
      }
  },
  "toolbox":{
      "feature":{
          "dataView":{
              "show":true,
              "readOnly":false
          },
          "magicType":{
              "show":true,
              "type":[
                  "line",
                  "bar"
              ]
          },
          "restore":{
              "show":true
          },
          "saveAsImage":{
              "show":true
          }
      }
  },
  "legend":{
      "data":[
          "蒸发量",
          "降雨量",
          "温度"
      ]
  },
  "xAxis":[
      {
          "type":"category",
          "data":[
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
              "Sun"
          ],
          "axisPointer":{
              "type":"shadow"
          }
      }
  ],
  "yAxis":[
      {
          "type":"value",
          "name":"降雨量",
          "min":0,
          "max":250,
          "interval":50,
          "axisLabel":{
              "formatter":"{value} ml"
          }
      },
      {
          "type":"value",
          "name":"温度",
          "min":0,
          "max":25,
          "interval":5,
          "axisLabel":{
              "formatter":"{value} °C"
          }
      }
  ],
  "series":[
      {
          "name":"蒸发量",
          "type":"bar",
          "data":[
              2,
              4.9,
              7,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20,
              6.4,
              3.3
          ]
      },
      {
          "name":"降雨量",
          "type":"bar",
          "data":[
              2.6,
              5.9,
              9,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6,
              2.3
          ]
      },
      {
          "name":"温度",
          "type":"line",
          "yAxisIndex":1,
          "data":[
              2,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23,
              16.5,
              12,
              6.2
          ]
      },
      {
          "name":"朝阳",
          "type":"bar",
          "stack":"Ad",
          "emphasis":{
              "focus":"series"
          },
          "data":[
              12,
              13,
              10,
              13,
              9,
              23,
              21
          ]
      },
      {
          "name":"海淀",
          "type":"bar",
          "stack":"Ad",
          "emphasis":{
              "focus":"series"
          },
          "data":[
              22,
              18,
              19,
              23,
              29,
              33,
              31
          ]
      },
      {
          "name":"东城",
          "type":"bar",
          "stack":"Ad",
          "emphasis":{
              "focus":"series"
          },
          "data":[
              15,
              23,
              20,
              15,
              19,
              33,
              41
          ]
      }
  ]
}
```

## ==需要前后端同时开发==

# 极坐标图（新）✅



## 后端返回数据结构：

## 同柱状图



## 前端echarts配置数据结构（demo）：

```json
{
    "title":[
        {
            "text":"Radial Polar Bar Label Position (middle)"
        }
    ],
    "polar":{
        "radius":[
            30,
            "80%"
        ]
    },
    "radiusAxis":{
        "max":4
    },
    "angleAxis":{
        "type":"category",
        "data":[
            "a",
            "b",
            "c",
            "d"
        ],
        "startAngle":75
    },
    "tooltip":{

    },
    "series":{
        "type":"bar",
        "data":[
            2,
            1.2,
            2.4,
            3.6
        ],
        "coordinateSystem":"polar",
        "label":{
            "show":true,
            "position":"middle",
            "formatter":"{b}: {c}"
        }
    },
    "backgroundColor":"#fff",
    "animation":false
}
```



## ==不需要后端支持，前端修改配置==



# 雷达图（新）



## 后端返回数据结构：

## 无



## 前端echarts配置数据结构：

```json
{
    "title":{
        "text":"Basic Radar Chart"
    },
    "legend":{
        "data":[
            "Allocated Budget",
            "Actual Spending"
        ]
    },
    "radar":{
        "indicator":[
            {
                "name":"Sales",
                "max":6500
            },
            {
                "name":"Administration",
                "max":16000
            },
            {
                "name":"Information Technology",
                "max":30000
            },
            {
                "name":"Customer Support",
                "max":38000
            },
            {
                "name":"Development",
                "max":52000
            },
            {
                "name":"Marketing",
                "max":25000
            }
        ]
    },
    "series":[
        {
            "name":"Budget vs spending",
            "type":"radar",
            "data":[
                {
                    "value":[
                        4200,
                        3000,
                        20000,
                        35000,
                        50000,
                        18000
                    ],
                    "name":"Allocated Budget"
                },
                {
                    "value":[
                        5000,
                        14000,
                        28000,
                        26000,
                        42000,
                        21000
                    ],
                    "name":"Actual Spending"
                }
            ]
        }
    ]
}
```



## ==需要前后端同时开发==

# 散点图（新）



## 后端返回数据结构：

## 无



## 前端echarts配置数据结构：

```json
{
    "xAxis":{

    },
    "yAxis":{

    },
    "series":[
        {
            "symbolSize":20,
            "data":[
                [
                    10,
                    8.04
                ],
                [
                    8.07,
                    6.95
                ],
                [
                    13,
                    7.58
                ],
                [
                    9.05,
                    8.81
                ],
                [
                    11,
                    8.33
                ],
                [
                    14,
                    7.66
                ],
                [
                    13.4,
                    6.81
                ],
                [
                    10,
                    6.33
                ],
                [
                    14,
                    8.96
                ],
                [
                    12.5,
                    6.82
                ],
                [
                    9.15,
                    7.2
                ],
                [
                    11.5,
                    7.2
                ],
                [
                    3.03,
                    4.23
                ],
                [
                    12.2,
                    7.83
                ],
                [
                    2.02,
                    4.47
                ],
                [
                    1.05,
                    3.33
                ],
                [
                    4.05,
                    4.96
                ],
                [
                    6.03,
                    7.24
                ],
                [
                    12,
                    6.26
                ],
                [
                    12,
                    8.84
                ],
                [
                    7.08,
                    5.82
                ],
                [
                    5.02,
                    5.68
                ]
            ],
            "type":"scatter"
        }
    ]
}
```



## ==需要前后端同时开发==



# 气泡图（新）



## 后端返回数据结构：

## 无



## 前端echarts配置数据结构：

```js
const hours = [
  '12a', '1a', '2a', '3a', '4a', '5a', '6a',
  '7a', '8a', '9a', '10a', '11a',
  '12p', '1p', '2p', '3p', '4p', '5p',
  '6p', '7p', '8p', '9p', '10p', '11p'
];

const days = [
  'Saturday', 'Friday', 'Thursday',
  'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];

const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
  .map(function (item) {
  return [item[1], item[0], item[2]];
});

const option = {
  title: {
    text: 'Punch Card of Github'
  },
  legend: {
    data: ['Punch Card'],
    left: 'right'
  },
  tooltip: {
    position: 'top',
    formatter: function (params) {
      return (
        params.value[2] +
        ' commits in ' +
        hours[params.value[0]] +
        ' of ' +
        days[params.value[1]]
      );
    }
  },
  grid: {
    left: 2,
    bottom: 10,
    right: 10,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: hours,
    boundaryGap: false,
    splitLine: {
      show: true
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    axisLine: {
      show: false
    }
  },
  series: [
    {
      name: 'Punch Card',
      type: 'scatter',
      symbolSize: function (val) {
        return val[2] * 2;
      },
      data: data,
      animationDelay: function (idx) {
        return idx * 5;
      }
    }
  ]
};
```

## ==需要前后端同时开发==



# 箱图（新）



## 后端返回数据结构：

## 无



## 前端echarts配置数据结构：

```json
{
    "title":[
        {
            "text":"Michelson-Morley Experiment",
            "left":"center"
        },
        {
            "text":"upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR",
            "borderColor":"#999",
            "borderWidth":1,
            "textStyle":{
                "fontWeight":"normal",
                "fontSize":14,
                "lineHeight":20
            },
            "left":"10%",
            "top":"90%"
        }
    ],
    "dataset":[
        {
            "source":[
                [
                    850,
                    740,
                    900,
                    1070,
                    930,
                    850,
                    950,
                    980,
                    980,
                    880,
                    1000,
                    980,
                    930,
                    650,
                    760,
                    810,
                    1000,
                    1000,
                    960,
                    960
                ],
                [
                    960,
                    940,
                    960,
                    940,
                    880,
                    800,
                    850,
                    880,
                    900,
                    840,
                    830,
                    790,
                    810,
                    880,
                    880,
                    830,
                    800,
                    790,
                    760,
                    800
                ],
                [
                    880,
                    880,
                    880,
                    860,
                    720,
                    720,
                    620,
                    860,
                    970,
                    950,
                    880,
                    910,
                    850,
                    870,
                    840,
                    840,
                    850,
                    840,
                    840,
                    840
                ],
                [
                    890,
                    810,
                    810,
                    820,
                    800,
                    770,
                    760,
                    740,
                    750,
                    760,
                    910,
                    920,
                    890,
                    860,
                    880,
                    720,
                    840,
                    850,
                    850,
                    780
                ],
                [
                    890,
                    840,
                    780,
                    810,
                    760,
                    810,
                    790,
                    810,
                    820,
                    850,
                    870,
                    870,
                    810,
                    740,
                    810,
                    940,
                    950,
                    800,
                    810,
                    870
                ]
            ]
        },
        {
            "transform":{
                "type":"boxplot",
                "config":{
                    "itemNameFormatter":"expr {value}"
                }
            }
        },
        {
            "fromDatasetIndex":1,
            "fromTransformResult":1
        }
    ],
    "tooltip":{
        "trigger":"item",
        "axisPointer":{
            "type":"shadow"
        }
    },
    "grid":{
        "left":"10%",
        "right":"10%",
        "bottom":"15%"
    },
    "xAxis":{
        "type":"category",
        "boundaryGap":true,
        "nameGap":30,
        "splitArea":{
            "show":false
        },
        "splitLine":{
            "show":false
        }
    },
    "yAxis":{
        "type":"value",
        "name":"km/s minus 299,000",
        "splitArea":{
            "show":true
        }
    },
    "series":[
        {
            "name":"boxplot",
            "type":"boxplot",
            "datasetIndex":1
        },
        {
            "name":"outlier",
            "type":"scatter",
            "datasetIndex":2
        }
    ]
}
```



## ==需要前后端同时开发==



# 总结



![image-20211027195622373](/Users/bianlifeng/Library/Application Support/typora-user-images/image-20211027195622373.png)