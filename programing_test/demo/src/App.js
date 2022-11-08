import { Component, useState } from 'react';

function A1(props) {
  console.log(props);
  return <div>
    <div>{props.title}</div>
    <div>同学们好，我是为了演示A的特定渲染，不用管我</div>
  </div>;
};
function B1() {
  return <div>同学们好，我是为了演示B的特定渲染，不用管我</div>;
}

class A extends Component {
  state = {
    visible: false
  }
  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }
  render() {
    return <div>
      <div onClick={this.toggle}>toggle</div>
      {
        this.state.visible ? <A1 title="xxxx" /> : null
      }
    </div>;
  }
}

class B extends Component {
  state = {
    visible: false
  }
  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }
  render() {
    return <div>
      <div onClick={this.toggle}>toggle</div>
      {
        this.state.visible ? <B1 /> : null
      }
    </div>;
  }
}

class WrapperComp extends Component {
  state = {
    visible: false,
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { visible } = this.state;
    const { render } = this.props;
    return (
      <div>
        <div onClick={this.toggle}>toggle</div>
        {
          visible
            ? render()
            : null
        }
      </div>
    );
  }
}

function useVisible(Comp) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div onClick={() => setVisible(!visible)}>toggle</div>
      {
        visible
          ? <Comp />
          : null
      }
    </div>
  )
}

function HOC(WrapperComp) {
  return function(props) {
    const { a, ...restProps } = props;
    console.log(restProps)
    return <WrapperComp {...restProps} />
  }
}

const WrappedA = HOC(A1);

export const AComp = () => <WrappedA test='123' title="1231231" />;
export const BComp = () => useVisible(B1);
