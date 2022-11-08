import React from 'react';
import PropTypes from 'prop-types';
import dagreD3 from './dagre-d3';
import * as d3 from 'd3';
 
class DagreD3 extends React.Component {
  static defaultProps = {
    width: '100%',
    height: '100%',
    nodes: {},
    edges: [],
    graph: {},
    interactive: false,
    onNodeClick: () => {}
  }
 
  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    nodes: PropTypes.object,
    edges: PropTypes.array,
    graph: PropTypes.object,
    interactive: PropTypes.bool,
    onNodeClick: PropTypes.func,
    onNodeHover: PropTypes.func
  }
 
  componentDidMount() {
    this.renderDag();
  }
 
  shouldComponentUpdate(nextProps) {
    return !(this.props.nodes === nextProps.nodes)
      || !(this.props.edges === nextProps.edges);
  }
 
  componentDidUpdate() {
    this.renderDag();
  }
 
  setNodeTree = (nodeTree) => {
    this.nodeTree = nodeTree;
  }
 
  setNodeTreeInner = (nodeTreeInner) => {
    this.nodeTreeInner = nodeTreeInner;
  }
 
  renderDag() {
    const { nodes, edges, interactive, fit, onNodeClick, graph } = this.props;
    const g = new dagreD3.graphlib.Graph()
      .setGraph({ ...graph }) // Set an object for the graph label
      .setDefaultNodeLabel(() => ({}))
      .setDefaultEdgeLabel(() => ({})); // Default to assigning a new object as a label for each new edge.

    Object.keys(nodes).forEach((id) => {
      g.setNode(id, nodes[id]);
    });
    // console.log(JSON.stringify(g._nodes));
    edges.forEach((edge) => {
      edge[2] ? g.setEdge(edge[0], edge[1], edge[2]) : g.setEdge(edge[0], edge[1]);
    });
    // console.log(JSON.stringify(g._nodes));

    // Object.keys(g._nodes).forEach((id) => {
    //   console.log(g._nodes[id]);
    // });
 
    const svg = d3.select(this.nodeTree);
    const inner = d3.select(this.nodeTreeInner);
    if (interactive) { // 自适应缩放
      const zoom = d3.zoom().on('zoom', () => inner.attr('transform', d3.event.transform));
      svg.call(zoom);
    }
    const render = new dagreD3.render(); // eslint-disable-line
 
    // console.log(JSON.stringify(g));

    render(inner, g);
 
    // console.log(JSON.parse(JSON.stringify(g)));

    // nodes[0].style += 'transform: translateY(210px);'
    // nodes[0].labelStyle = 'transform: translateY(210px);'
    // Object.keys(nodes).forEach((id) => {
    //   g.setNode(id, nodes[id]);
    // });
    // edges.forEach((edge) => {
    //   edge[2] ? g.setEdge(edge[0], edge[1], edge[2]) : g.setEdge(edge[0], edge[1]);
    // });

    // render(inner, g);
 
    // 自适应宽高
    if (fit) {
      const { height: gHeight, width: gWidth } = g.graph();
      const { height, width } = this.nodeTree.getBBox();
      const transX = width - gWidth;
      const transY = height - gHeight;
      svg.attr('viewBox', `0 0 ${width} ${height}`);
      inner.attr('transform', d3.zoomIdentity.translate(transX, transY));
    }
 
    if (onNodeClick) { // 点击事件
      svg.selectAll('g.node').on('click',
        id => onNodeClick(id));
    }
  }
 
  render() {
    const { width, height } = this.props;
    return (
      <svg width={width} height={height} ref={this.setNodeTree}>
        <g ref={this.setNodeTreeInner} />
      </svg>
    );
  }
}
 
export { d3 };
 
export default DagreD3;
