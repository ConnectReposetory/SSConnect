<?php

namespace App\Services;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ImageService {

    public static function upload(UploadedFile $file, $imageSize = array('width' => 600, 'height'=> 600))
    {
        $ext = $file->guessClientExtension();
        if ($ext === 'jpg' || $ext === 'jpeg' || $ext === 'png' ) {

            $filename = (string) Str::uuid() . "." . $file->getClientOriginalExtension();
            $path = $file->storeAs(
                'public/images', $filename
            );

            if ($ext === 'jpg' || $ext === 'jpeg') {
                Image::make(storage_path('app/'.$path))
                    ->fit($imageSize['width'], $imageSize['height'])->encode('jpg', 50)
                    ->save();
            }

            if ($ext === 'png') {
                Image::make(storage_path('app/'.$path))
                    ->fit($imageSize['width'], $imageSize['height'])->encode('png')
                    ->save();
            }

            return asset('storage/images/' . $filename);
        } else {
            throw new \Exception('NO_VALID_IMG_FORMAT');
        }
    }

}
