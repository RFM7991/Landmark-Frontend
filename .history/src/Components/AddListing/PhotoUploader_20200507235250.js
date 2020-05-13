import React from 'react';
import ImageUploader from 'react-images-upload';
 
export default class PhotoUploader extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        let photos = this.state.pictures
        photos.push(picture)

        console.log("pic", picture, photos)

        this.setState({ pictures: photos })
        this.props.setPhotos(photos)
    }
 
    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        );
    }
}