<html>
<style>
/* Progresso da Solicitação */
	.container_prog {
	  width: 100%;
	}
	
	.progressbar {
	  counter-reset: step;
	}
	.progressbar li {
	  list-style: none;
	  display: inline-block;
	  width: 10.33%;
	  position: relative;
	  text-align: center;
	  cursor: pointer;
	}
	.progressbar li:before {
	  content: counter(step);
	  counter-increment: step;
	  width: 30px;
	  height: 30px;
	  line-height : 30px;
	  border: 1px solid #ddd;
	  border-radius: 100%;
	  display: block;
	  text-align: center;
	  margin: 0 auto 10px auto;
	  background-color: #fff;
	}
	.progressbar li:after {
	  content: "";
	  position: absolute;
	  width: 100%;
	  height: 1px;
	  background-color: #ddd;
	  top: 15px;
	  left: -50%;
	  z-index : -1;
	}
	.progressbar li:first-child:after {
	  content: none;
	}
	.progressbar li.active {
	  color: green;
	}
	.progressbar li.active:before {
	  border-color: green;
	} 
	.progressbar li.active + li:after {
	  background-color: green;
	}
</style>
<body>
<div class="container_prog">
  <ul class="progressbar">
	<li class="active">Cancelado</li>
	<li>Ocorrência</li>
	<li>Em Trânsito</li>
	<li>Entregue</li>
  </ul>
</div>
</body>
</html>
