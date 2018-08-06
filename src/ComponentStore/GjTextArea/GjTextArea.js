import React,{Component} from 'react';
import './GjTextArea.css'

class GjTextArea extends Component{
    render(){
        return (
            <div className="gj-textarea-wrap">
                <textarea className="gj-textarea"></textarea>
            </div>
        );
    }
}
export default GjTextArea;