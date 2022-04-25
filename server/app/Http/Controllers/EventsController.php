<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Partner;
use App\Models\Region;
use App\Services\ImageService;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function index()
    {
        $Events  = Event::orderBy('id', 'asc')->get();

        return view('events.index', compact('Events'));
    }

    public function create()
    {
        $Event = new Event();
        $Partners = Partner::orderBy('name', 'asc')->get();
        $Regions = Region::all();

        $Event->content = json_decode($Event->content);

        return view('events.create', compact('Event', 'Partners', 'Regions'));
    }

    public function store(Request $request, ImageService $imageService)
    {
        $params = $request->toArray();
        $Event = new Event();
        $Event->title = $params['title'];
        $Event->partner_id = $params['partner_id'];
        $Event->description = $params['description'];
        $Event->content = json_encode($params['content']);

        $file = $request->file('image_square');
        if($file) {
            $Event->image_square = $this->uploadImage($request, $imageService, 'image_square', 'events_create');
        }
        $file = $request->file('image_letterbox');
        if($file) {
            $Event->image_letterbox = $this->uploadImage($request, $imageService, 'image_letterbox', 'events_create');
        }

        $Event->save();

        return redirect('events')->with([
            'flash_message' => 'Het evenement is aangemaakt',
            'flash_type'    => 'success'
        ]);
    }

    public function edit($id)
    {
        $Event = Event::where('id', $id)->firstOrFail();
        $Partners = Partner::orderBy('name', 'asc')->get();
        $Regions = Region::all();
        $Event->content = json_decode($Event->content);

        return view('events.edit', compact('Event', 'Partners', 'Regions'));
    }

    public function update(Request $request, ImageService $imageService, $id)
    {
        $params = $request->toArray();
        $Event = Event::where('id', $id)->firstOrFail();
        $Event->title = $params['title'];
        $Event->partner_id = $params['partner_id'];
        $Event->description = $params['description'];
        $Event->content = json_encode($params['content']);

        $file = $request->file('image_square');
        if($file) {
            $Event->image_square = $this->uploadImage($request, $imageService, 'image_square', 'events_edit/'.$id);
        }
        $file = $request->file('image_letterbox');
        if($file) {
            $Event->image_letterbox = $this->uploadImage($request, $imageService, 'image_letterbox', 'events_edit/'.$id);
        }

        $Event->save();
        return redirect('events')->with([
            'flash_message' => 'Het evenement is aangepast',
            'flash_type'    => 'success'
        ]);
    }

    public function destroy($id)
    {
        $Event = Event::where('id', $id)->firstOrFail();
        $title = $Event->title;
        $Event->delete();

        return redirect('events')->with([
            'flash_message' => 'Evenement '.$title.' is verwijderd',
            'flash_type'    => 'success'
        ]);
    }

    public function deleteImage($id, $field)
    {
        $Event = Event::where('id', $id)->firstOrFail();
        if($field === 'image_square') {
            $Event->image_square = null;
        }
        if($field === 'image_letterbox') {
            $Event->image_letterbox = null;
        }
        $Event->save();

        return redirect('events_edit/'.$id)->with([
            'flash_message' => 'Afbeelding is verwijderd',
            'flash_type'    => 'success'
        ]);
    }

    private function uploadImage($request, $imageService, $fieldname, $redirect) {
        $imageSize = null;
        $params = $request->toArray();
        $file = $request->file($fieldname);
        $imageSizeFieldname = $params['imageSizeFieldname'][$fieldname];
        if($params[$imageSizeFieldname] && is_array($params[$imageSizeFieldname])) {
            $imageSize = $params[$imageSizeFieldname];
        }
        if($file) {
            try {
                $url = $imageService->upload($file, $imageSize);
                return $url;
            } catch (\Exception $e) {
                return redirect($redirect)->with([
                    'flash_message' => 'Er ging iets fout met het uploaden van de afbeelding. Controleer of dit een jpg of png-bestand is..',
                    'flash_type'    => 'error'
                ]);
            }
        }
    }

}
