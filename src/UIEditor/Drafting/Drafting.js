import React, { Component } from 'react';
import $ from 'jquery';
import './Drafting.css';

class DraftingArea extends Component{
    constructor(props){
        super(props);
        this.childrenLists = []; //需要被包裹的子组件        
    }
    componentWillMount(){
        if(!Array.isArray(this.props.children)){    //保证childrenLists是一个数组
            this.childrenLists.push(this.props.children);
        }else{
            this.childrenLists = this.props.children;
        }
    }
    render(){
        return (
            <div className="DraftingArea">
                {this.childrenLists.map((item,index) => 
                    <DraftingItem key={"Drafting"+index}>
                        {item}
                    </DraftingItem>
                )}
            </div>
        );
    }
}
class DraftingItem extends Component{
    constructor(props){
        super(props);

        this.handleDraftChange = this.handleDraftChange.bind(this);
        this.handleDraftUp = this.handleDraftUp.bind(this);
        this.handleDraftEnd = this.handleDraftEnd.bind(this);
    }
    handleDraftChange(event){  //交换位置
        let tempNode = event.target;
        let draftingNode;
        let flag = true;
    
        while(tempNode.parentNode.className !== "DraftingArea"){    //寻找到可交换的层
            tempNode = tempNode.parentNode;
        }
        
        draftingNode = $(tempNode.parentNode).children('.DraftingItem-Drafting');
        if(draftingNode.length === 0){  //判断是否是在本层存在抓取到的元素
            return false;
        }

        if($(tempNode.parentNode).children().index(draftingNode) > $(tempNode.parentNode).children().index(tempNode)){ //判断抓取元素在交换元素之前还是之后
            flag = false;
        }  

        setTimeout(()=>{
            if(flag === true){
                $(draftingNode).insertAfter(tempNode);
            }else{
                $(draftingNode).insertBefore(tempNode);
            }
        },10) //设置延迟的原因，交换速度太快导致enter事件多次触发，flag发生错误。

        
    }


    handleDraftUp(event){ //抓取时标记
        let tempNode = event.target;
        if(!tempNode){
            return;
        }
        $(tempNode).addClass("DraftingItem-Drafting");
        event.dataTransfer.setData("thisComp",tempNode.getAttribute("data-id"));
    }
    handleDraftEnd(event){ //释放后取消标记   
        let tempNode = event.target;
        if(!tempNode){
            return;
        }
        $(tempNode).removeClass("DraftingItem-Drafting")
    }  

    render(){
        return (
            <div className="DraftingItem" draggable={"true"} 
                onDragEnter={this.handleDraftChange}
                onDragStart={this.handleDraftUp} 
                onDragEnd={this.handleDraftEnd}
                data-id={this.props.dataId}
            >
                    {this.props.children}
            </div>
        )
    }
}

export {DraftingArea,DraftingItem};