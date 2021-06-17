import React, {useEffect} from 'react';
import EditorPage from './Editor/EditorPage'
import NavBar from './Nav/NavBar'
import FileManager from './Utils/FileManager'
import {storageDirName, settingsFileName} from './Utils/Config'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {routes} from './constants'
import {useDispatch, useSelector} from 'react-redux'
import {setImageEndpoint} from '../actions'

import './App.css';
import Settings from './Settings/Settings';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    FileManager.createFolder(FileManager.joinPath(FileManager.documentsPath, storageDirName))
    FileManager.readJSONFile(FileManager.joinPath(
      FileManager.documentsPath,  
      storageDirName,
      settingsFileName
    ))
    .then((settings) => {
      console.log("Reading endpoint...")
      dispatch(setImageEndpoint(settings.imageEndpoint))
    })
    .catch(() => {
      console.log("No endpoint defained")
      dispatch(setImageEndpoint("No hay ningún endpoint definido"))
    })
  }, [])

  return (
    <div className="app">
      <Router>
        <NavBar/>
        <Switch>
          <Route path={routes.editor} exact>
            <EditorPage/>
          </Route>
          <Route path={routes.settings}>
            <Settings/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
