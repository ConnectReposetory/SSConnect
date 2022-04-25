<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Partners') }}
        </h2>
    </x-slot>
    @include('partials.flash')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th class="border-b w-20 px-4 py-2"></th>
                            <th class="border-b px-4 py-2 text-left">Naam</th>
                            <th class="border-b px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($Partners as $Partner)
                            <tr>
                                <td class="border-t px-4 py-2">
                                    @if($Partner->image)
                                        <img class="inline object-cover w-8 h-8 rounded-full mr-5" src="{{$Partner->image}}" alt="Profile image"/>
                                    @else
                                        <div class="inline-block object-cover bg-gray-200 w-8 h-8 mr-5 rounded-full"></div>
                                    @endif
                                </td>
                                <td class="border-t px-4 py-2">
                                    <b>{{$Partner->name}}</b>
                                </td>
                                <td class="border-t px-4 py-2">
                                    <a href="{{ route('partners_edit', $Partner->id) }}">
                                        <x-jet-button class="">
                                            {{ __('Pas aan') }}
                                        </x-jet-button>
                                    </a>
                                    <a href="{{ route('partners_delete', ['id' => $Partner->id ])}}">
                                        <x-jet-button onClick="return confirm('Weet je het zeker ?')">
                                            {{ __('Verwijder') }}
                                        </x-jet-button>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                <a href="{{ route('partners_create') }}">
                    <x-jet-button class="mt-4">
                        {{ __('Partner toevoegen') }}
                    </x-jet-button>
                </a>
            </div>
        </div>
    </div>
</x-app-layout>
