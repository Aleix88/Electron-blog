import React, {useRef} from 'react'

import './TitleEditor.css'

const TitleEditor = (props) => {

    const inputRef = useRef()
    
    const onChange = (e) => {
        props.onChange(e.target.value)
    }

    const onBlur = () => {
        props.onFinish()
    }

    const checkEnterPressed = (e) => {
        if (e.key === "Enter") {
            inputRef.current.blur();
        }
    }

    return (
        <input 
            ref={inputRef}
            className="title-editor" 
            type="text" 
            placeholder={props.placeholder}
            value={props.value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyPress={checkEnterPressed}
        />
    )
}

export default TitleEditor