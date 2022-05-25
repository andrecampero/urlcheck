<?php
namespace App\Http\Controllers\Admin\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\Models\TbUsuario;
use App\Models\TbTrack;

class AuthController extends Controller
{
	public function __construct(TbTrack $tb_track)
    {
        $this->tb_track = $tb_track;
    }
    
	public function index()
    {
        return view('login.index');
    }
	
	public function loginRemember()
    {
        return view('login.remember');
    }
	public function loginCadastro()
    {
        return view('login.cadastro');
    }

    // realiza a autenticação via sessão
	public function authenticate(Request $request)
    {
        $credentials = $request->only('email','password');

        if(Auth::guard('web')->attempt($credentials)){
           
		   session_start();
		   $_SESSION['email_logged'] = $request->email;
		   $_SESSION['password_logged'] = $request->password;
		   
		   return redirect()->route('protocols');
        }else{
            return redirect()->back()->with('message','Credenciais incorretas');
        }
        

    }

    // logout
    public function logout()
    {
        Auth::guard('web')->logout();

        return redirect()->route('login');
    }
}
