import React, {useEffect} from 'react';
import EditorPage from './Editor/EditorPage'
import NavBar from './Nav/NavBar'
import FileManager from './Utils/FileManager'
import {storageDirName} from './Utils/Config'

import './App.css';

const App = () => {

  useEffect(() => {
    FileManager.createFolder(FileManager.documentsPath + "/" + storageDirName)
  }, [])

  return (
    <div className="app">
      <NavBar/>
      <EditorPage/>
    </div>
  )
}

export default App
