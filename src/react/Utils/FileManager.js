const {remote, shell} = window.require('electron')
const {dialog, app} = remote
const fs = remote.require('fs')
const path = window.require('path');



const createFile = (filePath, content, overwrite) => {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(filePath) || overwrite === true) {
                fs.writeFile(filePath, content, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(filePath);
                    }
                });
            }
            resolve(filePath)
        } catch(err) {
            reject(err);
        }
        
    })
};

const documentsPath = app.getPath("documents")

const createFolder = (dir, overwrite) => {
    if (overwrite === true || !fs.existsSync(dir)){
        fs.mkdirSync(dir)
        return dir
    }
}



const showSaveDialog = async (title, nameFieldLabel, buttonLabel, defaultPath) => {
    const options = {
        defaultPath: app.getPath(defaultPath),
        title: title,
        buttonLabel: buttonLabel,
        nameFieldLabel: nameFieldLabel
    }
    const result = await dialog.showSaveDialog(null, options);
    if (result.canceled) {
        return Promise.reject()
    } else {
        return Promise.resolve(result.filePath)
    }
}

const readJSONFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const jsonObject = JSON.parse(data)
                    resolve(jsonObject);
                } catch (err) {
                    reject(err)
                }
            }
        });
    });
}

const copyFile =  (src, dest) => {
    return new Promise((resolve, reject) => {
        fs.copyFile(src, dest, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(dest)
            }
        })
    })
}

const joinPath = (...toJoin) => {
    return path.join(...toJoin)
}

const revealInExplorer = (path) => {
    shell.showItemInFolder(path) 
}

const fileManager = {
    createFile,
    showSaveDialog,
    createFolder,
    readJSONFile,
    documentsPath,
    copyFile,
    revealInExplorer,
    joinPath
}

export default fileManager
