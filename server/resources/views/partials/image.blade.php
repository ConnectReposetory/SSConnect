<x-jet-label class="mt-5" for="{{$fieldName}}" value="{{ __($label) }}" />
<div class="flex">
    @if($image)
        <img src="{{$image}}" width="{{$displaySize['width']}}" height="{{$displaySize['height']}}" class="border object-contain mr-3" /><br/>
    @endif
    <x-jet-input
        id="{{$fieldName}}"
        class="block mt-1 w-full"
        type="file"
        name="{{$fieldName}}"
    />
    <input
        id="{{$imageSize['fieldname'] ?? 'imageSize'}}[width]"
        type="hidden"
        name="{{$imageSize['fieldname'] ?? 'imageSize'}}[width]"
        value="{{$imageSize['width']}}"
    />
    <input
        id="{{$imageSize['fieldname'] ?? 'imageSize'}}[height]"
        type="hidden"
        name="{{$imageSize['fieldname'] ?? 'imageSize'}}[height]"
        value="{{$imageSize['height']}}"
    />
    <input
        id="imageSizeFieldname[{{$fieldName}}]"
        type="hidden"
        name="imageSizeFieldname[{{$fieldName}}]"
        value="{{$imageSize['fieldname'] ?? 'imageSize'}}"
    />
</div>
<div>
    @if($image)
        <a class="font-medium text-sm leading-5 text-red-500" href="{{ $deleteRoute }}">
            Verwijder {{$label}}
        </a>
    @endif
</div>
