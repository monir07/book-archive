const loadBookData = () => {
    // RECEIVE SEARCH TEXT FORM INPUT FIELD.
    const searchField = document.getElementById("search-field");
    const resultCountTextField = document.getElementById("resultCountText");
    resultCountTextField.style.display = 'none';

    const noResult = document.getElementById("noResult");
    noResult.style.display = "none";

    // SEARCH CONTAINER VALUE RESET ON CLICK SEARCH BUTTON.
    const resultContainerField = document.getElementById("resultContainer");
    resultContainerField.innerHTML = '';

    const spinnerField = document.getElementById("loadSpinner");
    spinnerField.classList.remove("d-none");
    const searchValue = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;

    // LOAD DATA FROM API LINK.
    fetch(url)
        .then(response => response.json())
        .then(data => showBook(data))
        .catch(error => console.log(error));
}
// FUNCTION: SHOW LOADED DATA IN SEARCH RESULT CONTAINER.
const showBook = (data) => {
    // console.log(data.numFound);
    const bookData = data.docs;
    const resultCountTextField = document.getElementById("resultCountText");
    const resultCountField = document.getElementById("resultCount");
    const resultShowField = document.getElementById("resultShow");

    // CHECK SEARCH RESULT HAVE OR NOT. 
    if (parseInt(data.numFound)) {
        resultCountTextField.style.display = 'block'; // SEARCH RESULT COUNTER SHOW HERE.
        resultCountField.innerText = data.numFound;
        resultShowField.innerText = bookData.length;

        const resultContainerField = document.getElementById("resultContainer");
        // ITERATION LOADED DATA. 
        bookData.forEach((book) => {
            const cardGroup = document.createElement('div');
            cardGroup.classList.add('col-md-4');
            cardGroup.classList.add('mt-3');
            // CARD TEMPLATE TO SHOW SEARCH RESULT.
            const card = `
                    <div class="card p-0 m-0">
                        <img class="card-img-top rounded mx-auto d-block" style ="width: 349px; height: 340px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-title">${book.title}</h4>
                            <h6 class="card-title">Author: ${book.author_name}</h6>
                            <p>Publisher: ${book.publisher}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">First Publication: ${book.first_publish_year}</small>
                        </div>
                    </div>
                    `
            // END CARD TEMPLATE.
            cardGroup.innerHTML = card;
            resultContainerField.appendChild(cardGroup);
            const spinnerField = document.getElementById("loadSpinner");
            spinnerField.classList.add("d-none");
        })
    }
    // IF SEARCH RESULT NOT FOUND.
    else {
        // resultCountTextField.style.display = 'block';
        // resultCountField.innerText = data.numFound;

        const noResult = document.getElementById("noResult");
        noResult.style.display = "block";

        const spinnerField = document.getElementById("loadSpinner");
        spinnerField.classList.add("d-none");
    }
}