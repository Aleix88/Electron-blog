import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAutosave} from '../../../actions'

import './ToolsBar.css'

const ToolsBar = (props) => {

    const dispatch = useDispatch()
    const isAutosaving = useSelector(state => state.isAutosaving)

    if (isAutosaving === true)  {
        setTimeout(() => {
            dispatch(setAutosave(false))
        }, 1000)
    }

    return (
        <div className="tool-bar">
            <div className={"autosave-label " + (isAutosaving ? "autosave-show" : "autosave-hide")}>Guardando</div>
            <button className="save-button" onClick={props.handleSave}>Guardar</button>
            <button className="save-button" onClick={props.handlePublish}>Publicar</button>
        </div>
    )
};

export default ToolsBar