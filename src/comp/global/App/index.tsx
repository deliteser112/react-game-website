import React, { useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from '../../../pages/About';
import Help from '../../../pages/Help';
import Main from '../../../pages/Main/index';
import Modal from '../../../comp/main/modal/index';
import './App.css';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="page">
      <Router>
        <Switch>
          <Route exact path="/about" children={<About />} />
          <Route exact path="/help" children={<Help />} />
          <Route path="/" children={<Main isModalOpen={isModalOpen}/>} />
        </Switch>
        <Route path="/video/:id" children={<Modal modalOpen={()=>setIsModalOpen(true)} modalClose={()=>setIsModalOpen(false)}/>} />
      </Router>
    </div>
  );
};
type Props = {
  modalOpen: ()=> void,
  modalClose: ()=> void,
  isModalOpen: boolean
}

export default App;
