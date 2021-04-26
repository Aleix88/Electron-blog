import React, {useEffect} from 'react'
import PostLabel from './PostLabel'
import FileManager from '../Utils/FileManager'
import {addPost, selectPost, loadPosts} from '../../actions'
import {useSelector, useDispatch} from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import {storageDirName, dataFileName} from '../Utils/Config'
import {stopAutoSave, save, mapTitle, readPosts, saveImage} from '../Editor/saveManager'

import './NavBar.css'
import IconButton, {INFO_ICON} from '../Components/IconButton'
import {routes} from '../constants.js'

const NavBar = (props) => {

    const DEFAULT_NAME = "Nuevo post";

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts) //ARREGLAR AIXO POST.POST
    const selectedPost = useSelector(state => state.selectedPost)

    const addPostClicked = () => {
        const postID = uuidv4()
        dispatch(addPost({
            id: postID,
            title: DEFAULT_NAME
        }))
        FileManager.createFolder(FileManager.documentsPath + '/' + storageDirName + '/' + postID)
        mapTitle(postID, DEFAULT_NAME)
    }

    const onClickPost = (id) => {
        if (id === selectedPost.id) return;
        if (selectedPost.id != null) {
            stopAutoSave()
            save(selectedPost).then(()=>{})
            .catch(() => {
                //TODO: Pensar que fer si falla
            })
        }
        fetchSelectedPost(id)
    }

    const fetchSelectedPost = (id) => {
        FileManager.readJSONFile(FileManager.documentsPath + '/' + storageDirName + '/' + id + '/' + dataFileName)
        .then((post) => {
            dispatch(selectPost(post))
        })
        .catch((err) => {
            if(err.code == "ENOENT") {
                //If file not found create an empty one
                dispatch(selectPost({
                    id,
                    data: {},
                    title: ""
                }))
            }
            //TODO: Tractar l'error
        })
    }

    useEffect(() => {
        console.log("Loading posts...")
        readPosts()
        .then((posts) => {
            dispatch(loadPosts(posts))
        })
    }, [])

    return (
        <nav>
            <div className = "nav-top">
                <h1 className="nav-title unselectable">Blog editor</h1>
                <IconButton icon={INFO_ICON} href={routes.settings} color="white"/>
            </div>
            <div 
                className="add-post unselectable"
                onClick={addPostClicked}
            >
                Añadir post
            </div>
            <h2 className="nav-subtitle unselectable">Posts</h2>
            {
                posts.map (p => {
                    return <PostLabel 
                        key={p.id} 
                        id={p.id}
                        title={p.title} 
                        onClick={onClickPost}
                        isSelected={selectedPost.id===p.id}
                    />
                })
            }
        </nav>
    )
};

export default NavBar