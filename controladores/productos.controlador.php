<?php

class ControladorProductos
{

	/*=============================================
	MOSTRAR PRODUCTOS
	=============================================*/

	static public function ctrMostrarProductos($item, $valor, $orden)
	{

		$tabla = "productos";

		$respuesta = ModeloProductos::mdlMostrarProductos($tabla, $item, $valor, $orden);

		return $respuesta;
	}

	/*=============================================
	CREAR PRODUCTO
	=============================================*/

	static public function ctrCrearProducto()
	{

		if (isset($_POST["nuevaDescripcion"])) {

			$tabla = "productos";

			$datos = array(
				"descripcion" => $_POST["nuevaDescripcion"],
				"stock" => $_POST["nuevoStock"],
				"precio_venta" => $_POST["nuevoPrecioVenta"],
				"precio_venta_punto" => $_POST["nuevoPrecioVentaPunto"]
			);

			$respuesta = ModeloProductos::mdlIngresarProducto($tabla, $datos);

			if ($respuesta == "ok") {

				echo '<script>

						swal({
							  type: "success",
							  title: "El producto ha sido guardado correctamente",
							  showConfirmButton: true,
							  confirmButtonText: "Cerrar"
							  }).then(function(result){
										if (result.value) {

										window.location = "productos";

										}
									})

						</script>';
			}
		}
	}

	/*=============================================
	EDITAR PRODUCTO
	=============================================*/

	static public function ctrEditarProducto()
	{

		if (isset($_POST["editarDescripcion"])) {



			$tabla = "productos";

			$datos = array(
				"descripcion" => $_POST["editarDescripcion"],
				"stock" => $_POST["editarStock"],
				"precio_venta" => $_POST["editarPrecioVenta"],
				"precio_venta_punto" => $_POST["editarPrecioVentaPunto"],
			);

			$respuesta = ModeloProductos::mdlEditarProducto($tabla, $datos);

			if ($respuesta == "ok") {

				echo '<script>

						swal({
							  type: "success",
							  title: "El producto ha sido editado correctamente",
							  showConfirmButton: true,
							  confirmButtonText: "Cerrar"
							  }).then(function(result){
										if (result.value) {

										window.location = "productos";

										}
									})

						</script>';
			}
		}
	}



	/*=============================================
	BORRAR PRODUCTO
	=============================================*/
	static public function ctrEliminarProducto()
	{

		if (isset($_GET["idProducto"])) {

			$tabla = "productos";
			$datos = $_GET["idProducto"];

			if ($_GET["imagen"] != "" && $_GET["imagen"] != "vistas/img/productos/default/anonymous.png") {

				unlink($_GET["imagen"]);
				rmdir('vistas/img/productos/' . $_GET["codigo"]);
			}

			$respuesta = ModeloProductos::mdlEliminarProducto($tabla, $datos);

			if ($respuesta == "ok") {

				echo '<script>

				swal({
					  type: "success",
					  title: "El producto ha sido borrado correctamente",
					  showConfirmButton: true,
					  confirmButtonText: "Cerrar"
					  }).then(function(result){
								if (result.value) {

								window.location = "productos";

								}
							})

				</script>';
			}
		}
	}

	/*=============================================
	MOSTRAR SUMA VENTAS
	=============================================*/

	static public function ctrMostrarSumaVentas()
	{

		$tabla = "productos";

		$respuesta = ModeloProductos::mdlMostrarSumaVentas($tabla);

		return $respuesta;
	}
}
