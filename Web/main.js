const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const productos =[
    {id: 1, nombre: "Semillas", precio: 200, img: "producto1.jpg", cantidad: 1},
    {id: 2, nombre: "Composta orgánica", precio: 150, img: "producto2.jpg", cantidad: 1},
    {id: 3, nombre: "Kit de jardinería", precio: 350, img: "producto3.jpg", cantidad: 1}
];

let carrito = [];

productos.forEach((product)=>{
    let content = document.createElement("div");
    content.className = "card"; // Le crea una clase al div de arriba
    content.innerHTML = `<img src="${product.img}"><h3> ${product.nombre} </h3><p class="price"> $ ${product.precio} MXN </p>`;
    shopContent.append(content);
    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";
    comprar.className = "comprar"; // Le crea una clase al botón
    content.append(comprar);

    comprar.addEventListener("click", ()=>{

    const repeat = carrito.some((repeatProduct) => repeatProduct.id == product.id);
    if(repeat){
        carrito.map((prod) => {
            if(prod.id == product.id){
                prod.cantidad++;
            }
        })
    } else{
        carrito.push({
            id:product.id,
            img:product.img,
            nombre:product.nombre,
            precio:product.precio,
            cantidad:product.cantidad,
        });
    }
        console.log(carrito);
        carritoCounter();
    });
});

const pintarCarrito = ()=>{
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title"> Carrito </h1>`;
    
    modalContainer.append(modalHeader);
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalbutton);
    carrito.forEach((product)=>{
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>$${product.precio}mxn</p> 
        <p>Cantidad: ${product.cantidad}</p>
        <p>Total: ${product.cantidad * product.precio} </p>`;

    modalContainer.append(carritoContent);
    
    let eliminar = document.createElement("span"); // Se crea la variable "eliminar"
    eliminar.innerText = "X"; // Al span creado arriba se le adhiere texto (en este caso una "X")
    eliminar.className = "delete-product"; // Se crea una clase para poder darle estilos en css
    carritoContent.append(eliminar); // Se agrega en pantalla
    eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalbuying = document.createElement("div");
    totalbuying.className = "total-content";
    totalbuying.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalbuying);
    const pagar = document.createElement("button");
    pagar.innerText = "Paga aquí";
    pagar.className = "pago";
    modalContainer.append(pagar);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const foundID = carrito.find((element) => element.id);
    carrito = carrito.filter((carritoID) => {
        return carritoID !== foundID;
    });
    carritoCounter();
    pintarCarrito();
};

const carritoCounter = () =>{
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
}