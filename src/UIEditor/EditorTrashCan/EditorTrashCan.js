import React, { Component } from 'react';
import $ from "jquery";
import './EditorTrashCan.css';

class EditorTrashCan extends Component{
    constructor(){
        super();
        this.state = {
            items : []
        }
        this.trashCanDom = {};
        this.handleAllowDrop = this.handleAllowDrop.bind(this);
        this.handleDeleteDND = this.handleDeleteDND.bind(this);

    }
    handleAllowDrop(event){  //允许Drop事件发生
        event.preventDefault();
    }
    handleDeleteDND(event){
        let tempNodeId = "div[data-id='" + event.dataTransfer.getData("thisComp") +"']";
        let $tempNode = $(event.target).parents('.gj-demo-editorbanner').find(tempNodeId);
        let tempItems = this.state.items.slice();
        tempItems.push(tempNodeId);
        $tempNode.addClass("gj-item-deleted");
        $tempNode.appendTo(this.trashCanDom);
        this.setState({items:tempItems});
    }
    render(){
        return (
            <div className="gj-trashcan"
                 onDrop={this.handleDeleteDND}
                 onDragOver={this.handleAllowDrop}
                 ref={(dom)=>this.trashCanDom = dom}
            >
            </div>
        );
    }
}
export default EditorTrashCan;