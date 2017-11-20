; (function(){
	window.addEventListener("load", cargaPagina);
	var cajaGrande = document.getElementById("cajaGrande");
	var span = document.getElementById("span");
	var form = document.getElementById("form");
	var input = document.getElementById("input");
	var btnGreen = document.getElementById("btnGreen");
	var contador = 1;
	function cargaPagina(){
		span.addEventListener("click", nuevoForm);
		btnGreen.addEventListener("click", nuevaTarjeta);
		btnGreen.addEventListener("click", nuevaCaja);
	}
	function nuevoForm(){
		span.className = "dNone";
		form.className = "form";
		input.focus();
		input.value = "";
	}
	function nuevaTarjeta(e){
		e.preventDefault();
		form.className = "dNone";
		//if (existeContenido(input.value)) {
			var padre = span.parentElement;
			var title = document.createElement("div");
			var link = document.createElement("a");

			title.innerHTML = input.value;
			title.classList.add("list-header");
			padre.appendChild(title);

			link.innerText = "Añadir una tarjeta...";
			padre.appendChild(link);
			link.classList.add("link");

			padre.addEventListener("dragover", arrastrarSobre);
			padre.addEventListener("drop", soltar);
			padre.addEventListener("dragenter", entraArrastrar);

			link.addEventListener("click", nuevoText);
		//}
	}
	function nuevaCaja() {
		var cajaDos = document.createElement("div");
		cajaDos.className = "caja";
		cajaGrande.appendChild(cajaDos);
		span.className = "add";
		cajaDos.insertBefore(span, cajaDos.childNodes[0]);
		cajaDos.insertBefore(form, cajaDos.childNodes[1]);
	}
	function nuevoText(){
		this.className = "dNone";
		var newForm = document.createElement("form");
		var textArea = document.createElement("textarea");
		var btnSmall = document.createElement("button");
		
		newForm.className = "link";
		textArea.className = "input";
		btnSmall.innerText = "Añadir";
		btnSmall.type = "button";
		btnSmall.classList.add("btnGreen");

		newForm.insertBefore(textArea, newForm.childNodes[0]);
		newForm.insertBefore(btnSmall, newForm.childNodes[1]);
		this.parentElement.appendChild(newForm);
		textArea.focus();
		
		textArea.addEventListener("keydown", autosize);
		btnSmall.addEventListener("click", nuevaEntrada);
	}
	function autosize(){
	    this.style.cssText = "height: auto";
        this.style.cssText = "height: " + this.scrollHeight + "px";
	}
	function nuevaEntrada(e){
		e.preventDefault();
		this.parentElement.className = "dNone";
		var entrada = document.createElement("div");
		entrada.setAttribute("draggable", "true");
		entrada.setAttribute("id", "move"+contador);
		contador++;
		entrada.innerText = this.previousElementSibling.value.trim();
		var padre = this.parentElement.parentElement;
		padre.insertBefore(entrada, padre.lastChild);
		entrada.className = "entrada";
		padre.appendChild(entrada.previousSibling);
		padre.lastChild.className = "link";
	
		entrada.addEventListener("dragstart", empiezaArrastrar);
		entrada.addEventListener("dragend", terminaArrastrar);
		entrada.addEventListener("dragleave", dejaArrastrar);

	}
	function empiezaArrastrar(e) {
		e.dataTransfer.setData("text", this.id);
		this.classList.add("borde");
		this.parentElement.classList.add("animated", "tada");
	}
	function terminaArrastrar(e) {
		this.classList.remove("borde");
	}
	function dejaArrastrar(e) {
		this.parentElement.classList.remove("animated", "tada");
	}

	function entraArrastrar(e) {
		this.classList.add("animated", "tada");
	}
	function arrastrarSobre(e) {
		e.preventDefault();
	}
	function soltar(e) {
		e.preventDefault();
		var idArrastrado = e.dataTransfer.getData("text");
		var elementoArrastrado = document.getElementById(idArrastrado);
		this.insertBefore(elementoArrastrado, this.lastElementChild);
		elementoArrastrado.classList.add("animated", "bounce");
	}



})();