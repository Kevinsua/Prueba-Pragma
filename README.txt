Prueba técnica.
En este Readme obtendrá los paso a seguir para levantar la App solicitada, se trabajó con la base de datos SQL SERVER 2019, ReactJS y .NET 6.

Base de datos y Frontend:

1.- Para comenzar a implementar el entorno de esta aplicación debemos crear una base de datos que se llame pragma.
2.- Ejecutar en dicha base de datos este script que permitirá crear la tabla.
CREATE TABLE dbo.Usuario 
( 
    Id INT PRIMARY KEY NOT NULL 
    ,Nombre VARCHAR(50) NOT NULL 
    ,Rut VARCHAR(50) UNIQUE NOT NULL 
    ,Correo VARCHAR(100)
    ,FechaNacimiento DATETIME NOT NULL
);
3.-Con esto tenemos listo la base de datos.
4.- Abri la carpeta Backend.
5.- Luego de eso ingresamos en la solución pruebaPragma.sln.
6.- Configurar el archivo appSettings.json(Se dejó un ejemplo de la cadena de conexión a la base de datos donde solo se tienen que cambiar la configuración si es necesario, con esto estaríamos listos para levantar nuestra APis).
7.- Se utilizó VisualStudio 2022 como editor de texto.

Frontend:
1.- Abrir la carpeta Frontend dentro del editor de texto de preferencia.
2.- En la termina ejecutar el comando "npm install", esto es para la instalación de todas las dependencias.
3.- Para subir nuestro aplicativo ejecutamos el comando "npm run dev", con esto estaríamos listos para usar nuestra app.
4.- Se utilizó Vite para crear el proyecto.
