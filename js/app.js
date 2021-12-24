/* ----- ----- ----- ----- */
/* Variables y Objetos */
/* ----- ----- ----- ----- */

const app = document.getElementById('app');
const inputCaracteres = document.getElementById('num-char');

var configuracion = {
	caracteres: parseInt(inputCaracteres.value),
	simbolos: true,
	numeros: true,
	mayusculas: true,
	minusculas: true,
};

var caracteres = {
	numeros: '0 1 2 3 4 5 6 7 8 9',
	simbolos: '! @ # $ % ^ & * ( ) _ - + = { } [ ] ; : < > , . ? /',
	mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
	minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
};

/* ----- ----- ----- ----- */
/* Eventos */
/* ----- ----- ----- ----- */

app.addEventListener('submit', (e) => {
	e.preventDefault();
});

app.elements.namedItem('btn-plus').addEventListener('click', () => {
	configuracion.caracteres++;
	inputCaracteres.value = configuracion.caracteres;
});

app.elements.namedItem('btn-minus').addEventListener('click', () => {
	if (configuracion.caracteres > 4) {
		configuracion.caracteres--;
		inputCaracteres.value = configuracion.caracteres;
	}
});

const config = document.getElementById('config');

config.addEventListener('click', (e) => {
	btnConfig(e);
});

app.elements.namedItem('btn-generate').addEventListener('click', () => {
	generarPassword();
});

app.elements.namedItem('ip-pass').addEventListener('click', () => {
	copiarPassword();
});

/* ----- ----- ----- ----- */
/* Funciones */
/* ----- ----- ----- ----- */

function btnConfig(elemento) {
	if (elemento.target && elemento.target.tagName === 'BUTTON') {
		elemento.target.classList.toggle('active');
		elemento.target.childNodes[0].classList.toggle('fa-check');
		elemento.target.childNodes[0].classList.toggle('fa-times');

		if (elemento.target.id == 'btn-symbols') {
			configuracion.simbolos = !configuracion.simbolos;
		} else if (elemento.target.id == 'btn-nums') {
			configuracion.numeros = !configuracion.numeros;
		} else if (elemento.target.id == 'btn-mayus') {
			configuracion.mayusculas = !configuracion.mayusculas;
		}
	}
}

function generarPassword() {
	var caracteresFinales = '';
	var password = '';

	for (propiedad in configuracion) {
		if (configuracion[propiedad] == true) {
			caracteresFinales += caracteres[propiedad] + ' ';
		}
	}
	caracteresFinales = caracteresFinales.trim();
	caracteresFinales = caracteresFinales.split(' ');

	for (var i = 0; i < configuracion.caracteres; i++) {
		password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
	}

	app.elements.namedItem('ip-pass').value = password;
}

function copiarPassword() {
	app.elements.namedItem('ip-pass').select();

	navigator.clipboard.writeText(app.elements.namedItem('ip-pass').value);

	document.getElementById('alert-copy').classList.add('appear');

	setTimeout(function () {
		document.getElementById('alert-copy').classList.remove('appear');
	}, 2000);
}

generarPassword();
