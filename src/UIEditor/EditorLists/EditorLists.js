import React, { Component } from 'react';
import $ from 'jquery';
import './EditorLists.css'

class EditorLists extends Component{
    constructor(){
        super();
        this.state = {
            compLists : []
        };
        this.warpDom = {};

        this.handleChooseClassification = this.handleChooseClassification.bind(this);
        this.handleItemDND = this.handleItemDND.bind(this);
    }

    handleChooseClassification(event){   //分类列表切换事件
        let target = event.target;
        let card = target.parentNode;
        let $cards = $(this.warpDom).children();
        let choosenIndex = $cards.index(card);
        let cardsNum = $cards.length;
        if(target.className !== "gj-editorlists-classification"){
            return false;
        }
        if($(card).hasClass("gj-editorlists-choosen")){
            return false;
        }
        $cards.removeClass("gj-editorlists-choosen");
        $(card).addClass("gj-editorlists-choosen");
        $cards.map(function(index){
            if(index <= choosenIndex){
                this.style.top = index*30 + 'px';
            }else{
                this.style.top = 700 - (cardsNum-index)*30 + 'px';
            }
            return this;
        })
        
    }

    handleItemDND(event){    //拖拽传递需生成组件名
        let target = event.target;
        if(target.className !== "gj-editorlists-item"){
            return false;
        }
        event.dataTransfer.setData("addComp",target.getAttribute("data-comp-name"));
    }

    componentWillMount(){   //根据配置json生成列表
        $.ajax({
            url:"../DataPlugin/EditorLists.json",
            type:"get",
            success:(data)=>{
                this.setState({compLists:data["editorLists"]});
            }
        })
    }



    render(){
        return (
            <div className="gj-editorlists-wrap" 
                 onClick={this.handleChooseClassification}
                 onDragStart={this.handleItemDND}
                 ref={(dom)=>this.warpDom = dom}
            >
                {
                    this.state.compLists.map((value,index)=>{
                        let tempName = value["listsName"];
                        let tempLists = value[tempName];
                        let style = {"top": 30*index + "px"};
                        return (
                            <div key={tempName} 
                                 className="gj-editorlists-card" 
                                 style={style}
                            >
                                <div className="gj-editorlists-classification">{tempName}</div>
                                <ul className="gj-editorlists-lists">
                                    {
                                        tempLists.map((value,index)=>
                                            <li draggable="true" 
                                                className="gj-editorlists-item" 
                                                key={"editor-lists-"+index}
                                                data-comp-name={value}
                                            > 
                                                {value} 
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default EditorLists;