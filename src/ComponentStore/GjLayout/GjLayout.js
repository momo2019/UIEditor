import React,{Component} from 'react';
import $ from 'jquery';
import './GjLayout.css';

class GjLayout extends Component{
    constructor(){
        super();
        this.handleAddDND = this.handleAddDND.bind(this);
        this.handleAllowDrop = this.handleAllowDrop.bind(this);
    }

    handleAllowDrop(event){  //允许Drop事件发生
        event.preventDefault();
    }
    handleAddDND(event){  //接收需生成组件名
        event.preventDefault();
        let target = event.target;
        let tempNodeId = "div[data-id='" + event.dataTransfer.getData("thisComp") +"']";
        let tempNode = $(target).parents('.gj-demo-editorbanner').find(tempNodeId)[0];
        if(!tempNode || $(tempNode.children).hasClass("gj-layout-wrap")){
            return false;
        }
        target.appendChild(tempNode);
    }


    render(){
        return (
            <div className="gj-layout-wrap">
                <div className="gj-layout gj-draftingarea"
                    onDrop={this.handleAddDND}
                    onDragOver={this.handleAllowDrop}
                >
                </div>
            </div>
        );
    }
}
export default GjLayout;