const LoadCatagories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((data) => data.json())
    .then((catagories) => Catagories(catagories));
};

let AllProducts = [];

const LoadAllProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((data) => data.json())
    .then((products) => {
      AllProducts = products;
      Products(AllProducts);
    });
};
function toSentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function shortenText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + " ...";
}

const Catagories = (catagories) => {
  const CatagoryContainer = document.getElementById("catagories");

  const allbtn = document.createElement("div");
  allbtn.innerHTML = `
            <button
                onClick="LoadProducts('all')"
                class="cursor-pointer flex items-center gap-1 text-xs font-semibold border border-indigo-700 text-indigo-700 hover:bg-indigo-100 rounded-sm px-2 py-1"
          >
            <span class="flex items-center"
              ><img src="assets/fa-book-open.png" alt=""
            /></span>
             All
          </button> 
  `;

  CatagoryContainer.appendChild(allbtn);

  for (let catagory of catagories) {
    const btnctg = document.createElement("div");
    const formatCatagory = toSentenceCase(catagory);

    const button = document.createElement("button");

    btnctg.className =
      "cursor-pointer flex items-center gap-1 text-xs font-semibold border border-indigo-700 text-indigo-700 hover:bg-indigo-100 rounded-sm px-2 py-1";
    btnctg.innerHTML = ` 
        ${formatCatagory}
        `;

    btnctg.addEventListener("click", () => {
      LoadProducts(catagory);
    });

    btnctg.appendChild(button);
    CatagoryContainer.appendChild(btnctg);
  }
};

// Products

const Products = (allproducts) => {
  const ProductContainer = document.getElementById("products");
  const LoadingContainer = document.getElementById("loading");

  LoadingContainer.className = "hidden";

  ProductContainer.innerHTML = ``;

  for (product of allproducts) {
    const prdCard = document.createElement("div");
    prdCard.className = "card bg-base-100 max-w-80";

    prdCard.innerHTML = `
            <figure class="h-64 overflow-hidden bg-gray-100">
              <img
              class="h-full w-48 p-4"
                src="${product.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body p-4 border border-gray-200 rounded-b-xl">
              <div class="text-xs flex justify-between items-center">
                <h3
                  class="py-1 px-2 rounded-full bg-violet-100 text-violet-700 font-medium"
                >
                  ${toSentenceCase(product.category)}
                </h3>
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-5 text-yellow-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="font-semibold">${product.rating.rate}(${product.rating.count})</span>
                </div>
              </div>
              <div class="py-2 text-lg text-left font-semibold">
                <h2>${shortenText(product.title, 3)}</h2>
                <h2 ><span>$</span>${product.price}</h2>
              </div>

              <div class="card-actions grid grid-cols-2">
                <button 
                onClick="ProductDetails(${product.id})"
                class="btn btn-sm w-full rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <span>Details</span>
                </button>

                <button
                  onClick=""
                  class="btn btn-sm bg-violet-600 text-white w-full rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>

                  <span>Add</span>
                </button>
              </div>
            </div>
      `;

    ProductContainer.appendChild(prdCard);
  }
};

function LoadProducts(category) {
  if (category == "all") {
    LoadAllProducts();
    return;
  }

  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((filterdProducts) => {
      AllProducts = filterdProducts;
      Products(AllProducts);
    });
}

const displayModal = (Product) => {
  console.log(Product);
  const modalContainer = document.getElementById("ModelView");

  modalContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box flex flex-col gap-5 ">
            <div class="flex flex-col md:flex-row items-start gap-2">
              <div class="w-full h-full">
                <img class="max-h-92 mx-auto md:h-full w-auto p-4" src="${Product.image}" alt="Shoes" />
              </div>
              <div class="text-left max-w-3xl">
                <h3 class="text-xl font-bold my-5">${Product.title}</h3>
                <div>
                  <h2 class="text-lg font-bold">Details: </h2>
                  <div class="flex flex-col gap-2">
                    <h2 class="text-base ">${Product.description}</h2>
                    <div class="flex justify-between items-center my-5">
                      <div class="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6 text-yellow-400"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span class="font-semibold text-xl">${Product.rating.rate}(${Product.rating.count})</span>
                      </div>
                      <h2 class="text-xl font-semibold">$ ${Product.price}</h2>
                    </div>
                  </div>
                </div>
                <div class="card-actions grid grid-cols-1 md:grid-cols-3">
                <button 
                onClick="ProductDetails(${product.id})"
                class="btn btn-sm w-full rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <span>Details</span>
                </button>

                <button
                  onClick=""
                  class="btn btn-sm bg-violet-600 text-white w-full rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>

                  <span>Add</span>
                </button>
                <div class="h-auto flex w-full">
                  <form method="dialog" class="w-full">
                    <button class="bg-indigo-600 btn btn-sm w-full text-white rounded-lg">
                      Return
                    </button>
                  </form>
                </div>
              </div>
            </div>

            
            </div>
        </dialog>

    `;
  const showModal = document.getElementById("my_modal_1");
  showModal.showModal();
};

// Product Details Start

const ProductDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((singleProduct) => displayModal(singleProduct));
};

LoadCatagories();
LoadAllProducts();
