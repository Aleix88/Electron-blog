
import { Link } from 'react-router-dom'
import './IconButton.css'

const INFO_ICON = "gg-info"
const ARROW_LEFT_ICON = "gg-arrow-left-o"

const IconButton = (props) => {
    
    return (
        <Link to={props.href}>
            <i className={"icon-button " + props.icon} onClick={props.onClick} style={{color: props.color}}></i>
        </Link>
    )

}

export default IconButton
export {
    INFO_ICON,
    ARROW_LEFT_ICON
}