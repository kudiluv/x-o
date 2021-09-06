import React from "react";

export default function (props){
    function issetValue() {
        if (props.value){
            return `grid__field_${props.value}`
        }
        else {
            return ''
        }
    }
    return <div className={"grid__field " + issetValue()} onClick={() => props.clickHandler(props.x, props.y)}>

    </div>
}

