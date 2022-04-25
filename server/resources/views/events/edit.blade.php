<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Pas een Evenement aan') }}
        </h2>
    </x-slot>
    @include('partials.flash')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <form method="POST" enctype="multipart/form-data" action="{{ route('events_update', ['id' => $Event->id])}}">
                    @csrf
                    @include('events.partials.form',['submitButtonLabel' => 'Pas aan'])
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
