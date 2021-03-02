import React from 'react'

const PostLabel = (props) => {

    const onClick = () => {
        props.onClick(props.id)
    }

    return (
        <div className="post-label-container" onClick={onClick}>
            <div className={"post-label unselectable " + (props.isSelected ? "post-label-selected" : "")}>
                {props.title}
            </div>
        </div>
    )

}

export default PostLabel