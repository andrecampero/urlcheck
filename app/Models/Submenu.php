<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submenu extends Model
{
    protected $table = 'submenu';
    protected $fillable = ['name','url','item_order','menu_id'];

    public $timestamps = false;


    public function menu()
    {
        return $this->belongsTo('App\Models\Menu');
    }
}
