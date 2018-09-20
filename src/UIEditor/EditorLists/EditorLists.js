import React, { Component } from 'react';
import defaultConfig from '../config';
import $mo from '../util';
import './EditorLists.css';


const ListsItem = (props) => {
    let listsName = props.listsName;
    let compLists = props.compLists;
    let boxStyle = {
        top: 30*props.index+'px',
    }
    return (
        <div 
            className="gj-editorlists-card" 
            style={ boxStyle }
        >
            <div className="gj-editorlists-classification">{ listsName }</div>
            <ul className="gj-editorlists-lists">
                {
                    compLists.map((value)=>
                        <li 
                            draggable="true" 
                            className="gj-editorlists-item" 
                            key={ value.toLowerCase() }
                            data-comp-name={ value }
                        > 
                            {value} 
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

class EditorLists extends Component{
    compLists = defaultConfig.editorLists || [];

    handleChooseClassification(event){   //分类列表切换事件
        let target = event.target;
        let card = target.parentNode;
        let cards = card.parentNode.children;

        let choosenIndex = $mo.index(cards, card);
        let cardsNum = cards.length;

        if( !$mo.hasClass(target, "gj-editorlists-classification") ){
            return false;
        }
        if( $mo.hasClass(card, "gj-editorlists-choosen") ){
            return false;
        }
        $mo.removeClass(cards, "gj-editorlists-choosen");
        $mo.addClass(card, "gj-editorlists-choosen")
        $mo.map(cards, function(index){
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
        if( !$mo.hasClass(target, "gj-editorlists-item") ) {
            return false;
        }
        event.dataTransfer.setData("addComp", target.getAttribute("data-comp-name"));
    }

    render(){
        return (
            <div 
                className="gj-editorlists-wrap" 
                onClick={ ev => this.handleChooseClassification(ev) }
                onDragStart={ ev => this.handleItemDND(ev) }
            >
                {
                    this.compLists.map((value,index)=>
                        <ListsItem 
                            key={value.listsName}
                            listsName={ value.listsName } 
                            compLists={ value.compLists } 
                            index = { index }
                        />
                    )
                }
            </div>
        );
    }
}

export default EditorLists;