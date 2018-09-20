import React, { Component } from 'react';
import $ from "jquery";
import './EditorTrashCan.css';

class EditorTrashCan extends Component{
    items = [];
    handleAllowDrop(event){  //允许Drop事件发生
        event.preventDefault();
    }
    handleDeleteDND(event){
        let tempNodeId = "div[data-id='" + event.dataTransfer.getData("thisComp") +"']";
        let $tempNode = $(event.target).parents('.gj-demo-editorbanner').find(tempNodeId);
        $tempNode.addClass("gj-item-deleted");
        $tempNode.appendTo(this.trashCanDom);
        this.items.push(tempNodeId);
    }
    render(){
        return (
            <div 
                className="gj-trashcan"
                onDrop={ ev => this.handleDeleteDND(ev) }
                onDragOver={ ev => this.handleAllowDrop(ev) }
                ref={ dom => this.trashCanDom=dom }
            >
            </div>
        );
    }
}
export default EditorTrashCan;