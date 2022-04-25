<?php

namespace App\Http\Controllers\Api;

use App\Models\Region;
use App\Models\Setting;
use App\Models\Partner;
use App\Models\Quiz;
use App\Models\Event;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class ContentController extends Controller
{
    public $authIgnore = ['get'];

    public function get()
    {
        $eventArray = $this->resultArrayForEvents();
        $Regions = Region::all();

        return new JsonResponse(
            array(
                'partners' => Partner::orderBy('id', 'asc')->get(),
                'events' => $eventArray,
                'regions' => $Regions
            )
        );
    }

    private function resultArrayForEvents() {
        $Events = Event::get();
        $MappedEvents = $Events->map(function ($Event){
            $Content =  json_decode($Event->content);
            return array(
                'title'=> array(
                    'long'=> $Event->title,
                    'short'=> isset($Content->short_title) ? $Content->short_title : '',
                ),
                'introduction'=> isset($Content->introduction) ? $Content->introduction : '',
                'description'=> isset($Content->description) ? $Content->description : '',
                'images' => array(
                    'square'=> $Event->image_square,
                    'letterbox'=> $Event->image_letterbox,
                ),
                'date' => isset($Content->date) ? $Content->date : '',
                'time' =>  isset($Content->time) ? $Content->time : '',
                'endtime' =>  isset($Content->end_time) ? $Content->end_time : '',
                'accessible' => isset($Content->accessible) ? $Content->accessible : '1',
                'online' => isset($Content->online) ? $Content->online : '0',
                'adult' => isset($Content->adult) ? $Content->adult : '0',
                'link' => isset($Content->link) ? $Content->link : '',
                'link_name' => isset($Content->link_name) ? $Content->link_name : '',
                'partner' => $Event->partner,
                'region' => $Content->region_id
            );
        });

        return $MappedEvents->sortBy('date')->values();
    }
}
