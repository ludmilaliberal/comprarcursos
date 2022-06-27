//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso haciendo click en "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  carrito.addEventListener("click", eliminarCurso);

  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoHTML();
  });
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}

/**
 *
 * @param {*} curso: viene de tal lado
 */
function leerDatosCurso(curso) {
  //console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carritoHTML();
}

function carritoHTML() {
  limpiarHTML();
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
          <img src = ${imagen} width="100" >
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
    `;

    contenedorCarrito.appendChild(row);
  });

  sincronizarStorage();
}
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
  contenedorCarrito.innerHTML = " ";
}
