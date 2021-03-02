
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'

const Tools = {
    list: List,
    header: Header,
    quote: Quote,
    marker: Marker,
    delimiter: Delimiter,
    image: {
        class: Image,
        config: {
          uploader: {
            uploadByFile: null
          }
        }
      }
}

export default Tools