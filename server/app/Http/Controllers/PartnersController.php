<?php

namespace App\Http\Controllers;
use App\Models\Partner;
use Illuminate\Http\Request;
use App\Services\ImageService;
use function Psy\debug;

class PartnersController extends Controller
{

    public function index()
    {
        $Partners  = Partner::orderBy('id', 'asc')->get();

        return view('partners.index', compact('Partners'));
    }

    public function create()
    {
        $Partner = new Partner();

        return view('partners.create', compact('Partner'));
    }

    public function store(Request $request, ImageService $imageService)
    {
        $params = $request->toArray();
        $Partner = new Partner();
        $Partner->name = $params['name'];
        $Partner->description = $params['description'];
        $file = $request->file('image');

        if($file) {
            try {
                $url = $imageService->upload($file);
                $Partner->image = $url;
            } catch (\Exception $e) {
                return redirect('partners_create')->with([
                    'flash_message' => 'Er ging iets fout met het uploaden van de afbeelding. Controleer of dit een jpg of png-bestand is..',
                    'flash_type'    => 'error'
                ]);
            }
        }

        $Partner->save();


        return redirect('partners')->with([
            'flash_message' => 'Partner is aangemaakt',
            'flash_type'    => 'success'
        ]);
    }

    public function edit($id)
    {
        $Partner = Partner::where('id', $id)->firstOrFail();

        return view('partners.edit', compact('Partner'));
    }

    public function update(Request $request, ImageService $imageService, $id)
    {
        $params = $request->toArray();
        $Partner = Partner::where('id', $id)->firstOrFail();
        $Partner->name = $params['name'];
        $Partner->description = $params['description'];

        $file = $request->file('image');
        if($file) {
            try {
                $url = $imageService->upload($file);
                $Partner->image = $url;
            } catch (\Exception $e) {

                return redirect('partners_edit/'.$id)->with([
                    'flash_message' => 'Er ging iets fout met het uploaden van de afbeelding. Controleer of dit een jpg of png-bestand is..',
                    'flash_type'    => 'error'
                ]);
            }
        }


        $Partner->save();
        return redirect('partners')->with([
            'flash_message' => 'Partner is aangepast',
            'flash_type'    => 'success'
        ]);
    }

    public function destroy($id)
    {
        $Partner = Partner::where('id', $id)->firstOrFail();
        $title = $Partner->name;

        if($Partner->events->count() === 0) {
            $Partner->delete();
            return redirect('partners')->with([
                'flash_message' => 'Partner '.$title.' is verwijderd',
                'flash_type'    => 'success'
            ]);
        } else {
            return redirect('partners')->with([
                'flash_message' => 'Partner '.$title.' heeft nog evenementen en kan niet verwijderd worden',
                'flash_type'    => 'error'
            ]);
        }

    }

    public function deleteImage($id)
    {
        $Partner = Partner::where('id', $id)->firstOrFail();
        $Partner->image = null;
        $Partner->save();

        return redirect('partners_edit/'.$id)->with([
            'flash_message' => 'Afbeelding is verwijderd',
            'flash_type'    => 'success'
        ]);
    }
}
