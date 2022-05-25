@extends('layout.app')

@section('content')
	<style>
	.dataTables_wrapper .dt-buttons { 
		position: absolute;
		top: 9.17em;
	}

	tfoot {
		 display: table-header-group;
	}

	.datetimepicker {
		top: 173px !important;
		
	}

	.table-responsive
	{
		overflow: hidden !important;
	}

	.dataTables_filter {
		display: none;
	}
	
	.btn-group>.btn:first-child {
		margin-left: 0;
		top: 1.7em;
	}

	</style>

	<div class="m-subheader ">
        <div class="d-flex align-items-center">
            <div class="mr-auto">
                <h3 class="m-subheader__title m-subheader__title--separator">URLs</h3>
            </div>

        </div>
    </div>
	<div class="m-portlet">
        <div class="m-portlet__body">
            
			<table id="protocol-table" class="table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                <thead>
					<tr>
						<th>Id</th>
						<th>URL</th>
						<th>Status Code</th>
						<th>Resp. Code</th>
						<th>Data Consulta</th>
						<th>Data Registro</th>
					</tr>
                </thead>
				<tfoot>
					<tr>
						<th>Id</th>
						<th>URL</th>
						<th>Status Code</th>
						<th>Resp. Code</th>
						<th>Data Consulta</th>
						<th>Data Registro</th>
					</tr>
                </tfoot>
            </table>
        </div>
    </div>
@endsection
@push('scripts')
<script type="text/javascript" src="{{ URL::to('js/jquery-ui.min.js') }}"></script>
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<script type="text/javascript" src="{{ URL::to('js/jquery.doubleScroll.js') }}"></script>
<script>
	setInterval(function() {
		$('#protocol-table').DataTable().clear().draw();
		
		// Send Post Request
		$.ajax({
			url: '{{route("get.protocols")}}',
			type: 'GET',
			//data: {de: de, ate: ate}
		})
		.done(function (data) {
			console.log(data);
			
			$('#protocol-table').DataTable().clear().draw();
			$('#protocol-table').DataTable().rows.add(data.data); // Add new data
			$('#protocol-table').DataTable().columns.adjust().draw(); // Redraw the DataTable
			
		})
		.fail(function () {
			console.log('Failed');
		});
	}, 30000);
	
	//Datatable
	$('#protocol-table').DataTable({
		"autoWidth": false,
		"bLengthChange": false,
		pageLength: 10,
		"search": {
		"regex": true
		},
		destroy: true,
		"processing" : false,
		"paging": true,
		"searching": true,
		"ServerSide": true,
		"columnDefs":[
		   {"visible": false, "targets":0}
		],
		aaSorting: [[0, "desc"]],
		ajax: '{{route("get.protocols")}}',
		columns: [

			{
				data: 'id',
				render: function (data) {
					if (data === undefined) {
						data = 'Indisponível';
					}

					return data;
				}
			},       

			{
				data: 'url_track',
				render: function (data) {
					if (data === undefined) {
						data = 'Indisponível';
					}

					return data;
				}
			},

			{
				data: 'status_code',
				render: function (data) {
					if (data === undefined) {
						data = 'Indisponível';
					}

					return data;
				}
			},
			
			{
				data: 'response_code',
				render: function (data) {
					if (data === undefined) {
						data = 'Indisponível';
					}

					return data;
				}
			},
			
			{
				data: 'urlcheckedAt',
				render: function (data) {
					if (data === undefined) {
						data = 'Indisponível';
					}

					return data;
				}
			},
			
			{
				data: 'createdAt',
				render: function (data) {
					if (data === undefined) {
						data = 'Indisponível';
					}

					return data;
				}
			}		
		],
		language: {
			"lengthMenu": "Mostrar _MENU_ registros por página",
			"zeroRecords": "...",
			"info": "Exibindo a página _PAGE_ de _PAGES_",
			"infoEmpty": "Sem registros disponíveis",
			"search": "Buscar",
			"processing": "Carregando..."
		},
		initComplete: function() {
		  var api = this.api();

		  // Apply the search
		  api.columns().every(function() {
			var that = this;

			$('input', this.footer()).on('keyup change', function() {
			  if (that.search() !== this.value) {
				that
				  .search(this.value)
				  .draw();
			  }
			});
		  });
		
		
			<!-- Div Scroll -->
			$('#protocol-table').wrap("<div id='scrooll_div' style='width: 100%;'></div>");
			$('#scrooll_div').doubleScroll();
		}

	});
		
		
	$('#protocol-table tfoot th').each(function() {
		var title = $(this).text();
		$(this).html('<input type="text" placeholder="Pesquisar ' + title + '" style="width:100%;"/>');
	});
</script>
@endpush
