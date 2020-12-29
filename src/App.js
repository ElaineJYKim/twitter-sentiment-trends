import logo from './logo.svg';
import './css/App.css';
import Service from './Service';

import {PageHeader} from 'antd';

function App() {
  return (
    <div>
      <PageHeader className="site-page-header" title="Twitter Sentiment Trender" subTitle=""/>
      <Service/>
    </div>
  );
}

export default App;
