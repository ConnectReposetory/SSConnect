@if(Session::has('flash_message'))
    <div class="pt-5">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="{{Session::get('flash_type') === "error" ? "bg-red-200" : "bg-green-200" }} overflow-hidden shadow-xl sm:rounded-lg p-6">
                <div class="alert">{{Session::get('flash_message')}}</div>
            </div>
        </div>
    </div>
@endif
