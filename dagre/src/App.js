import DagreD3, { d3 } from './dagre_demo.js';
import './App.css';

// const nodes = [
//   { label: 'project_etl_start\n虚节点', class: 'type-suss' }, 
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },   
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },  
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },  
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },   
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' },    
//   { label: 'project_etl_start\n虚节点', class: 'type-TOP' }
// ]

// const edges = [
//   [0, 1, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [0, 2, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [0, 3, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }]
// ];

const nodes = {
  0: { label: 'job0', style: 'fill: rgb(80, 194, 138);' },
  1: { label: 'job1', style: 'fill: rgb(204, 230, 255);' },
  2: { label: 'job2', style: 'fill: rgb(204, 230, 255);' },
  3: { label: 'job3', style: 'fill: rgb(204, 230, 255);' },
  4: { label: 'job4', style: 'fill: rgb(204, 230, 255);' },
  5: { label: 'job5', style: 'fill: rgb(204, 230, 255);' },
  6: { label: 'job6', style: 'fill: rgb(204, 230, 255);' },
  7: { label: 'job7', style: 'fill: rgb(204, 230, 255);' },
  8: { label: 'job8', style: 'fill: rgb(204, 230, 255);' },
};
 
// const edges = [
//   [0, 1, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [0, 2, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [0, 3, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [2, 4, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [3, 5, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [1, 4, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [4, 6, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [5, 6, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [5, 7, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [7, 1, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [5, 8, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [8, 2, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
//   [7, 8, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
// ];

const edges = [
  [0, 1, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [0, 2, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [0, 3, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [2, 4, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [3, 5, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [1, 4, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [4, 6, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [5, 6, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [5, 7, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [7, 1, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [5, 8, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [8, 2, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
  [7, 8, { style: 'stroke: rgb(214, 214, 214); fill: none' }],
];
export default function App() {
  return (
    <div id="app">
      <div className="navBar">模拟导航栏</div>
      <div className="flexWrapper">
        <div className="siderBar">模拟侧边栏</div>
        <div className="d3Wrapper">
          <DagreD3
            fit
            interactive
            graph={{ rankdir: 'TD' }}
            nodes={nodes}
            edges={edges}
            onNodeClick={() => { console.log('click') }}
          />
        </div>
      </div>
    </div>
  )
}
