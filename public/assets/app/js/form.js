jQuery(document).ready(function () {

    $(".cepOrigem").on('change', function () {
        $('.lds-dual-ring-small').css('display', 'inline-block');

        $.ajax({
            url: 'https://viacep.com.br/ws/' + $(this).val() + '/json/unicode',
            dataType: 'json'
        }).done(function (result) {

            if(result.erro == true){
                $('.lds-dual-ring-small').css('display', 'none');
                swal('Ops!', 'Cep não encontrado!!')
                $('.cepOrigem, .d_cep').val("");
                $('.endereco-origem, .d_local').val("");
                $('.bairro-origem, .d_bairro').val("");
                $('.cidade-origem, .d_cidade').val("");
                $('.uf-origem, .d_uf').val("");
            }else{
            $('.cidade-origem').val(result.localidade);
            $('.bairro-origem, .d_bairro').val(result.bairro);
            $('.endereco-origem').val(result.logradouro);
            $('.uf-origem').val(result.uf).prop('selected', true);
            $('.lds-dual-ring-small').css('display', 'none');
            }
        }).catch(function (err) {
            $('.lds-dual-ring-small').css('display', 'none');
            swal('Ops!', 'Algo de errado ocorreu, tente novamente mais tarde!!')
        })
    });
    $(".cepDestino").on('change', function () {
        $('.lds-dual-ring-small').css('display', 'inline-block');
        $.ajax({
            url: 'https://viacep.com.br/ws/' + $(this).val() + '/json/unicode',
            dataType: 'json'
        }).done(function (result) {
            if(result.erro == true){

                $('.lds-dual-ring-small').css('display', 'none');
                swal('Ops!', 'Cep não encontrado.')
                $('.cepDestino, .p_cep').val("");
                $('.endereco-destino, .p_local').val("");
                $('.bairro-destino, .p_bairro').val("");
                $('.cidade-destino, .p_cidade').val("");
                $('.uf-destino, .p_uf').val("");

            }else{
            $('.cidade-destino').val(result.localidade);
            $('.bairro-destino, .p_bairro').val(result.bairro);
            $('.endereco-destino').val(result.logradouro);
            $('.uf-destino').val(result.uf).prop('selected', true);
            $('.lds-dual-ring-small').css('display', 'none');
            }
        }).catch(function (err) {
            $('.lds-dual-ring-small').css('display', 'none');
            swal('Ops!', 'Algo de errado ocorreu, tente novamente mais tarde!!')
        })
    });

     ///////
    $(".ajax-form").on('submit', function (e) {
        e.preventDefault();

        if ($(this).hasClass('confirmation')) {
            if (!confirm($(this).data('alert'))) return false;
        }

        $('.lds-dual-ring').css('display', 'inline-block');

        // Validade form
        /*
        var modalError = $("#on_error"), erros = 0;
        modalError.find("p#description_error").text("");

        $(this).find('input, select, textarea').each(function () {
            $(this).removeClass('input-error');
            if ($(this).is(':visible') && !$(this).prop('disabled')) {
                var value = eval($(this).data('validation'));
                erros += typeof value === "number" ? value : 0;
            }
        });

        if(typeof modalError.modal === 'undefined' && erros > 0){
            modalError.show();
            $('body').on('click',function () {
                modalError.hide();
            });
            return false;
        }

        if (erros > 0) {
            modalError.modal('show');
            return false;
        }

        */

        // Send form
        submitAjaxForm($(this));
    });


    /*

    $(".filter_drinks_form").on('submit', function (e) {

        e.preventDefault();

        var columns = $("#columns_");
        if(columns.length > 0) columns.attr("id","columns");
        else columns = $("#columns");

        var data = {};
        $(this).find('input, select, textarea').each(function () {
            if ($(this).is(':visible') && !$(this).prop('disabled')) {
                var property = $(this).attr("name");
                data[property] = $(this).val();
            }
        });
        $('#datatable').dataTable().fnDestroy();
        Loadtables( data );


    });
    */
    $('#track_malote').on('change', function () {
        $.ajax({
            url: '/handbags/track_letter/' + $(this).val(),
            type: 'GET',
            dataType: 'json'
        }).done(function (result) {
            $('#error').remove();
            if (result.result === false) {
                $('.div_track').append('<label id="error" class="text-info">Não existe Malote com esta Carta</label>');
                $('.track').removeAttr('readonly');
            } else {
                console.log(result.handbag);
                $.each(result.handbag, function (key, val) {
                    if (key != 'track_malote') {
                        if (key == 'd_nome')
                            $('#remetente').val(val);
                        else if (key == 'd_local')
                            $('#address').val(val);
                        else if (key == 'p_nome')
                            $('#destinatario').val(val);
                        else if (key == 'p_local')
                            $('#dest').val(val);
                        else if (key == 'p_baia')
                            $('#baia').val(val);
                        else if (key == 'p_andar') {
                            $('#andar').val(val);
                        } else {
                            $('input[name=' + key + '], #' + key).val(val);
                            $('select[name=' + key + ']').val(val);
                            $('#' + key).attr('readonly', true);
                        }
                    }
                });


            }
        }).catch(function (err) {
            reject(err);
        })
    });
    $('#track_cartas').on('change', function () {
        $.ajax({
            url: '/handbags/track_handbags/' + $(this).val(),
            type: 'GET',
            dataType: 'json'
        }).done(function (result) {
            $('#error').remove();
            if (result.result === false) {
                //$('.div_track').append('<label id="error" class="text-info">Malote inexistente</label>');
                $('.track').removeAttr('readonly');
            } else {
                $.each(result.handbag, function (key, val) {
                    if (key != 'track_malote') {
                        if (key == 'd_nome')
                            $('#local_origem').val(val);
                        else if (key == 'd_local')
                            $('#address').val(val);
                        else if (key == 'p_nome')
                            $('#local_destino').val(val);
                        else if (key == 'p_local')
                            $('#destinatario').val(val);
                        else if (key == 'p_baia')
                            $('#baia').val(val);
                        else if (key == 'p_andar') {
                            $('#andar').val(val);
                        } else {
                            $('input[name=' + key + '], #' + key).val(val);
                            $('select[name=' + key + ']').val(val);
                            $('#' + key).attr('readonly', true);
                        }
                    }
                });
            }
        }).catch(function (err) {
            reject(err);
        })
    });
    $('#quantidade').keyup(function (e) {
        var valor = $(this).val();
        $(this).val(valor.replace(/[-]/g, ''));
        $(this).val(valor.replace(/[,]/g, ''));
        $(this).val(valor.replace(/[.]/g, ''));
    });


    // $('.phone').mask('(99)9999-9999');
    $('.cnpj').mask('99.999.999/9999');
    $('.phone').mask('(00) 0000-00009');
    $('.phone').blur(function (event) {
        if ($(this).val().length == 15) { // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
            $('.phone').mask('(00) 00000-0009');
        } else {
            $('.phone').mask('(00) 0000-00009');
        }
    });
    $('.cepOrigem').mask('99999-999');
    $('.cepDestino').mask('99999-999');
    $('.cpf').mask('999.999.999-99');
    $('.placa').mask('AAA-9999');
    $('.km').mask('999999,0', {reverse: true});
    $('.capacidade').mask('99,0', {reverse: true});
    $('.money').mask('000.000.000.000.000,00', {reverse: true});
    $('.weight').maskWeight({
        integerDigits: 5,
        decimalDigits: 3,
        decimalMark: ',',
        roundingZeros: true
    });

    /*
    var options = {
        onComplete: function (cep) {
            waitData();

            $.ajax({
                type: "GET",
                url: $("#basepath").val() + "/cep/" + cep
            }).done(function (msg) {
                $('.div-Cep label').text('CEP');
                var state = $('select#state');
                var city = $('input#city');
                if (msg.result) {
                    $('input#address').val(msg.endereco);
                    $('input#district').val(msg.bairro);
                    city.val(msg.cidade);
                    city.attr('readonly', 'readonly');
                    state.val(msg.estado.id);
                    state.css('pointer-events', 'none');
                    state.css('touch-action', 'none');
                    $('input#number').focus();
                    removeClassWait();

                } else {
                    var modal = $("#on_done_data");
                    city.removeAttr('readonly');
                    state.removeAttr("style");
                    modal.find('.modal-body').find('p').text(msg.message);
                    modal.find('.modal-header').find('h5').text("Erro");
                    modal.modal('show');
                    removeClassWait();

                }
            });

        }
    };
*/
    $("#start_date").add("#end_date").mask('99/99/9999');


    $(".checkscore").on('change', function () {

        var input = $(this).closest('.content-score').find('input.inputscore');

        if (input.prop('disabled')) {
            input.prop('disabled', false);
        } else {
            input.prop('disabled', true);
            input.val("");
        }

    });

    $("#is_ecommerce").on('change', function () {

        var elements = [$("#zipcode"), $("#state"), $("#city")
            , $("#number"), $("#address"), $("#complement")
            , $("#district"), $("#latitude"), $("#longitude")];
        if ($(this).is(':checked'))
            disableElements(elements);
        else
            enebleElements(elements);
    });
});

function disableElements(elements) {
    for (i = 0; i < elements.length; i++) {
        elements[i].prop('disabled', true);
    }
}

function enebleElements(elements) {
    for (i = 0; i < elements.length; i++) {
        elements[i].prop('disabled', false);
    }
}

function reloadPage()
{
	console.log('doc reload...inside formjs');
	document.location.reload(true);
}

function submitAjaxForm(form) {
	console.log('inside ajax form.js');
    const dataForm = this.transformData(form);
    /* verifica se existe o campo geolocation, caso não, envia os dados para o servidor
        caso sim, envia uma solicitação para o google maps api que retorna latitude e longitude e depois
        envia para o servidor
    */
    // dataForm['geolocation'] estava retornando como undefined - Wagner

	console.log(form.serialize());

	if (dataForm['geolocation'] == 0 || dataForm['geolocation'] == null || dataForm['geolocation'] == "") {
		console.log('geolocation = 0...');
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            dataType: 'json',
            data: form.serialize(),
        }).done(function (data) {
            // caso retorne sucesso exibe uma mensagem com sweet alert
            var modal = $("#on_confirm");
            console.log(data);
            if (data.ret) {
                $('.lds-dual-ring').css('display', 'none');
                $('.modal-body .remove').remove();
                $('#remove_btn').remove();
                modal.find('.modal-header').find('h5').text('Cadastro');
                modal.find('.modal-body').find('p').text('Deseja continuar o cadastro ?');
                modal.find('.modal-footer').append('<div id="remove_btn"><a href="edit/' + data.ret + '" class="btn btn-success">Sim</a>&nbsp<button data-dismiss="modal" class="btn btn-danger">Não</button></div>');
                modal.modal('show');
            } else if (data.pdf) {
                $('.lds-dual-ring').css('display', 'none');
                $('.modal-body .remove').remove();
                $('#remove_btn').remove();
                modal.find('.modal-header').find('h5').text('Cadastro');
                modal.find('.modal-body').find('p').text(data.message);
                modal.find('.modal-footer').append('<div id="remove_btn"><form method="post" style="display:inline-block" action="/' + data.data.route + '" target="_blank">' +
                    '<input type="hidden" name="_token" id="token" value="' + $('meta[name="csrf-token"]').attr('content') + '">' +
                    '<input type="hidden" name="title"  value="' + data.data.title + '">' +
                    '<input type="hidden" name="table"  value="' + data.data.table + '">' +
                    '<input type="hidden" name="track"  value="' + data.data.track + '">' +
                    '<input type="hidden" name="id"  value="' + data.data.id + '">' +
                    '<button type="submit" class="btn btn-info" title="PDF">' + data.message_confirm + '</button>' +
                    '</form>&nbsp<button data-dismiss="modal" class="btn btn-success" onClick="reloadPage()">Ok</button></div>');
                modal.modal('show');
            } else if (data.result && data.message) {
                $('.lds-dual-ring').css('display', 'none');
                swal('Sucesso!', data.message);
            } else {
                $('.lds-dual-ring').css('display', 'none');
                swal('Ops!', data.message);
            }

        }).catch(function (error) {
            // retornando um array json de erros encontrados  - validação back end
            $('.lds-dual-ring').css('display', 'none');
            if (error) {

                let errors = '';
                $(error.responseJSON.meta.errors).each(function (index, value) {
                    errors += '<p>' + value + '</p>';
                });

                swal({
                    title: '<h5>' + error.responseJSON.meta.message + '</h5>',
                    html: errors,
                    confirmButtonText: "OK",
                });


            }
        });
    }
	else if(dataForm['geolocation'] == 2)
	{
		console.log('geolocation = 2...');
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            dataType: 'json',
            //data: form.serialize(),
			data: {
				dados: form.serialize(),
				_token: $('#token').val()
			}
        }).done(function (data) {
            // caso retorne sucesso exibe uma mensagem com sweet alert
            var modal = $("#on_confirm");
            
			console.log("..data ini..");
			console.log(data);
			console.log("..data fim..");
            
			if (data.ret) {
                $('.lds-dual-ring').css('display', 'none');
                $('.modal-body .remove').remove();
                $('#remove_btn').remove();
                modal.find('.modal-header').find('h5').text('Cadastro');
                modal.find('.modal-body').find('p').text('Deseja continuar o cadastro ?');
                modal.find('.modal-footer').append('<div id="remove_btn"><a href="edit/' + data.ret + '" class="btn btn-success">Sim</a>&nbsp<button data-dismiss="modal" class="btn btn-danger">Não</button></div>');
                modal.modal('show');
            } else if (data.pdf) {
                $('.lds-dual-ring').css('display', 'none');
                $('.modal-body .remove').remove();
                $('#remove_btn').remove();
                modal.find('.modal-header').find('h5').text('Cadastro');
                modal.find('.modal-body').find('p').text(data.message);
				
				if(data.message_confirm == "PDF da Postagem")
				{
					var tipo_servico_diff_simples_particular = 1;
					
					if(data.data.tipo_servico == "Carta Simples")
					{
						tipo_servico_diff_simples_particular = 0;
					}
					
					if(data.data.tipo_servico == "Particular")
					{
						tipo_servico_diff_simples_particular = 0;
					}
					
					if(tipo_servico_diff_simples_particular == 1)
					{
						var btn_etiqueta = '<a style="text-decoration: none; color: white;" href="/api/app/wsapi_postagem.php?id='+ data.data.id_postagem +'" target="_blank"><button style="margin-right:0.5em;" class="btn btn-info" title="Etiqueta">PDF da Etiqueta</button></a>';
						var title_pdf_postagem = '<input type="hidden" name="title"  value="' + data.data.title + '">';
						var btn_pdf_postagem_submit = '';
					}
					else
					{
						var btn_etiqueta = "";
						var title_pdf_postagem = '<input type="hidden" name="title"  value="Postagem Simples">';
						var btn_pdf_postagem_submit = '<button type="submit" class="btn btn-info" title="PDF">PDF da Etiqueta</button>';
					}
					
					modal.find('.modal-footer').append('<div id="remove_btn">' + btn_etiqueta +
					'<form method="post" style="display:inline-block" action="/' + data.data.route + '" target="_blank">' +
                    '<input type="hidden" name="_token" id="token" value="' + $('meta[name="csrf-token"]').attr('content') + '">' +
                    title_pdf_postagem +
                    '<input type="hidden" name="table"  value="' + data.data.table + '">' +
                    '<input type="hidden" name="track"  value="' + data.data.track + '">' +
                    '<input type="hidden" name="id"  value="' + data.data.id + '">' +
                    btn_pdf_postagem_submit +
                    '</form>' +
					'<button style="margin-left: 0.5em;" data-dismiss="modal" class="btn btn-success" onClick="reloadPage()">Ok</button></div>');
				
				}
				else
				{
					modal.find('.modal-footer').append('<div id="remove_btn"><form method="post" style="display:inline-block" action="/' + data.data.route + '" target="_blank">' +
                    '<input type="hidden" name="_token" id="token" value="' + $('meta[name="csrf-token"]').attr('content') + '">' +
                    '<input type="hidden" name="title"  value="' + data.data.title + '">' +
                    '<input type="hidden" name="table"  value="' + data.data.table + '">' +
                    '<input type="hidden" name="track"  value="' + data.data.track + '">' +
                    '<input type="hidden" name="id"  value="' + data.data.id + '">' +
                    '<button type="submit" class="btn btn-info" title="PDF">' + data.message_confirm + '</button>' +
                    '</form>&nbsp<button data-dismiss="modal" class="btn btn-success" onClick="reloadPage()">Ok</button></div>');
				}
				
				modal.modal('show');
            } else if (data.result && data.message) {
                $('.lds-dual-ring').css('display', 'none');
                swal('Sucesso!', data.message);
            } else {
                $('.lds-dual-ring').css('display', 'none');
                swal('Ops!', data.message);
            }

        }).catch(function (error) {
            // retornando um array json de erros encontrados  - validação back end
            $('.lds-dual-ring').css('display', 'none');
            if (error) {

                let errors = '';
                $(error.responseJSON.meta.errors).each(function (index, value) {
                    errors += '<p>' + value + '</p>';
                });

                swal({
                    title: '<h5>' + error.responseJSON.meta.message + '</h5>',
                    html: errors,
                    confirmButtonText: "OK",
                });


            }
        });
	}
	else {
		console.log('geolocation = 1...');
        // recebe a stringa); formatada para enviar ao google maps api
        const locationOrigin = `${dataForm['d_numero']} ${dataForm['d_local']}, ${dataForm['d_uf']},BR`;
        var locationDestiny;
        if (dataForm['destArray'] == 1) {
           // locationDestiny = `${dataForm['p_numero[]']} ${dataForm['p_local[]']}, ${dataForm['p_uf[]']},BR`;
            locationDestiny = `${dataForm['p_numero[]']} ${dataForm['p_local[]']}, ${dataForm['p_uf[]']},BR`;
        } else {
            locationDestiny = `${dataForm['p_numero']} ${dataForm['p_local']}, ${dataForm['p_uf']},BR`;
        }


        const apiKey = 'AIzaSyA8gH2MLIfnFgwsKJ5j9ncCQC48ma0J-eY';
        /*const apiKey = 'AIzaSyBfUY-zBaBYuGGMJYdc1S9UJScuo2lahz8'; */
        // envia um get para api retornando o endereço
        const geolocationOrigem = this.getGeolocationOrigin(locationOrigin, apiKey);


        geolocationOrigem.then((result) => {
            if (result.results.length == 0) {
                swal('Ops!', 'A localização informada não foi encontrada');
            } else {
                const coordenadas = {}


				if(result.results[0].geometry.location.lat == "" || result.results[0].geometry.location.lat == null)
				{
					coordenadas.latitudeOrigem = 0;
					coordenadas.longitudeOrigem = 0;
				}
				else
				{
					coordenadas.latitudeOrigem = result.results[0].geometry.location.lat;
					coordenadas.longitudeOrigem = result.results[0].geometry.location.lng;
				}

				const geolocationDestino = this.getGeolocationDestiny(locationDestiny, apiKey);
				geolocationDestino.then((value) => {

					if(value.results[0].geometry.location.lat == "" || value.results[0].geometry.location.lat == null)
					{
						coordenadas.latitudeDestino = 0;
						coordenadas.longitudeDestino = 0;
					}
					else
					{
						coordenadas.latitudeDestino = value.results[0].geometry.location.lat;
						coordenadas.longitudeDestino = value.results[0].geometry.location.lng;
					}


					/* try {
						coordenadas.latitudeDestino = value.results[0].geometry.location.lat;
						coordenadas.longitudeDestino = value.results[0].geometry.location.lng;
					} catch (Exception $e) {
						coordenadas.latitudeDestino = 0;
						coordenadas.longitudeDestino = 0;
					} */

                    // persiste os dados no servidor
                    $.ajax({
                        type: form.attr('method'),
                        url: form.attr('action'),
                        data: {
                            dados: form.serialize(),
                            coordenadas: coordenadas,
                            _token: $('#token').val()
                        }
                    }).done(function (data) {
                        // caso retorne sucesso exibe uma mensagem com sweet alert
                        if (data.pdf) {
                            $('.lds-dual-ring').css('display', 'none');
                            var modal = $("#on_confirm");
                            $('.modal-body .remove').remove();
                            $('#remove_btn').remove();
                            modal.find('.modal-header').find('h5').text('Cadastro');
                            modal.find('.modal-body').find('p').text(data.message);
                            var title = data.data.title != null ? data.data.title : "PDF";
                            modal.find('.modal-footer').append('<div id="remove_btn"><form method="post" style="display:inline-block" action="/pdf" target="_blank">' +
                                '<input type="hidden" name="_token" id="token" value="' + $('meta[name="csrf-token"]').attr('content') + '">' +
                                '<input type="hidden" name="title"  value="' + data.data.title + '">' +
                                '<input type="hidden" name="table"  value="' + data.data.table + '">' +
                                '<input type="hidden" name="track"  value="' + data.data.track + '">' +
                                '<input type="hidden" name="id"  value="' + data.data.id + '">' +
                                '<button type="submit" class="btn btn-info" title="PDF">' + data.message_confirm + '</button>' +
                                '</form>&nbsp<button data-dismiss="modal" class="btn btn-success" onClick="reloadPage()">Ok</button></div>');
                            modal.modal('show');
                        } else if (data.result && data.message) {
                            $('.lds-dual-ring').css('display', 'none');
                            swal('Sucesso!', data.message);
                        } else {
                            $('.lds-dual-ring').css('display', 'none');
                            swal('Ops!', data.message);
                        }

                    }).catch(function (error) {
                        // retornando um array json de erros encontrados  - validação back end
                        if (error) {
                            $('.lds-dual-ring').css('display', 'none');
                            let errors = '';
                            $(error.responseJSON.meta.errors).each(function (index, value) {
                                errors += '<p>' + value + '</p>';
                            });

                            swal({
                                title: '<h5>' + error.responseJSON.meta.message + '</h5>',
                                html: errors,
                                confirmButtonText: "OK",
                            });

                        }
                    });

                });
            }


        });


    }
}

// transforma um array colocando o campo name como índice - name:value
function transformData(form) {
    const data = JSON.parse(JSON.stringify(form.serializeArray()));
    const dados = [];

    for (let i = 0; i < data.length; i++) {
        dados[data[i].name] = data[i].value;
    }

    return dados;

}

function getGeolocationOrigin(origin, apiKey) {

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: {
                address: origin,
                key: apiKey
            },
            dataType: 'json'
        }).done(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        })


    });

}

function getGeolocationDestiny(destiny, apiKey) {
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: {
                address: destiny,
                key: apiKey
            },
            dataType: 'json'
        }).done(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        })


    });
}


$('table').on('click', '#delete-data', function (evt) {
    evt.preventDefault();
    var id = $(this).attr('data-id');
    var route = $(this).attr('data-url');

    deleteData(id, route);
});


function deleteData(id, route) {

    swal({
        title: "Deseja realmente excluir?",
        text: "Este procedimento não poderá ser revertido.",
        type: "warning",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        buttons: {
            cancel: {
                text: "Cancelar",
                value: "cancel",
            },
            ok: {
                text: "OK",
                value: "ok",
            },
        },
    }).then((value) => {
        // value esta retornando como TRUE, adicionei || value -  Wagner
        if (value.value == true) {
            $.ajax({
                method: 'POST',
                url: route,
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Adicionei o token o valor vem da meta name="csrf-token" em layout/app.blade.php - Wagner
                },
                data: {id: id}
            }).done(function (data) {
                swal("Registro deletado com sucesso!", {
                    icon: "success",
                });
                location.reload();
            }).catch(function (error) {
                console.log(error);
            });
        }


    });

}

$('table').on('click', '#cancel-data', function (evt) {
    evt.preventDefault();
    var id = $(this).attr('data-id');
    var route = $(this).attr('data-url');
    cancelData(id, route);
});

function cancelData(id, route) {
    swal({
        title: "Deseja realmente cancelar?",
        text: "Este procedimento não poderá ser revertido.",
        type: "warning",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        buttons: {
            cancel: {
                text: "Cancelar",
                value: "cancel",
            },
            ok: {
                text: "OK",
                value: "ok",
            },
        },
    }).then((value) => {
        // value esta retornando como TRUE, adicionei || value -  Wagner
        if (value.value == true) {
            $.ajax({
                method: 'POST',
                url: route,
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Adicionei o token o valor vem da meta name="csrf-token" em layout/app.blade.php - Wagner
                },
                data: {id: id}
            }).done(function (data) {
                swal("Registro cancelado com sucesso!", {
                    icon: "success",
                });
                location.reload();
            }).catch(function (error) {
                console.log(error);
            });
        }


    });

}

//validations functions
function notempty(el) {
    if ($.trim(el.val()).length < 1) {
        updateModalError(el);
        return 1;
    } else {
        return 0;
    }
}

function fieldMinChar(el, minLength) {
    if ($.trim(el.val()).length < minLength) {
        updateModalError(el);
        return 1;
    } else {
        return 0;
    }
}

function equalPass(el) {
    if (el.val() === $("#password").val()) {
        return 0;
    } else {
        updateModalError(el);
        return 1;
    }
}

function validEmail(el) {

    //Regex e-mail
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(el.val())) {
        updateModalError(el);
        return 1;
    } else {
        return 0;
    }

}

function validdocument(el) {
    // Verifica CPF
    var document = $("#cpf_cnpj").val();
    if ($("#select_cpf_cnpj").val() == "cpf") {
        return validaCpf(el.val());
    }
    // Verifica CNPJ
    else if ($("#select_cpf_cnpj").val() == "cnpj") {
        return validarCNPJ(el.val());
    }
    updateModalError(el);
    return 1;

}

function cnpjvalid(el) {
    if (!validarCNPJ(el.val())) {
        updateModalError(el);
        return 1;
    } else {
        return 0;
    }
}

function cpfvalid(el) {
    if (!validaCpf(el.val())) {
        updateModalError(el);
        return 1;
    } else {
        return 0;
    }
}

function birthdayValid(el) {
    if (!validaDn(el.val())) {
        updateModalError(el);
        return 1;
    } else {
        return 0;
    }
}

function updateModalError(el) {
    el.addClass('input-error');
    var elementDescriptionError = $("#on_error").find("p#description_error");
    elementDescriptionError.html(elementDescriptionError.html() + el.data('error').replace('{field}', el.data('label')) + "<br/>");
}

function validaDn(data) {

    if ($.trim(data).length < 8) return false;

    var dateUnformat = data;
    dateUnformat = dateUnformat.split('/').reverse();
    currentDate = new Date();

    if (parseInt(dateUnformat[0]) > (currentDate.getFullYear() - 14) || parseInt(dateUnformat[0]) < (currentDate.getFullYear() - 115)) return false;

    if (parseInt(dateUnformat[1]) > 12 || parseInt(dateUnformat[1]) < 1) return false;

    return !(parseInt(dateUnformat[2]) > 31 || parseInt(dateUnformat[2]) < 1);


}

function validaCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '')
        return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 18)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function waitData() {
    $('body').stop(true, true).addClass("disabled", 500);
}

function removeClassWait() {
    setTimeout(function () {
        $('body').stop(true, true).removeClass("disabled", 500);
    }, 200);
}

function getUrlApi() {
    var url = location.href;
    url = url.split("/");
    var path = "";
    var delimiter = "";
    for (i = 3; i < url.length; i++) {
        path += delimiter + url[i];
        delimiter = "/";
    }
    url = window.location.origin + '/api/' + path;
    return url;

}

var lang = {
    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando de _START_ atÃ© _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 atÃ© 0 de 0 registros",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": "_MENU_ resultados por pÃ¡gina",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisar",
    "oPaginate": {
        "sNext": "PrÃ³ximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Ãšltimo"
    },
    "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"

    }
};

var template = Handlebars.compile($("#details-template").html());

function Loadtables(data) {
    $(function () {
        var columns = Array();
        $('#columns').val().split(",").forEach(function (valor, chave) {
            columns.push({data: valor});
        });
        columns.unshift({
            className: 'details-control',
            orderable: false,
            searchable: false,
            data: data,
            defaultContent: '',
        });
        console.log("URL: " + getUrlApi());
        var table = $('#datatable').DataTable({
            processing: true,
            "language": lang,
            serverSide: true,
            ajax: getUrlApi(),
            columns: columns,
            order: [[1, 'asc']]
        });
        $('#datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);


            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                $.each(row.data(), function (index, value) {
                    if (value == null) {
                        row.data()[index] = "---";
                    }
                });
                row.child(template(row.data())).show();
                tr.addClass('shown');
            }
        });
    });
}

if ($('#columns').length > 0) {
    var userAded = $('#userAdded');
    var data = userAded.length > 0 ? {user: userAded.val()} : null;
    Loadtables(data);
}
$('#check_details th').each(function () {
    var check = Array($(this).find("td").eq(1).html());
});


function check_inputs() {

    var user = $("#user").val();
    var password = $("#password").val();
    var email = $("#email_user").val();


    if (user == '' && password == '' && email == '') {
        $("#user").removeAttr("data-validation");
        $("#password").removeAttr("data-validation");
        $("#confirm_password").removeAttr("data-validation");
        $("#email_user").removeAttr("data-validation");
    } else if ((user != '') || (password != '') || (email != '')) {
        $("#user").attr("data-validation", "notempty($(this))");
        $("#password").attr("data-validation", "notempty($(this))");
        $("#confirm_password").attr("data-validation", "notempty($(this))");
        $("#email_user").attr("data-validation", "validEmail($(this))");
    }
}

function actionAjax(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json"
    }).done(function (data) {
        var modal = $("#on_done_data");
        if (data.success) {
            modal.find('.modal-body').find('p').text(data.message);
            modal.modal('show');
        } else {
            modal.find('.modal-body').find('p').text(data.message);
            modal.modal('show');
        }
    });
}

function reload() {
    location.reload(true)
}

function getUrl() {
    var url = location.href;
    url = url.split("/");
    url = window.location.origin + '/api/' + url[3];
    return url;
}

function disable(id_user) {
    var url = getUrl() + "/disable/" + id_user;
    actionAjax(url);
    window.setInterval("reload()", 2000);
}

function active(id_user) {
    var url = getUrl() + "/active/" + id_user;
    actionAjax(url);
    window.setInterval("reload()", 2000);

}

function ajaxAction(url, method, data, obj, success, error) {

    if (obj !== null) {

        if ($(obj).hasClass('confirmation')) {
            if (!confirm($(obj).data('confirm'))) {
                return
            }
        }
    }

    $.ajax({
        type: method,
        url: url,
        data: data,
        dataType: "json"
    }).done(function (data) {
        var msg = data.message;
        if (data.success) eval(success);
        else eval(error)
    });
}

function userPointRemoveSuccess(obj) {
    var card = $(obj).closest('.card');
    card.fadeToggle('faster');
    setTimeout(function () {
        card.closest('.wraper-card').remove();
    }, 500);
}

function userPointRemoveError(msg) {
    alert(msg);
}

function showModalAddPoints(url) {

    $("#modalPointsAdd").modal('show');

    var button = $("#btn_search_points");
    button.unbind();

    button.on('click', function () {
        var inputSearch = document.getElementById('search_points');
        ajaxAction(url + "?q=" + inputSearch.value, "GET", {}, null, "callBackPointSuccess( data )", "");
    });
}

function callBackPointSuccess(data) {

    if (data.data.length > 0)
        $("#wrapper_cards_points").empty().html(data.data);
    else
        $("#wrapper_cards_points").empty().html('<p class="alert alert-danger">NÃ£o encontrado</p>')
}

function userPointAddSuccess(obj) {

    $("#modalPointsAdd").modal('hide');
    window.setInterval("reload()", 500);

}

function userPointAddError(msg) {
    alert(msg);
}

function showDetailsPointSuccess(data) {

    var modal = $('.pointSaleModalDetails'),
        wrapercar = modal.find('.carousel-wraper'),
        wraperTag = modal.find('#tagEcommerce');


    wrapercar.html(data.data.images);

    if (data.data.point.is_ecommerce) {
        wraperTag.removeClass('invisible');
    } else {
        wraperTag.addClass('invisible');
    }

    $('#details_fantasy_name').val(data.data.point.fantasy_name);
    $('#details_description_economic').val(data.data.point.description_activity);
    $('#details_website').val(data.data.point.website);
    $('#details_point_phone').val(data.data.point.phone);
    $('#details_point_cep').val(data.data.point.zipcode);
    $('#details_point_address').val(data.data.point.address);
    $('#details_point_number').val(data.data.point.number);
    $('#details_point_complement').val(data.data.point.complement);
    $('#details_point_district').val(data.data.point.district);
    $('#details_point_city').val(data.data.point.city);
    if (data.data.point.state !== null) {
        $('#details_point_state').val(data.data.point.state.abbr);
    }
    $('#details_point_created_at').val(data.data.point.created_at);

    modal.modal('show');
}

function showDetailsPointError(msg) {
    alert(msg);
}

function removeUserCallBackSuccess() {
    window.setInterval("reload()", 500);
}

function removeUserCallBackError(msg) {
    alert(msg);
    window.setInterval("reload()", 500);
}

function removeFilePointSuccess(obj) {
    var image = $(obj).closest('.figure-wrapper');
    image.fadeToggle('faster');
    setTimeout(function () {
        image.closest('.wraper-card').remove();
    }, 500);
}

function setImageLogoSuccess(data) {
    $("#logotipo").attr('src', data.url);
    $(".wrapper_images_upload").html(data.data)
}

function addPreviewProductsSuccess(data) {
    //console.log( data.data.html);
    window.scrollTo(0, 0);
    $("#wraper_add_products").html(data.data.html);
    setTimeout(function () {
        $('#price').maskMoney();
    }, 500);
}

function addwineCallBackSuccess() {
    $('#datatable').dataTable().fnDestroy();
    var userAded = $('#userAdded');
    var data = userAded.length > 0 ? {user: userAded.val()} : null;
    Loadtables(data);
    window.scrollTo(0, 0);
    $("#wraper_add_products").html('<hr/><p class="text-center"> <span class="badge badge-pill badge-success">Add</span> <span class="badge badge-pill badge-primary">Edit</span> <span class="badge badge-pill badge-danger">Delete</span> </p><div class="alert alert-info" role="alert">Adicionado com sucesso</div><hr/>');
    setTimeout(function () {
        $(".alert").fadeToggle('fast');
    }, 2000);
}

function removeSommelierWineCallBackSuccess() {
    $('#datatable').dataTable().fnDestroy();
    Loadtables();
}

function removeSommelierWineCallBack(obj) {
    var item = $(obj).closest('.list-group-item');
    item.remove();
}

function getCoordenadas(obj, success) {

    var numero = $("#number").val(),
        cep = $("#zipcode").val(),
        endereco = $("#address").val(),
        cidade = $("#city").val();

    const mapsKey = "AIzaSyAoIuUqdY9XgBaZ_wPwqanNHor_xFHu-_4";

    if (numero.length < 1) {
        alert("Informe o nÃºmero");
        return false;
    }
    cep = cep.length > 0 ? cep : "";
    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: "https://maps.googleapis.com/maps/api/geocode/json?key=" + mapsKey + "&new_forward_geocoder=true&address=" +
            endereco + " " + numero + " " + cidade + " " + cep,
        success: success
    });
}
