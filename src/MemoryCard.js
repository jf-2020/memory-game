import React, { Component } from 'react';
import './MemoryCard.css'

class MemoryCard extends Component {
    constructor() {
        super();
        this.state = {isFlipped: false};
    }

    render() {
        let memoryCardInnerClass = "MemoryCardInner";
        if (this.state.isFlipped) {
            memoryCardInnerClass += " flipped";
        }
        return (
            <div className="MemoryCard" onClick={this.clickHandler.bind(this)}>
                <div className={memoryCardInnerClass}>
                    <div className="MemoryCardBack">
                        <img src="https://www.digitalcrafts.com/img/DigitalCrafts-Logo-Wrench.png" className="dcLogo" alt="DigitalCrafts Logo"></img>
                    </div>
                    <div className="MemoryCardFront">
                        ▲
                    </div>
                </div>
            </div>
        );
    }

    clickHandler() {
        this.setState({isFlipped: !this.state.isFlipped});
    }

    accessState() {
        return this.state;
    }
}

export default MemoryCard;