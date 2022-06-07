<?php
$conexion = mysqli_connect('localhost', 'root', '', 'sistete');

if (!$conexion) {
    die("Error al aonectarse: " . mysqli_connect_error());
}
?>