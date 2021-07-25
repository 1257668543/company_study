import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("articleSrote")
@observer
class App extends React.Component {
  render() {
    console.log(this.props);
    return (  
      <div>
        App
      </div>
    );
  }
}
 
export default App;