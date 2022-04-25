<div>
    <x-jet-label class="mt-5" for="title" value="{{ __('Titel') }}" />
    <x-jet-input
        id="title"
        class="block mt-1 w-full"
        type="text"
        name="title"
        value="{{ old('title') ?? $Event->title ?? '' }}"
        required
     />
    <x-jet-label class="mt-5" for="partner_id" value="{{ __('Partner') }}" />
    <select name="partner_id" id="partner_id" class="form-select rounded-md shadow-sm mt-1 block w-full">
        @foreach($Partners as $Partner)
            <option value="{{ $Partner->id }}" {{ ($Partner->id === $Event->partner_id) ? 'selected' : '' }}>{{ $Partner->name }}</option>
        @endforeach
    </select>
    <div class="mt-4">
        <x-jet-label for="" value="{{ __('Beschrijving') }}" />
        <textarea
            id="description"
            class="block mt-1 w-full form-input rounded-md shadow-sm"
            rows="5"
            name="description"
            required>{{ old('description') ?? $Event->description ?? '' }}</textarea>
    </div>
    @include('partials.image',[
        'image' => $Event->image_square,
        'label' => 'Afbeelding vierkant (wordt geschaald naar 700x700 pixels)',
        'fieldName' => 'image_square',
        'deleteRoute' => route('events_delete_image', ['id' => $Event->id ?? 0, 'field'=>'image_square']),
        'displaySize' => array('width'=>177, 'height'=>177),
        'imageSize' => array('width'=>700, 'height'=>700, 'fieldname'=> 'imageSquareSize'),
    ])
    @include('partials.image',[
        'image' => $Event->image_letterbox,
        'label' => 'Afbeelding breed (optioneel, wordt geschaald naar 700x364 pixels)',
        'fieldName' => 'image_letterbox',
        'deleteRoute' => route('events_delete_image', [$Event->id  ?? 0, 'field'=>'image_square']),
        'displaySize' => array('width'=>177, 'height'=>100),
        'imageSize' => array('width'=>700, 'height'=>394, 'fieldname'=> 'imageLetterboxSize'),
    ])

</div>
<div class="border sm:rounded-lg p-6 mt-5 ">
    <x-jet-label class="mt-5" for="content[introduction]" value="{{ __('Introductie') }}" />
    <textarea
        id="content[introduction]"
        class="block mt-1 w-full form-input rounded-md shadow-sm"
        rows="3"
        name="content[introduction]"
        required>{{ old('content[introduction]') ?? $Event->content->introduction ?? '' }}</textarea>
    <x-jet-label class="mt-5" for="content[short_title]" value="{{ __('Korte titel (optioneel)') }}" />
    <x-jet-input
        id="content[short_title]"
        class="block mt-1 w-full"
        type="text"
        name="content[short_title]"
        value="{{ old('short_title') ?? $Event->content->short_title ?? '' }}"
    />
    <x-jet-label class="mt-5" for="content[region_id]" value="{{ __('Regio') }}" />
    <select name="content[region_id]" id="content[region_id]" class="form-select rounded-md shadow-sm mt-1 block w-full">
        @foreach($Regions as $key => $region)
            <option value="{{ $key }}" {{ ($Event->content && strval($key) === $Event->content->region_id) ? 'selected' : '' }}>{{ $region }}</option>
        @endforeach
    </select>
    <x-jet-label class="mt-5" for="content[date]" value="{{ __('Datum') }}" />
    <x-jet-input id="content[date]" class="block mt-1 w-full" type="date" name="content[date]"
                 value="{{ old('content[date]') ?? $Event->content->date ?? '' }}"
    />
    <x-jet-label class="mt-5" for="content[time]" value="{{ __('Starttijd') }}" />
    <x-jet-input id="content[time]" class="block mt-1 w-full" type="time" name="content[time]"
                 value="{{ old('content[time]') ?? $Event->content->time ?? '' }}"
    />
    <x-jet-label class="mt-5" for="content[end_time]" value="{{ __('Eindtijd') }}" />
    <x-jet-input id="content[end_time]" class="block mt-1 w-full" type="time" name="content[end_time]"
                 value="{{ old('content[end_time]') ?? $Event->content->end_time ?? '' }}"
    />
    <x-jet-label class="mt-5" for="content[accessible]" value="{{ __('Rolstoeltoegankelijk') }}" />
    <select name="content[accessible]" id="content[accessible]" class="form-select rounded-md shadow-sm mt-1 block w-full">
        <option value="1" {{ ($Event->content && $Event->content->accessible == '1') ? 'selected' : '' }}>Ja</option>
        <option value="0" {{ ($Event->content && $Event->content->accessible == '0') ? 'selected' : '' }}>Nee</option>
    </select>
    <x-jet-label class="mt-5" for="content[adult]" value="{{ __('Leeftijdsgroep') }}" />
    <select name="content[adult]" id="content[adult]" class="form-select rounded-md shadow-sm mt-1 block w-full">
        <option value="0" {{ ($Event->content && $Event->content->adult == '0') ? 'selected' : '' }}>Iedereen</option>
        <option value="1" {{ ($Event->content && $Event->content->adult == '1') ? 'selected' : '' }}>12 tot 18</option>
        <option value="2" {{ ($Event->content && $Event->content->adult == '2') ? 'selected' : '' }}>18 jaar en ouder</option>
    </select>
    <x-jet-label class="mt-5" for="content[online]" value="{{ __('Online/offline') }}" />
    <select name="content[online]" id="content[online]" class="form-select rounded-md shadow-sm mt-1 block w-full">
        <option value="0" {{ ($Event->content && $Event->content->online == '0') ? 'selected' : '' }}>offline</option>
        <option value="1" {{ ($Event->content && $Event->content->online == '1') ? 'selected' : '' }}>online</option>
    </select>
    <x-jet-label class="mt-5" for="content[link]" value="{{ __('Linknaam') }}" />
    <x-jet-input
        id="content[link_name]"
        class="block mt-1 w-full"
        type="text"
        name="content[link_name]"
        value="{{ old('link_name') ?? $Event->content->link_name ?? '' }}"
    />
    <x-jet-label class="mt-5" for="content[link]" value="{{ __('Link') }}" />
    <x-jet-input
        id="content[link]"
        class="block mt-1 w-full"
        type="text"
        name="content[link]"
        value="{{ old('link') ?? $Event->content->link ?? '' }}"
    />
</div>
<div class="flex items-center justify-end mt-4">
    <x-jet-button class="ml-4">
        {{ __($submitButtonLabel) }}
    </x-jet-button>
</div>
