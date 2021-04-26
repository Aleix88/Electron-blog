import React from 'react'
import IconButton, {ARROW_LEFT_ICON} from '../Components/IconButton'
import {routes} from '../constants'
import './Settings.css'
import {useDispatch, useSelector} from 'react-redux'
import {setImageEndpoint} from '../../actions'
import FileManager from '../Utils/FileManager'
import {settingsFileName, storageDirName} from '../Utils/Config'

const Settings = () => {

    const dispatch = useDispatch()
    const settings = useSelector(state => state.settings)

    const onAPIChange = (event) => {
        console.log(event.target.value)
        dispatch(setImageEndpoint(event.target.value))
    }

    const onFinishEdit = (event) => {
        const settings = JSON.stringify({imageEndpoint: event.target.value})
        FileManager.createFile(
            FileManager.documentsPath + '/' 
            + storageDirName + '/' 
            + settingsFileName,
            settings,
            true
        )
    }

    return (
        <div className="settings-page">
            <div className="title-section">
                <h1 className="settings-title">Ajustes</h1>
                <IconButton icon={ARROW_LEFT_ICON} href={routes.editor} color="black"/>
            </div>
            <div>
                <p>Image API endpoint:</p>
                <input value={settings.imageEndpoint} onBlur={onFinishEdit} className="settings-input" placeholder="https://www.your_image_api.com" onChange={onAPIChange}></input>
            </div>
            <p>Este endpoint se utilitzará para guardar y cargar imágenes. El endpoint debe contener la ruta /blodeditor/save-image</p>
            <p>Las imágenes se cargaran como contenido estático.</p>
        </div>
    )
}

export default Settings