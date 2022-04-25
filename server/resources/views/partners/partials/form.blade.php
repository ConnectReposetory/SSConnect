<div>
    <x-jet-label for="name" value="{{ __('Name') }}" />
    <input
        id="name"
        class="block mt-1 w-full form-input rounded-md shadow-sm"
        type="text"
        name="name"
        value="{{ old('name') ?? $Partner->name ?? '' }}"
        required
    />
</div>

<div class="mt-4">
    <x-jet-label for="" value="{{ __('Beschrijving') }}" />
    <textarea
        id="description"
        class="block mt-1 w-full form-input rounded-md shadow-sm"
        rows="5"
        name="description"
        required>{{ old('description') ?? $Partner->description ?? '' }}</textarea>
</div>

@include('partials.image',[
    'image' => $Partner->image,
    'label' => 'Logo',
    'fieldName' => 'image',
    'deleteRoute' => route('partners_delete_image', ['id' => $Partner->id ?? 0]),
    'displaySize' => array('width'=>100, 'height'=>100),
    'imageSize' => array('width'=>400, 'height'=>400),
])
<div class="flex items-center justify-end mt-4">
    <x-jet-button class="ml-4">
        {{ __($submitButtonLabel) }}
    </x-jet-button>
</div>
