import * as React from 'react';


// constant
const baseUnit = 2; // 一家门店两个单位像素
const gutter = 20; // 战区之间的间隔

// 战区纬度数据
const warZoneSumList: {
	warZone: string;
	warZoneCn: string;
	originCount: number;
	targetCount: number;
	variation: number;
}[] = [
  {
    "warZone": "11147586",
    "warZoneCn": "李心晴",
    "originCount": 1,
    "targetCount": 6,
    "variation": 5
  },
  {
    "warZone": "11147099",
    "warZoneCn": "胡斌",
    "originCount": 4,
    "targetCount": 8,
    "variation": 4
  },
  {
    "warZone": "11210344",
    "warZoneCn": "黄剑磊",
    "originCount": 2,
    "targetCount": 8,
    "variation": 6
  },
  {
    "warZone": "11133134",
    "warZoneCn": "李舜宇",
    "originCount": 15,
    "targetCount": 0,
    "variation": -15
  }
];

// 门店纬度数据
const commonShopMap : {
	[shopCode: string]: {
		shopName: string;
		shopCode: string;
		longitude: number;
		latitude: number;
		shopVersionList: {
			shopCode: string;
			status: string;
			versionType: string;
			warZone: string;
			warZoneChangeType?: string;
		}[];
		versionList: {
			versionType: string;
			warZone: string;
		}[];
	}
} = {
  "115000008": {
    "shopName": "宝能科技园7栋店",
    "shopCode": "115000008",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 114.072599,
    "latitude": 22.679664,
    "shopVersionList": [
      {
        "shopCode": "115000008",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000008",
        "status": "in_business",
        "warZone": "11210344",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000009": {
    "shopName": "中天元物流中心C座店",
    "shopCode": "115000009",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147586"
      }
    ],
    "longitude": 114.066474,
    "latitude": 22.509771,
    "shopVersionList": [
      {
        "shopCode": "115000009",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000009",
        "status": "in_business",
        "warZone": "11147586",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000018": {
    "shopName": "中民时代广场店",
    "shopCode": "115000018",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147586"
      }
    ],
    "longitude": 114.111524,
    "latitude": 22.562981,
    "shopVersionList": [
      {
        "shopCode": "115000018",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000018",
        "status": "in_business",
        "warZone": "11147586",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000019": {
    "shopName": "桑达科技工业大厦店",
    "shopCode": "115000019",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147586"
      }
    ],
    "longitude": 113.955583,
    "latitude": 22.54756,
    "shopVersionList": [
      {
        "shopCode": "115000019",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000019",
        "status": "in_business",
        "warZone": "11147586",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000022": {
    "shopName": "展滔商业广场A座店",
    "shopCode": "115000022",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 114.018079,
    "latitude": 22.645867,
    "shopVersionList": [
      {
        "shopCode": "115000022",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000022",
        "status": "in_business",
        "warZone": "11210344",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000023": {
    "shopName": "中粮商务公园店",
    "shopCode": "115000023",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11147099"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.929691,
    "latitude": 22.581903,
    "shopVersionList": [
      {
        "shopCode": "115000023",
        "status": "sleep",
        "warZone": "11147099",
        "versionType": "origin"
      },
      {
        "shopCode": "115000023",
        "status": "sleep",
        "warZone": "11147099",
        "versionType": "target"
      }
    ]
  },
  "115000026": {
    "shopName": "东明大厦店",
    "shopCode": "115000026",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 114.047354,
    "latitude": 22.620082,
    "shopVersionList": [
      {
        "shopCode": "115000026",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000026",
        "status": "in_business",
        "warZone": "11210344",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000028": {
    "shopName": "华丰金融港店",
    "shopCode": "115000028",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11147099"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.886567,
    "latitude": 22.573448,
    "shopVersionList": [
      {
        "shopCode": "115000028",
        "status": "sleep",
        "warZone": "11147099",
        "versionType": "origin"
      },
      {
        "shopCode": "115000028",
        "status": "sleep",
        "warZone": "11147099",
        "versionType": "target"
      }
    ]
  },
  "115000030": {
    "shopName": "万德莱大厦北座店",
    "shopCode": "115000030",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.954427,
    "latitude": 22.54408,
    "shopVersionList": [
      {
        "shopCode": "115000030",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000030",
        "status": "in_business",
        "warZone": "11147099",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000037": {
    "shopName": "天汇大厦店",
    "shopCode": "115000037",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 114.05212,
    "latitude": 22.649191,
    "shopVersionList": [
      {
        "shopCode": "115000037",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000037",
        "status": "in_business",
        "warZone": "11210344",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000057": {
    "shopName": "环球数码大厦店",
    "shopCode": "115000057",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.943441,
    "latitude": 22.549403,
    "shopVersionList": [
      {
        "shopCode": "115000057",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000057",
        "status": "in_business",
        "warZone": "11147099",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000063": {
    "shopName": "深圳报业大厦店",
    "shopCode": "115000063",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11147099"
      },
      {
        "versionType": "target",
        "warZone": "11147586"
      }
    ],
    "longitude": 114.051776,
    "latitude": 22.546618,
    "shopVersionList": [
      {
        "shopCode": "115000063",
        "status": "sleep",
        "warZone": "11147099",
        "versionType": "origin"
      },
      {
        "shopCode": "115000063",
        "status": "sleep",
        "warZone": "11147586",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000069": {
    "shopName": "大唐时代店",
    "shopCode": "115000069",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 114.047727,
    "latitude": 22.670906,
    "shopVersionList": [
      {
        "shopCode": "115000069",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000069",
        "status": "in_business",
        "warZone": "11210344",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000107": {
    "shopName": "湾畔花园店",
    "shopCode": "115000107",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11147099"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.973042,
    "latitude": 22.546251,
    "shopVersionList": [
      {
        "shopCode": "115000107",
        "status": "sleep",
        "warZone": "11147099",
        "versionType": "origin"
      },
      {
        "shopCode": "115000107",
        "status": "sleep",
        "warZone": "11147099",
        "versionType": "target"
      }
    ]
  },
  "115000108": {
    "shopName": "海岸环庆大厦店",
    "shopCode": "115000108",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147586"
      }
    ],
    "longitude": 114.083998,
    "latitude": 22.538024,
    "shopVersionList": [
      {
        "shopCode": "115000108",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000108",
        "status": "in_business",
        "warZone": "11147586",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000118": {
    "shopName": "科陆大厦店",
    "shopCode": "115000118",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.947959,
    "latitude": 22.566708,
    "shopVersionList": [
      {
        "shopCode": "115000118",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000118",
        "status": "in_business",
        "warZone": "11147099",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000119": {
    "shopName": "紫光信息港店",
    "shopCode": "115000119",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.954447,
    "latitude": 22.560027,
    "shopVersionList": [
      {
        "shopCode": "115000119",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000119",
        "status": "in_business",
        "warZone": "11147099",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000120": {
    "shopName": "智汇天地店",
    "shopCode": "115000120",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11210344"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 114.223378,
    "latitude": 22.728795,
    "shopVersionList": [
      {
        "shopCode": "115000120",
        "status": "sleep",
        "warZone": "11210344",
        "versionType": "origin"
      },
      {
        "shopCode": "115000120",
        "status": "sleep",
        "warZone": "11210344",
        "versionType": "target"
      }
    ]
  },
  "115000121": {
    "shopName": "五号交易广场店",
    "shopCode": "115000121",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11210344"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 114.12949,
    "latitude": 22.681176,
    "shopVersionList": [
      {
        "shopCode": "115000121",
        "status": "sleep",
        "warZone": "11210344",
        "versionType": "origin"
      },
      {
        "shopCode": "115000121",
        "status": "sleep",
        "warZone": "11210344",
        "versionType": "target"
      }
    ]
  },
  "115000123": {
    "shopName": "京基御景华城店",
    "shopCode": "115000123",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11147586"
      },
      {
        "versionType": "target",
        "warZone": "11147586"
      }
    ],
    "longitude": 114.091959,
    "latitude": 22.538549,
    "shopVersionList": [
      {
        "shopCode": "115000123",
        "status": "sleep",
        "warZone": "11147586",
        "versionType": "origin"
      },
      {
        "shopCode": "115000123",
        "status": "sleep",
        "warZone": "11147586",
        "versionType": "target"
      }
    ]
  },
  "115000127": {
    "shopName": "深房传麒山店",
    "shopCode": "115000127",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11210344"
      }
    ],
    "longitude": 113.94979,
    "latitude": 22.748622,
    "shopVersionList": [
      {
        "shopCode": "115000127",
        "status": "in_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000127",
        "status": "in_business",
        "warZone": "11210344",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  },
  "115000128": {
    "shopName": "前海卓越时代广场店",
    "shopCode": "115000128",
    "versionList": [
      {
        "versionType": "origin",
        "warZone": "11133134"
      },
      {
        "versionType": "target",
        "warZone": "11147099"
      }
    ],
    "longitude": 113.892068,
    "latitude": 22.553552,
    "shopVersionList": [
      {
        "shopCode": "115000128",
        "status": "pending_business",
        "warZone": "11133134",
        "versionType": "origin"
      },
      {
        "shopCode": "115000128",
        "status": "pending_business",
        "warZone": "11147099",
        "versionType": "target",
        "warZoneChangeType": "increase"
      }
    ]
  }
};

// 中间数据
const middleData: {
	[warZone: string]: {
		warZone: string;
		warZoneCn: string;
		originCount: number;
		targetCount: number;
		stable: number;
		toMap: {
			[warZone: string]: number;
		};
		mutationSum: number;
	}
} = {};

warZoneSumList.forEach(info => {
	middleData[info.warZone] = {
		stable: 0,
		mutationSum: 0,
		toMap: {},
		...info,
	};
});

Object.values(commonShopMap).forEach(shopInfo => {
	const originWarZone = shopInfo.versionList[0].warZone;
	const targetWarZone = shopInfo.versionList[1].warZone;
	if (originWarZone === targetWarZone) {
		middleData[originWarZone].stable += 1;
	} else {
		middleData[originWarZone].mutationSum += 1;
		middleData[targetWarZone].mutationSum += 1;
		middleData[originWarZone].toMap[targetWarZone] ? middleData[originWarZone].toMap[targetWarZone] += 1 : middleData[originWarZone].toMap[targetWarZone] = 1;
	}
});

// 转换后数据
const data: {
	warZone: string;
	warZoneCn: string;
	originCount: number;
	targetCount: number;
	stable: number;
	toMap: {
		[warZone: string]: number;
	};
	mutationSum: number;
}[] = Object.values(middleData).sort((a, b) => b.mutationSum - a.mutationSum) // 已排序的战区信息

const warZoneFromUsedYMap: {
	[warZone: string]: number;
} = {}; // 战区新版本已使用Y，由于新增可能来自任意其他战区，所以在顶层作用域单独保存

let accumulateY = 43; // 初始Y43

const accumulateYMap: {
	[warZone: string]: number;
} = {};
data.forEach(info => {
	const lastY = accumulateY;
	accumulateY += Math.max(info.originCount, info.targetCount) * baseUnit + gutter; // 取较长边加gutter累加
	accumulateYMap[info.warZone] = lastY;
}); // 战区起始Y

console.log('data：', data);

console.log('------------------');

console.log('accumulateYMap：', accumulateYMap);

export default function Graph() {
	return (
		<svg>
			<text>6.0版本</text>
			<text>9.0版本</text>
			<path d="M70,24 L70,43" stroke-dasharray="2,2" />
			<path d="M325,24 L325,43" stroke-dasharray="2,2" />
			{
				data.map(info => {
					const startY = accumulateYMap[info.warZone];
					let tY = startY + info.stable * baseUnit; // 战区老版本已使用Y
					warZoneFromUsedYMap[info.warZone] += (startY + info.stable * baseUnit);
					// 下一战区起始Y
					return (
						<>
							{/* 固定生成部分 */}
          		<rect x="70" y={startY} width="5" height={info.originCount * baseUnit} />
							<rect x="325" y={startY} width="5" height={info.targetCount * baseUnit} />
							<text x="25" y={startY}>张三</text>
							<text x="340" y={startY}>李四</text>
							<text x="80" y={startY} fill="#00000073">{info.originCount}</text>
							<text x="305" y={startY} fill="#00000073">{info.targetCount}</text>
							<path
								d={`M70,${startY} C246.57834,${startY} 260,${startY} 325,${startY}`}
								style={{ strokeWidth: info.stable * baseUnit }}
							/>
							{/* 动态计算生成部分 */}
							{
								Object.keys(info.toMap).map(targetWarZone => {
									const targetWarzoneFY = warZoneFromUsedYMap[targetWarZone]; // 流向战区的Y
									const curWarzoneTY = tY; // 流出战区的Y
									warZoneFromUsedYMap[targetWarZone] += info.toMap[targetWarZone] * baseUnit; // 累加已使用高度
									tY += info.toMap[targetWarZone] * baseUnit; // 累加已使用高度
									return (
										<path
											d={`M70,${curWarzoneTY} C130,${curWarzoneTY} 260,${targetWarzoneFY} 325,${targetWarzoneFY}`}
											style={{ strokeWidth: info.toMap[targetWarZone] * baseUnit }}
										/>
									)
								})
							}
						</>
					)
				})
			}
		</svg>
	)
}
