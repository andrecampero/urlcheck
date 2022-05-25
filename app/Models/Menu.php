<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'menu';
    protected $fillable = ['name','url','icon','item_order'];

    public $timestamps = false;

    public function submenus()
    {
        return $this->hasMany('App\Models\Submenu');
    }
    public function sub_menus()
    {
        return $this->hasMany(Submenu::class);
    }
}
