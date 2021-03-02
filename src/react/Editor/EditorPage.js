import React, {Component, useEffect} from 'react'
import tools from './tools'
import EditorJS from 'react-editor-js';
import TitleEditor from './TitleEditor/TitleEditor'
import ToolsBar from './ToolsBar/ToolsBar'
import {connect} from 'react-redux'
import {changeCurrentTitle, editTitle, setAutosave, editData} from '../../actions'
import {startAutoSave, save, stopAutoSave, mapTitle} from './saveManager'
import {serverURL} from '../../credentials'
import fileManager from '../Utils/FileManager';
import {storageDirName, dataFileName} from '../Utils/Config'

import './EditorPage.css'


const INACTIVE_TIME = 300000 //ms -> 5 min

const mapStateToProps = (state => ({
    selectedPost: state.selectedPost,
    posts: state.posts
}))

const mapDispatchToProps = (dispatch => ({
    setAutosave: (autosaveOn) => dispatch(setAutosave(autosaveOn)),
    editData: (data) => dispatch(editData(data)),
    editTitle: (title) => dispatch(changeCurrentTitle(title)),
    editFileTitle: (postID, title) => dispatch(editTitle(postID, title))
}))

class EditorPage extends Component {

    constructor(props) {
        super(props)
        this.saveHandler = this.saveHandler.bind(this)
        this.setupTools = this.setupTools.bind(this)
        this.onEditorChange = this.onEditorChange.bind(this)
        this.onEditTitle = this.onEditTitle.bind(this)
        this.stopAutosavingIfUnactive = this.stopAutosavingIfUnactive.bind(this)
        this.onTitleFinish = this.onTitleFinish.bind(this)
        this.handleManualSave = this.handleManualSave.bind(this)
        this.handlePublish = this.handlePublish.bind(this)
        this.previousPostID = ""
        this.lastEditTimeout = null
        this.editorInstance = null
    }

    componentDidUpdate() {
        if (this.props.selectedPost.id !== this.previousPostID && 
            this.editorInstance != null &&
            this.editorInstance['blocks'] != null) {
            const blocks = {blocks: this.props.selectedPost.data['blocks'] != null ? this.props.selectedPost.data.blocks : []}
            this.editorInstance.blocks.render(blocks)
            this.previousPostID = this.props.selectedPost.id
        }
    }

    saveHandler() {
        save(this.props.selectedPost)
        .then(() => {
            this.props.setAutosave(true)
        })
        .catch(() => {
            //TODO: Pensar que fer si falla
        })
    }

    setupTools() {
        tools.image.config = {
            endpoints: {
                byFile: serverURL + '/blogeditor/save-image'
            }
        }
        return tools
    } 

    async onEditorChange(api, content) {
        startAutoSave(this.saveHandler)
        this.props.editData(content)
        this.stopAutosavingIfUnactive()
    }

    onEditTitle(value) {
        startAutoSave(this.saveHandler)
        this.props.editTitle(value)
        this.stopAutosavingIfUnactive()
    }

    stopAutosavingIfUnactive() {
        if (this.lastEditTimeout != null) clearTimeout(this.lastEditTimeout)
        this.lastEditTimeout = setTimeout(() => {
            stopAutoSave()
        }, INACTIVE_TIME)
    }

    onTitleFinish() {
        const value = this.props.selectedPost.title
        if (value.length > 0) {
            this.props.editFileTitle(this.props.selectedPost.id, value)
            mapTitle(this.props.selectedPost.id, value)
        } else {
            const currentPost = this.props.posts.filter(p => p.id === this.props.selectedPost.id)[0]
            this.props.editTitle("")
        }
    }

    handleManualSave() {
        save(this.props.selectedPost)
        .then(() => {
            this.props.setAutosave(true)
        })
        .catch(() => {
            //TODO: Pensar que fer si falla
        })
    }

    handlePublish() {
        this.handleManualSave()
        fileManager.revealInExplorer(
            fileManager.documentsPath + '/' 
            + storageDirName + '/'
            + this.props.selectedPost.id + '/'
            + dataFileName
        )
    }

    render() {
        return (
            <div className="editor-page">
                {
                    this.props.selectedPost.id != null 
                    
                    ?
    
                    <div className="editor-page-container">
                        <ToolsBar
                            handleSave={this.handleManualSave}
                            handlePublish={this.handlePublish}
                        />
                        <div className="editor-container">
                            <TitleEditor 
                                placeholder="Añadir título"
                                value={this.props.selectedPost.title}
                                onChange={this.onEditTitle}    
                                onFinish={this.onTitleFinish}
                            />
                            <EditorJS
                                instanceRef={instance => this.editorInstance = instance}
                                holder="editor-holder"
                                tools={this.setupTools()}
                                data={this.props.selectedPost.data != null ? this.props.selectedPost.data : {}}
                                placeholder="Haz click aquí para empezar a escrbir..."
                                onChange={this.onEditorChange}
                            >
                                <div id="editor-holder" className="editor"/>
                            </EditorJS>
                        </div>
                    </div>
    
                    :
    
                    null
    
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);