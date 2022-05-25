<?php

namespace App\Http\Controllers\Admin;

use App\Models\TbEmpresa;
use App\Models\TbUf;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TbUsuario;
use App\Models\TbPerfil;
use Illuminate\Support\Facades\Hash;
use Yajra\Datatables\Datatables;
use Auth;

class UserController extends Controller
{
    private $user;

    public function __construct(TbUsuario $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        $title = "Usuários";

        return view('user.index', compact('title'));
    }

    public function getUsers()
    {
        $users = $this->user->with('tb_perfil')->get();


        return Datatables::of($users)
            ->addColumn('action', function ($user) {
                return '<a href="' . route('edituser.user', array('id' => $user->id)) . '"  class="btn btn-xs btn-info" id="edit-data"><i class="fa flaticon-edit"></i></a><a href="#" data-id="' . $user->id . '" data-url="' . route('delete.user') . '" class="btn btn-xs btn-danger" id="delete-data"><i class="fa flaticon-delete"></i></a>';
            })
            ->make(true);
    }

    public function create()
    {
        $title = "Adicionar Usuário";
        $profiles = TbPerfil::all();
        $ufs = TbUf::all();


        return view('user.create', compact('title', 'profiles', 'ufs'));
    }


    public function edit($id)
    {
        $title = "Editar meu Perfil";
        $user = $this->user->find(Auth::user()->id);
        $ufs = TbUf::all();


        return view('user.edit-profile', compact('title', 'user', 'ufs'));
    }

    public function edituser($id)
    {
        $title = "Editar Usuário";
        $user = $this->user->find($id);
        $ufs = TbUf::all();
        $profiles = TbPerfil::all();
        $companies = TbEmpresa::all();


        return view('user.edituser', compact('title', 'user', 'ufs', 'profiles', 'companies'));
    }

    public function store(Request $request)
    {

        $this->validate($request, $this->user->rules);
        $data = $request->all();

        $data['senha'] = bcrypt($data['senha']);
        $data['first'] = 1;
        $data['ativo'] = 1;


        $create = $this->user->create($data);


        if (!$create) {
            return response()->json(["result" => false, "message" => "Algo errado aconteceu, tente novamente mais tarde "]);
        }
        return response()->json(["result" => true, "message" => "Registro salvo com sucesso!"]);

    }

    public function storemydata(Request $request)
    {


        $this->validate($request, $this->user->rules);
        $data = $request->all();

        $data['senha'] = bcrypt($data['senha']);


        $user = $this->user->find(Auth::user()->id);
        $user->nome = $data['nome'];
        $user->email = $data['email'];
        $user->senha = $data['senha'];
        //$user->cpf = $data['cpf'];
        $user->local = $data['local'];
        $user->numero = $data['numero'];
        $user->andar = $data['andar'];
        $user->area = $data['area'];
        $user->telefone = $data['telefone'];
        $user->ramal = $data['ramal'];
        $user->baia = $data['baia'];
        $user->cep = $data['cep'];
        $user->bairro = $data['bairro'];
        $user->cidade = $data['cidade'];
        $user->uf = $data['uf'];


        if (!$user->save()) {
            return response()->json(["result" => false, "message" => "Algo errado aconteceu, tente novamente mais tarde "]);
        }
        return response()->json(["result" => true, "message" => "Registro cadastrado com sucesso!"]);

    }

    public function save(Request $request)
    {


        $this->validate($request, $this->user->rules);
        $data = $request->all();

        $data['senha'] = bcrypt($data['senha']);


        $user = $this->user->find($data['user']);
        $user->nome = $data['nome'];
        $user->email = $data['email'];
        $user->senha = $data['senha'];
        //$user->cpf = $data['cpf'];
        $user->local = $data['local'];
        $user->numero = $data['numero'];
        $user->andar = $data['andar'];
        $user->baia = $data['baia'];
        $user->cep = $data['cep'];
        $user->bairro = $data['bairro'];
        $user->cidade = $data['cidade'];
        $user->uf = $data['uf'];
        $user->empresa = $data['empresa'];
        $user->perfil = $data['perfil'];


        if (!$user->save()) {
            return response()->json(["result" => false, "message" => "Algo errado aconteceu, tente novamente mais tarde "]);
        }
        return response()->json(["result" => true, "message" => "Registro salvo com sucesso!"]);

    }


    public function editProfile()
    {
        $title = "Editar meu perfil";

        $user = Auth::user();

        $ufs = TbUf::all();

        return view('user.edit-profile', compact('title', 'user', 'ufs'));
    }

    public function newPassword()
    {
        $title = "Editar minha senha";

        return view('user.edit-password', compact('title'));
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|min:5',
            'password' => 'required|confirmed|min:5',
        ]);

        $data = $request->all();

        if (Hash::check($data['old_password'], Auth::user()->senha)) {
            $update = tbUsuario::find(Auth::user()->id)
                ->update(
                    ['senha' => Hash::make($data['password'])]
                );
            if ($update) {
                return response()->json(["result" => true, "message" => "Registro atualizado com sucesso!"]);
            } else {
                return response()->json(["result" => false, "message" => "Ocorreu um erro, tente novamente mais tarde"]);
            }
        } else {
            return response()->json(["result" => false, "message" => "A senha antiga está incorreta"]);
        }

    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $user = TbUsuario::where('id', $id)->first();
        $user->delete();
        if (!$user) {
            return response()->json(["result" => false]); 
        }

        return response()->json(["result" => true]);
    }
}
