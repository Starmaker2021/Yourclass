import React, {useEffect, useState, useReducer} from 'react';
import Layout, { Content, Footer} from 'antd/es/layout/layout';
import './App.less'
import routes from './routes';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Dict from './services/dict';
import useModel from 'flooks';
import {dictModel, user} from './model/model';
import {server, wsServer} from './config/config';
import {Spin} from 'antd';
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
const App = () => {
  const [loading, handleLoading] = useState(false)
  const {updateDict} = useModel(dictModel)
  useEffect(() => {
    handleLoading(true)
    Dict.getDict().then((res) => {
      const {code, data} = res;
      if(code === 0){
        const dictMap = {}
        data.forEach((item) => {
          dictMap[item.value] = item.name
          if(item.subclass){
            item.subclass.forEach((subclass) => {
              dictMap[subclass.value] = subclass.name
            })
          }
        })
        updateDict({dict:data, dictMap})
      }
      handleLoading(false)
    })
  }, [])
  // let socket = new WebSocket(`${wsServer}/socketTest`);
  // socket.addEventListener('open', function (event) {
  //   console.log('socket is open')
  // });
  //
  // socket.addEventListener('message', function (event) {
  //   console.log('Message from server', event.data);
  // });
  return (
    <Router>
      <Spin size="large" spinning={loading}>
        <Layout>
          <Header/>
          <Content className="site-layout">
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by Your Class</Footer>
        </Layout>
      </Spin>
    </Router>
  );
}

export default App;