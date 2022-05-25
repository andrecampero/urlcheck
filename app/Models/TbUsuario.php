<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use App\Notifications\MailResetPasswordNotification;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TbUsuario extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table = 'tb_usuario';
	protected $primaryKey = 'id';
    public $timestamps = false;

    protected $casts = [
        'perfil' => 'int'
    ];

    protected $fillable = [
        'email',
        'senha',
        'nome',
        'perfil',
    ];

    protected $hidden = [
        'senha', 'hash'
    ];


    public function getAuthPassword()
    {
        return $this->senha;
    }

    public function tb_perfil()
    {
        return $this->belongsTo(\App\Models\TbPerfil::class, 'perfil');
    }

    public function tb_coleta_documento_externos()
    {
        return $this->hasMany(\App\Models\TbColetaDocumentoExterno::class, 'id_usuario');
    }

    public function tb_coleta_documentos_usuarios()
    {
        return $this->hasMany(\App\Models\TbColetaDocumentosUsuario::class, 'id_usuario');
    }

    public function tb_devolucoes_documento_externos()
    {
        return $this->hasMany(\App\Models\TbDevolucoesDocumentoExterno::class, 'id_usuario');
    }

    public function tb_endereco_coleta_externos()
    {
        return $this->hasMany(\App\Models\TbEnderecoColetaExterno::class, 'id_usuario');
    }

    public function tb_endereco_entrega_externos()
    {
        return $this->hasMany(\App\Models\TbEnderecoEntregaExterno::class, 'id_usuario');
    }

    public function tb_entrega_documentos()
    {
        return $this->hasMany(\App\Models\TbEntregaDocumento::class, 'id_usuario');
    }

    public function tb_entrega_documento_externos()
    {
        return $this->hasMany(\App\Models\TbEntregaDocumentoExterno::class, 'id_usuario');
    }

    public function tb_token_sessao_usuarios()
    {
        return $this->hasMany(\App\Models\TbTokenSessaoUsuario::class, 'id_usuario');
    }


    public function setAttribute($key, $value)
    {
        $isRememberTokenAttribute = $key == $this->getRememberTokenName();
        if (!$isRememberTokenAttribute) {
            parent::setAttribute($key, $value);
        }
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public $rules = [
        'email' => 'required|email',
        'nome' => 'required',
        'senha' => 'required',
    ];

    public $messages = [
        'd_email.required' => 'O e-mail é obrigatório',
        'd_email.email' => 'O campo e-mail não é válido',
        'senha.required' => 'A senha é obrigatória'
    ];

}
