<?php

namespace App\Models;

class Region
{
    protected static $regions = [
        1 => 'Drenthe',
        2 => 'Flevoland',
        3 => 'Friesland',
        4 => 'Gelderland',
        5 => 'Groningen',
        6 => 'Limburg',
        7 => 'Noord-Brabant',
        8 => 'Noord-Holland',
        9 => 'Overijssel',
        10 => 'Utrecht',
        11 => 'Zeeland',
        12 => 'Zuid-Holland'
    ];

    static function all(){
        return self::$regions;
    }
}
