import React from 'react';
import { hideDetails } from './helpers'; // Import the hideDetails function if needed

function DetailsModel({ title, images, texts, altTableContent, prices, onClose }) {
  return (
    <div id="detailsModel" className="model">
      <div className="model-content">
        <span className="close" onClick={hideDetails}>&times;</span> {/* Close button */}
        
        {/* Image Gallery */}
        <div id="imageGallery" className="image-gallery">
          {images.map((image, index) => (
            <img key={index} src={image} alt={title} />
          ))}
        </div>
        
        {/* Text Gallery */}
        <div id="textGallery" className="text-gallery">
          {texts.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        
        {/* Alternative Table Content */}
        <div id="altTable" className="alt-table">
          {altTableContent.map((content, index) => (
            <p key={index}>Price: {content}</p>
          ))}
        </div>
        
        {/* Back Button */}
        <div className="bottom-container">
          <button className="back-button" onClick={hideDetails}>Back to Shopping List</button>
          {/* Additional Text */}
          <p>Additional Text</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsModel; // Ensure to export the DetailsModel component as default
