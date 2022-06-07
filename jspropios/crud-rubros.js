//CRUD
let idEliminar=0;
let idActualizar=0;


function actionCreate(){
    // alert("Crear nueva categoria");
    //Vamos a comunicarnos con el servidor
    let nombreRubro = document.getElementById("nombre-rubro").value;
    
    let tieneSubtemas = 0;
    if($("#si_subtema").is(":checked"))
        tieneSubtemas=1;
    else
        tieneSubtemas=0;
    
    $.ajax({
        method:"POST",
        url:"Plantilla/phppropios/crud-rubros.php",
        data: {
            rubro: nombreRubro, 
            subtemas:tieneSubtemas,//temporal
            accion:"create"
        },
        success: function( respuesta ){
            let miObjetoJSON = JSON.parse(respuesta);
            //.estado
            //.id
            //.mensaje

            if(miObjetoJSON.estado==1){
                //Agregamos el registro a la tabla
                let tabla=$("#example1").DataTable();
                let botones ='  <a class="btn btn-warning btn-sm" href="#"><i class="fas fa-clock"></i></a>';
                botones+=' <a class="btn btn-primary btn-sm" href="#" data-toggle="modal" data-target="#modal-actualizar-rubro" onclick="identificaActualizar('+miObjetoJSON.id+');"><i class="fas fa-pencil-alt"></i></a>';
                botones+=' <a class="btn btn-danger btn-sm" href="#" data-toggle="modal" data-target="#modal-delete" onclick="identificaEliminar('+miObjetoJSON.id+');"><i class="fas fa-trash"></i></a>';
                
                if(rubro.subtemas==1)
                    tabla.row.add([rubro.nombre_rubro,"Sí tiene subtemas",botones]).draw().node().id="renglon_"+rubro.id;
                else
                    tabla.row.add([rubro.nombre_rubro,"No tiene subtemas",botones]).draw().node().id="renglon_"+rubro.id;
                //Mostramos el msg al usuario
                toastr.success(miObjetoJSON.mensaje);
            }   else{
                //Mandamos un error al Usuario
                toastr.error(miObjetoJSON.mensaje);
            }
        }
    });
}

function actionRead(){
    $.ajax({
        method:"POST",
        url:"Plantilla/phppropios/crud-rubros.php",
        data: {
            accion:"read"
        },
        success: function( respuesta ){
            //Agregar el listado de rubros a la tabla
            //los rubros son un array = arreglo
            //miObjetoJSON.rubros = array
            let miObjetoJSON = JSON.parse(respuesta);
            if(miObjetoJSON.estado==1){
                let tabla=$("#example1").DataTable();
                miObjetoJSON.rubros.forEach(rubro => {
                    let botones ='  <a class="btn btn-warning btn-sm" href="#"><i class="fas fa-clock"></i></a>';
                    botones+=' <a class="btn btn-primary btn-sm" href="#" data-toggle="modal" data-target="#modal-actualizar-rubro" onclick="identificaActualizar('+rubro.id+');" ><i class="fas fa-pencil-alt"></i></a>';
                    botones+=' <a class="btn btn-danger btn-sm" href="#" data-toggle="modal" data-target="#modal-delete" onclick="identificaEliminar('+rubro.id+');"><i class="fas fa-trash"></i></a>';
                    if(rubro.subtemas==1)
                        tabla.row.add([rubro.nombre_rubro,"Sí tiene subtemas",botones]).draw().node().id="renglon_"+rubro.id;
                    else
                        tabla.row.add([rubro.nombre_rubro,"No tiene subtemas",botones]).draw().node().id="renglon_"+rubro.id;
                });
            }
        }
    });
}

function actionUpdate(){

    let tieneSubtemas = 0;
    if($("#si_subtema_actualizar").is(":checked"))
        tieneSubtemas=1;
    else
        tieneSubtemas=0;

    let nombreRubroActualizar = document.getElementById('nombre-rubro-actualizar').value;
    $.ajax({
        method:"POST",
        url:"Plantilla/phppropios/crud-rubros.php",
        data: {
            id: idActualizar,
            rubro : nombreRubroActualizar,
            subtemas:tieneSubtemas,
            accion:"update"
        },
        success: function( respuesta ){
            let miObjetoJSON = JSON.parse(respuesta);
            if(miObjetoJSON.estado==1){
                //debemos mostrar en la tabla los datos ya actualizados
                let tabla=$("#example1").DataTable();
                let temp = tabla.row("#renglon_"+idActualizar).data();
                temp[0]=nombreRubroActualizar;
                if(tieneSubtemas==1)
                    temp[1]="Si tiene subtemas";
                else
                    temp[1]="No tiene sibtemas";
                tabla.row("#renglon_"+idActualizar).data(temp).draw();
                toastr.success(miObjetoJSON.mensaje);
            } else{
                toastr.error(miObjetoJSON.mensaje);
            }
        }
    });
}

function actionDelete(){
    $.ajax({
        method:"POST",
        url:"Plantilla/phppropios/crud-rubros.php",
        data: {
            id: idEliminar,
            accion:"delete"
        },
        success: function( respuesta ){
            //Actualizamos la tabla para no tener que refrescar la pag
            let miObjetoJSON = JSON.parse(respuesta);
            if(miObjetoJSON.estado==1){
                let tabla=$("#example1").DataTable();
                tabla.row("#renglon_"+idEliminar).remove().draw();
                toastr.success(miObjetoJSON.mensaje);
            } else{
                toastr.error(miObjetoJSON.mensjae);
            }
        }
    });
}

function identificaEliminar(id){
    idEliminar=id;
}

function identificaActualizar(id){
    //alert(id);
    idActualizar=id;
    $.ajax({
        method:"POST",
        url:"Plantilla/phppropios/crud-rubros.php",
        data: {
            id: idActualizar,
            accion:"read-id"
        },
        success: function( respuesta ){
            //alert(respuesta);
            let miObjetoJSON = JSON.parse(respuesta);
            if(miObjetoJSON.estado==1){
                let nombreRubroActualizar = document.getElementById('nombre-rubro-actualizar');
                nombreRubroActualizar.value = miObjetoJSON.nombre_rubro;
                if(miObjetoJSON.subtemas==1)
                    $("#si_subtema_actualizar").prop("checked",true);
                else
                    $("#no_subtema_actualizar").prop("checked",true);
            }   else{
                toastr.error(miObjetoJSON.mensaje);
            }
            
        }
    });
}