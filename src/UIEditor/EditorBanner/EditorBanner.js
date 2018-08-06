import React, { Component } from 'react';
import {DraftingItem} from '../Drafting/Drafting';
import './EditorBanner.css'

class EditorBanner extends Component{
    constructor(props){
        super(props);
        this.state = {
            items : []
        }
        this.compStore = []; //组件库
        this.bannerDom = {};
        this.handleAddDND = this.handleAddDND.bind(this);
        this.handleAllowDrop = this.handleAllowDrop.bind(this);
    }

    handleAllowDrop(event){  //允许Drop事件发生
        event.preventDefault();
    }
    handleAddDND(event){  //接收需生成组件名
        event.preventDefault();
        let data = event.dataTransfer.getData("addComp");
        let tempItems = this.state.items.slice();
        if(!data){
            return false;
        }
        tempItems.push(data);
        this.setState({items:tempItems});
    }

    componentWillMount(){
        let tempStore = {};
        let tempChildren = this.props.children;
        if(!Array.isArray(tempChildren)){
            tempStore[tempChildren.type.name] = tempChildren;
        }else{
            tempChildren.forEach((value)=>{
                tempStore[value.type.name] = value;
            });
        }
        this.compStore = tempStore;
    }

    render(){
        return (
            <div className="gj-editorbanner-box">
                <div className="gj-editorbanner-default"
                     ref={(dom)=>this.bannerDom=dom}
                     onDrop={this.handleAddDND}
                     onDragOver={this.handleAllowDrop}
                >
                    <div className="gj-draftingarea">
                    {
                        this.state.items.map((value,index)=>
                            <DraftingItem dataId={"item"+index} key={"comp"+value+index}>
                            {
                                this.compStore[value]
                            }
                            </DraftingItem>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorBanner;