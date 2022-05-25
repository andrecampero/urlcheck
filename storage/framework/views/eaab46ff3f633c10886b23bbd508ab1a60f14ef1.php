<!DOCTYPE html>
<html lang="pt-br">

	<!-- begin::Head -->
	<head>
		<meta charset="utf-8" />
		<title>Validador URL</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
		
		<style type="text/css">
	
				input {
					outline: none;
					border: none;
				}

				.wrap-input {
				  position: relative;
				  width: 100%;
				  z-index: 1;
				  margin-bottom: 10px;
				}

				.input {
				  font-size: 14px;
				  line-height: 1.5;
				  color: #666666;

				  display: block;
				  width: 100%;
				  background: #fff;
				  height: 50px;
				  border-radius: 25px;
				  padding: 0 30px 0 68px;
				}


				.symbol-input {
				  font-size: 15px;
				  display: -webkit-box;
				  display: -webkit-flex;
				  display: -moz-box;
				  display: -ms-flexbox;
				  display: flex;
				  align-items: center;
				  position: absolute;
				  border-radius: 25px;
				  bottom: 0;
				  left: 0;
				  width: 100%;
				  height: 100%;
				  padding-left: 35px;
				  pointer-events: none;
				 -webkit-transition: all 0.4s;
				  -o-transition: all 0.4s;
				  -moz-transition: all 0.4s;
				  transition: all 0.4s;
				}
		</style>
		
		<!--begin::Web font -->
		<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
		<script>
			WebFont.load({
				google: {
					"families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"]
				},
				active: function() {
					sessionStorage.fonts = true;
				}
			});
		</script>

		<!--end::Web font -->

        <!--begin::Base Styles -->
		<link href="<?php echo e(url('assets/vendors/base/vendors.bundle.css')); ?>" rel="stylesheet" type="text/css" />
		<link href="<?php echo e(url('assets/demo/default/base/style.bundle.css')); ?>" rel="stylesheet" type="text/css" />
		<link href="<?php echo e(url('assets/demo/default/base/sylep.css')); ?>" rel="stylesheet" type="text/css" />

	</head>

	<!-- end::Head -->

	<!-- begin::Body -->
	<body style="overflow:hidden;" class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
			<!-- begin:: Page -->
			<img class="fundo-da-pagina" src="<?php echo e(url('assets/app/media/img/bg/715424_black-and-white-abstract-wallpaper.jpg')); ?>" alt="Fundo da página">
		<div class="m-grid m-grid--hor m-grid--root m-page" style="position: absolute; margin: auto; width: 100%">
			<div class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-1" id="m_login">
				<div class="m-grid__item m-grid__item--fluid m-login__wrapper">
					<div class="m-login__container">
						<div class="m-login__logo">
							<h5>Validador URL</h5>
						</div>
						<div class="m-login__signin">
							<?php echo Form::open(['route' => 'authenticate', 'class' => 'm-login__form m-form']); ?>								
								<div class="wrap-input " >
									<input class="input" type="text" name="email" placeholder="E-mail">
									<span class="symbol-input">
									<i class="fa fa-envelope" aria-hidden="true"></i>
									</span>
								</div>

								<div class="wrap-input" >
									<input class="input" type="password" name="password" placeholder="Senha">
									<span class="symbol-input">
									<i class="fa fa-lock" aria-hidden="true"></i>
								</span>
								</div>

								<?php if(session()->has('message')): ?>
								<p class="btn-danger text-center"><?php echo e(session()->get('message')); ?></p>
								<?php endif; ?>

								<div class="m-login__form-action">
									<button type="submit" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primary" style="width:100%;">Login</button>
								</div>
							<?php echo Form::close(); ?>

						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- end:: Page -->
		<!--begin::Base Scripts -->
		<script src="<?php echo e(url('assets/vendors/base/vendors.bundle.js')); ?>" type="text/javascript"></script>
		<script src="<?php echo e(url('assets/demo/default/base/scripts.bundle.js')); ?>"  type="text/javascript"></script>

		<!--end::Base Scripts -->

		<!--begin::Page Snippets -->
		<script src="<?php echo e(url('assets/snippets/custom/pages/user/login.js')); ?>" type="text/javascript"></script>

		<!--end::Page Snippets -->
	</body>

	<!-- end::Body -->
</html>
