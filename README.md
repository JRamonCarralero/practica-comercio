# APP de Comercio en React

Repositorio de José Ramón Carralero. Práctica de React.

## Descripción

Consiste en una aplicación web que simula el registro de ventas de un negocio.

Para ello contamos con 2 perfiles, el de usuario (empleado) y el de administrador (jefe). 

Los usuarios podrán realizar 2 funciones:

* Cambiar información de su perfil y su contraseña
* Crear ticket de venta, es decir, registrar la venta

Los administradores tendrán las dos funciones anteriores y además:

* Creación, modificación y eliminación de usuarios
* Creación, modificación y eliminación de productos
* Visualización de la facturación en función del empleado y un periodo de tiempo

En este repositorio se aplica:

* React, utilizando los Hooks useState y useEffect, un Context con un Provider para el manejo del usuario conectado y React Router para el manejo de rutas
* SessionStorage como apoyo al Context de React
* Node.js con Express.js
* MongoDB como base de datos
* JSDocs para la documentación del código
* GitHub para gestión de repositorios

Para la utilización de la app, es necesario crear previamente un usuario en la base de datos con el perfil de "admin", ya que no existe la opción de registro.
