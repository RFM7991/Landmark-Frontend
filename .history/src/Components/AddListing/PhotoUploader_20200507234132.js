import React from 'react';
import ImageUploader from 'react-images-upload';
 
export default class PhotoUploader extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        console.log("pic", picture, this.state.pictures)
        let photos = this.state.pictures.concat(picture)
        this.props.setPhotos(photos)
        this.setState({
            pictures: photos,
        });
        
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