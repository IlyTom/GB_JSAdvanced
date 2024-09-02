function addReview() {
    const productName = document.getElementById('productName').value;
    const reviewText = document.getElementById('reviewText').value;

    if (!productName || !reviewText) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[productName]) {
        reviews[productName] = [];
    }
    reviews[productName].push(reviewText);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    document.getElementById('productName').value = '';
    document.getElementById('reviewText').value = '';
    displayReviews();
}

function displayReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';

    for (const product in reviews) {
        const productDiv = document.createElement('div');
        productDiv.className = 'border p-4 bg-white rounded shadow';
        productDiv.innerHTML = `<h3 class="font-bold">${product}</h3>`;

        reviews[product].forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'mt-2';
            reviewDiv.innerHTML = `  
                <p>${review}</p>  
                <button onclick="deleteReview('${product}', ${index})" class="text-red-500">Удалить</button>  
            `;
            productDiv.appendChild(reviewDiv);
        });

        reviewsList.appendChild(productDiv);
    }
}

function deleteReview(product, index) {
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    reviews[product].splice(index, 1);
    if (reviews[product].length === 0) {
        delete reviews[product];
    }
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews();
}

window.onload = displayReviews;