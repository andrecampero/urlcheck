<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 30 Aug 2018 17:23:02 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class TbPerfil
 *
 * @property int $id
 * @property string $nome
 * @property string $empresa_perfil
 * @property int $admin
 * @property \Illuminate\Database\Eloquent\Collection $tb_usuarios
 *
 * @package App\Models
 */
class TbPerfil extends Eloquent
{
    protected $table = 'tb_perfil';
    public $timestamps = false;

    use SoftDeletes;
    protected $casts = [
        'admin' => 'int'
    ];

    protected $fillable = [
        'nome',
        'tipo',
        'admin',
        'permissao',
        'relacionado',
        'deleted_at'
    ];

    public function tb_usuarios()
    {
        return $this->hasMany(\App\Models\TbUsuario::class, 'perfil');
    }

    public $rules = [
        'nome' => 'required',
//        'cpf' => 'required',
//        'senha' => 'required',
//        'local' => 'required',
//        'numero' => 'required',
//        'cidade' => 'required',
//        'uf' => 'required',
    ];

    public $messages = [
        'nome.required' => 'O nome é obrigatório',
//        'd_email.email' => 'O campo e-mail não é válido',
//        'cpf.required' => 'O cpf é obrigatório',
//        'senha.required' => 'A senha é obrigatória',
//        'local.required' => 'O local (endereço) é obrigatório',
//        'numero.required' => 'O número é obrigatório',
//        'cidade.required' => 'A cidade é obrigatória',
//        'uf.required' => 'O estado é obrigatório',
    ];

}
