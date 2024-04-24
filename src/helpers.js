export const showDetails = (title, images, texts, altTableContent, prices) => {
    var model = document.getElementById('detailsModel');
    var imageGallery = document.getElementById('imageGallery');
    var textGallery = document.getElementById('textGallery');
    var altTable = document.getElementById('altTable');

    // Remove existing content
    imageGallery.innerHTML = '';
    textGallery.innerHTML = '';
    altTable.innerHTML = '';

    // Add images, texts, and prices to gallery
    images.forEach(function (imageSrc, index) {
        var img = document.createElement('img');
        img.src = imageSrc;
        img.alt = title;

        var p = document.createElement('p');
        p.textContent = texts[index];
        p.style.fontFamily = 'Arial, sans-serif'; // Set font family
        p.style.color = 'black'; // Set text color
        p.style.fontSize = '18px'; // Set font size

        var priceParagraph = document.createElement('p');
        priceParagraph.textContent = 'Price: ' + altTableContent[index];
        priceParagraph.style.fontFamily = 'Arial, sans-serif'; // Set font family
        priceParagraph.style.color = 'black'; // Set text color
        priceParagraph.style.fontSize = '15px'; // Set font size

        var imageWrapper = document.createElement('div');
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(p);
        imageWrapper.appendChild(priceParagraph);
        imageGallery.appendChild(imageWrapper);
    });

    // Create and append total price element
    var totalPriceElement = document.getElementById('totalPrice');
    if (!totalPriceElement) {
        totalPriceElement = document.createElement('p');
        totalPriceElement.id = 'totalPrice';
        totalPriceElement.textContent = 'Total Price: ' + prices;
        totalPriceElement.style.textAlign = 'center';
        totalPriceElement.style.fontFamily = 'Arial, sans-serif'; // Set font family
        totalPriceElement.style.color = 'black'; // Set text color
        totalPriceElement.style.fontSize = '17px'; // Set font size
        var bottomContainer = document.querySelector('.bottom-container');
        bottomContainer.appendChild(totalPriceElement);
    } else {
        totalPriceElement.textContent = 'Total Price: ' + prices;
    }

    // Create and append back button
    var backButton = document.querySelector('.model-content button');
    if (!backButton) {
        backButton = document.createElement('button');
        backButton.textContent = 'Back to Shopping List';
        backButton.classList.add('back-button');
        backButton.onclick = function () {
            hideDetails();
        };
    }
    var backButtonContainer = document.createElement('div'); // Create a container for the back button
    backButtonContainer.appendChild(backButton); // Append the back button to its container
    var bottomContainer = document.querySelector('.bottom-container');
    bottomContainer.appendChild(backButtonContainer); // Append the container to the bottom container

    model.style.display = 'block';
};

export const hideDetails = () => {
    var model = document.getElementById('detailsModel');
    model.style.display = 'none';
};
