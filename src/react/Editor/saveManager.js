import FileManager from '../Utils/FileManager'
import {storageDirName, dataFileName, titlesFileName} from '../Utils/Config'
import { editTitle } from '../../actions'
import { v4 as uuidv4 } from 'uuid';

const SAVING_TIME = 10000 //ms

let isAutosaveOn = false
let timeInterval

//Start when user writes for the first time in the document
const startAutoSave = (saveHandler) => {
    if (isAutosaveOn === false) {
        timeInterval = setInterval(() => {
            saveHandler()
        }, SAVING_TIME)
        isAutosaveOn = true 
    }
}

//Stop autosave when user exist the post
const stopAutoSave = () => {
    if (isAutosaveOn === true && timeInterval != null) {
        clearInterval(timeInterval)
    }
    isAutosaveOn = false
}

const save = (data) => {
    const json = JSON.stringify(data)
    return FileManager.createFile(
        FileManager.documentsPath + '/' 
        + storageDirName + '/'
        + data.id + '/'
        + dataFileName,
        json,
        true
    )
}

const mapTitle = (id, title) => {
    return FileManager.createFile(
        FileManager.documentsPath + '/' 
        + storageDirName + '/'
        + titlesFileName
        ,
        "{}"
    )
    .then((filePath) => {
        return FileManager.readJSONFile(filePath)
    })
    .then((titles) => {
        const editedTitles = {...titles}
        editedTitles[id] = title
        return JSON.stringify(editedTitles)
    })
    .then((jsonString) => {
        return FileManager.createFile(
            FileManager.documentsPath + '/' 
            + storageDirName + '/'
            + titlesFileName,
            jsonString,
            true
        )
    })
}

const readPosts = () => {
    return FileManager.readJSONFile(
        FileManager.documentsPath + '/' 
        + storageDirName + '/'
        + titlesFileName
    )
    .then((titles) => {
        let posts = []
        for (const [id, title] of Object.entries(titles)) {
            posts.push({
                id,
                title
            })
        }
        return posts
    })
    .catch(() => Promise.resolve([]))
}

export {
    stopAutoSave,
    save,
    startAutoSave,
    mapTitle,
    readPosts
}