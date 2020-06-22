import React from 'react';
import ImageUploader from 'react-images-upload';
 
export default class PhotoUploader extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(pictures) {

        console.log("pic", pictures)

        this.setState({ pictures: pictures })
        this.props.setPhotos(pictures)
    }
 
    render() {
        return (
            <div style={'20em'}>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
            </div>
        );
    }
}