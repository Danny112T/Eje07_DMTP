<?php   
    //por GET y POST
    //El servidor debe de contestar en formato JSON
    include 'conexion.php';

    $Respuesta = array();
    $accion = $_POST["accion"];
    
    switch ($accion) {
        case "create":
            accionCrearPHP($conexion);
            break;
        
        case "update":
            accionUpdatePHP($conexion);
            break;

        case "delete":
            accionDeletePHP($conexion);
            break;

        case "read":
            accionReadPHP($conexion);
            break;

        case "read-id":
            accionReadByIdPHP($conexion);
            break;

        default:
            accionError();
            break;
    }

    function accionCrearPHP($conexion){
        $rubro = $_POST["rubro"];
        $subtemas = $_POST["subtemas"];
        $QueryCreate = "INSERT INTO rubro(id,nombre_rubro,subtemas) VALUES(NULL,'".$rubro."','".$subtemas."')";
        if(mysqli_query($conexion,$QueryCreate)){
            $Respuesta["estado"]        =1;
            $Respuesta["id"]            = mysqli_insert_id($conexion);//Temporal
            $Respuesta["mensaje"]       ="El registro se agrego correctamente";
        } else{
            $Respuesta["estado"]        =0;
            $Respuesta["id"]            = -1;
            $Respuesta["mensaje"]       ="Ocurrio un error desconocido";
        }
        
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }

    function accionUpdatePHP($conexion){
        $id = $_POST["id"];
        $rubro = $_POST["rubro"];
        $subtemas = $_POST["subtemas"];
        $QueryUpdate = "UPDATE rubro SET nombre_rubro='".$rubro."', subtemas=".$subtemas." WHERE id=".$id;
        mysqli_query($conexion,$QueryUpdate);
        if(mysqli_affected_rows($conexion)>0){
            $Respuesta["estado"]            =1;
            $Respuesta["mensaje"]           ="El registro se actualizo correctamente";
        }else{
            $Respuesta["estado"]            =0;
            $Respuesta["mensaje"]           ="El registro no fue actualizado";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }

    function accionDeletePHP($conexion){
        $id = $_POST['id'];
        $QueryDelete = "DELETE FROM rubro where id=".$id;
        mysqli_query($conexion,$QueryDelete);
        if(mysqli_affected_rows($conexion)>0){
            $Respuesta["estado"]            =1;
            $Respuesta["mensaje"]           ="El registro se elimino correctamente";
        } else{
            $Respuesta["estado"]            =0;
            $Respuesta["mensaje"]           ="Ocurrio un error desconocido";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }

    function accionReadPHP($conexion){
        $QueryRead = "SELECT * FROM rubro"; // Diseñamos la consulta
        $ResultadoRead = mysqli_query($conexion,$QueryRead);    //ejecutamos la consulta
        $numeroRegistro = mysqli_num_rows($ResultadoRead);  //obtenemos el num de regs

        if($numeroRegistro>0){      // Checamos si hay registros... o no...
            $Respuesta["estado"]        =1;
            $Respuesta["mensaje"]       ="Registro encontrado";
            $Respuesta["rubros"]        =array();
            while($RenglonRubro=mysqli_fetch_assoc($ResultadoRead)){
                $Rubro=array();
                $Rubro["id"]=$RenglonRubro["id"];
                $Rubro["nombre_rubro"]=$RenglonRubro["nombre_rubro"];
                $Rubro["subtemas"]=$RenglonRubro["subtemas"];
                array_push($Respuesta["rubros"],$Rubro);
            }
        } else{
            $Respuesta["estado"]        =0;
            $Respuesta["mensaje"]       ="Registro no encontrados";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }

    function accionError(){
        $Respuesta["estado"]            =0;
        $Respuesta["mensaje"]           ="Accion No Valida...";
        echo json_encode($Respuesta);
    }

    function accionReadByIdPHP($conexion){
        $id = $_POST["id"];
        $QueryReadById = "SELECT * FROM rubro where id=".$id;
        $ResultadoReadById = mysqli_query($conexion,$QueryReadById);
        $numeroRegistros = mysqli_num_rows($ResultadoReadById);

        if($numeroRegistros>0){
            $Respuesta["estado"]        =1;
            $Respuesta["mensaje"]       ="Registro encontrado";

            $RenglonRubroById=mysqli_fetch_assoc($ResultadoReadById);
            
            $Respuesta["id"]=$RenglonRubroById["id"];
            $Respuesta["nombre_rubro"]=$RenglonRubroById["nombre_rubro"];
            $Respuesta["subtemas"]=$RenglonRubroById["subtemas"];
            
        } else{
            $Respuesta["estado"]        =0;
            $Respuesta["mensaje"]       ="Registro no encontrados";
        }
        echo json_encode($Respuesta);
        mysqli_close($conexion);
    }
?>