<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * A event belongs to a partner
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function partner()
    {
        return $this->belongsTo('App\Models\Partner');
    }
}
