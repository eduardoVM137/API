let Producto = {
    Descripcion: "Mochila Para Laptop",
    Marca: "Asus",
    Stock: 4,
    Precio: 54.44,
    Imagen: []

}
console.log(Producto.Descripcion)
    //recorrer un objeto,modificar el objeto


let Insertar = "insert into Producto (descripcion,marca) values (" + Producto.Descripcion + "," + Producto.Marca + ")"
console.log(Insertar)