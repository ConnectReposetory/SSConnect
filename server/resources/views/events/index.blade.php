<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Evenementen') }}
        </h2>
    </x-slot>
    @include('partials.flash')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th class="border-b px-4 py-2 text-left">Titel</th>
                            <th class="border-b px-4 py-2 text-left">Partner</th>
                            <th class="border-b px-4 py-2 text-left">Datum</th>
                            <th class="border-b px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($Events as $Event)
                            <tr>
                                <td class="border-t px-4 py-2"><b>{{$Event->title}}</b></td>
                                <td class="border-t px-4 py-2">{{$Event->partner->name}}</td>
                                <td class="border-t px-4 py-2">{{json_decode($Event->content)->date}}</td>
                                <td class="border-t px-4 py-2">
                                    <a href="{{ route('events_edit', $Event->id) }}">
                                        <x-jet-button class="">
                                            {{ __('Pas aan') }}
                                        </x-jet-button>
                                    </a>
                                    <a href="{{ route('events_delete', ['id' => $Event->id ])}}">
                                        <x-jet-button onClick="return confirm('Weet je het zeker ?')">
                                            {{ __('Verwijder') }}
                                        </x-jet-button>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                <a href="{{ route('events_create') }}">
                    <x-jet-button class="mt-4">
                        {{ __('Maak nieuw evenement aan') }}
                    </x-jet-button>
                </a>
            </div>
        </div>
    </div>
</x-app-layout>
