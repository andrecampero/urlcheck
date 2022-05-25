<?php $__env->startSection('content'); ?>
    <!--begin::Portlet-->
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        Registrar
                    </h3>
                </div>
            </div>
        </div>

        <!--begin::Form-->
        <form id="createform" class="m-form m-form--fit m-form--label-align-right ajax-form" method="post"
              action="<?php echo e(route('save.lot.protocol')); ?>">
            <input type="hidden" name="_token" id="token" value="<?php echo e(csrf_token()); ?>">
            <div class="m-portlet__body">

				<div class="form-group m-form__group row">
                    <label class="col-form-label col-lg-1 col-sm-12 col-xs-12">Url <span style="color:red;">*</span></label>
                    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 div_track">
                        <input type="text" class="form-control m-input" id="url_track" name="url_track" required>
                    </div>
                </div>

			</div>

			<div class="m-portlet__foot m-portlet__foot--fit">
                <div class="m-form__actions m-form__actions">
                    <div class="row">
                        <div class="col-lg-11 ml-lg-auto">
                            <div onclick="action_submit()" class="btn btn-brand">Cadastrar</div>
                            <div class="lds-dual-ring m--margin-left-50 m--padding-top-20"
                                 style="display:none;"></div>
                        </div>
                    </div>
                </div>
            </div>
		</form>


        <!--end::Form-->
    </div>
    <!--end::Portlet-->
<?php $__env->stopSection(); ?>
<?php $__env->startPush('scripts'); ?>
<script>
	function func_timeout() {
		var content_text = $('#swal2-title').text();
		if(content_text == "Sucesso!")
		{
			$('.btn-success').click(function(){
				document.location.reload(true);
			});
		}
	}

	var count_submit = 0;
	function action_submit()
	{
		$("#createform").submit();
		setTimeout(func_timeout, 500);
	}
	
	$("#url_track").focusout(function(){
		if($("#url_track").val() != "")
		{
			if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#url_track").val())){
				//alert("valid URL");
			} else {
				alert("URL Inválida. Por favor preencha novamente");
			}
		}	
	});
</script>
<?php $__env->stopPush(); ?>

<?php echo $__env->make('layout.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>