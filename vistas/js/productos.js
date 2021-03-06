/*=============================================
CARGAR LA TABLA DINÁMICA DE PRODUCTOS
=============================================*/

$.ajax({

	url: "ajax/datatable-productos.ajax.php",
	success: function (respuesta) {

		console.log("respuesta", respuesta);

	}

})

var perfilOculto = $("#perfilOculto").val();

$('.tablaProductos').DataTable({
	"ajax": "ajax/datatable-productos.ajax.php?perfilOculto=" + perfilOculto,
	"deferRender": true,
	"retrieve": true,
	"processing": true,
	"language": {

		"sProcessing": "Procesando...",
		"sLengthMenu": "Mostrar _MENU_ registros",
		"sZeroRecords": "No se encontraron resultados",
		"sEmptyTable": "Ningún dato disponible en esta tabla",
		"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
		"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
		"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix": "",
		"sSearch": "Buscar:",
		"sUrl": "",
		"sInfoThousands": ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
			"sFirst": "Primero",
			"sLast": "Último",
			"sNext": "Siguiente",
			"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}

	}

});

/*=============================================
CAPTURANDO LA CATEGORIA PARA ASIGNAR CÓDIGO
=============================================*/
$("#nuevaCategoria").change(function () {

	var idCategoria = $(this).val();

	var datos = new FormData();
	datos.append("idCategoria", idCategoria);

	$.ajax({

		url: "ajax/productos.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function (respuesta) {

			if (!respuesta) {

				var nuevoCodigo = idCategoria + "01";
				$("#nuevoCodigo").val(nuevoCodigo);

			} else {

				var nuevoCodigo = Number(respuesta["codigo"]) + 1;
				$("#nuevoCodigo").val(nuevoCodigo);

			}

		}

	})

})



/*FORMATO PRECIO DE VENTA*/
$("#PrecioVenta").number(true, 2);
$("#PrecioVentaPunto").number(true, 2);
$("#editarPrecioVentaa").number(true, 2);
$("#editarPrecioVentaPuntoo").number(true, 2);






$("#PrecioVenta").change(function () {

	var primerValor = $('#PrecioVenta').val();
	$('#nuevoPrecioVenta').val(primerValor);


})


$("#PrecioVentaPunto").change(function () {

	var primerValor = $('#PrecioVentaPunto').val();
	$('#nuevoPrecioVentaPunto').val(primerValor);


})






$("#editarPrecioVentaa").change(function () {

	var primerValor = $('#editarPrecioVentaa').val();
	$('#editarPrecioVenta').val(primerValor);

})






$("#editarPrecioVentaPuntoo").change(function () {

	var primerValor = $('#editarPrecioVentaPuntoo').val();
	$('#editarPrecioVentaPunto').val(primerValor);

})













/*=============================================
EDITAR PRODUCTO
=============================================*/

$(".tablaProductos tbody").on("click", "button.btnEditarProducto", function () {

	var idProducto = $(this).attr("idProducto");

	var datos = new FormData();
	datos.append("idProducto", idProducto);

	$.ajax({

		url: "ajax/productos.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function (respuesta) {

			var datosCategoria = new FormData();
			datosCategoria.append("idCategoria", respuesta["id_categoria"]);

			$.ajax({

				url: "ajax/categorias.ajax.php",
				method: "POST",
				data: datosCategoria,
				cache: false,
				contentType: false,
				processData: false,
				dataType: "json",
				success: function (respuesta) {



				}

			})

			$("#editarDescripcion").val(respuesta["descripcion"]);

			$("#editarStock").val(respuesta["stock"]);

			$("#editarStock").val(respuesta["stock"]);

			if (respuesta["imagen"] != "") {

				$("#imagenActual").val(respuesta["imagen"]);

				$(".previsualizar").attr("src", respuesta["imagen"]);

			}

		}

	})

})

/*=============================================
ELIMINAR PRODUCTO
=============================================*/

$(".tablaProductos tbody").on("click", "button.btnEliminarProducto", function () {

	var idProducto = $(this).attr("idProducto");
	var codigo = $(this).attr("codigo");
	var imagen = $(this).attr("imagen");

	swal({

		title: '¿Está seguro de borrar el producto?',
		text: "¡Si no lo está puede cancelar la accíón!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Cancelar',
		confirmButtonText: 'Si, borrar producto!'
	}).then(function (result) {
		if (result.value) {

			window.location = "index.php?ruta=productos&idProducto=" + idProducto + "&imagen=" + imagen + "&codigo=" + codigo;

		}


	})

})

