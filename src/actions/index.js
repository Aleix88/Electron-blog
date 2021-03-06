/* Posts actions */
const addPost = (newPost) => {
    return {
        type: 'post/add',
        payload: newPost
    }
}

const loadPosts = (posts) => {
    return {
        type:'post/load',
        payload: posts
    }
}

const selectPost = (selectedPost) => {
    return {
        type: 'selectedPost/select',
        payload: selectedPost
    }
}


const editTitle = (id, title) => {
    return {
        type: 'post/editTitle',
        payload: {id, title}
    }
}

/* Selected post actions */
const changeCurrentTitle = (title) => {
    return {
        type: 'selectedPost/editTitle',
        payload: title
    }
}

const editData = (data) => {
    return {
        type: 'selectedPost/editContent',
        payload: data
    }
}

/* Autosave actions */
const setAutosave = (autosaveOn) => {
    return {
        type: 'autosave/changeState',
        payload: autosaveOn
    }
}

/* Settings actions */
const setImageEndpoint = (endpoint) => {
    return {
        type: 'settings/image-endpoint',
        payload: endpoint
    }
}

export {
    addPost,
    loadPosts,
    editTitle,
    selectPost,
    changeCurrentTitle,
    editData,
    setAutosave,
    setImageEndpoint
} 