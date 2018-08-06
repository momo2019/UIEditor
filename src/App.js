import React, { Component } from 'react';
import GjButton from './ComponentStore/GjButton/GjButton';
import GjTextArea from './ComponentStore/GjTextArea/GjTextArea';
import GjLayout from './ComponentStore/GjLayout/GjLayout';
import EditorBanner from './UIEditor/EditorBanner/EditorBanner';
import EditorLists from './UIEditor/EditorLists/EditorLists';
import EditorTrashCan from './UIEditor/EditorTrashCan/EditorTrashCan';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="gj-demo-warp">
        <div className="gj-demo-editorbanner">
          <EditorBanner>
            <GjButton/>
            <GjTextArea/>
            <GjLayout/>
          </EditorBanner>
          <div className="gj-demo-editortrashcan">
            <EditorTrashCan />
          </div>
        </div>
        <div className="gj-demo-editorlists">
          <EditorLists/>
        </div>
        
      </div>
    );
  }
}

export default App;
