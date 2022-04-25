<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * A partner has many events
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function events(){
        return $this->hasMany('App\Models\Event');
    }
}
