
const socket = io();
const productsList = document.getElementById("productsList");
const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");

// Agregar productos
addForm.addEventListener("submit", async (e) => { // Escucha el evento submit del formulario

    e.preventDefault(); // Evita que se recargue la página
    const title = document.getElementById("title").value; // Obtiene el valor del input title
    const price = document.getElementById("price").value; // Obtiene el valor del input price
    const description = document.getElementById("description").value; // Obtiene el valor del input description

    await fetch("/realtimeproducts", { // Realiza una petición POST a la ruta /realtimeproducts
        method: "POST", // Método POST
        headers: {
            "Content-Type": "application/json", // Tipo de contenido JSON
        },
        body: JSON.stringify({ title, price, description }) // Cuerpo de la petición
    })

    addForm.reset(); // Resetea el formulario

})
// Eliminar productos

deleteForm.addEventListener("submit", async (e) => { // Escucha el evento submit del formulario
    e.preventDefault(); // Evita que se recargue la página
    const id = document.getElementById("id").value; // Obtiene el valor del input id
    await fetch("/realtimeproducts", { // Realiza una petición DELETE a la ruta /realtimeproducts
        method: "DELETE", // Método DELETE
        headers: {
            "Content-Type": "application/json", // Tipo de contenido JSON
        },
        body: JSON.stringify({ id }), // Cuerpo de la petición
    });

    deleteForm.reset(); // Resetea el formulario
})

// Recibir los productos

socket.on("products", (data) => { // Escucha el evento products
    console.log(data); // Muestra los productos en consola
    // productsList.innerHTML = "";
    data.forEach((product) => { // Recorre los productos
        const card = document.createElement("div"); // Crea un elemento div
        card.classList.add("card"); // Agrega la clase card
        card.style.width = "18rem"; // Le da un ancho de 18rem
        card.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">ID: ${product.id}</p>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">$${product.price}</p>
                        </div>
    `; // Agrega el contenido del producto

        productsList.appendChild(card); // Agrega el producto a la lista de productos
    })
})