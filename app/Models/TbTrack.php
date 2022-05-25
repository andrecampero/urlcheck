<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 30 Aug 2018 17:23:02 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

class TbTrack extends Eloquent
{
    protected $table = 'tb_track';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $dates = [
        'createdAt',
        'urlcheckAt',
    ];

    protected $fillable = [
        'url_track',
		'status_code',
        'response_code',
        'urlcheckedAt',
        'createdBy',
        'createdAt'
    ];
    public $rulesLot = [
        'url_track' => 'required:tb_track,url_track',
    ];
    
    public $messages = [
        'url_track.required' => 'A URL é obrigatória'
    ];
}
